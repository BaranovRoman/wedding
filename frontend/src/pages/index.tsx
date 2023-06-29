import { GetStaticProps } from 'next';
import { BasePageProps, PersonData } from '@/types';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
// import { Model } from '../components/Model';
// import { Model } from '../components/NewModel';
import { Model } from '../components/ExportModel';
import { useRouter } from 'next/router';
import axios from 'axios';
import { guestData } from '@/data';
import WebGL from '@/components/webgl/WebGL/WebGL';
import { useMediaQueryDeviceState } from '@/atoms/media-query-device';
import HelloHtml from '@/components/dom/HelloHtml';

const IndexPage = () => {
    const { asPath } = useRouter();
    const [hash, setHash] = useState('');
    const [data, setData] = useState<PersonData | null>(null);
    const [mediaQueryDevice] = useMediaQueryDeviceState();
    const [welcomeMessage, setWelcomeMessage] = useState('Приветствуем, \nна нашем сайте');

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
            setWelcomeMessage(mediaQueryDevice !== 'desktop' ? data.welcome_mobile : data.welcome);
        }
    }, [data, mediaQueryDevice]);

    const fetchToSheet = (script_id: string) => {
        axios
            .get(`https://script.google.com/macros/s/${script_id}/exec`)
            .then(function (response) {
                console.log('Запрос успешно выполнен');
            })
            .catch(function (error) {
                console.log('Произошла ошибка');
            });
    };

    return (
        <DefaultLayout>
            <div className="wrapper">
                <div className="canvas-wrapper">
                    {/* {data && (
                        <div className="banner">
                            <h1>
                                Приветствуем, {data.names} - сообщение для вас - {data.welcome}
                            </h1>
                            <button
                                type="button"
                                className="button accept"
                                onClick={() => {
                                    fetchToSheet(data.accept_script_id);
                                }}
                            >
                                Подтвердить участие
                            </button>
                            <button
                                type="button"
                                className="button decline"
                                onClick={() => {
                                    fetchToSheet(data.decline_script_id);
                                }}
                            >
                                Отклонить участие
                            </button>
                        </div>
                    )} */}
                    <HelloHtml />
                    <WebGL helloText={welcomeMessage} />
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
