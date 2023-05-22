export const calculateScrollbarWidth = () => {
    const calculateScrollbarWidth = () => {
        const diff = window.innerWidth - document.documentElement.offsetWidth;
        const scrollbarWidth = diff > 1 ? diff : 0;

        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    };

    const resizeObserver = window?.ResizeObserver ? new ResizeObserver(calculateScrollbarWidth) : null;

    if (typeof window !== 'undefined') {
        if (resizeObserver) {
            resizeObserver.observe(document.documentElement);
        } else {
            window.addEventListener('resize', calculateScrollbarWidth);
        }
    }

    calculateScrollbarWidth();

    return () => {
        if (typeof window !== 'undefined') {
            resizeObserver?.disconnect();
            window.removeEventListener('resize', calculateScrollbarWidth);
        }
    };
};
