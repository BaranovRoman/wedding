import ErrorPageLayout from '@/components/layout/ErrorPageLayout';

const ServerErrorPage = () => {
    return <ErrorPageLayout errorNumber={500} />;
};

export default ServerErrorPage;
