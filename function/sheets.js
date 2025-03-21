import { config } from "../config";
import { getFromKV, saveToKV, getFromKV_inout, saveToKV_inout, getFromKV_stok, saveToKV_stok, } from "./cache";

export async function getCachedData(env, forceUpdate = false) {
  if (!forceUpdate) {
    // 🔹 Cek apakah data sudah ada di cache
    const cachedData = await getFromKV(env);
    if (cachedData) return cachedData; 
  }

  // 🔹 Jika tidak ada cache, ambil data baru dari Google Sheets
  const sheetId = config.SPREADSHEET_ID;
  const apiKey = config.GOOGLE_API_KEY;
  const range = "DATABASE!A2:E";

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    await saveToKV(data.values || [], env); // Simpan ke cache

    return data.values || [];
  } catch (error) {
    console.error("❌ Error mengambil data:", error);
    return [];
  }
}

//=============================================inout========================================================
export async function getCachedData_inout(env) {
  let data = await getFromKV_inout(env);  // 🔍 Cek cache lebih dulu
  if (data) return data;                  // ✅ Gunakan cache jika ada

  // ❌ Jika tidak ada di cache, ambil dari Google Sheets
  const sheetId = config.SPREADSHEET_ID;
  const apiKey = config.GOOGLE_API_KEY;
  const range = "inout!A2:F";

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    data = await response.json();
    await saveToKV_inout(data.values || [], env);  // ✅ Simpan ke cache
    return data.values || [];
  } catch (error) {
    console.error("❌ Error mengambil data:", error);
    return [];
  }
}

//================================================stok========================================================
export async function getCachedData_stok(env) {
  let data = await getFromKV_stok(env);
  if (data) return data;  // ✅ Ambil dari cache jika ada

  const sheetId = config.SPREADSHEET_ID;
  const apiKey = config.GOOGLE_API_KEY;
  const range = "stok!A2:E";

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    data = await response.json();
    await saveToKV_stok(data.values || [], env);  // ✅ Simpan ke cache agar tidak fetch ulang
    return data.values || [];
  } catch (error) {
    console.error("❌ Error mengambil data:", error);
    return [];
  }
}

