import { GetStaticProps } from 'next';
import { BasePageProps, PersonData } from '@/types';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useRouter } from 'next/router';
import axios from 'axios';
import { guestData } from '@/data';
import WebGL from '@/components/webgl/WebGL';
import { useMediaQueryDeviceState } from '@/atoms/media-query-device';
import HelloHtml from '@/components/dom/HelloHtml';
import { usePlay } from '@/contexts/play';
import { motion } from 'framer-motion';
import RsypHtml from '@/components/dom/RsypHtml';
import { Loader } from '@react-three/drei';

import PreloaderHtml from '@/components/dom/PreloaderHtml';
import { usePreloaderReadyState } from '@/atoms/preloader-ready';
import { useDebounce } from '@/hooks/use-debounce';
import classNames from 'classnames';
import WebGLWithGPUCheck from '@/components/webgl/WebGLWithGPUCheck';

const IndexPage = () => {
    const { asPath } = useRouter();
    const [hash, setHash] = useState('');
    const [data, setData] = useState<PersonData | null>(null);
    const [mediaQueryDevice] = useMediaQueryDeviceState();
    const [welcomeMessage, setWelcomeMessage] = useState('Приветствуем, \nна нашем сайте');
    const [names, setNames] = useState('');
    const { isHelloVisible, end, setEnd } = usePlay();
    const [preloaderReady] = usePreloaderReadyState();
    const debouncedPreloaderReady = useDebounce(preloaderReady, 1000);

    useEffect(() => {
        setHash((asPath as string).split('#')[1]);
    }, [asPath]);

    useEffect(() => {
        if (hash) {
            const personData = guestData.find((item) => {
                return item.hash === hash;
            });

            if (personData) {
                setData(personData);
            }
        }
    }, [hash]);

    useEffect(() => {
        if (data && mediaQueryDevice) {
            setWelcomeMessage(data.welcome);
            setNames(data.names);
        }
    }, [data, mediaQueryDevice]);

    return (
        <DefaultLayout>
            <HelloHtml text={welcomeMessage} names={names} />

            <motion.button
                variants={{
                    visible: {
                        opacity: 1,
                        pointerEvents: 'auto',
                    },
                    hidden: {
                        opacity: 0,
                        pointerEvents: 'none',
                    },
                }}
                animate={!isHelloVisible && !end ? 'visible' : 'hidden'}
                className="button rsyp"
                onClick={() => {
                    setEnd(true);
                }}
            >
                <div className="button__inner">Подтвердить участие</div>
            </motion.button>
            {data && <RsypHtml data={data} />}
            <WebGLWithGPUCheck />
            <PreloaderHtml />
            {/* {!debouncedPreloaderReady && <PreloaderHtml />} */}
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
