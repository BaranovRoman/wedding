import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';
import { useProgress } from '@react-three/drei';
import { useCountUp } from 'react-countup';
import { usePreloaderReadyState } from '@/atoms/preloader-ready';
import { useDebounce } from '@/hooks/use-debounce';
import { useGpuState } from '@/atoms/gpu';

type Props = {};

const PreloaderHtml = ({}: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);
    const [gpuState] = useGpuState();

    const progress = useProgress((state) => state.progress);
    const debouncedProgress = useDebounce(progress, 1300);
    const [_, setPreloaderReady] = usePreloaderReadyState();

    const { update } = useCountUp({
        ref: counterRef,
        start: 0,
        end: 0,
        duration: 1,
        useEasing: true,
    });

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            setIsVisible(true);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (gpuState) {
            update(progress);
        }
    }, [update, gpuState, progress]);

    useEffect(() => {
        if (debouncedProgress === 100) {
            setPreloaderReady(true);
        }
    }, [debouncedProgress, setPreloaderReady]);

    return (
        <div
            className={classNames('preloader', {
                'is-animating': isVisible,
                'preloader--leaving': debouncedProgress === 100,
            })}
        >
            <div className="preloader-inner-el">
                <div className="ram-and-squirell">
                    <div className="ram">
                        <Image src="/img/ram.gif" alt="" width="640" height="360" priority />
                    </div>
                    <div className="squirell">
                        <Image src="/img/squirell.gif" alt="" width="280" height="210" priority />
                    </div>
                </div>
                <div className="preloader-bottom">
                    <div className="preloader-progress">
                        <span ref={counterRef}>0</span>%
                    </div>
                    <div className="preloader-progressbar">
                        <div
                            className="preloader-progressbar__item"
                            style={{
                                transform: `scaleX(${Math.round(progress) / 100})`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreloaderHtml;
