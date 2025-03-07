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
            padding: 50px;
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
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 10px;
            color: gray;
          }

          h1 { 
            color: #007bff; 
            font-size: 18px; 
          }
          
          .header p {
            font-size: 10px; /* Ubah sesuai kebutuhan */
            font-weight: normal; /* Bisa diubah ke bold jika perlu */
          }
          
          hr { border: none; height: 2px; background: #007bff; margin: 20px 0; }
          
          .search-container {
            display: flex;
            align-items: center;
            width: 100%;
            gap: 5px;
          }
          
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

          /* Warna tombol */
          .btn-clear { background: pink; color: white; }
          .btn-clear:hover { background: darkred; }

          .btn-search { background: green; color: white; }
          .btn-search:hover { background: darkgreen; }

          .btn-inout {
            background: linear-gradient(45deg, yellow, orange);
            color: black;
          }
          .btn-inout:hover {
            background: linear-gradient(45deg, orange, darkorange);
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
            h1 { color: #8ab4f8; }
            hr { background: #8ab4f8; }
            input {
              background: #2c2c2c;
              color: #e0e0e0;
              border: 1px solid #555;
            }
            .btn-clear { background: darkred; }
            .btn-search { background: darkgreen; }
            .btn-inout {
              background: linear-gradient(45deg, darkgoldenrod, darkorange);
            }
          }
        </style>
      </head>
      <body>
        <header class="header">
          <h1>🔍 Gudang DataBase</h1>
          <p>✔️ ◄⏤‌‌ꭙ‌‌³‌👿꯭‌⃪📡 𝐓ᴇʀʜᴜʙᴜɴɢ 𝐋ᴀɴɢsᴜɴɢ 𝐊ᴇ 𝐆ᴏᴏɢʟᴇ 𝐒ʜᴇᴇᴛs, 𝐓ᴀɴᴘᴀ 𝐑ɪʙᴇᴛ!꯭‌˲‌☠️꯭᪳𓆪‌⃯</p>
        </header>

        <div class="container">
          <h1> ◄⏤𝐂ᴀʀɪ 𝐃ᴀᴛᴀ 𝐃ɪ 𝐆ᴏᴏɢʟᴇ 𝐒ʜᴇᴇᴛs🐇</h1>
          <hr>
          
          <!-- Form Pencarian -->
          <form id="searchForm" action="/search" method="GET">
            <div class="search-container">
              <input type="text" id="queryInput" name="query" placeholder="●──𝐌ᴀsᴜᴋᴋᴀɴ 𝐍ᴀᴍᴀ 𝐁ᴀʀᴀɴɢ...ツ ™" required>
            </div>

            <div class="btn-container">
              <button type="button" class="btn-clear" onclick="clearSearch()">Clear</button>
              <button type="submit" class="btn-search">Cari</button>
              <button type="button" class="btn-inout" onclick="redirectTo('inout')">Inout</button>
              <button type="button" class="btn-search" onclick="redirectTo('list')">List</button>
            </div>
          </form>
          <footer class="footer">
            <p>&copy; 2025 - Dibuat dengan ❤️ oleh M. Alfi Syuhadak</p>
          </footer>
        </div>

        <script>
          function clearSearch() {
            document.getElementById('queryInput').value = "";
          }

          function redirectTo(page) {
            let query = document.getElementById('queryInput').value.trim();
            if (query !== "") {
              window.location.href = \`/\${page}?query=\${encodeURIComponent(query)}\`;
            } else {
              alert("Masukkan nama barang terlebih dahulu!");
            }
          }
 
          async function pasteText() {
            try {
              const text = await navigator.clipboard.readText();
              document.getElementById('queryInput').value = text;
            } catch (err) {
              alert('Gagal mengambil teks dari clipboard!');
            }
          }
        </script>
      </body>
      </html>
    `, { headers: { "Content-Type": "text/html" } });
}