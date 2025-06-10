import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onFinish }: { onFinish: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline();

        tl.fromTo(
            loaderRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        );

        // Animate first word
        if (textRef1.current) {
            const letters1 = textRef1.current.children;
            tl.fromTo(
                letters1,
                { y: 100, opacity: 0, rotation: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "back.out(1.7)",
                },
                "-=0.4"
            );
        }

        // Animate second word after first
        if (textRef2.current) {
            const letters2 = textRef2.current.children;
            tl.fromTo(
                letters2,
                { y: 100, opacity: 0, rotation: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "back.out(1.7)",
                },
                "-=0.5"
            );
        }

        // Auto-finish after 2.2s (or customize as needed)
        const finishTimeout = setTimeout(() => {
            gsap.to(loaderRef.current, {
                opacity: 0,
                scale: 0.92,
                duration: 0.7,
                ease: "power2.inOut",
                onComplete: () => {
                    onFinish();
                },
            });
        }, 2200);

        return () => {
            document.body.style.overflow = "";
            clearTimeout(finishTimeout);
        };
    }, [onFinish]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-white transition-all will-change-transform will-change-opacity overflow-hidden"
            style={{
                pointerEvents: "all",
                background: "linear-gradient(120deg, #18181b 0%, #23272f 100%)",
                // fallback for browsers without gradient support
                backgroundColor: "#18181b",
            }}
        >
            {/* Animated background gradient overlay */}
            <div
                className="absolute inset-0 -z-10 animate-gradient-move"
                style={{
                    background:
                        "linear-gradient(120deg, #18181b 60%, #23272f 100%)",
                    opacity: 0.85,
                }}
            />
            <div className="flex flex-col items-center mb-8">
                <div
                    ref={textRef1}
                    className="flex text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg"
                >
                    {"BHARTIYA".split("").map((letter, index) => (
                        <span key={index} className="inline-block">
                            {letter}
                        </span>
                    ))}
                </div>
                <div
                    ref={textRef2}
                    className="flex text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg"
                >
                    {"CONSULTANTS".split("").map((letter, index) => (
                        <span key={index} className="inline-block">
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
            {/* Modern spinner and loading text */}
            <div className="mt-6 flex flex-col items-center">
                <div className="w-8 h-8 mb-2 border-4 border-t-transparent border-white rounded-full animate-spin" />
                <div className="text-sm font-light tracking-widest opacity-80">
                    LOADING...
                </div>
            </div>
            {/* Gradient animation keyframes */}
            <style jsx>{`
                .animate-gradient-move {
                    background-size: 200% 200%;
                    animation: gradientMove 3s ease-in-out infinite;
                }
                @keyframes gradientMove {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </div>
    );
}
