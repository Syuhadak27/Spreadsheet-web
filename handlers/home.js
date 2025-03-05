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
          input {
            padding: 10px; width: 90%; max-width: 400px;
            border: 1px solid #ccc; border-radius: 5px;
          }
          button {
            padding: 10px 15px; margin-top: 10px;
            border: none; background: #007bff; color: white;
            border-radius: 5px; cursor: pointer;
          }
          button:hover { background: #0056b3; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔍 Cari Data di Google Sheets</h1>
          <hr>
          <form action="/search" method="GET">
            <input type="text" name="query" placeholder="Masukkan kata kunci..." required>
            <br>
            <button type="submit">Cari</button>
          </form>
        </div>
      </body>
      </html>
    `, { headers: { "Content-Type": "text/html" } });
  }
  