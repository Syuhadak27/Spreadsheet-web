export function homeTemplate(styles, scripts) {
    return `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Database Spreadsheet</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        <style>${styles}</style>
      </head>
      <body>
        <div id="header" class="fixed-header">
          <p><marquee id="marqueeText" behavior="scroll" direction="left">✔️ Terhubung langsung ke Google Sheets!,
           ⚡ Cepat & responsif dalam pencarian data!
           📊 Data selalu up-to-date!
           🔄 Sinkronisasi otomatis dengan Google Sheets!
           🚀 Performa tinggi, hemat waktu!</marquee></p>
          
          <form id="searchForm">
            <div class="search-container">
              <input type="text" id="queryInput" placeholder="Masukkan Nama Barang..." required>
            </div>
            <div class="btn-container">
               <button type="button" class="btn-clear" onclick="clearSearch(); setActiveTab(this)">Clear</button>
               <button type="submit" class="btn-search" onclick="setActiveTab(this)">Cari</button>
               <button type="button" class="btn-inout" onclick="searchData('inout'); setActiveTab(this)">Inout</button>
               <button type="button" class="btn-search" onclick="searchData('list'); setActiveTab(this)">List</button>
               <button type="button" class="btn-export" onclick="exportToImage(); setActiveTab(this)">Image</button>
               <button type="button" class="btn-clear" onclick="resetData(); setActiveTab(this)">Reset</button>
            </div>
          </form>
        </div>
  
        <div id="resultsContainer" class="results-container">
          <time>
            <p id="timestamp"></p>
          </time>
          <div id="searchResults"></div>
           <footer>
              <p>&copy; 2025 - Dibuat oleh 🤖Ai.Syd.Gle.inc dengan ❤️</p>
            </footer>
        </div>
  
        <footer>
          <p>&copy; 2025 - Dibuat dengan ❤️ oleh M. Alfi Syuhadak</p>
        </footer>
  
        <script>${scripts}</script>
      </body>
      </html>
    `;
  }