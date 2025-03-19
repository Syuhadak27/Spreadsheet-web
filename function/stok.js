import { getFromKV_stok, saveToKV_stok } from "./cache";
import {  getCachedData_stok } from "./sheets";
import { styles } from "./func_style";

export async function handleSearch_stok(request, env) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) return new Response("Masukkan query!", { status: 400 });

  let data = await getFromKV_stok(env);
  if (!data) {
    data = await getCachedData_stok(env);
    await saveToKV_stok(data, env);
  }

  const keywords = query.toLowerCase().split(" ");
  const results = data.filter(row =>
    keywords.every(keyword => row.some(cell => String(cell).toLowerCase().includes(keyword)))
  );

  let resultHtml = `<style>${styles}</style>

    <div class="results">`;

  if (results.length === 0) {
    resultHtml += `<p class="no-result" style="color: red;">❌ Tidak ada hasil ditemukan.</p>`;
  } else {
    resultHtml += `<table class="search-table">
                     <thead>
                       <tr>
                         <th>Nama Barang</th>
                         <th>Sales</th>
                         <th>Stok</th>
                         <th>Kode</th>
                         <th>Harga</th>
                       </tr>
                     </thead>
                     <tbody>`;

    results.forEach(row => {
      resultHtml += `
        <tr>
          <td onclick="copyToClipboard('${row[1]}')"><b>${row[1]}</b></td>
          <td>${row[0]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
          <td>${row[4]}</td>
        </tr>`;
    });

    resultHtml += `</tbody></table>`;
  }
  resultHtml += "</div>";

  return new Response(resultHtml, {
    headers: { "Content-Type": "text/html" },
  });
}