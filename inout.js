import { getFromKV_inout, saveToKV_inout } from "./cache";
import { getCachedData_inout } from "./sheets";
import { getResultsPage } from "./templates"; // Pakai template yang sama

export async function handleSearch_inout(request, env) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) return new Response("Masukkan query!", { status: 400 });

  let data = await getFromKV_inout(env);
  if (!data) {
    data = await getCachedData_inout();
    await saveToKV_inout(data, env);
  }

  const keywords = query.toLowerCase().split(" ");
  const results = data.filter(row =>
    keywords.every(keyword => row.some(cell => String(cell).toLowerCase().includes(keyword)))
  );

  let resultHtml = "";
  if (results.length === 0) {
    resultHtml = `<p style="color: red;">❌ Tidak ada hasil ditemukan.</p>`;
  } else {
    resultHtml = `<div class="results">`;
    results.forEach(row => {
      resultHtml += `
        <div class="result-card">
          ${row[0]} • ${row[1]} • ${row[2]} • ${row[3]} • ${row[4]} • ${row[5]}
        </div>`;
    });
    resultHtml += `</div>`;
  }

  return new Response(getResultsPage("Hasil INOUT", query, resultHtml), {
    headers: { "Content-Type": "text/html" },
  });
}
