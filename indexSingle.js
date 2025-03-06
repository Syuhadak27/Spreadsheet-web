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
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background: #f4f7f6;
            }
            .container {
              max-width: 500px;
              margin: auto;
              padding: 20px;
              background: #fff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
            }
            h1 {
              color: #007bff;
            }
            hr {
              border: none;
              height: 2px;
              background: #007bff;
              margin: 20px 0;
            }
            input {
              padding: 10px;
              width: 90%;
              max-width: 400px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }
            button {
              padding: 10px 15px;
              margin-top: 10px;
              border: none;
              background: #007bff;
              color: white;
              border-radius: 5px;
              cursor: pointer;
            }
            button:hover {
              background: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔍 Cari Data di Google Sheets</h1>
            <hr>
            <form action="/search" method="GET">
              <input type="text" name="query" placeholder="Masukkan kata kunci..." required>
              <br>
              <button type="submit">Cari</button>
            </form>
          </div>
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

      let resultHtml = `<h1>Hasil untuk "${query}"</h1><hr>`;
      if (results.length === 0) {
        resultHtml += `<p style="color: red;">❌ Tidak ada hasil ditemukan.</p>`;
      } else {
        resultHtml += `<div class="results">`;
        results.forEach(row => {
          resultHtml += `
            <div class="result-card">
              <strong>${row[1]}</strong> <br>
              ${row[0]} • ${row[2]} • ${row[3]} • ${row[4]}
            </div>`;
        });
        resultHtml += `</div>`;
      }

      return new Response(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hasil Pencarian</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background: #f4f7f6;
            }
            .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              background: #fff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
            }
            h1 {
              color: #007bff;
            }
            hr {
              border: none;
              height: 2px;
              background: #007bff;
              margin: 20px 0;
            }
            .results {
              text-align: left;
            }
            .result-card {
              background: #e9f5ff;
              padding: 10px;
              border-radius: 5px;
              margin: 30px 0;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              width: 100%; /* Lebar card */
              height: auto; /* Tinggi card */
            }
            a {
              display: block;
              margin-top: 20px;
              text-decoration: none;
              color: #007bff;
              font-weight: bold;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            ${resultHtml}
            <a href="/">🔙 Kembali ke Pencarian</a>
          </div>
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