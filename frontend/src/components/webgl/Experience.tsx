import { Model } from '../Completed';
// import { Model } from '../FinalReal';
import Hello from './Hello';
import { useRef, useState, Suspense, useEffect } from 'react';
import { WebGLRenderer } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { camerasData } from '../../data';
import { useScrollControlsState } from '../../atoms/scroll-controls';
import {
    // OrbitControls,
    PerformanceMonitor,
    ScrollControls,
    OrbitControls,
    Stats,
    Preload,
    Environment,
} from '@react-three/drei';

import { useGLTF, Sphere, PerspectiveCamera, useScroll } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

import FlyingCamera from './utils/FlyingCamera';
import { usePlay } from '@/contexts/play';

import { motion } from 'framer-motion';
import { Vector3 } from 'three';
import { cameraLookAtVec } from '@/lookAtVec';

import { Perf } from 'r3f-perf';

import Trees from './Trees';
import { Sky } from '@react-three/drei';
import { useControls } from 'leva';

const Experience = () => {
    const totalScreens = Object.keys(camerasData).length - 1;
    const [scrollEnabled] = useScrollControlsState();
    const { play, setHasScroll, end, setEnd, isHelloVisible, setIsHelloVisible } = usePlay();
    const sceneOpacity = useRef(0);
    const helloSpeed = useRef(1);
    const camera = useRef<any>();
    const scroll = useScroll();
    const lastScroll = useRef(0);

    useFrame((_state, delta) => {
        if (play && !end && helloSpeed.current < 95) {
            helloSpeed.current = THREE.MathUtils.lerp(helloSpeed.current, 100, delta * 3);
        }

        if (helloSpeed.current > 95) {
            setIsHelloVisible(false);
        }

        if (play && !end && sceneOpacity.current < 1 && !isHelloVisible) {
            sceneOpacity.current = THREE.MathUtils.lerp(sceneOpacity.current, 1, delta * 5);
        }

        if (end && sceneOpacity.current > 0) {
            // sceneOpacity.current = THREE.MathUtils.lerp(sceneOpacity.current, 0, delta * 5);
        }

        if (end) {
            return;
        }
    });

    return (
        <>
            {isHelloVisible && (
                <Suspense fallback={null}>
                    <Hello speed={helloSpeed} />
                </Suspense>
            )}
            <Perf />
            <Model />
            {/* <Model opacity={sceneOpacity} /> */}
            <Trees opacity={sceneOpacity} />
            {!isHelloVisible && <Sky sunPosition={[0, 1, 0]} distance={1300} inclination={0.6} azimuth={0.25} />}
            <ScrollControls
                pages={play && !isHelloVisible ? totalScreens : 0}
                damping={0.5}
                style={{
                    top: '10px',
                    left: '0px',
                    bottom: '10px',
                    right: '10px',
                    width: 'auto',
                    height: 'auto',
                    animation: 'fadeIn 2.4s ease-in-out 1.2s forwards',
                    // opacity: 0,
                }}
            >
                <FlyingCamera />
            </ScrollControls>
        </>
    );
};

export default Experience;
