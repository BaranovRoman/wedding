import { Vector3 } from 'three';
import { camerasData } from './data';

export const cameraLookAtVec = new Vector3(
    camerasData[1].cameraLookAt.x,
    camerasData[1].cameraLookAt.y,
    camerasData[1].cameraLookAt.z,
);
