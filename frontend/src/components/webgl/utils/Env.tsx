import { Environment } from '@react-three/drei';
import { useControls } from 'leva';

const Env = () => {
    const { envmap } = useControls('envmap', {
        envmap: {
            options: [
                '/hdri/je_gray_02_1k.hdr',
                '/hdri/graveyard_pathways_1k.hdr',
                '/hdri/je_gray_park_1k.hdr',
                '/hdri/kloofendal_43d_clear_1k.hdr',
                '/hdri/lilienstein_1k.hdr',
                '/hdri/limpopo_golf_course_1k.hdr',
                '/hdri/little_paris_eiffel_tower_1k.hdr',
                '/hdri/resting_place_1k.hdr',
                '/hdri/rural_asphalt_road_1k.hdr',
                '/hdri/scythian_tombs_2_1k.hdr',
            ],
        },
    });
    return (
        <>
            <Environment background={false} blur={0.1} files={envmap} />
        </>
    );
};

export default Env;
