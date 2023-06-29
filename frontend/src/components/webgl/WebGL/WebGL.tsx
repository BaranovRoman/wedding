'use client';

import { WebGLRenderer } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, Suspense } from 'react';
import { camerasData } from '../../../data';
import { useScrollControlsState } from '../../../atoms/scroll-controls';
import { Model } from '../../VrodeOno';
// import { Model } from '../../WeddingNew';
import Hello from './Hello';
import {
    // OrbitControls,
    PerformanceMonitor,
    ScrollControls,
    OrbitControls,
    Stats,
    Preload,
    Environment,
} from '@react-three/drei';

import Light from './Light';

import FlyingCamera from '../FlyingCamera';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

interface Props {
    helloText: string;
}
type Flowers = GLTF & {
    nodes: {
        Polygon_0_4001: THREE.Mesh;
    };
    materials: {
        Flowers: THREE.MeshStandardMaterial;
    };
};
const WebGL = ({ helloText }: Props) => {
    const totalScreens = Object.keys(camerasData).length - 1;
    const [scrollEnabled] = useScrollControlsState();

    return (
        <div className="canvas-wrapper">
            <Canvas
                shadows
                camera={{
                    position: [0, 0, 4],
                    // position: [1.453, 2.278, -5.302],
                    fov: 30,
                    // fov: 20.862,
                    near: 0.01,
                    far: 110,
                    // far: 10000000000,
                }}
                flat
                gl={{
                    alpha: false,
                }}
                dpr={[1, 2]}
            >
                <color attach="background" args={['#dfdcd6']} />
                <Environment background={false} blur={0.1} files="/studio_small_08_4k.hdr" />
                <ambientLight intensity={0.1} color={0xaeffaf} />
                {/* <pointLight
                    castShadow
                    position={[20, 100, 100]}
                    intensity={1}
                    shadow-mapSize-height={512}
                    shadow-mapSize-width={512}
                /> */}
                {/* <spotLight intensity={1} castShadow shadow-mapSize-height={512} shadow-mapSize-width={512} /> */}
                <Light />
                <hemisphereLight args={[0xff0000, 0x0000ff, 0.05]} />
                {/* <OrbitControls makeDefault /> */}

                <Suspense fallback={null}>
                    <Hello text={helloText} />
                </Suspense>
                {/* <Model /> */}
                {/* <ScrollControls pages={totalScreens} distance={2} damping={3}>
                    <FlyingCamera />
                </ScrollControls> */}
            </Canvas>
        </div>
    );
};

export default WebGL;
