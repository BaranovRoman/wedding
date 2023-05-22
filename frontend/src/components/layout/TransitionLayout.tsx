'use client';

/**
 * Used to check whether page leave animation has been completed
 * in order to render the content of the new page.
 */

import { ReactNode, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/router';
import useIsomorphicLayoutEffect from '@/hooks/use-isomorphic-layout-effect';
import { useTransitionContext } from '@/contexts/page-transition';
import { useOutroAnimation } from '@/hooks/use-outro-animation';
import { usePrevious } from '@/hooks/use-previous';
import { deleteGetParams } from '@/utils/strings';

export default function TransitionLayout({ children }: { children: ReactNode }) {
    const [displayChildren, setDisplayChildren] = useState<ReactNode>(children);
    const { timeline } = useTransitionContext();
    const [_, startTransition] = useTransition();
    const router = useRouter();
    const prevRoute = usePrevious(router.asPath);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.dispatchEvent(new Event('new-page-ready'));
    }, [displayChildren]);

    useIsomorphicLayoutEffect(() => {
        if (deleteGetParams(router.asPath) !== (prevRoute ? deleteGetParams(prevRoute) : undefined)) {
            if (timeline.duration() === 0) {
                // there are no outro animations, so immediately transition
                startTransition(() => {
                    setDisplayChildren(children);
                });
            } else {
                timeline.play().then(() => {
                    // outro complete so reset to an empty paused timeline
                    timeline.pause().clear();
                    startTransition(() => {
                        setDisplayChildren(children);
                    });
                });
            }
        }
    }, [children]);

    useOutroAnimation();

    return <>{displayChildren}</>;
}
