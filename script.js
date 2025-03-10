function clearSearch() {
  document.getElementById('queryInput').value = "";
  document.getElementById('searchResults').innerHTML = "";
}

function redirectTo(page) {
  let query = document.getElementById('queryInput').value.trim();
  if (query !== "") {
    window.location.href = `/${page}?query=${encodeURIComponent(query)}`;
  } else {
    alert("Masukkan nama barang terlebih dahulu!");
  }
}

document.getElementById('searchForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const query = document.getElementById('queryInput').value.trim();
  if (!query) return;

  const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
  const resultHtml = await response.text();
  document.getElementById('searchResults').innerHTML = resultHtml;
});