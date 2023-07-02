import { Environment } from '@react-three/drei';

const Env = () => {
    return (
        <>
            <Environment background={false} blur={0.1} files={'/hdri/little_paris_eiffel_tower_1k.hdr'} />
        </>
    );
};

export default Env;
