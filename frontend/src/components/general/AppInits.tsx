import { useEffect } from 'react';
import { useMediaQueryDeviceState } from '@/atoms/media-query-device';
import { useScrollLockState } from '@/atoms/scroll-lock';
import { lockBodyScroll, unlockBodyScroll } from '@/utils/dom';

const AppInits = () => {
    const [_, setMediaQueryDeviceState] = useMediaQueryDeviceState();
    const [scrollLocked] = useScrollLockState();

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
