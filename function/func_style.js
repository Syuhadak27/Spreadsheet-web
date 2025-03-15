export const styles = `
    /* Pengaturan dasar tabel dengan lebar penuh dan tanpa spasi antar sel */  
    table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        font-size: 12px; /* Ukuran font kecil untuk menghemat ruang */
    }
    
    /* Pengaturan untuk header dan sel data dengan border biru dan padding kecil */
    th, td {
        border: 1px solid blue; /* Border biru memberikan aksen visual */
        padding: 4px; /* Padding kecil untuk tampilan yang kompak */
        text-align: left;
        word-wrap: break-word; /* Teks panjang akan dibungkus */
        white-space: nowrap; /* Mencegah teks terpotong ke baris baru */
    }
    
    /* Kelas untuk memberikan penekanan pada teks tertentu */
    .bold {
        font-weight: bold;
    }
    
    /* Header tabel dengan background biru dan teks putih untuk kontras */
    th {
        background-color: #007bff;
        color: white;
    }
    
    /* Membuat efek zebra striping pada baris untuk membedakan baris satu sama lain */
    tr:nth-child(even) {
         background-color:rgb(212, 201, 196);
        /*background-color: #f2f2f2;*/ /* Warna abu-abu muda untuk baris genap */
    }
    
    tr:nth-child(odd) {
        background-color: #e0f7fa; /* Warna biru sangat muda untuk baris ganjil */
    }
    
    /* Efek hover pada sel untuk meningkatkan interaktivitas */
    td:hover {
        background-color: #ccc; /* Warna abu-abu saat hover */
        cursor: pointer; /* Mengubah kursor menjadi pointer untuk menunjukkan interaktivitas */
    }
    
    /* Pengaturan dark mode menggunakan media query */
    @media (prefers-color-scheme: dark) {
        /* Mengubah warna background dan teks untuk mode gelap */
        body {
            background-color: #121212; /* Warna hitam abu-abu untuk background */
            color: white; /* Teks putih untuk keterbacaan */
        }
        
        /* Mengubah warna tabel dan teks untuk mode gelap */
        table {
            background-color: #222; /* Background tabel lebih gelap */
            color: white;
        }
        
        /* Header mode gelap dengan warna biru yang lebih dalam */
        th {
            background-color: #0056b3;
        }
        
        /* Zebra striping untuk mode gelap dengan kontras rendah agar nyaman di mata */
        tr:nth-child(even) {
            background-color:#333; /* Baris genap sedikit lebih terang */
        }
        
        tr:nth-child(odd) {
            background-color: #444; /* Baris ganjil lebih terang dari genap */
        }
        
        /* Efek hover mode gelap dengan warna yang sesuai */
        td:hover {
            background-color: #555; /* Abu-abu lebih terang saat hover */
        }
    }`;