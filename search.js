import { getFromKV, saveToKV } from "./cache";
import { getCachedData } from "./sheets";
import { getResultsPage } from "./templates"; // Pakai template umum

export async function handleSearch(request, env) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) return new Response("<p style='color: red;'>❌ Masukkan query!</p>", { status: 400 });

  let data = await getFromKV(env);
  if (!data) {
    data = await getCachedData();
    await saveToKV(data, env);
  }

  const keywords = query.toLowerCase().split(" ");
  const results = data.filter(row =>
    keywords.every(keyword => row.some(cell => String(cell).toLowerCase().includes(keyword)))
  );

  let resultHtml = "<div class='results'>"; 
  if (results.length === 0) {
    resultHtml += "<p style='color: red;'>❌ Tidak ada hasil ditemukan.</p>";
  } else {
    results.forEach((row, index) => {
      const bgColor = index % 2 === 0 ? "#E3F2FD" : "#ffff00"; 
      resultHtml += `
        <div class="result-card" style="background-color: ${bgColor}; padding: 10px; border-radius: 5px; margin-bottom: 5px;">
          <strong onclick="copyToClipboard('${row[1]}')" style="cursor: pointer;">
           ${row[1]}
          </strong> <br>
          ${row[0]} • ${row[2]} • ${row[3]} • ${row[4]}
       </div>`;
    });
  }
  resultHtml += "</div>";

  return new Response(resultHtml, {
    headers: { "Content-Type": "text/html" },
  });
}