import Lazyload from 'vanilla-lazyload';

export const lazyload =
    typeof window !== 'undefined'
        ? new Lazyload({
              elements_selector: 'img.lazy',
              threshold: 800,
              use_native: true,
          })
        : null;

export const videoLazyload =
    typeof window !== 'undefined'
        ? new Lazyload({
              elements_selector: 'video.lazy',
              threshold: 1000,
          })
        : null;
