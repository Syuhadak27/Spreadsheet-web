import { config } from '../config';
const SPREADSHEET_ID = config.SPREADSHEET_ID;
const GOOGLE_API_KEY = config.GOOGLE_API_KEY;
const range = "inout!A2:F";



export async function resetCacheUtama(env) {
  if (!env?.DATABASE_CACHE) {
    console.error("❌ KV Database tidak terkonfigurasi");
    return "Gagal: KV tidak tersedia.";
  }

  try {
    // Hapus cache pencarian dan timestamp
    await env.DATABASE_CACHE.delete("search_results");
    

    console.log("✅ Cache utama berhasil direset.");

    // Ambil data terbaru dari Google Sheets
    const sheetId = config.SPREADSHEET_ID;
    const apiKey = config.GOOGLE_API_KEY;
    const newData = await getCachedData(sheetId, "DATABASE!A2:E", "main", apiKey);

    if (Array.isArray(newData) && newData.length > 0) {
      await saveToKV(newData, env);
      console.log("✅ Data utama berhasil diperbarui ke KV.");
      return "Cache utama berhasil diperbarui.";
    } else {
      console.warn("⚠️ Tidak ada data baru dari Google Sheets.");
      return "Cache utama direset, tetapi tidak ada data baru.";
    }
  } catch (error) {
    console.error("❌ Gagal mereset cache utama:", error);
    return "Gagal mereset cache utama.";
  }
}


async function getCachedData(sheetId, range, cacheKey, apiKey) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error("❌ Error mengambil data dari Google Sheets:", error);
    return [];
  }
}




export async function resetInoutCache(env) {
  if (!env?.DATABASE_CACHE) {
    console.error("❌ KV Database tidak terkonfigurasi");
    return "Gagal: KV tidak tersedia.";
  }

  try {
    // Hapus cache inout dan timestamp
    await env.DATABASE_CACHE.delete("inout_cache");
    await env.DATABASE_CACHE.delete("inout_last_update");

    console.log("✅ Cache inout berhasil direset.");

    // Ambil data terbaru dari Google Sheets
    const sheetId = config.SPREADSHEET_ID;
    const apiKey = config.GOOGLE_API_KEY;
    const newData = await fetchInoutData(sheetId, "inout!A2:F", apiKey);

    if (Array.isArray(newData) && newData.length > 0) {
      // Simpan data baru ke cache
      await saveToKVInout(newData, env);
      console.log("✅ Data inout berhasil diperbarui ke KV.");
      return "Cache inout berhasil diperbarui.";
    } else {
      console.warn("⚠️ Tidak ada data baru dari Google Sheets.");
      return "Cache inout direset, tetapi tidak ada data baru.";
    }
  } catch (error) {
    console.error("❌ Gagal mereset cache inout:", error);
    return "Gagal mereset cache inout.";
  }
}


async function fetchInoutData(sheetId, range, apiKey) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error("❌ Error mengambil data dari Google Sheets:", error);
    return [];
  }
}

export async function resetSemuaCache(env) {
  await resetCacheUtama(env);
  await resetInoutCache(env);
}