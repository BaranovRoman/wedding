import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useHelper, Float } from '@react-three/drei';
import * as THREE from 'three';
import { TierResult } from 'detect-gpu';
import { useGpuState } from '@/atoms/gpu';
import { useControls } from 'leva';

const isItGoodGPU = ({ isMobile, fps, tier, gpu }: TierResult) => {
    if (isMobile || tier < 3 || gpu === 'intel hd graphics 620' || (typeof fps === 'number' ? fps < 40 : true)) {
        return false;
    }

    return true;
};

const Light = () => {
    const lightRef = useRef<THREE.Mesh>();
    const [gpuState] = useGpuState();

    // const { intensity } = useControls('light', {
    //     intensity: 0,
    // });

    const intensity = 0.75;

    return (
        <>
            <Float>
                <directionalLight
                    // @ts-ignore
                    ref={lightRef}
                    position={[30, 50, 60]}
                    intensity={intensity}
                    castShadow
                    color={'#fff'}
                    shadow-mapSize-height={gpuState && isItGoodGPU(gpuState) ? 4096 : 2048}
                    shadow-mapSize-width={gpuState && isItGoodGPU(gpuState) ? 4096 : 2048}
                    shadow-camera-near={1}
                    shadow-camera-far={120}
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
