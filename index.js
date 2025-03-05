import { handleHome } from "./home";
import { handleSearch } from "./search";
import { handleSearch_inout } from "./inout";
import { notFound } from "./routes";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") return handleHome();
    if (url.pathname === "/search") return handleSearch(request, env);
    if (url.pathname === "/inout") return handleSearch_inout(request, env);

    return notFound();
  },
};
