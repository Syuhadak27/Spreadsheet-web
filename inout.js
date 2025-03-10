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

  // Jika tidak ada hasil, hanya tampilkan pesan error
  if (results.length === 0) {
    return new Response("<p style='color: red;'>❌ Tidak ada hasil ditemukan.</p>", {
      headers: { "Content-Type": "text/html" },
    });
  }

  let resultHtml = "";
  let totalMasuk = 0;
  let totalKeluar = 0;
  let sumByName = {};

  results.forEach((row, index) => {
    let masuk = parseInt(row[3]?.replace(/\D/g, ""), 10) || 0;
    let keluar = parseInt(row[4]?.replace(/\D/g, ""), 10) || 0;
    let name = row[5]?.trim() || "Tanpa Nama";

    totalMasuk += masuk;
    totalKeluar += keluar;
    sumByName[name] = (sumByName[name] || 0) + keluar;

    // Alternatif warna tetap
    let bgColor = index % 2 === 0 ? "lightblue" : "lightgray";

    resultHtml += `
      <div class="result-card" style="background-color: ${bgColor};">
        <code>${row[0]}</code> • <code>${row[1]}</code> • ${row[2]} • ${row[3]} • ${row[4]} • ${name}
      </div>`;
  });

  const totalTersisa = totalMasuk - totalKeluar;
  const sumByNameText = Object.entries(sumByName)
    .filter(([_, total]) => total > 0)
    .map(([name, total]) => `<li>${name}: ${total} pcs</li>`)
    .join("");

  let summaryHtml = `
    <div class="summary">
      <p>🟢 Masuk: ${totalMasuk} pcs • 🔴 Keluar: ${totalKeluar} pcs • 🟡 Tersisa: ${totalTersisa} pcs</p>
    </div>`;

  return new Response(summaryHtml + resultHtml, {
    headers: { "Content-Type": "text/html" },
  });
}
