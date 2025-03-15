export const styles = `
      table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        font-size: 12px; /* Ukuran teks kecil */
      }
      th, td {
        border: 1px solid blue; /* Garis biru */
        padding: 4px; /* Padding lebih kecil */
        text-align: left;
        word-wrap: break-word;
        white-space: nowrap;
      }
      .bold {
        font-weight: bold;
      }
      th {
        background-color: #007bff;
        color: white;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      tr:nth-child(odd) {
        background-color: #e0f7fa;
      }
      td:hover {
        background-color: #ccc;
        cursor: pointer;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #121212;
          color: white;
        }
        table {
          background-color: #222;
          color: white;
        }
        th {
          background-color: #0056b3;
        }
        tr:nth-child(even) {
          background-color: #333;
        }
        tr:nth-child(odd) {
          background-color: #444;
        }
        td:hover {
          background-color: #555;
        }
      }`;