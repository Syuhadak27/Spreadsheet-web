// **🔹 Fungsi mendapatkan nilai cookie**
export function getCookieValue(cookie, key) {
  const match = cookie.match(new RegExp(`${key}=([^;]+)`));
  return match ? match[1] : null;
}

// **🔹 Halaman login user**
export function loginPage() {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Login</title>
      <style>
        body { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
          background: linear-gradient(135deg, #667eea, #764ba2); 
          font-family: Arial, sans-serif;
        }
        .login-box { 
          background: white; 
          padding: 20px; 
          border-radius: 10px; 
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); 
          text-align: center;
        }
        input, button { 
          display: block; 
          width: 100%; 
          margin: 10px 0; 
          padding: 10px; 
          border: none; 
          border-radius: 5px;
        }
        button { 
          background: #4CAF50; 
          color: white; 
          cursor: pointer; 
          transition: 0.3s;
        }
        button:hover { background: #45a049; }
        #popup { 
          display: none; 
          position: fixed; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          background: rgba(0, 0, 0, 0.8); 
          color: white; 
          padding: 15px; 
          border-radius: 10px; 
          text-align: center;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        #popup.show { opacity: 1; display: block; }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h2>Masukkan Nama Anda</h2>
        <input type="text" id="usernameInput" placeholder="masukkan namamu dg huruf kecil..">
        <button onclick="checkLogin()">Login</button>

        <h3>Login Admin</h3>
        <input type="text" id="adminUsername" placeholder="Admin Username">
        <input type="password" id="adminPassword" placeholder="Password">
        <button onclick="checkAdminLogin()">Login Admin</button>
      </div>

      <div id="popup"></div>

      <script>
        function showPopup(message) {
          const popup = document.getElementById("popup");
          popup.textContent = message;
          popup.classList.add("show");

          setTimeout(() => {
            popup.classList.remove("show");
          }, 3000);
        }

        function checkLogin() {
          const username = document.getElementById("usernameInput").value.trim();
          fetch("/login-user?user=" + encodeURIComponent(username))
            .then(response => {
              if (response.ok) {
                window.location.href = "/";
              } else {
                showPopup("Akses Ditolak!");
              }
            });
        }

        function checkAdminLogin() {
          const username = document.getElementById("adminUsername").value.trim();
          const password = document.getElementById("adminPassword").value.trim();
          fetch(\`/login-admin?username=\${encodeURIComponent(username)}&password=\${encodeURIComponent(password)}\`)
            .then(response => {
              if (response.ok) {
                window.location.href = "/admin-dashboard";
              } else {
                showPopup("Login admin gagal!");
              }
            });
        }
      </script>
    </body>
    </html>
  `;
}

// **🔹 Halaman dashboard admin**
export function adminDashboard(users) {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Admin Dashboard</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          background: linear-gradient(135deg, #2193b0, #6dd5ed); 
          text-align: center; 
          padding: 20px; 
        }
        table { 
          width: 50%; 
          margin: auto; 
          border-collapse: collapse; 
          background: white; 
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        th, td { 
          padding: 10px; 
          border: 1px solid #ddd; 
        }
        th { background: #007bff; color: white; }
        button { 
          background: #f44336; 
          color: white; 
          border: none; 
          padding: 5px 10px; 
          cursor: pointer; 
          border-radius: 5px;
          transition: 0.3s;
        }
        button:hover { background: #d32f2f; }
        #popup { 
          display: none; 
          position: fixed; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          background: rgba(0, 0, 0, 0.8); 
          color: white; 
          padding: 15px; 
          border-radius: 10px; 
          text-align: center;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        #popup.show { opacity: 1; display: block; }
      </style>
    </head>
    <body>
      <h2>Admin Dashboard</h2>
      <table>
        <tr><th>User</th><th>Aksi</th></tr>
        ${users.map(user => `<tr id="user-${user}"><td>${user}</td><td><button onclick="logoutUser('${user}')">Logout</button></td></tr>`).join("")}
      </table>
      <button onclick="window.location.href='/logout-admin'" style="background: #007bff; padding: 10px;">Logout Admin</button>

      <div id="popup"></div>

      <script>
        function showPopup(message) {
          const popup = document.getElementById("popup");
          popup.textContent = message;
          popup.classList.add("show");

          setTimeout(() => {
            popup.classList.remove("show");
          }, 3000);
        }

        async function logoutUser(user) {
          const response = await fetch(\`/logout-user?user=\${user}\`);
          const data = await response.json();

          if (data.success) {
            showPopup(data.message);
            document.getElementById("user-" + data.user).remove();
          }
        }
      </script>
    </body>
    </html>
  `;
}