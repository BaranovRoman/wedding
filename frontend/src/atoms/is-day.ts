import { atom, useRecoilState } from 'recoil';

const isDayState = atom<boolean>({
    key: 'isDayState',
    default: true,
});

export const useIsDayState = () => useRecoilState(isDayState);
