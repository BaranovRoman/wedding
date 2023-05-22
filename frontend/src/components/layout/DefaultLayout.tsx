import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { WEBSITE_NAME } from '../general/AppHead';

interface Props extends PropsWithChildren {
    title?: string;
}

const DefaultLayout = ({ title, children }: Props) => {
    return (
        <>
            <Head>
                <title>{title ? `${title} — ${WEBSITE_NAME}` : WEBSITE_NAME}</title>
            </Head>
            <div className="page">{children}</div>
        </>
    );
};

export default DefaultLayout;
