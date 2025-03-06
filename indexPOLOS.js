import { config } from "./config";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // TAMPILAN HALAMAN UTAMA
    if (url.pathname === "/") {
      return new Response(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Database Bot</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            input { padding: 10px; width: 80%; max-width: 400px; }
            button { padding: 10px 15px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1>🔍 Cari Data di Google Sheets</h1>
          <form action="/search" method="GET">
            <input type="text" name="query" placeholder="Masukkan kata kunci..." required>
            <button type="submit">Cari</button>
          </form>
        </body>
        </html>
      `, { headers: { "Content-Type": "text/html" } });
    }

    // LOGIKA PENCARIAN
    if (url.pathname === "/search") {
      const query = url.searchParams.get("query");
      if (!query) return new Response("Masukkan query!", { status: 400 });

      // Ambil data dari KV atau Google Sheets
      let data = await getFromKV(env);
      if (!data) {
        data = await getCachedData(env);
        await saveToKV(data, env);
      }

      const keywords = query.toLowerCase().split(" ");
      const results = data.filter(row =>
        keywords.every(keyword => row.some(cell => String(cell).toLowerCase().includes(keyword)))
      );

      let resultHtml = `<h1>Hasil untuk "${query}"</h1>`;
      if (results.length === 0) {
        resultHtml += `<p>Tidak ada hasil ditemukan.</p>`;
      } else {
        resultHtml += `<ul>`;
        results.forEach(row => {
          resultHtml += `<li>${row[0]} - ${row[1]} - ${row[2]}</li>`;
        });
        resultHtml += `</ul>`;
      }

      return new Response(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hasil Pencarian</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            a { display: block; margin-top: 20px; text-decoration: none; color: blue; }
          </style>
        </head>
        <body>
          ${resultHtml}
          <a href="/">🔙 Kembali ke Pencarian</a>
        </body>
        </html>
      `, { headers: { "Content-Type": "text/html" } });
    }

    return new Response("Endpoint tidak ditemukan", { status: 404 });
  },
};

// Fungsi mengambil data dari Google Sheets
async function getCachedData(env) {
  const sheetId = config.SPREADSHEET_ID;
  const apiKey = config.GOOGLE_API_KEY;
  const range = "DATABASE!A2:E";

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error("❌ Error mengambil data:", error);
    return [];
  }
}

// Fungsi menyimpan ke KV
async function saveToKV(data, env) {
  await env.DATABASE_CACHE.put("search_results", JSON.stringify(data), {
    expirationTtl: 86400, // 12 jam
  });
}

// Fungsi membaca dari KV
async function getFromKV(env) {
  const data = await env.DATABASE_CACHE.get("search_results");
  return data ? JSON.parse(data) : null;
}