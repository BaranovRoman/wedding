import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { useScreensState } from '../../../atoms/screens';
import { camerasData } from '../../../data';
import { cameraLookAtVec } from '../../../lookAtVec';
import { usePlay } from '@/contexts/play';

const interpolate = (a: number, b: number, frac: number) => a + (b - a) * frac;

const isTouch = typeof window !== 'undefined' ? (window as any).matchMedia('(pointer: coarse)').matches : false;
// const fallbackFrom = { x: 1.453, y: 2.278, z: -5.302 };
const fallbackFrom = { x: -0.074663, y: 1.543883, z: -8.161812 };
const fallback = camerasData[Object.keys(camerasData).length];

const firstFallback = { x: 10, y: 10, z: 31 };

const FlyingCamera = () => {
    const ghostMesh = useRef<Mesh>(null);
    const { setEnd } = usePlay();

    const scroll = useScroll();
    (window as any)._scrollEl = scroll.el;
    const [currentScreen, setCurrentScreen] = useScreensState();
    const cameraPosVec = useMemo(() => new Vector3(), []);
    const timeout = useRef<NodeJS.Timeout>();

    const onScroll = useCallback(() => {
        clearTimeout(timeout.current);
        if (scroll.offset > 0.9) {
            timeout.current = setTimeout(() => {
                setEnd(true);
            }, 3000);
        }
    }, [scroll, setEnd]);

    useEffect(() => {
        scroll.el.addEventListener('scroll', onScroll);
        return () => {
            scroll.el.removeEventListener('scroll', onScroll);
        };
    }, [scroll, onScroll]);

    useFrame((state) => {
        const scrollOffset = scroll.offset;
        (window as any)._scrollOffset = scrollOffset;

        for (let i = 0; i < scroll.pages; i++) {
            if (scrollOffset >= i / scroll.pages && scrollOffset < (i + 1) / scroll.pages) {
                if (camerasData[i + 1]) {
                    if (currentScreen !== i + 1) {
                        setCurrentScreen(i + 1);
                    }
                    const range = scroll.range(i / scroll.pages, 1 / scroll.pages);

                    // fallbackFrom
                    state.camera.position.lerp(
                        cameraPosVec.set(
                            interpolate(
                                camerasData[i + 1].from.x,
                                (camerasData[i + 2] ? camerasData[i + 2] : fallback).from.x,
                                range,
                            ),
                            interpolate(
                                camerasData[i + 1].from.y,
                                (camerasData[i + 2] ? camerasData[i + 2] : fallback).from.y,
                                range,
                            ),
                            interpolate(
                                camerasData[i + 1].from.z,
                                (camerasData[i + 2] ? camerasData[i + 2] : fallback).from.z,
                                range,
                            ),
                        ),
                        // isTouch ? 0.1 : 0.08,
                        0.08,
                    );

                    if (ghostMesh.current) {
                        ghostMesh.current.position.lerp(
                            cameraLookAtVec.set(
                                interpolate(
                                    camerasData[i + 1].cameraLookAt.x,
                                    (camerasData[i + 2] || fallback).cameraLookAt.x,
                                    range,
                                ),
                                interpolate(
                                    camerasData[i + 1].cameraLookAt.y,
                                    (camerasData[i + 2] || fallback).cameraLookAt.y,
                                    range,
                                ),
                                interpolate(
                                    camerasData[i + 1].cameraLookAt.z,
                                    (camerasData[i + 2] || fallback).cameraLookAt.z,
                                    range,
                                ),
                            ),
                            // isTouch ? 0.1 : 0.06,
                            0.06,
                        );

                        state.camera.lookAt(ghostMesh.current.position);
                    }
                }

                break;
            }
        }
    });

    return <mesh ref={ghostMesh} name="ghost" />;
};

export default memo(FlyingCamera);
