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
          }
          h1 { color: #007bff; }
          hr { border: none; height: 2px; background: #007bff; margin: 20px 0; }
          
          .search-container {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
          }
          
          input {
            flex: 1;
            padding: 10px;
            width: 90%;
            max-width: 400px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          
          .clear-btn {
            position: absolute;
            right: 10px;
            cursor: pointer;
            background: none;
            border: none;
            font-size: 18px;
            color: #888;
          }
          
          .clear-btn:hover {
            color: red;
          }

          button {
            padding: 10px 15px;
            margin-top: 10px;
            border: none;
            background: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
          }
          
          button:hover { background: #0056b3; }

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
            button {
              background: #8ab4f8;
              color: black;
            }
            button:hover { background: #5a94e5; }
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
            <button type="button" class="btn-search" onclick="clearSearch()">❌</button>
            <button type="submit" class="btn-search">Cari</button>
          </form>

          <!-- Form INOUT -->
          <form id="inoutForm" action="/inout" method="GET">
            <input type="hidden" id="queryInout" name="query">
            <button type="submit" class="btn-inout" onclick="copyQuery()">Inout</button>
          </form>
        </div>

        <script>
          function copyQuery() {
            // Salin nilai dari input pencarian ke form INOUT
            document.getElementById('queryInout').value = document.getElementById('queryInput').value;
          }

          function clearSearch() {
            document.getElementById('queryInput').value = "";
          }
          
        async function pasteText() {
          try {
             const text = await navigator.clipboard.readText();
            document.getElementById('query').value = text;
          } catch (err) {
            alert('Gagal mengambil teks dari clipboard!');
          }
        }
        </script>
      </body>

      </html>
    `, { headers: { "Content-Type": "text/html" } });
}