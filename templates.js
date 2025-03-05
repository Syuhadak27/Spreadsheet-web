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
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 50px;
        background: #f4f7f6;
        color: #333;
      }
      .container {
        max-width: 600px; margin: auto; padding: 20px;
        background: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
      h1 { color: #007bff; font-size: 24px; }
      hr { border: none; height: 2px; background: #007bff; margin: 20px 0; }
      .results { text-align: left; }
      .result-card {
        background: #e9f5ff; padding: 10px;
        border-radius: 5px; margin: 30px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: auto;
      }
      a {
        display: block; margin-top: 20px;
        text-decoration: none; color: #007bff; font-weight: bold;
      }
      a:hover { text-decoration: underline; }
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
        h1 { color: #8ab4f8; }
        hr { background: #8ab4f8; }
        .result-card {
          background: #333;
          color: white;
        }
        a { color: #8ab4f8; }
        a:hover { text-decoration: underline; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="/">🔙 Kembali ke Pencarian</a>
      <h1>Hasil untuk "${query}"</h1>
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
