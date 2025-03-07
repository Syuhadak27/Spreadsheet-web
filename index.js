import { handleHome } from "./home";
import { handleSearch } from "./search";
import { handleSearch_inout } from "./inout";
import { notFound } from "./routes";
import { handleSearch_list } from "./list";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") return handleHome();
    if (url.pathname === "/search") return handleSearch(request, env);
    if (url.pathname === "/inout") return handleSearch_inout(request, env);
    if (url.pathname === "/list") return handleSearch_list(request, env);

    return notFound();
  },
};
