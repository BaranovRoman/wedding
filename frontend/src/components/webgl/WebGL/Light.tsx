import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

const Light = () => {
    const lightRef = useRef();
    const [prevYDirection, setPrevYDirection] = useState<'up' | 'down'>('down');
    const [prevXDirection, setPrevXDirection] = useState<'left' | 'right'>('left');

    useFrame((state, delta) => {
        if (lightRef.current) {
            // if (prevYDirection === 'down' && lightRef.current.position.y > 3) {
            //     lightRef.current.position.y += delta * -0.1;
            //     setPrevYDirection('down');
            // } else if (prevYDirection === 'down' && lightRef.current.position.y < 3) {
            //     lightRef.current.position.y += delta * 0.1;
            //     setPrevYDirection('up');
            // }

            // if (prevYDirection === 'up' && lightRef.current.position.y < 6) {
            //     lightRef.current.position.y += delta * 0.1;
            //     setPrevYDirection('up');
            // } else if (prevYDirection === 'up' && lightRef.current.position.y > 6) {
            //     lightRef.current.position.y += delta * -0.1;
            //     setPrevYDirection('down');
            // }

            // if (prevYDirection === 'left' && lightRef.current.position.x > 1) {
            //     lightRef.current.position.y += delta * -0.1;
            //     setPrevXDirection('left');
            // } else if (prevYDirection === 'left' && lightRef.current.position.x < 1) {
            //     lightRef.current.position.y += delta * 0.1;
            //     setPrevXDirection('right');
            // }

            // if (prevXDirection === 'right' && lightRef.current.position.x < 6) {
            //     lightRef.current.position.y += delta * 0.1;
            //     setPrevXDirection('right');
            // } else if (prevXDirection === 'right' && lightRef.current.position.x > 6) {
            //     lightRef.current.position.y += delta * -0.1;
            //     setPrevXDirection('left');
            // }

            lightRef.current.position.x = 3 + Math.sin(state.clock.elapsedTime / 30) * 3;
            lightRef.current.position.z = 4 + Math.cos(state.clock.elapsedTime / 30) * 3;
        }
    });
    // useHelper(lightRef, THREE.DirectionalLightHelper);
    return (
        <directionalLight
            ref={lightRef}
            position={[3, 5, 4]}
            intensity={0.1}
            castShadow
            shadow-mapSize-height={2048}
            shadow-mapSize-width={2048}
            shadow-camera-near={1}
            shadow-camera-far={20}
            shadow-camera-left={-10}
        />
    );
};

export default Light;
