import { atom, useRecoilState } from 'recoil';

const screensState = atom<number>({
    key: 'screensState',
    default: 1,
});

export const useScreensState = () => useRecoilState(screensState);
