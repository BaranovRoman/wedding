import { Environment } from '@react-three/drei';
import { useControls } from 'leva';
import { useIsDayState } from '@/atoms/is-day';

// Интенсивность описываю Стандартная/Низкая/Низшая/Высокая
const Env = () => {
    // const { files } = useControls('env', {
    //     files: {
    //         options: [
    //             '/hdri/belfast_sunset_puresky_1k.hdr',
    //             // Красивые тени, мягкий синий оттенок, интенсивность 2/0.5/1/2 свет 0.5
    //             '/hdri/industrial_sunset_02_puresky_1k.hdr',
    //             // Первый претендент на ночную тему, интенсивность 1/0.5/1/1 свет 0.1
    //             '/hdri/je_gray_02_1k.hdr',
    //             // Текущий вариант, интенсивность 2/0.75/1/6 свет 0.8
    //             '/hdri/je_gray_park_1k.hdr',
    //             // Неплохой вариант, интенсивность 1.2/0.75/1/6 свет 0.4
    //             '/hdri/kloppenheim_02_puresky_1k.hdr',
    //             // Неплохой вариант, интенсивность 1/1.4/1.3/3.9, свет 0.25
    //             '/hdri/limpopo_golf_course_1k.hdr',
    //         ],
    //     },
    // });

    const [isDayState] = useIsDayState();

    const nightEnv = '/hdri/solitude_night_1k.hdr';
    const dayEnv = '/hdri/je_gray_park_1k.hdr';

    return (
        <>
            <Environment background={false} blur={0.1} files={isDayState ? dayEnv : nightEnv} />
        </>
    );
};

export default Env;
