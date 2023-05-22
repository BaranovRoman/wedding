import path from 'path';
import crypto from 'crypto';
import { PathLike, promises as fs, constants } from 'fs';
import axios from 'axios';
import sharp from 'sharp';
import { NextApiRequest, NextApiResponse } from 'next';

const sha = (x: crypto.BinaryLike) => crypto.createHash('sha256').update(x).digest('hex');

const getCacheDir = (() => {
    const cacheDir = path.resolve('@/../.images_cache');
    let prom: Promise<string>;

    return () =>
        (prom =
            prom ||
            (async () => {
                await fs.mkdir(cacheDir, { recursive: true });
                return cacheDir;
            })());
})();

const fileExists = async (file: PathLike) => {
    try {
        await fs.access(file, constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const src = req.query.src as string;
    const width = typeof req.query.w === 'string' ? req.query.w : `${1920 * 2}`;
    const quality = typeof req.query.q === 'string' ? req.query.q : '75';
    const format = 'webp';

    const host = req.headers.host!;
    const protocol = /^(localhost|127.0.0.1)(:\d+)?$/.test(host) ? 'http:' : 'https:';
    const origin = `${protocol}//${host}`;

    if (!src) {
        res.status(400).send('400 Bad request. url is missing');
        return;
    }

    const cacheFile = path.join(await getCacheDir(), sha(sha(src) + sha(width) + sha(quality) + sha(format)));

    if (await fileExists(cacheFile)) {
        const cachedFile = await fs.readFile(cacheFile);

        res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')
            .setHeader('content-type', `image/${format}`)
            .status(200)
            .send(cachedFile);
        return;
    }

    try {
        const { data } = await axios.get(origin + src, { responseType: 'arraybuffer' });
        const optimized = await sharp(data)
            .resize({
                withoutEnlargement: true,
                width: parseInt(width),
            })
            [format]({ quality: parseInt(quality) })
            .toBuffer();

        await fs.writeFile(cacheFile, optimized);

        res.setHeader('Cache-Control', 'public, max-age=31536000, must-revalidate')
            .setHeader('content-type', `image/${format}`)
            .status(200)
            .send(optimized);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
}
