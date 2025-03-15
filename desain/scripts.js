export const scripts = `
         function clearSearch() {
            document.getElementById('queryInput').value = "";
            document.getElementById('searchResults').innerHTML = "";
          }
  
          function searchData(page) {
            let query = document.getElementById('queryInput').value.trim();
            let resultsContainer = document.getElementById("searchResults");
  
            if (!query) {
              showToast("Masukkan nama barang terlebih dahulu!");
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

         document.getElementById("queryInput").addEventListener("input", debounce(() => {
             let query = document.getElementById("queryInput").value.trim();

             if (query.length < 3) {
                 document.getElementById('searchResults').innerHTML = ""; // Hapus hasil pencarian
                 return;
              }


             if (query.length >= 3) {  // Jalankan hanya jika input ≥ 3 karakter
                 searchData("search");
              }
          }, 300)); // Delay 300ms lebih optimal



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
              return canvas.toDataURL("image/png");

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

    
    let formattedDate = dayName + ", " + day + "-" + month + "-" + year + "(" + hours + ":" + minutes + ":" + seconds + ")";

    document.getElementById("timestamp").textContent = formattedDate;
}

// Perbarui setiap detik
setInterval(updateTimestamp, 1000);

// Jalankan saat halaman dimuat
updateTimestamp();

function resetData() {
  fetch('/reset', { method: 'POST' })
    .then(response => response.text())
    .then(message => {
      // Hanya tampilkan pesan sukses, abaikan detail dari server
      showToast("✅ Data berhasil direset");
    })
    .catch(() => showToast("⚠️ Gagal mereset data!"));
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

// Jalankan saat halaman dimuat
window.onload = updateTimestamp;

`;