export function handleHome() {
    return new Response(`
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Database Spreadsheet</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 30px;
            background: #f4f7f6;
            color: #333;
          }

          .container {
            max-width: 500px;
            margin: auto;
            padding: 20px;
            background: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            border: 2px solid #007bff;
          }

          h1 { color: #007bff; font-size: 18px; }
          hr { border: none; height: 2px; background: #007bff; margin: 20px 0; }

          input {
            flex: 1;
            padding: 10px;
            width: 90%;
            max-width: 400px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .btn-container {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-top: 10px;
          }

          button {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
          }

          .btn-clear { background: pink; color: white; }
          .btn-clear:hover { background: darkred; }
          .btn-search { background: green; color: white; }
          .btn-search:hover { background: darkgreen; }
          .btn-inout { background: linear-gradient(45deg, yellow, orange); color: black; }
          .btn-inout:hover { background: linear-gradient(45deg, orange, darkorange); }

          .results { 
            margin-top: 20px;
            text-align: left;
          }

          .result-card {
            background: #E3F2FD;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 5px;
            box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
            cursor: pointer;
          }

          .result-card:nth-child(odd) { 
            background: #ffffcc; 
          }

          #toast {
            visibility: hidden;
            min-width: 200px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            text-align: center;
            border-radius: 5px;
            padding: 10px;
            position: fixed;
            left: 50%;
            bottom: 30px;
            transform: translateX(-50%);
            z-index: 1000;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }

          #toast.show {
            visibility: visible;
            opacity: 1;
          }

          footer {
            font-size: 12px;
            margin-top: 10px;
            padding: 5px 0;
            text-align: center;
            color: #666;
          }

          @media (prefers-color-scheme: dark) {
            body { background: #121212; color: #e0e0e0; }
            .container { background: #1e1e1e; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1); }
            h1, hr { color: #8ab4f8; background: #8ab4f8; }
            input { background: #2c2c2c; color: #e0e0e0; border: 1px solid #555; }
            .btn-clear { background: darkred; }
            .btn-search { background: darkgreen; }
            .btn-inout { background: linear-gradient(45deg, darkgoldenrod, darkorange); }
          }
        </style>
      </head>
      <body>
        <header>
          <h1>🔍 Gudang DataBase</h1>
          <p>✔️ Terhubung langsung ke Google Sheets!</p>
        </header>

        <div class="container">
          <h1>🔎 Cari Data di Google Sheets</h1>
          <hr>
          
          <form id="searchForm">
            <div class="search-container">
              <input type="text" id="queryInput" placeholder="Masukkan Nama Barang..." required>
            </div>

            <div class="btn-container">
              <button type="button" class="btn-clear" onclick="clearSearch()">Clear</button>
              <button type="submit" class="btn-search">Cari</button>
              <button type="button" class="btn-inout" onclick="searchData('inout')">Inout</button>
              <button type="button" class="btn-search" onclick="searchData('list')">List</button>
            </div>
          </form>

          <div id="searchResults" class="results"></div>

          <footer>
            <p>&copy; 2025 - Dibuat dengan ❤️ oleh M. Alfi Syuhadak</p>
          </footer>
        </div>

        <div id="toast"></div>

        <script>
          function clearSearch() {
            document.getElementById('queryInput').value = "";
            document.getElementById('searchResults').innerHTML = "";
          }

          function searchData(page) {
            let query = document.getElementById('queryInput').value.trim();
            if (!query) {
              alert("Masukkan nama barang terlebih dahulu!");
              return;
            }

            fetch(\`/\${page}?query=\${encodeURIComponent(query)}\`)
              .then(response => response.text())
              .then(resultHtml => {
                document.getElementById("searchResults").innerHTML = resultHtml;
              })
              .catch(() => {
                document.getElementById("searchResults").innerHTML = "<p class='no-result'>⚠️ Gagal mengambil data.</p>";
              });
          }

          document.getElementById('searchForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            searchData('search');
          });

          function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
              showToast(\`✔️ Disalin: \${text}\`);
            }).catch(err => {
              console.error('Gagal menyalin:', err);
            });
          }

          function showToast(message) {
            let toast = document.getElementById("toast");
            toast.textContent = message;
            toast.classList.add("show");

            setTimeout(() => {
              toast.classList.remove("show");
            }, 2000);
          }
        </script>
      </body>
      </html>
    `, { headers: { "Content-Type": "text/html" } });
}