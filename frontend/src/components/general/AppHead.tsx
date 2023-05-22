import Head from 'next/head';
import { usePathname } from 'next/navigation';

export const WEBSITE_NAME = '[WEBSITE NAME]';
const WEBSITE_DESCRIPTION = '[DESCRIPTION]';
const WEBSITE_OG_IMAGE = '/img/og-image.jpg';

interface Props {
    host?: string;
}

const AppHead = ({ host = '' }: Props) => {
    const pathname = usePathname();

    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="description" content={WEBSITE_DESCRIPTION} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta property="og:url" content={host + (pathname === '/' ? '' : pathname)} />
            <meta property="og:locale" content="ru" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={WEBSITE_NAME} />
            <meta property="og:description" content={WEBSITE_DESCRIPTION} />
            <meta property="og:image" content={WEBSITE_OG_IMAGE} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content={WEBSITE_OG_IMAGE} />
            <meta name="twitter:title" content={WEBSITE_NAME} />
            <meta name="twitter:description" content={WEBSITE_DESCRIPTION} />
            <link rel="icon" href="/img/favicon/favicon.ico" />
            {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}

            {/* <link
                rel="preload"
                href="/fonts/FormaDJRText-Regular.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
            /> */}
        </Head>
    );
};

export default AppHead;
