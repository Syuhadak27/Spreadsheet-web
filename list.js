import { getFromKV, saveToKV } from "./cache";
import { getCachedData } from "./sheets";
import { getResultsPage } from "./templates"; // Pakai template umum

export async function handleSearch_list(request, env) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) return new Response("Masukkan query!", { status: 400 });

  let data = await getFromKV(env);
  if (!data) {
    data = await getCachedData();
    await saveToKV(data, env);
  }

  const keywords = query.toLowerCase().split(" ");
  const results = data.filter(row =>
    keywords.every(keyword => row.some(cell => String(cell).toLowerCase().includes(keyword)))
  );

  let resultHtml = "";
  if (results.length === 0) {
    resultHtml = `<p class="no-result">❌ Tidak ada hasil ditemukan.</p>`;
  } else {
    resultHtml = `<div class="results">`;
    results.forEach((row, index) => {
      let bgColor = index % 2 === 0 ? "lightblue" : "lightcoral"; // Warna sama seperti inout

      resultHtml += `
        <div class="result-card" style="background-color: ${bgColor};">
          <strong> ${row[1]} • ${row[3]} • ${row[4]}</strong> <br>
        </div>`;
    });
    resultHtml += `</div>`;
  }

  return new Response(resultHtml, {
     headers: { "Content-Type": "text/html" },
  });
}