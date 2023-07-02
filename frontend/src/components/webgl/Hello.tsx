import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { useMatcapTexture, Center, Text3D, OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useMediaQueryDeviceState } from '@/atoms/media-query-device';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import gsap from 'gsap';

interface Props {
    count?: number;
    depth?: number;
    speed: MutableRefObject<number>;
}

type GLTFResult = GLTF & {
    nodes: {
        ring_small: THREE.Mesh;
    };
    materials: {
        Mat: THREE.MeshStandardMaterial;
    };
};

type RingProps = {
    z: number;
    speed: MutableRefObject<number>;
};

const Ring = ({ z, speed }: RingProps) => {
    const ref = useRef<THREE.Mesh>();
    const { nodes, materials } = useGLTF('/model/Rings-transformed.glb') as GLTFResult;
    const { viewport, camera } = useThree();
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(2),
        y: THREE.MathUtils.randFloatSpread(height),
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    });

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.001), (data.rZ += 0.001));
            ref.current.position.set(data.x * width, (data.y += 0.01 * speed.current), z);
            if (data.y > height / 1.5 && speed.current === 1) {
                data.y = -height / 1.5;
            }
        }
    });
    return (
        <mesh
            // @ts-ignore
            ref={ref}
            geometry={nodes.ring_small.geometry}
            material={materials.Mat}
            scale={880.581}
            transparent
            material-envMapIntensity={2.5}
        />
    );
};

const Hello = ({ count = 100, depth = 50, speed }: Props) => {
    return (
        <>
            {[...Array(count)].map((_, i) => {
                return <Ring key={i} z={-(i / count) * depth - 20} speed={speed} />;
            })}

            <EffectComposer>
                <DepthOfField
                    target={[0, 0, depth / 2]}
                    focusDistance={0.025}
                    focalLength={0.025}
                    bokehScale={3}
                    height={700}
                />
            </EffectComposer>
        </>
    );
};

export default Hello;
