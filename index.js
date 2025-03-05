import { handleHome } from "./handlers/home";
import { handleSearch } from "./handlers/search";
import { notFound } from "./routes";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") return handleHome();
    if (url.pathname === "/search") return handleSearch(request, env);

    return notFound();
  },
};
