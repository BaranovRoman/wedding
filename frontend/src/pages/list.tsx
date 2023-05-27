import { GetStaticProps } from 'next';
import { BasePageProps, PersonData } from '@/types';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from '../components/Model';
import { useRouter } from 'next/router';
import axios from 'axios';
import { guestData } from '@/guest-data';

import Link from 'next/link';

const ListPage = () => {
    return (
        <DefaultLayout>
            <div className="wrapper list">
                {guestData.map((item) => {
                    return (
                        <>
                            <Link href={`/#${item.hash}`}>{item.names}</Link>
                        </>
                    );
                })}
            </div>
        </DefaultLayout>
    );
};

export default ListPage;

export const getStaticProps: GetStaticProps<BasePageProps> = async () => {
    return {
        props: {
            bodyClass: 'list-page',
            // host: req.headers.host, // if SSR, or
            host: process.env.HOST || '', // if SSG
        },
    };
};
