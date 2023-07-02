import { TreeOne } from './trees/TreeOne';
import { TreeFour } from './trees/TreeFour';
import { TreeSix } from './trees/TreeSix';
import { TreeSeven } from './trees/TreeSeven';
import { Float } from '@react-three/drei';
import { ElementType } from 'react';

type ArrayItem = {
    tag: ElementType;
    position: [number, number, number];
};

function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const models: ElementType[] = [TreeOne, TreeFour, TreeSix, TreeSeven];

const leftPartArray: ArrayItem[] = Array.from({ length: 40 }, () => {
    return {
        tag: models[getRandomInt(0, models.length - 1)],
        position: [randomNumber(-23, -6), -0.1, randomNumber(-29, 7)],
    };
});

const centerPartArray: ArrayItem[] = Array.from({ length: 25 }, () => {
    return {
        tag: models[getRandomInt(0, models.length - 1)],
        position: [randomNumber(-4.5, 7), -0.1, randomNumber(-29, -13)],
    };
});

const rightPartArray: ArrayItem[] = Array.from({ length: 10 }, () => {
    return {
        tag: models[getRandomInt(0, models.length - 1)],
        position: [randomNumber(7, 15), -0.1, randomNumber(-29, 7)],
    };
});

const array: ArrayItem[] = [...leftPartArray, ...centerPartArray, ...rightPartArray];

type Props = {
    opacity: React.MutableRefObject<number>;
};

const Trees = ({ opacity }: Props) => {
    return (
        <>
            {array.map((item, i) => {
                const Tag = item.tag;
                return (
                    <Float speed={2} floatIntensity={0} rotationIntensity={0.02} key={i}>
                        <Tag position={item.position} sceneOpacity={opacity} />
                    </Float>
                );
            })}
        </>
    );
};

export default Trees;
