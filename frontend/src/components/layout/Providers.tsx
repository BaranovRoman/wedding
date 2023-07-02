/**
 * Все провайдеры подключаются в этом файле.
 */

'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { TransitionProvider } from '@/contexts/page-transition';
import { PlayProvider } from '@/contexts/play';

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <RecoilRoot>
            <TransitionProvider>
                <PlayProvider>{children}</PlayProvider>
            </TransitionProvider>
        </RecoilRoot>
    );
};

export default Providers;
