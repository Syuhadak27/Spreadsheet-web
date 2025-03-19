import { handleHome } from "./home";
import { handleSearch } from "./function/search";
import { handleSearch_inout } from "./function/inout";
import { notFound } from "./routes";
import { handleSearch_list } from "./function/list";
import { resetSemuaCache } from "./function/reset";
import { handleSearch_stok } from "./function/stok";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") return handleHome();
    if (url.pathname === "/search") return handleSearch(request, env);
    if (url.pathname === "/inout") return handleSearch_inout(request, env);
    if (url.pathname === "/stok") return handleSearch_stok(request, env);
    if (url.pathname === "/list") return handleSearch_list(request, env);
    if (url.pathname === "/reset") return resetSemuaCache(env)
    if (url.pathname === "/last-update") {
      const lastUpdate = await env.DATABASE_CACHE.get("lastUpdate");
      return new Response(lastUpdate || "-", { status: 200 });
    }
      

    return notFound();
  },
};
