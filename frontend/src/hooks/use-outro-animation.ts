import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTransitionContext } from '@/contexts/page-transition';
import { transitions, forcedTransition } from '@/transitions';

export function useOutroAnimation(fn?: () => void) {
    const router = useRouter();
    const { timeline } = useTransitionContext();

    useEffect(() => {
        const onRouteChangeStart = (to: string) => {
            if (forcedTransition.value) {
                const tl = forcedTransition.value.leave();
                tl.then(() => {
                    forcedTransition.value = null;
                });
                timeline.add(tl, 0);
                return;
            }

            const from = router.pathname;
            const transition =
                transitions.find((transition) => transition.from === from && transition.to === to) ||
                transitions.find((transition) => transition.to === to && !transition.from) ||
                transitions.find((transition) => transition.from === from && !transition.to) ||
                transitions.find((transition) => !transition.from && !transition.to);

            if (transition) {
                timeline.add(transition.leave(), 0);
            }
        };

        router.events.on('routeChangeStart', onRouteChangeStart);

        return () => {
            router.events.off('routeChangeStart', onRouteChangeStart);
        };
    }, [router.events, timeline, router.pathname, fn]);
}
