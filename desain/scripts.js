
export const scripts = `
                  function insertToSearch(value) {
             document.getElementById("queryInput").value = value;
         }
         
         function updateClock() {
    const now = new Date();
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    

    let dayName = days[now.getDay()];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('digitalClock').innerText = dayName + "," + hours + ":" + minutes + ":" + seconds;
}

// Update jam setiap detik
setInterval(updateClock, 1000);

// Jalankan fungsi saat halaman dimuat
updateClock();


         function clearSearch() {
           var input = document.getElementById('queryInput');
           input.value = ""; 
           input.focus(); // Memastikan input tetap aktif setelah dihapus
           document.getElementById('searchResults').innerHTML = "";
           bingContainer.innerHTML = "";
           bingContainer.style.display = "none";
         }
  
          function searchData(page) {
            let query = document.getElementById('queryInput').value.trim();
            let resultsContainer = document.getElementById("searchResults");
  
            if (!query) {
              showToast("Masukkan nama barang terlebih dahulu!");
              return;
            }
            if (query.length < 3) {
              document.getElementById('searchResults').innerHTML = ""; // Hapus hasil pencarian
              bingContainer.innerHTML = "";
              bingContainer.style.display = "none";
                 return;
            }
              
  
            resultsContainer.innerHTML = "<i>🔍 Mencari data...</i";
  
            fetch(\`/\${page}?query=\${encodeURIComponent(query)}\`)
              .then(response => response.text())
              .then(resultHtml => {
                resultsContainer.innerHTML = resultHtml.trim() ? resultHtml : "<marquee>❌ Data tidak ditemukan.</marquee>";
              })
              .catch(() => {
                resultsContainer.innerHTML = "<p class='no-result'>⚠️ Gagal mengambil data.</p>";
              });
          }
  
          document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            searchData('search');
          });

         function debounce(func, delay) {
            let timer;
            return function () {
               clearTimeout(timer);
               timer = setTimeout(() => func.apply(this, arguments), delay);
            };
          }


function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Teks berhasil disalin!');
  }).catch(err => {
     console.error('Gagal menyalin:', err);
     showToast('Gagal menyalin teks');
    });
}

        function showToast(message) {
          let toast = document.createElement("toast");
          toast.className = "toast";
          toast.textContent = message;
          document.body.appendChild(toast);

          setTimeout(() => toast.classList.add("show"), 100);
          setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 500);
          }, 3000);
        }
        
        function showCustomAlert(message) {
          let alertBox = document.getElementById("customAlert");
          let alertText = document.getElementById("alertText");

          alertText.textContent = message;
          alertBox.style.display = "block";
          setTimeout(() => {
            alertBox.style.opacity = "1";
          }, 10);

          // Hilangkan alert setelah 3 detik
          setTimeout(() => {
            alertBox.style.opacity = "0";
            setTimeout(() => {
              alertBox.style.display = "none";
            }, 500);
          }, 3000);
        }

        // Focus input on page load
        window.onload = function() {
          setTimeout(() => {
            document.getElementById('queryInput').focus();
          }, 500);
        };
  
function exportToImage() {
    let element = document.getElementById('resultsContainer');
    let bingContainer = document.getElementById('bingContainer');

    // Simpan style asli
    let originalStyle = element.style.overflow;
    let originalDisplay = bingContainer.style.display;

    // Pastikan Bing Container terlihat sebelum screenshot
    bingContainer.style.display = "block";
    element.style.overflow = "visible";  
    element.style.width = "auto";  

    html2canvas(element, {
        scale: 2,
        backgroundColor: null
    }).then(canvas => {
        let now = new Date();
        let timestamp = now.getDate().toString().padStart(2, '0') + 
                        (now.getMonth() + 1).toString().padStart(2, '0') + 
                        now.getFullYear() + "_" + 
                        now.getHours().toString().padStart(2, '0') + 
                        now.getMinutes().toString().padStart(2, '0') + 
                        now.getSeconds().toString().padStart(2, '0');

        let fileName = "syd_" + timestamp + ".png";

        let link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = fileName;
        link.click();

        // Kembalikan tampilan awal
        element.style.overflow = originalStyle;
        bingContainer.style.display = originalDisplay;
    }).catch(error => {
        console.error("Gagal mengexport gambar:", error);
        alert("Gagal menyimpan gambar!");
    });
}


function updateTimestamp() {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    let now = new Date();

    let dayName = days[now.getDay()];
    let day = now.getDate().toString().padStart(2, '0');
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let year = now.getFullYear();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    
    let formattedDate = dayName + ", " + day + "-" + month + "-" + year + " (" + hours + ":" + minutes + ":" + seconds + ")";
    
    document.getElementById("timestamp").textContent = formattedDate;
}

// Perbarui setiap detik
setInterval(updateTimestamp, 1000);

// Jalankan saat halaman dimuat
updateTimestamp();

function resetData() {
  const resultContainer = document.getElementById("searchResults");
  resultContainer.innerHTML = "<p><i>⏳ Data sedang di-reset...</i></p>";

  fetch('/reset', { method: 'POST' })
    .then(response => response.text())
    .then(message => {
      resultContainer.innerHTML = "";
      showToast("✅ Data berhasil direset");

      // Ambil timestamp terbaru dari server
      fetchLastUpdate();
    })
    .catch(() => {
      resultContainer.innerHTML = "";
      showToast("⚠️ Gagal mereset data!");
    });
}

    
function fetchLastUpdate() {
  fetch('/last-update')
    .then(response => response.text())
    .then(timestamp => {
      if (timestamp && timestamp !== "-") {
        let now = new Date(timestamp);

        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        let dayName = days[now.getDay()];
        let day = now.getDate().toString().padStart(2, '0');
        let month = (now.getMonth() + 1).toString().padStart(2, '0');
        let year = now.getFullYear();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');

        let formattedDate = "🔄 Data diperbarui " + day + "-" + month + "-" + year + " (" + hours + ":" + minutes + ":" + seconds + ")";

        document.getElementById("lastUpdated").textContent = formattedDate;
      }
    })
    .catch(() => {
      document.getElementById("lastUpdated").textContent = "⚠️ Gagal mengambil data update!";
    });
}

// Panggil saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchLastUpdate);



function hapusGambar() {
  bingContainer.innerHTML = "";
  bingContainer.style.display = "none";
}



function setActiveTab(element) {
  // Hapus class active dari semua tombol
  document.querySelectorAll('button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Tambahkan class active ke tombol yang diklik
  element.classList.add('active');
}

// Modifikasi event listener untuk button
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function() {
    setActiveTab(this);
  });
});

          function searchBingImage() {
            const query = document.getElementById("queryInput").value.trim();
            const bingContainer = document.getElementById("bingContainer");
  
            // Jika query kosong, bersihkan dan sembunyikan container
            if (!query) {
              bingContainer.innerHTML = "";
              bingContainer.style.display = "none";
              showToast("Masukkan kata kunci terlebih dahulu!");
              return;
            }
  
            // Tampilkan container dan indikator loading
            bingContainer.style.display = "block";
            bingContainer.innerHTML = \`
              <div class="bing-title">
                <img src="https://www.bing.com/favicon.ico" alt="Bing" />
                Hasil Pencarian Gambar Bing: "\${query}"
                <button id="toggleBingBtn" class="toggle-btn" onclick="toggleBingResults()">Sembunyikan</button>
              </div>
              <div class="bing-loading">
                <div class="spinner"></div>
                <span>Memuat hasil pencarian...</span>
              </div>
            \`;
  
            // Scroll ke container
            bingContainer.scrollIntoView({ behavior: 'smooth' });
  
            // Persiapkan URL Bing
            const bingUrl = \`https://www.bing.com/images/search?q=\${encodeURIComponent(query)}\`;
  
            // Buat iframe setelah jeda singkat
            setTimeout(() => {
              bingContainer.innerHTML = \`
                <div class="bing-title">
                  <img src="https://www.bing.com/favicon.ico" alt="Bing" />
                  
                </div>
                <iframe src="\${bingUrl}" class="bing-frame" id="bingFrame"></iframe>
              \`;
            }, 500);
          }

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
   document.getElementById("currentDomain").textContent = window.location.hostname;  
   


// Jalankan saat halaman dimuat
window.onload = updateTimestamp;

`;