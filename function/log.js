import { config } from '../config';
const TELEGRAM_BOT_TOKEN = config.BOT_TOKEN;
const TELEGRAM_CHANNEL_ID = config.CHANNEL_ID;

export async function logSearch(env, user, query) {
    const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    const ipAddress = user.headers.get("CF-Connecting-IP") || "Unknown IP";
    const userAgent = user.headers.get("User-Agent") || "Unknown Device";

    // 🔥 Parsing User-Agent untuk dapatkan detail perangkat
    const deviceInfo = getDeviceInfo(userAgent);

    const message = `
<b>📌 LOG PENCARIAN</b>
<blockquote>🕒 <b>Waktu:</b> ${timestamp}
🌍 <b>IP:</b> ${ipAddress}
📱 <b>Device:</b> ${deviceInfo}</blockquote>
<blockquote>🔄 <b>UA:</b> <code>${userAgent}</code></blockquote>
🔍 <b>Query:</b> <code>${query}</code>
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: TELEGRAM_CHANNEL_ID,
        text: message,
        parse_mode: "HTML",
    };

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

// ✅ Fungsi Parsing User-Agent dengan deteksi merek ponsel
function getDeviceInfo(userAgent) {
    let os = "Unknown OS";
    let browser = "Unknown Browser";
    let device = "Unknown Device";
    let brand = "";

    // Deteksi OS
    if (/windows/i.test(userAgent)) os = "Windows";
    else if (/macintosh|mac os x/i.test(userAgent)) os = "MacOS";
    else if (/android/i.test(userAgent)) {
        os = "Android";
        
        // Deteksi merek ponsel Android
        if (/samsung/i.test(userAgent)) brand = "Samsung";
        // Xiaomi detection dengan pola yang lebih lengkap
        else if (/xiaomi|mi |miui|redmi|poco/i.test(userAgent)) brand = "Xiaomi";
        // Redmi specific detection dengan penulisan spesifik Redmi
        else if (/HM NOTE|Redmi Note|Redmi[0-9]|M200|M2004|M2006|M2007|M2010|M2012|M2101|M2102|M2103|M2104|M2105|M2106|22011|22031|23021/i.test(userAgent)) brand = "Redmi";
        else if (/huawei/i.test(userAgent)) brand = "Huawei";
        else if (/oppo/i.test(userAgent)) brand = "OPPO";
        else if (/vivo/i.test(userAgent)) brand = "Vivo";
        else if (/realme/i.test(userAgent)) brand = "Realme";
        else if (/oneplus/i.test(userAgent)) brand = "OnePlus";
        else if (/asus|zenfone/i.test(userAgent)) brand = "Asus";
        else if (/nokia/i.test(userAgent)) brand = "Nokia";
        else if (/lenovo/i.test(userAgent)) brand = "Lenovo";
        else if (/sony|xperia/i.test(userAgent)) brand = "Sony";
        else if (/lg/i.test(userAgent)) brand = "LG";
        else if (/motorola|moto/i.test(userAgent)) brand = "Motorola";
        else if (/infinix/i.test(userAgent)) brand = "Infinix";
        else if (/tecno/i.test(userAgent)) brand = "TECNO";
        
        // Tambahkan brand ke device jika terdeteksi
        if (brand) device = brand;
    }
    else if (/iphone|ipad|ipod/i.test(userAgent)) {
        os = "iOS";
        device = "Apple";
    }
    else if (/linux/i.test(userAgent)) os = "Linux";

    // Deteksi Browser
    if (/chrome/i.test(userAgent) && !/edg|opr/i.test(userAgent)) browser = "Chrome";
    else if (/firefox/i.test(userAgent)) browser = "Firefox";
    else if (/safari/i.test(userAgent) && !/chrome|edg|opr/i.test(userAgent)) browser = "Safari";
    else if (/edg/i.test(userAgent)) browser = "Edge";
    else if (/opera|opr/i.test(userAgent)) browser = "Opera";
    else if (/ucbrowser/i.test(userAgent)) browser = "UC Browser";
    else if (/miuibrowser/i.test(userAgent)) browser = "MIUI Browser";
    else if (/samsungbrowser/i.test(userAgent)) browser = "Samsung Browser";

    // Jika merek belum terdeteksi namun os adalah Android atau iOS
    if (!device || device === "Unknown Device") {
        device = os === "Android" ? "Android Device" : (os === "iOS" ? "iOS Device" : device);
    }

    return `${device} - ${os} - ${browser}`;
}