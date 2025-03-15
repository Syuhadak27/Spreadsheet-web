export const styles = `
 /* ========== Global Styles ========== */
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          
          background: #e3f2fd;
          color: #333;
          margin: 0;
          padding-top: 150px;
        }
>

        h1 { color: #007bff; font-size: 18px; }
        hr { border: none; height: 2px; background: #007bff; margin: 10px 0; }

        /* ========== Header & Search Bar ========== */
        .fixed-header {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 400px;
          background-color: #e3f2fd; /* Pastikan background solid */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Gunakan bayangan lebih solid */
          border-radius: 10px;
          padding: 10px;
          z-index: 500;
          border: 2px solid #007bff;
        }

        footer {
          font-size: 12px;
          margin-top: 6px;
          padding: 5px 0;
          text-align: center;
          color: #666;
        }

        time {
          font-size: 12px;
          margin-top: 6px;
          padding: 5px 0;
          text-align: right;
          color: #666;
        }

        input {
          padding: 10px;
          width: 90%;
          max-width: 400px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        /* ========== Result Container ========== */
        .results-container {
          margin-top: 45px;
          width: 90%;
          max-width: 400px;
          background: #e3f2fd;
          border-radius: 10px;
          border: 2px solid #007bff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          padding: 15px;
          max-height: auto;
          overflow-y: auto;
          margin-left: auto;
          margin-right: auto;
          text-align: left;
        }



        .result-card {
          background: #E3F2FD;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 5px;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
          cursor: pointer;
          color: #121212;
        }

/* ========== Tab Buttons ========== */
.btn-container {
  display: flex;
  justify-content: center;
  gap: 0; /* Hilangkan gap antara tombol */
  margin-top: 10px;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: none;
  margin: 2px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

button.active {
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
  transform: translateY(1px);
}

/* Warna latar tab */
.btn-clear { background: #ffcccb; color: #8b0000; }
.btn-search { background: #90ee90; color: #006400; }
.btn-inout { background: #ffd700; color: #b8860b; }
.btn-export { background: #add8e6; color: #00008b; }

/* Efek aktif tab */
.btn-clear:active, .btn-search:active, .btn-inout:active, .btn-export:active {
  transform: scale(0.95);
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .btn-container {
    background: #2a2a2a;
  }
  
  .btn-clear { background: #8b0000; color: #fff; }
  .btn-search { background: #006400; color: #fff; }
  .btn-inout { background: #b8860b; color: #fff; }
  .btn-export { background: #00008b; color: #fff; }
}
        
        /* ========== Toast Notification ========== */
        .toast {
          visibility: hidden;
          min-width: 200px;
          top: 10px; /* Atur jarak dari atas */
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          text-align: center;
          border-radius: 5px;
          padding: 10px;
          position: fixed;
          
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s, visibility 0.3s;
        }


        .toast.show {
          visibility: visible;
          opacity: 1;
        }

        /* ========== Dark Mode Support ========== */
        @media (prefers-color-scheme: dark) {
          body { background: #121212; color: #ddd; }
          .fixed-header, .results-container { 
            background: #1e1e1e; 
            box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
            color: #ffffff;
          }
          h1, hr { color: #8ab4f8; background: #8ab4f8; }
          input { background: #2c2c2c; color: #fff; border: 1px solid #555; }
          input::placeholder { color: #bbb; }
          .result-card { background: #2c2c2c; color:rgb(15, 1, 1); }
          .btn-clear { background: darkred; }
          .btn-search { background: darkgreen; }
          .btn-inout { background: linear-gradient(45deg, darkgoldenrod, darkorange); }
        }
        .search-container {
          text-align: center;
          margin: 20px;
        }
        
        /* ========== Custom Pop-up Alert ========== */
        .custom-alert {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 2px solid blue;
          color: black;
          padding: 10px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          font-weight: bold;
          display: none;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          z-index: 10000;
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
          .custom-alert {
            background: black;
            color: white;
            border: 2px solid cyan;
          }
        }

`;