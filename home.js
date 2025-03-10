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
            background: #f4f7f6;
            color: #333;
            margin: 0;
            padding-top: 150px;
          }

          .fixed-header {
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 500px;
            background: white;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            padding: 15px;
            z-index: 1000;
            border: 2px solid #007bff;
          }

          .results-container {
            margin-top: 75px;
            width: 90%;
            max-width: 400px;
            background: #e3f2fd;
            border-radius: 10px;
            border: 2px solid #007bff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            padding: 15px;
            max-height: auto;
            overflow-y: auto;
            margin-left: auto;
            margin-right: auto;
          }
          
          .result-card {
            background: #E3F2FD;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 5px;
            box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
            cursor: pointer;
            color: #000; /* Warna teks hasil pencarian menjadi hitam */
          }

          h1 { color: #007bff; font-size: 18px; }
          hr { border: none; height: 2px; background: #007bff; margin: 10px 0; }

          input {
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

          footer {
            font-size: 12px;
            margin-top: 10px;
            padding: 5px 0;
            text-align: center;
            color: #666;
          }

          /* Mode Gelap */
          @media (prefers-color-scheme: dark) {
            body { 
              background: #121212; 
              color: #ddd;
            } 
            .fixed-header, .results-container { 
              background: #1e1e1e; 
              box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
              color: #fff;
            }
            h1, hr { color: #8ab4f8; background: #8ab4f8; }
            input { 
              background: #2c2c2c; 
              color: #fff;
              border: 1px solid #555; 
            }
            input::placeholder {
              color: #bbb;
            }
            .result-card { 
              background: #2c2c2c; 
              color: #000; /* Warna teks hasil pencarian tetap hitam di mode gelap */
            }
            .btn-clear { background: darkred; }
            .btn-search { background: darkgreen; }
            .btn-inout { background: linear-gradient(45deg, darkgoldenrod, darkorange); }
          }
        </style>
      </head>
      <body>
        <div class="fixed-header">
          <p>🔍 Gudang DataBase</p>
          <p>✔️ Terhubung langsung ke Google Sheets!</p>
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
        </div>

        <div class="results-container">
          <div id="searchResults" class="results"></div>
        </div>

        <footer>
          <p>&copy; 2025 - Dibuat dengan ❤️ oleh M. Alfi Syuhadak</p>
        </footer>

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
        </script>
      </body>
      </html>
    `, { headers: { "Content-Type": "text/html" } });
}