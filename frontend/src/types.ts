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
