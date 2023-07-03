'use client';

import { WebGLRenderer } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, Suspense } from 'react';
import { camerasData } from '../../data';
import { useScrollControlsState } from '../../atoms/scroll-controls';
import {
    // OrbitControls,
    PerformanceMonitor,
    ScrollControls,
    OrbitControls,
    Stats,
    Preload,
    Loader,
    Environment,
} from '@react-three/drei';

import { useGLTF, Sphere, PerspectiveCamera, useScroll } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';

import { usePlay } from '@/contexts/play';

import Experience from './Experience';

import Background from './utils/Background';
import Light from './utils/Light';
import Env from './utils/Env';
import classNames from 'classnames';
import { TierResult } from 'detect-gpu';
import { useGpuState } from '@/atoms/gpu';
import round from 'lodash.round';
import { useMediaQueryDeviceState } from '@/atoms/media-query-device';

const shouldUseAntialiasing = ({ isMobile, fps, tier, gpu }: TierResult) => {
    if (isMobile || tier < 3 || gpu === 'intel hd graphics 620' || (typeof fps === 'number' ? fps < 40 : true)) {
        return false;
    }

    return true;
};

const WebGL = () => {
    const { play } = usePlay();
    const [dpr, setDpr] = useState(Math.min(devicePixelRatio, 1.25));
    const [gpuState] = useGpuState();
    const [mediaQueryDevice] = useMediaQueryDeviceState();
    return (
        <div
            className={classNames('canvas-wrapper', {
                'canvas-wrapper--opacity': !play,
            })}
        >
            <Canvas
                shadows
                flat
                gl={{
                    alpha: false,
                    toneMapping: THREE.ReinhardToneMapping,
                    antialias: gpuState ? shouldUseAntialiasing(gpuState) : false,
                }}
                dpr={dpr}
                camera={{
                    position: [0, 0, 4],
                    fov: mediaQueryDevice === 'vertical-mobile' ? 25 : 30,
                    near: 0.01,
                    far: 110,
                }}
            >
                <Preload all />
                <Experience />
                <Background />
                <Light />
                <Env />
                <PerformanceMonitor
                    onChange={({ factor }) =>
                        setDpr(Math.min(Math.min(devicePixelRatio, 2), round(0.75 + 1.25 * factor, 1)))
                    }
                ></PerformanceMonitor>
            </Canvas>
        </div>
    );
};

export default WebGL;
