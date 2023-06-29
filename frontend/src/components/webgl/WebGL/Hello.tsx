import { useState, useEffect, useRef } from 'react';
import { useMatcapTexture, Center, Text3D, OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useMediaQueryDeviceState } from '@/atoms/media-query-device';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import gsap from 'gsap';

interface Props {
    text: string;
}

function getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.6, 300, 16);
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const dodecahedronGeometry = new THREE.DodecahedronGeometry(1, 0);
const coneGeometry = new THREE.ConeGeometry(1, 2, 32);
const capsuleGeometry = new THREE.CapsuleGeometry(0.5, 0.5, 4, 8);
const boxGeometry = new THREE.BoxGeometry(2, 1, 0.25);

const geometries = [
    torusGeometry,
    torusKnotGeometry,
    icosahedronGeometry,
    dodecahedronGeometry,
    coneGeometry,
    capsuleGeometry,
];

const material = new THREE.MeshMatcapMaterial();
const materialForText = new THREE.MeshMatcapMaterial();
const materialForButton = new THREE.MeshMatcapMaterial();
const materialForTextInButton = new THREE.MeshMatcapMaterial();

const Ring = ({ z }) => {
    const ref = useRef();
    const { nodes, materials } = useGLTF('/Rings-transformed.glb');
    const { viewport, camera } = useThree();
    console.log(nodes, materials);
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(2),
        y: THREE.MathUtils.randFloatSpread(height),
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    });

    useFrame((state) => {
        ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.001), (data.rZ += 0.001));
        ref.current.position.set(data.x * width, (data.y += 0.01), z);
        if (data.y > height / 1.5) {
            data.y = -height / 1.5;
        }
    });

    return <mesh ref={ref} geometry={nodes.ring_small.geometry} material={materials.Mat} scale={880.581} />;
};

const Hello = ({ text, count = 100, depth = 50 }: Props) => {
    const [matcapTexture] = useMatcapTexture('C8D1DC_575B62_818892_6E747B', 256);
    const [matcapTextureForText] = useMatcapTexture('686E55_353C2F_869B7F_444434', 256);
    const [matcapTextureForButton] = useMatcapTexture('C8D1DC_575B62_818892_6E747B', 256);
    const [matcapTextureForTextInButton] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);
    const donuts = useRef([]);
    const [mediaQueryDevice] = useMediaQueryDeviceState();

    useEffect(() => {
        matcapTexture.colorSpace = THREE.SRGBColorSpace;
        matcapTexture.needsUpdate = true;
        matcapTextureForText.colorSpace = THREE.SRGBColorSpace;
        matcapTextureForText.needsUpdate = true;
        matcapTextureForButton.colorSpace = THREE.SRGBColorSpace;
        matcapTextureForButton.needsUpdate = true;
        matcapTextureForTextInButton.colorSpace = THREE.SRGBColorSpace;
        matcapTextureForTextInButton.needsUpdate = true;

        material.matcap = matcapTexture;
        material.opacity = 0.5;
        material.transparent = true;
        material.needsUpdate = true;

        materialForText.matcap = matcapTextureForText;
        materialForText.needsUpdate = true;

        materialForButton.matcap = matcapTextureForButton;
        materialForButton.needsUpdate = true;

        materialForTextInButton.matcap = matcapTextureForTextInButton;
        materialForTextInButton.needsUpdate = true;
    }, []);

    return (
        <>
            <Environment background={false} blur={0.1} files="/studio_small_08_4k.hdr" />
            {/* <Center>
                <Text3D
                    font="./fonts/Caveat_Regular.json"
                    size={mediaQueryDevice === 'desktop' ? 0.15 : 0.15}
                    height={mediaQueryDevice === 'desktop' ? 0.01 : 0.05}
                    curveSegments={4}
                    lineHeight={0.75}
                    bevelEnabled
                    bevelThickness={0.01}
                    bevelSize={0.01}
                    bevelOffset={0}
                    bevelSegments={15}
                    material={materialForText}
                >
                    {text}
                </Text3D>
            </Center> */}

            {[...Array(count)].map((_, i) => {
                return <Ring key={i} z={-(i / count) * depth - 20} />;
            })}

            <EffectComposer>
                <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={4} height={700} />
            </EffectComposer>

            {/* <mesh
                position={[0, -1.5, 0]}
                onPointerEnter={(instance) => {
                    gsap.to(instance.object.scale, { x: 0.9, y: 0.9, z: 0.9 });
                }}
                onPointerLeave={(instance) => {
                    gsap.to(instance.object.scale, { x: 1, y: 1, z: 1 });
                }}
            >
                <mesh geometry={boxGeometry} material={materialForButton} />
                <Center>
                    <Text3D
                        font="./fonts/Wix Madefor Display_Regular.json"
                        size={mediaQueryDevice === 'desktop' ? 0.1 : 0.05}
                        height={0.3}
                        curveSegments={12}
                        lineHeight={0.5}
                        bevelEnabled
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5}
                        material={materialForTextInButton}
                    >
                        смотреть далее
                    </Text3D>
                </Center>
            </mesh> */}
        </>
    );
};

export default Hello;
