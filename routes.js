export function notFound() {
    return new Response("Endpoint tidak ditemukan", { status: 404 });
  }
  