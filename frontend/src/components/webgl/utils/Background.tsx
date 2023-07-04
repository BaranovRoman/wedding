import { useIsDayState } from '@/atoms/is-day';
import { usePlay } from '@/contexts/play';

const Background = () => {
    const [isDayState] = useIsDayState();
    const { isHelloVisible } = usePlay();

    if (isDayState) {
        return <color attach="background" args={['#dfdcd6']} />;
    } else {
        if (isHelloVisible) {
            return <color attach="background" args={['#dfdcd6']} />;
        }

        return <color attach="background" args={['#343434']} />;
    }
};
export default Background;
