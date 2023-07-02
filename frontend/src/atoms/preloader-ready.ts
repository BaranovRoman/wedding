import { atom, useRecoilState } from 'recoil';

const preloaderReadyState = atom<boolean>({
    key: 'preloaderReadyState',
    default: false,
});

export const usePreloaderReadyState = () => useRecoilState(preloaderReadyState);
