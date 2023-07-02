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
    const [welcomeMessage, setWelcomeMessage] = useState(`
    <p>Мы счастливы объявить, что наши сердца сольются в одно, и мы с нетерпением ждем этого особого момента в нашей жизни. Мы приглашаем вас разделить с нами радость и счастье в день нашей свадьбы!</p>

    <p>Мы хотим, чтобы это был особый день, наполненный любовью, смехом и незабываемыми моментами. В этот день мы будем обмениваться обетами и обещаниями перед свидетелями нашей любви - вами, нашими дорогими гостями.</p>

    <p>Приглашаем вас присоединиться к нам и стать свидетелями нашего союза. Ваше присутствие на этом важном событии для нас невероятно ценно. Вместе мы создадим незабываемые воспоминания, которые будут сопровождать нас всю жизнь.</p>

    <p>Просим вас сохранить эту дату и с радостью отметить с нами наше великое счастье.</p>

    <p>Мы с нетерпением ждем, чтобы поделиться этим особенным днем с вами!</p>


    `);
    const [names, setNames] = useState('друзья');
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
            <HelloHtml
                text={welcomeMessage}
                names={names}
                pair={data ? data.pair : true}
                pron={data ? data.pron : ''}
            />

            {data && (
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
            )}
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
