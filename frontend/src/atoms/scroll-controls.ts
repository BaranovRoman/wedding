import { atom, useRecoilState } from 'recoil';

const scrollControlsState = atom<boolean>({
    key: 'scrollControlsState',
    default: true,
});

export const useScrollControlsState = () => useRecoilState(scrollControlsState);
