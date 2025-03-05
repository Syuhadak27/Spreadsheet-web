export async function saveToKV(data, env) {
    await env.DATABASE_CACHE.put("search_results", JSON.stringify(data), {
      expirationTtl: 86400, // 12 jam
    });
  }
  
  export async function getFromKV(env) {
    const data = await env.DATABASE_CACHE.get("search_results");
    return data ? JSON.parse(data) : null;
  }
  