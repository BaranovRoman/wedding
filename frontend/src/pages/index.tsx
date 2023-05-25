import { GetStaticProps } from 'next';
import { BasePageProps } from '@/types';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';

const Model = ({ url }: { url: string }) => {
    const gltf = useLoader(GLTFLoader, url);
    const modelRef = useRef();
    const { scene } = useThree();

    // Добавляем модель в сцену
    scene.add(gltf.scene);

    return <primitive ref={modelRef} object={gltf.scene} />;
};

const IndexPage = () => {
    return (
        <DefaultLayout>
            <div className="wrapper">
                <h1>Barash wedding</h1>
                <div className="canvas-wrapper">
                    <Canvas>
                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <Model url="model.glb" />
                    </Canvas>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<BasePageProps> = async () => {
    return {
        props: {
            bodyClass: 'index-page',
            // host: req.headers.host, // if SSR, or
            host: process.env.HOST || '', // if SSG
        },
    };
};
