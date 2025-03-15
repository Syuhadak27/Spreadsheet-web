import { getFromKV, saveToKV } from "./cache";
import { getCachedData } from "./sheets";

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

  let resultHtml = `
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        font-size: 12px; /* Ukuran teks kecil */
      }
      th, td {
        border: 1px solid blue; /* Garis biru */
        padding: 4px; /* Padding lebih kecil */
        text-align: left;
        word-wrap: break-word;
        white-space: nowrap;
      }
      th {
        background-color: #007bff;
        color: white;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      tr:nth-child(odd) {
        background-color: #e0f7fa;
      }
      td:hover {
        background-color: #ccc;
        cursor: pointer;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #121212;
          color: white;
        }
        table {
          background-color: #222;
          color: white;
        }
        th {
          background-color: #0056b3;
        }
        tr:nth-child(even) {
          background-color: #333;
        }
        tr:nth-child(odd) {
          background-color: #444;
        }
        td:hover {
          background-color: #555;
        }
      }
    </style>

    <div class="results">`;

  if (results.length === 0) {
    resultHtml += `<p class="no-result" style="color: red;">❌ Tidak ada hasil ditemukan.</p>`;
  } else {
    resultHtml += `<table class="search-table">
                     <thead>
                       <tr>
                         <th>Nama Barang</th>
                         <th>Kode Toko</th>
                         <th>Harga</th>
                       </tr>
                     </thead>
                     <tbody>`;

    results.forEach(row => {
      resultHtml += `
        <tr>
          <td onclick="copyToClipboard('${row[1]}')">${row[1]}</td>
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