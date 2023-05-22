/**
 * Register all page transitions here
 */

import { PageTransition } from '@/types';
import { baseTransition } from './base';

export const transitions = [baseTransition];

export const forcedTransition: { value: PageTransition | null | undefined } = { value: null };

export const forceNextTransition = (transition: PageTransition) => {
    forcedTransition.value = transition;
};
