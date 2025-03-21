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
        <style>
          ${styles}
        </style>
      </head>
      <body>
        <div id="header" class="fixed-header">
          <!-- Banner teks berjalan -->
          <div class="banner">
            <div id="digitalClock" class="clock-container"></div>
            <marquee id="marqueeText" behavior="scroll" direction="left">
              ✔️ Terhubung langsung ke Google Sheets! ⚡ Cepat & responsif dalam pencarian data!
              📊 Data selalu up-to-date! 🔄 Sinkronisasi otomatis dengan Google Sheets! 🚀 Performa tinggi, hemat waktu!
               
            </marquee>
          </div>
  
          <!-- Form pencarian -->
          <form id="searchForm">
            <div class="search-container">
              <input type="text" id="queryInput" placeholder="Masukkan Nama Barang..." required>
              
            </div>
            <div class="btn-container">
              <button type="button" class="btn-clear" onclick="clearSearch(); setActiveTab(this)">🧹 Clear</button>
              <button type="submit" class="btn-search" onclick="setActiveTab(this)">🔍 Cari</button>
              <button type="button" class="btn-inout" onclick="searchData('inout'); setActiveTab(this)">📥 Inout</button>
              <button type="button" class="btn-search" onclick="searchData('list'); setActiveTab(this)">📋 List</button>
              <button type="button" class="btn-search" onclick="searchData('stok'); setActiveTab(this)">📦 Stok</button>
              <button type="button" class="btn-export" onclick="exportToImage(); setActiveTab(this)">💾 Save</button>
              <button type="button" class="btn-inout" onclick="searchBingImage(); setActiveTab(this)">🖼️ Image</button>
              <button type="button" class="btn-clear" onclick="resetData(); setActiveTab(this)">🔄 Reset</button>
              
             
            </div>

          </form>
        </div>
  
        <div id="resultsContainer" class="results-container">
          <time>
            <p id="timestamp"></p>            
          </time>
         
          <div id="searchResults"></div>
  
          <!-- Container untuk hasil pencarian Bing -->
          <button type="button" class="btn-clear" onclick="hapusGambar(); setActiveTab(this)">Close Img</button><button type="button" class="btn-download" onclick="window.location.href='https://ouo.io/yi0jaiJ'; setActiveTab(this)">Download</button><button type="button" class="btn-download" onclick="logoutUser()">Logout</button>


          <div id="bingContainer" class="bing-container" style="display: none;"> 
          </div>
  
          <footer>
            <p>&copy; 2025 - Dibuat oleh 🤖Ai.Syd.Gle.inc</p>
            <p id="lastUpdated">🔄 Terakhir diperbarui: -</p>
            
          </footer>
        </div>
        <footer>
          
          <p><i>&copy; 2025 - Dibuat dengan ❤️ oleh M. Alfi Syuhadak</i></p>          
           <p>🌐<span id="currentDomain"></span></p>
         
        </footer>
  
        <script>
          ${scripts}
          document.getElementById("currentDomain").textContent = window.location.hostname;  
          
          // Fungsi logout user
function logoutUser() {
  const userToLogout = getCookieValue("loggedInUser"); // Ambil user dari cookie

  if (!userToLogout) {
    alert("Anda belum login!");
    return;
  }

  fetch("/logout-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: userToLogout }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.cookie = "loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert("Logout berhasil!");
        window.location.href = "/"; // Redirect ke halaman utama
      } else {
        alert("Gagal logout: " + data.message);
      }
    })
    .catch(error => console.error("Error saat logout:", error));
}

// Fungsi mendapatkan cookie
function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) return value;
  }
  return null;
}
        </script>
      </body>
      </html>
    `;
  }