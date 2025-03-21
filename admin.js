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
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
          background: linear-gradient(135deg, #667eea, #764ba2); 
          font-family: Arial, sans-serif;
        }
        .login-box {
          width: 320px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          text-align: center;
          transition: transform 0.3s ease-in-out;
        }
        h2 {
          color: white;
          margin-bottom: 15px;
        }
        .tab-buttons {
          display: flex;
          justify-content: space-around;
          margin-bottom: 15px;
        }
        .tab-buttons button {
          flex: 1;
          padding: 10px;
          border: none;
          background: rgba(255, 255, 255, 0.3);
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }
        .tab-buttons button.active {
          background: #4CAF50;
        }
        input {
          display: block;
          width: 100%;
          margin: 10px 0;
          padding: 10px;
          border: 2px solid transparent;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transition: 0.3s;
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        input:focus {
          border-color: #4CAF50;
          background: rgba(255, 255, 255, 0.4);
          outline: none;
        }
        button { 
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 5px;
          background: #4CAF50; 
          color: white; 
          font-weight: bold;
          cursor: pointer; 
          transition: 0.3s;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        button:hover {
          background: #45a049;
        }
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
        .hidden { display: none; }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h2>Login</h2>
        <div class="tab-buttons">
          <button id="userTab" class="active" onclick="switchTab('user')">User</button>
          <button id="adminTab" onclick="switchTab('admin')">Admin</button>
        </div>

        <div id="userLogin">
          <input type="text" id="usernameInput" placeholder="Masukkan nama Anda..">
          <button onclick="checkLogin()">Login</button>
        </div>

        <div id="adminLogin" class="hidden">
          <input type="text" id="adminUsername" placeholder="Admin Username">
          <input type="password" id="adminPassword" placeholder="Password">
          <button onclick="checkAdminLogin()">Login Admin</button>
        </div>
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

        function switchTab(role) {
          document.getElementById("userLogin").classList.toggle("hidden", role !== "user");
          document.getElementById("adminLogin").classList.toggle("hidden", role !== "admin");
          document.getElementById("userTab").classList.toggle("active", role === "user");
          document.getElementById("adminTab").classList.toggle("active", role === "admin");
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
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }
        .dashboard-container {
          width: 90%;
          max-width: 800px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        h2 {
          color: #007bff;
        }
        .user-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
          padding: 10px;
        }
        .user-card {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        button { 
          background: #f44336; 
          color: white; 
          border: none; 
          padding: 8px 12px; 
          cursor: pointer; 
          border-radius: 5px;
          transition: 0.3s;
        }
        button:hover { background: #d32f2f; }
        .logout-btn {
          background: #007bff;
          margin-top: 15px;
          padding: 10px;
          width: 100%;
        }
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
      <div class="dashboard-container">
        <h2>Admin Dashboard</h2>
        <div class="user-list">
          ${users.map(user => `
            <div class="user-card" id="user-${user}">
              <p><strong>${user}</strong></p>
              <button onclick="logoutUser('${user}')">Logout</button>
            </div>
          `).join("")}
        </div>
        <button class="logout-btn" onclick="window.location.href='/logout-admin'">Logout Admin</button>
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