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
        align-items: center;
        gap: 5px;
      }
      .search-container input {
        flex: 1;
        padding: 10px;
      }
      .clear-btn {
        background: none;
        border: none;
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
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        border: 2px solid #007bff;
      }
      h1 {

        color: gray;
        font-size: 18px;
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
        margin: 5px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: auto;
        border: 2px solid #007bff;
      } 
      {
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
        .result-card {
          background: #2A2A2A; /* Warna lebih gelap */
          color: #000000; /* Warna teks agar kontras */
          box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
        }
        .result-card strong {
  color: #000000; /* Warna default (hitam) di mode terang */
}

/* Mode gelap */
@media (prefers-color-scheme: dark) {
  .result-card strong {
    color: #FFD700; /* Warna kuning emas di mode gelap */
  }
}
        h1 {
          color: #8ab4f8;
        }
        hr {
          background: #8ab4f8;
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
      
      .footer {
         margin-top: 20px;
         text-align: center;
         font-size: 12px;
         color: gray;
      }

    </style>
  </head>
  <body>
    <div class="container">
      <a href="/">🔙 Kembali ke Pencarian</a>
      <h1>Hasil untuk ${query}</h1>
      <hr>
      <!-- <small style="display: block; margin-top: -5px;">by M. Alfi Syuhadak</small> -->
      ${resultHtml}
      <a href="/">🔙 Kembali ke Pencarian</a>
      
      <footer class="footer">
        <p>&copy; 2025 - Dibuat dengan ❤️ oleh M. Alfi Syuhadak</p>
      </footer>
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