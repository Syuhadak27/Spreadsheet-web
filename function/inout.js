import { getFromKV_inout, saveToKV_inout } from "./cache";
import { getCachedData_inout } from "./sheets";
import { styles } from "./func_style";

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
    return new Response("<p style='color: red;'>❌ Tidak ada hasil ditemukan.</p>", {
      headers: { "Content-Type": "text/html" },
    });
  }

  let totalMasuk = 0;
  let totalKeluar = 0;
  let sumByName = {};

  results.forEach(row => {
    let masuk = parseInt(row[3]?.replace(/\D/g, ""), 10) || 0;
    let keluar = parseInt(row[4]?.replace(/\D/g, ""), 10) || 0;
    let name = row[5]?.trim() || "Tanpa Nama";

    totalMasuk += masuk;
    totalKeluar += keluar;
    sumByName[name] = (sumByName[name] || 0) + keluar;
  });

  const totalTersisa = totalMasuk - totalKeluar;

  let tableHtml = `<style>${styles}</style>

    <div class="summary">
      <p>🟢 Masuk: ${totalMasuk} pcs • 🔴 Keluar: ${totalKeluar} pcs • 🟡 Tersisa: ${totalTersisa} pcs</p>
    </div>

    <table>
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Nama Barang</th>
          <th>Sales</th>
          <th>In</th>
          <th>Out</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
  `;

  results.forEach(row => {
    tableHtml += `
      <tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        <td>${row[5]}</td>
      </tr>
    `;
  });

  tableHtml += `</tbody></table>`;

  return new Response(tableHtml, {
    headers: { "Content-Type": "text/html" },
  });
}