import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { memo, useMemo, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { useScreensState } from '../../atoms/screens';
import { camerasData } from '../../data';
import { cameraLookAtVec } from '../../lookAtVec';

const interpolate = (a: number, b: number, frac: number) => a + (b - a) * frac;

const isTouch = typeof window !== 'undefined' ? (window as any).matchMedia('(pointer: coarse)').matches : false;
const fallbackFrom = { x: 1.453, y: 2.278, z: -5.302 };
const fallback = camerasData[9];

const FlyingCamera = () => {
    const ghostMesh = useRef<Mesh>(null);

    const scroll = useScroll();
    (window as any)._scrollEl = scroll.el;
    const [currentScreen, setCurrentScreen] = useScreensState();
    const cameraPosVec = useMemo(() => new Vector3(), []);

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
                                // (data[i + 2] || fallback).from.x,
                                (camerasData[i + 2] ? camerasData[i + 2].from : fallbackFrom).x,
                                range,
                            ),
                            interpolate(
                                camerasData[i + 1].from.y,
                                // (data[i + 2] || fallback).from.y,
                                (camerasData[i + 2] ? camerasData[i + 2].from : fallbackFrom).y,
                                range,
                            ),
                            interpolate(
                                camerasData[i + 1].from.z,
                                // (data[i + 2] || fallback).from.z,
                                (camerasData[i + 2] ? camerasData[i + 2].from : fallbackFrom).z,
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
