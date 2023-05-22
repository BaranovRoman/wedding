const path = require('path');

export default function imageLoader({ src, width, quality = 80 }) {
    const { dir, ext } = path.parse(src);
    return /(png|jpe?g|webp|avif)/.test(ext) ? `/api/optimize?src=${src}&w=${width}&q=${quality}` : src;
}
