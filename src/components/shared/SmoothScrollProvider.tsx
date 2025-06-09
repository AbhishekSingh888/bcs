'use client';
import { ReactNode, useEffect, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextType {
    lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            allowNestedScroll: true,
            smoothWheel: true,
            
        });

        // Connect Lenis to ScrollTrigger
        lenisInstance.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
        });

        // Update ScrollTrigger when smooth scrolling updates
        gsap.ticker.lagSmoothing(0);

        setLenis(lenisInstance);

        return () => {
            lenisInstance.destroy();
            gsap.ticker.remove(lenisInstance.raf);
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={{ lenis }}>
            {children}
        </SmoothScrollContext.Provider>
    );
};

export default SmoothScrollProvider;