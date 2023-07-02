import { getGPUTier } from 'detect-gpu';
import { useEffect } from 'react';
import { useGpuState } from '@/atoms/gpu';
import WebGL from './WebGL';

const getGPUTierPromise = getGPUTier();

const WebGLWithGPUCheck = () => {
    const [gpuState, setGpuState] = useGpuState();

    useEffect(() => {
        getGPUTierPromise.then((gpuTier) => {
            setGpuState(gpuTier);
        });
    }, [setGpuState]);

    return gpuState ? <WebGL /> : null;
};

export default WebGLWithGPUCheck;
