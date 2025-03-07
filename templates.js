export function getResultsPage(title, query, resultHtml) {
  return `
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 50px;
        background: #f4f7f6;
        color: #333;
      }
      .search-container {
        display: flex;
        align-items: center; /* Pusatkan vertikal */
        gap: 5px; /* Beri jarak antar elemen */
      }
      .search-container input {
        flex: 1; /* Agar input memenuhi sisa ruang */
        padding: 10px;
      }
      .clear-btn {
        background: none; /* Hapus background */
        border: none; /* Hapus border */
        cursor: pointer;
        font-size: 16px;
      }
      .summary p {
         margin: 2px 0; 
         padding: 0; 
         font-size: 14px; 
      }
      .clear-btn {
         position: absolute;
         right: 10px;
         cursor: pointer;
         background: none;
         border: none;
         font-size: 15px;
         color: #888;
         outline: none;
         padding: 0;
      }
      .clear-btn:hover {
         color: red;
      }
      .container {
        width: 100%; 
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
      h1 {
        color: #007bff;
        font-size: 24px;
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
        width: auto;
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
      
      /* DARK MODE */
      @media (prefers-color-scheme: dark) {
        body {
          background: #121212;
          color: #e0e0e0;
        }
        .container {
          background: #1e1e1e;
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
        }
        h1 {
          color: #8ab4f8;
        }
        hr {
          background: #8ab4f8;
        }
        }
        a {
          color: #8ab4f8;
        }
        a:hover {
          text-decoration: underline;
        }
      }

      /* Tombol Cari */
      .btn-search {
        background: #007bff !important;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }
      .btn-search:hover {
        background: #0056b3 !important;
      }

      /* Tombol INOUT */
      .btn-inout {
        background: #ff9800 !important;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }
      .btn-inout:hover {
        background: #e68900 !important;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <a href="/">🔙 Kembali ke Pencarian</a>
      <h1>Hasil untuk ${query}</h1>
      <hr>
      ${resultHtml}
      <a href="/">🔙 Kembali ke Pencarian</a>
    </div>

    <script>
      function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
          showNotification("Teks berhasil disalin!");
        }).catch(err => {
          console.error("Gagal menyalin teks", err);
        });
      }
      

      function showNotification(message) {
        let notification = document.createElement("div");
        notification.innerText = message;
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.right = "20px";
        notification.style.background = "rgba(0, 0, 0, 0.8)";
        notification.style.color = "white";
        notification.style.padding = "10px 20px";
        notification.style.borderRadius = "5px";
        notification.style.fontSize = "14px";
        notification.style.zIndex = "1000";
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 2000);
      }
    </script>

  </body>
  </html>`;
}
