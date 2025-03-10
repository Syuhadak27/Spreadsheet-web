export function handleHome() {
    return new Response(`
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Database Spreadsheet</title>
        <style>
          /* ========== Global Styles ========== */
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: #f4f7f6;
            color: #333;
            margin: 0;
            padding-top: 150px;
          }

          h1 { color: #007bff; font-size: 18px; }
          hr { border: none; height: 2px; background: #007bff; margin: 10px 0; }

          /* ========== Header & Search Bar ========== */
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

          footer {
            font-size: 12px;
            margin-top: 10px;
            padding: 5px 0;
            text-align: center;
            color: #666;
          }

          input {
            padding: 10px;
            width: 90%;
            max-width: 400px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          /* ========== Result Container ========== */
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
            color: #000;
          }

          /* ========== Buttons ========== */
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

          /* ========== Toast Notification ========== */
          .toast {
            visibility: hidden;
            min-width: 200px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            text-align: center;
            border-radius: 5px;
            padding: 10px;
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s, visibility 0.3s;
          }

          .toast.show {
            visibility: visible;
            opacity: 1;
          }

          /* ========== Dark Mode Support ========== */
          @media (prefers-color-scheme: dark) {
            body { background: #121212; color: #ddd; }
            .fixed-header, .results-container { 
              background: #1e1e1e; 
              box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
              color: #fff;
            }
            h1, hr { color: #8ab4f8; background: #8ab4f8; }
            input { background: #2c2c2c; color: #fff; border: 1px solid #555; }
            input::placeholder { color: #bbb; }
            .result-card { background: #2c2c2c; color: #000; }
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
          <div id="searchResults" class="results">
            <marquee id="loadingText" behavior="scroll" direction="left">Dibuat dengan ❤️ oleh M. Alfi Syuhadak....</marquee>
          </div>
        </div>

        <footer>
          <p>&copy; 2025 - Dibuat dengan ❤️ oleh M. Alfi Syuhadak</p>
        </footer>

        <script>
          function clearSearch() {
            document.getElementById('queryInput').value = "";
            document.getElementById('searchResults').innerHTML = "<marquee>Dibuat dengan ❤️ oleh M. Alfi Syuhadak...</marquee>";
          }

          function searchData(page) {
            let query = document.getElementById('queryInput').value.trim();
            let resultsContainer = document.getElementById("searchResults");

            if (!query) {
              alert("Masukkan nama barang terlebih dahulu!");
              return;
            }

            resultsContainer.innerHTML = "<marquee>🔍 Mencari data..</marquee>";

            fetch(\`/\${page}?query=\${encodeURIComponent(query)}\`)
              .then(response => response.text())
              .then(resultHtml => {
                if (resultHtml.trim()) {
                  resultsContainer.innerHTML = resultHtml;
                } else {
                  resultsContainer.innerHTML = "<marquee>❌ Data tidak ditemukan.</marquee>";
                }
              })
              .catch(() => {
                resultsContainer.innerHTML = "<p class='no-result'>⚠️ Gagal mengambil data.</p>";
              });
          }

          document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            searchData('search');
          });
          function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Teks berhasil disalin!');
            }).catch(err => {
                console.error('Gagal menyalin:', err);
            });
          }

          function showToast(message) {
            let toast = document.createElement("div");
            toast.className = "toast";
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => toast.classList.add("show"), 100);
            setTimeout(() => {
              toast.classList.remove("show");
              setTimeout(() => toast.remove(), 500);
            }, 3000);
          }
          
        </script>
      </body>
      </html>
    `, { headers: { "Content-Type": "text/html" } });
}