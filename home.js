import { homeTemplate } from './desain/home.html.js';
import { styles } from './desain/styles.js';
import { scripts } from './desain/scripts.js';

export function handleHome(request) {
  const html = homeTemplate(styles, scripts);
  return new Response(html, {
    headers: { "Content-Type": "text/html" }
  });
}