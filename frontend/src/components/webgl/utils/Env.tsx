import { Environment } from '@react-three/drei';

const Env = () => {
    return (
        <>
            <Environment background={false} blur={0.1} files={'/hdri/je_gray_02_1k.hdr'} />
        </>
    );
};

export default Env;
