import { useEffect } from 'react';
import { useMediaQueryDeviceState } from '@/atoms/media-query-device';
import { useScrollLockState } from '@/atoms/scroll-lock';
import { useIsDayState } from '@/atoms/is-day';
import { lockBodyScroll, unlockBodyScroll } from '@/utils/dom';

const AppInits = () => {
    const [_, setMediaQueryDeviceState] = useMediaQueryDeviceState();
    const [scrollLocked] = useScrollLockState();
    const [isDayState, setIsDayState] = useIsDayState();

    /**
     * Блокирование скролла страницы
     */
    useEffect(() => {
        if (scrollLocked) {
            lockBodyScroll();
        } else {
            unlockBodyScroll();
        }
    }, [scrollLocked]);

    useEffect(() => {
        // setIsDayState(true);
        setIsDayState(new Date().getHours() < 22 && new Date().getHours() > 6);
    }, [setIsDayState]);

    useEffect(() => {
        const setDevice = () => {
            switch (true) {
                case matchMedia('(max-width: 767px)').matches:
                    setMediaQueryDeviceState('vertical-mobile');
                    break;
                case matchMedia('(max-width: 900px) and (orientation: landscape)').matches:
                    setMediaQueryDeviceState('horizontal-mobile');
                    break;
                case matchMedia('(min-width: 768px) and (max-width: 1199px) and (orientation: portrait)').matches:
                    setMediaQueryDeviceState('vertical-tablet');
                    break;
                case matchMedia('(min-width: 768px) and (max-width: 1199px) and (orientation: landscape)').matches:
                    setMediaQueryDeviceState('horizontal-tablet');
                    break;
                default:
                    setMediaQueryDeviceState('desktop');
                    break;
            }
        };

        const onResize = () => {
            setDevice();
        };

        onResize();
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', setDevice);
    }, [setMediaQueryDeviceState]);

    return null;
};

export default AppInits;
