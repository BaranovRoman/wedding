/**
 * Все провайдеры подключаются в этом файле.
 */

'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { TransitionProvider } from '@/contexts/page-transition';

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <RecoilRoot>
            <TransitionProvider>{children}</TransitionProvider>
        </RecoilRoot>
    );
};

export default Providers;
