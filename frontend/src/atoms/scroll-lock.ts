import { atom, useRecoilState } from 'recoil';

const scrollLockState = atom<boolean>({
    key: 'scrollLockState',
    default: false,
});

export const useScrollLockState = () => useRecoilState(scrollLockState);
