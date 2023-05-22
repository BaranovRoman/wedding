import { useCallback, useMemo, useSyncExternalStore } from 'react';

/**
 * Определяем, touch или mouse
 */
export const useTouch = () => {
    const touchMediaQuery = useMemo(
        () => (typeof window !== 'undefined' ? window.matchMedia('(hover: none)') : null),
        [],
    );

    const subscribeToTouchMediaQuery = useCallback(
        (callback: (this: MediaQueryList, ev: any) => any) => {
            touchMediaQuery?.addEventListener('change', callback);
            return () => {
                touchMediaQuery?.removeEventListener('change', callback);
            };
        },
        [touchMediaQuery],
    );

    const isTouchDevice = useSyncExternalStore(
        subscribeToTouchMediaQuery,
        () => touchMediaQuery!.matches,
        () => false,
    );

    return isTouchDevice;
};
