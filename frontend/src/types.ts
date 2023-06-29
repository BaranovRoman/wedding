export interface PageTransition {
    from?: string;
    to?: string;
    leave: () => gsap.core.Timeline;
}

export interface BasePageProps {
    bodyClass?: string;
    host?: string;
}

export interface ImageShape {
    src: string;
    width: number;
    height: number;
}

export type PersonData = {
    hash: string;
    names: string;
    welcome: string;
    welcome_mobile: string;
    accept_script_id: string;
    decline_script_id: string;
};

export type Vector = { x: number; y: number; z: number };
