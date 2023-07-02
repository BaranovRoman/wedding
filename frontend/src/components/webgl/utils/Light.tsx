import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useHelper, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from 'leva';
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
    // const { dX, dY, dZ, dlIntensity, dColor, hColorOne, hColorTwo, hIntensity, aIntensity, aColor } = useControls({
    //     dX: 30,
    //     dY: 50,
    //     dZ: 60,
    //     dlIntensity: 0.62,
    //     dColor: '#ffffff',
    //     hColorOne: '#b6e8b1',
    //     hColorTwo: '#8382e2',
    //     hIntensity: 0.12,
    //     aIntensity: 0.11,
    //     aColor: '#aeffaf',
    // });

    const { aIntensity, aColor } = useControls('ambient', {
        aIntensity: 0.11,
        aColor: '#aeffaf',
    });

    const { dX, dY, dZ, dlIntensity, dColor } = useControls('directional', {
        dX: 30,
        dY: 50,
        dZ: 60,
        dlIntensity: 0.62,
        dColor: '#ffffff',
    });

    const { hColorOne, hColorTwo, hIntensity } = useControls('hemisphere', {
        hColorOne: '#b6e8b1',
        hColorTwo: '#8382e2',
        hIntensity: 0.12,
    });

    return (
        <>
            <hemisphereLight args={[hColorOne, hColorTwo, hIntensity]} />
            <ambientLight intensity={aIntensity} color={aColor} />
            <Float>
                <directionalLight
                    // @ts-ignore
                    ref={lightRef}
                    position={[dX, dY, dZ]}
                    intensity={dlIntensity}
                    castShadow
                    color={dColor}
                    shadow-mapSize-height={gpuState && isItGoodGPU(gpuState) ? 4096 : 2048}
                    shadow-mapSize-width={gpuState && isItGoodGPU(gpuState) ? 4096 : 2048}
                    shadow-camera-near={0.001}
                    shadow-camera-far={200}
                    shadow-camera-left={-40}
                    shadow-camera-right={40}
                    shadow-camera-top={40}
                    shadow-camera-bottom={-40}
                />
            </Float>
        </>
    );
};

export default Light;
