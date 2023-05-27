import { GetStaticProps } from 'next';
import { BasePageProps } from '@/types';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from '../components/Model';
import { useRouter } from 'next/router';

import { guestData } from '@/guest-data';

const IndexPage = () => {
    const { asPath } = useRouter();
    const [hash, setHash] = useState('');

    useEffect(() => {
        setHash((asPath as string).split('#')[1]);
    }, [asPath]);

    useEffect(() => {
        if (hash) {
            const data = guestData.find((item) => {
                return item.hash === hash;
            });
            if (data) {
                alert(`Дорогие ${data.names} - ${data.welcome}`);
            }
        }
    }, [hash]);

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
