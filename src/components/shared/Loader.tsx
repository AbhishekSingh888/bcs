import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onFinish }: { onFinish: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline();

        tl.fromTo(
            loaderRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        );

        if (textRef.current) {
            const letters = textRef.current.children;
            tl.fromTo(
                letters,
                { y: 100, opacity: 0, rotation: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                },
                "-=0.4"
            );
        }

        // Animate progress bar entrance
        tl.fromTo(
            progressBarRef.current,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.2"
        );

        // Animate progress fill
        tl.to(
            progressFillRef.current,
            {
                width: "100%",
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    // Fade out loader and call onFinish
                    gsap.to(loaderRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: onFinish,
                    });
                },
            },
            "-=0.2"
        );

        return () => {
            document.body.style.overflow = "";
        };
    }, [onFinish]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white transition-all will-change-transform will-change-opacity overflow-hidden"
            style={{ pointerEvents: "all" }}
        >
            

            <div
                ref={textRef}
                className="flex text-2xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-wide"
            >
                {"BHARTIYA CONSULTANTS".split("").map((letter, index) => (
                    <span key={index} className="inline-block">
                        {letter}
                    </span>
                ))}
            </div>


            <div
                ref={progressBarRef}
                className="w-80 h-1 bg-gray-800 rounded-full overflow-hidden relative"
            >
                <div
                    ref={progressFillRef}
                    className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full relative"
                    style={{ width: "0%" }}
                >
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
                </div>
            </div>

            {/* Loading text */}
            <div className="mt-6 text-sm font-light tracking-widest opacity-60 animate-pulse">
                LOADING...
            </div>
        </div>
    );
}
