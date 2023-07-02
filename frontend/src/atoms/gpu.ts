import { TierResult } from 'detect-gpu';
import { atom, useRecoilState } from 'recoil';

const gpuState = atom<TierResult | null>({
    key: 'gpuState',
    default: null,
});

export const useGpuState = () => useRecoilState(gpuState);
