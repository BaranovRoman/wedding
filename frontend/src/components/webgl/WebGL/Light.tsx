import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
// import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

const Light = () => {
    const lightRef = useRef<THREE.Mesh>();

    // useHelper(lightRef, THREE.DirectionalLightHelper);
    useFrame((state) => {
        if (lightRef.current) {
            lightRef.current.position.x = 3 + Math.sin(state.clock.elapsedTime / 30) * 3;
            lightRef.current.position.z = 4 + Math.cos(state.clock.elapsedTime / 30) * 3;
        }
    });
    return (
        <directionalLight
            // @ts-ignore
            ref={lightRef}
            position={[3, 5, 4]}
            intensity={0.1}
            castShadow
            shadow-mapSize-height={2048}
            shadow-mapSize-width={2048}
            shadow-camera-near={1}
            shadow-camera-far={20}
            shadow-camera-left={-10}
        />
    );
};

export default Light;
