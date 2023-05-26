import { GetStaticProps } from 'next';
import { BasePageProps } from '@/types';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from 'public/Model';

const IndexPage = () => {
    return (
        <DefaultLayout>
            <div className="wrapper">
                <div className="canvas-wrapper">
                    <Canvas
                        camera={{
                            position: [10, 15, 10],
                            fov: 32.27,
                            near: 10,
                            far: 1000,
                        }}
                    >
                        <ambientLight />
                        <pointLight position={[30, 30, 10]} />
                        <Model />
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
