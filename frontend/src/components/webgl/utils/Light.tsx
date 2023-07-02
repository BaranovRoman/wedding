import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useHelper, Float } from '@react-three/drei';
import * as THREE from 'three';
import { TierResult } from 'detect-gpu';
import { useGpuState } from '@/atoms/gpu';

const isItGoodGPU = ({ isMobile, fps, tier, gpu }: TierResult) => {
    if (isMobile || tier < 3 || gpu === 'intel hd graphics 620' || (typeof fps === 'number' ? fps < 40 : true)) {
        return false;
    }

    return true;
};

const Light = () => {
    const lightRef = useRef<THREE.Mesh>();
    const [gpuState] = useGpuState();

    return (
        <>
            <Float>
                <directionalLight
                    // @ts-ignore
                    ref={lightRef}
                    position={[30, 50, 60]}
                    intensity={1.3}
                    castShadow
                    color={'#fff'}
                    shadow-mapSize-height={gpuState && isItGoodGPU(gpuState) ? 4096 : 2048}
                    shadow-mapSize-width={gpuState && isItGoodGPU(gpuState) ? 4096 : 2048}
                    shadow-camera-near={0.001}
                    shadow-camera-far={200}
                    shadow-camera-left={-40}
                    shadow-camera-right={40}
                    shadow-camera-top={40}
                    shadow-camera-bottom={-40}
                    shadow-radius={5}
                />
            </Float>
        </>
    );
};

export default Light;
