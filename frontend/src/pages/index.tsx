import { GetStaticProps } from 'next';
import { BasePageProps } from '@/types';
import DefaultLayout from '@/components/layout/DefaultLayout';

const IndexPage = () => {
    return (
        <DefaultLayout>
            <div className="wrapper">
                <h1>Next.js boilerplate</h1>
            </div>
        </DefaultLayout>
    );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<BasePageProps> = async () => {
    return {
        props: {
            bodyClass: 'index-page',
            // host: req.headers.host, // if SSR, or
            host: process.env.HOST || '', // if SSG
        },
    };
};
