import { ReactNode, createContext, useContext, useState } from 'react';

const Context = createContext<any>(undefined);

export const PlayProvider = ({ children }: { children: ReactNode }) => {
    const [play, setPlay] = useState(false);
    const [end, setEnd] = useState(false);
    const [hasScroll, setHasScroll] = useState(false);
    const [isHelloVisible, setIsHelloVisible] = useState(true);

    return (
        <Context.Provider
            value={{
                play,
                setPlay,
                end,
                setEnd,
                hasScroll,
                setHasScroll,
                isHelloVisible,
                setIsHelloVisible,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const usePlay = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('usePlay must be used within a PlayProvider');
    }

    return context;
};
