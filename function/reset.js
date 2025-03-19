import { config } from '../config';
import { saveToKV_stok, saveToKV, saveToKV_inout } from './cache';



//======================================UTAMA==========================================
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

//===============================INOUT==================================================================

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
      await saveToKV_inout(newData, env);
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

//==============================STOK========================================================
export async function resetStokCache(env) {
  if (!env?.DATABASE_CACHE) {
    console.error("❌ KV Database tidak terkonfigurasi");
    return "Gagal: KV tidak tersedia.";
  }

  try {
    // Hapus cache inout dan timestamp
    await env.DATABASE_CACHE.delete("stok_cache");
    await env.DATABASE_CACHE.delete("stok_last_update");

    console.log("✅ Cache stok berhasil direset.");

    // Ambil data terbaru dari Google Sheets
    const sheetId = config.SPREADSHEET_ID;
    const apiKey = config.GOOGLE_API_KEY;
    const newData = await fetchStokData(sheetId, "stok!A2:F", apiKey);

    if (Array.isArray(newData) && newData.length > 0) {
      // Simpan data baru ke cache
      await saveToKV_stok(newData, env);
      console.log("✅ Data stok berhasil diperbarui ke KV.");
      return "Cache stok berhasil diperbarui.";
    } else {
      console.warn("⚠️ Tidak ada data baru dari Google Sheets.");
      return "Cache stok direset, tetapi tidak ada data baru.";
    }
  } catch (error) {
    console.error("❌ Gagal mereset cache stok:", error);
    return "Gagal mereset cache stok.";
  }
}


async function fetchStokData(sheetId, range, apiKey) {
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

//==================================reset========================================================
export async function resetSemuaCache(env) {
  try {
    await Promise.all([
      resetCacheUtama(env),
      resetInoutCache(env),
      resetStokCache(env)
    ]);

    const timestamp = new Date().toISOString();
    await env.DATABASE_CACHE.put("lastUpdate", timestamp);

    return new Response(JSON.stringify({ status: "success", message: "✅ Semua cache berhasil di-reset!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Gagal reset semua cache:", error);
    return new Response(JSON.stringify({ status: "error", message: "Gagal reset semua cache!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
