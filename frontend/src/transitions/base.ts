import gsap from 'gsap';
import { PageTransition } from '@/types';

export const baseTransition: PageTransition = {
    leave() {
        const tl = gsap.timeline({ defaults: { duration: 0, ease: 'power2.inOut' } });

        return tl;
    },
};
