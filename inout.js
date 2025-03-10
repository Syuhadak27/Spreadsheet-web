import { getFromKV_inout, saveToKV_inout } from "./cache";
import { getCachedData_inout } from "./sheets";
import { getResultsPage } from "./templates"; // Gunakan template tampilan yang sama

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

  if (results.length === 0) {
    return new Response(
      getResultsPage("Hasil INOUT", query, `<p style="color: red;">❌ Tidak ada hasil ditemukan.</p>`),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  let totalMasuk = 0;
  let totalKeluar = 0;
  let sumByName = {};

  let resultHtml = `<div class="results">`;

  // **Deteksi mode gelap (di sisi klien)**
  const isDarkMode = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  results.forEach((row, index) => {
    let masuk = parseInt(row[3]?.replace(/\D/g, ""), 10) || 0;
    let keluar = parseInt(row[4]?.replace(/\D/g, ""), 10) || 0;
    let name = row[5]?.trim() || "Tanpa Nama";

    totalMasuk += masuk;
    totalKeluar += keluar;
    sumByName[name] = (sumByName[name] || 0) + keluar;

    // **Tentukan warna latar belakang berdasarkan mode terang/gelap**
    let bgColor;
    if (isDarkMode) {
      bgColor = index % 2 === 0 ? "#333366" : "#191f70"; // Mode gelap
    } else {
      bgColor = index % 2 === 0 ? "#E3F2FD" : "#ff5672"; // Mode terang
    }

    resultHtml += `
      <div class="result-card" style="background-color: ${bgColor}; color: ${isDarkMode ? "#ffffff" : "#000000"}; padding: 10px; border-radius: 5px; margin-bottom: 5px;">
        <code>${row[0]}</code> • <code>${row[1]}</code> • ${row[2]} • ${row[3]} • ${row[4]} • ${name}
      </div>`;
  });

  resultHtml += `</div>`;

  const totalTersisa = totalMasuk - totalKeluar;
  const sumByNameText = Object.entries(sumByName)
    .filter(([_, total]) => total > 0)
    .map(([name, total]) => `<li>${name}: ${total} pcs</li>`)
    .join("");

  let summaryHtml = `
    <div class="summary">
      <p>🟢 Masuk: ${totalMasuk} pcs • 🔴 Keluar: ${totalKeluar} pcs • 🟡 Tersisa: ${totalTersisa} pcs</p>
    </div>`;

  return new Response(getResultsPage("Hasil INOUT", query, summaryHtml + resultHtml), {
    headers: { "Content-Type": "text/html" },
  });
}