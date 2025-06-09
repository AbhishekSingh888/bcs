import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onFinish }: { onFinish: () => void }) {
    const [percent, setPercent] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable body scroll while loading
        document.body.style.overflow = "hidden";

        // Create timeline for entrance animations
        const tl = gsap.timeline();

        // Animate container entrance
        tl.fromTo(
            loaderRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        );

        // Animate BCS letters with stagger
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

        // Animate percentage entrance
        tl.fromTo(
            percentRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3"
        );

        // Create floating particles animation
        if (particlesRef.current) {
            const particles = particlesRef.current.children;
            gsap.set(particles, {
                x: () => gsap.utils.random(-50, 50),
                y: () => gsap.utils.random(-50, 50),
                scale: () => gsap.utils.random(0.5, 1.5),
                opacity: () => gsap.utils.random(0.3, 0.8),
            });

            gsap.to(particles, {
                y: "-=20",
                duration: 2,
                repeat: -1,
                yoyo: true,
                stagger: 0.2,
                ease: "sine.inOut",
            });

            gsap.to(particles, {
                rotation: 360,
                duration: 4,
                repeat: -1,
                stagger: 0.1,
                ease: "none",
            });
        }

        // Add pulsing effect to main text
        gsap.to(textRef.current, {
            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Progress counter logic
        let current = 0;
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 7) + 1;
            if (current >= 100) {
                setPercent(100);
                clearInterval(interval);

                // Animate progress bar fill to 100% smoothly
                gsap.to(progressFillRef.current, {
                    width: "100%",
                    duration: 0.3,
                    ease: "power2.out",
                });

                setTimeout(() => {
                    // Create exit animation timeline
                    const exitTl = gsap.timeline();

                    // Flash effect
                    exitTl.to(loaderRef.current, {
                        backgroundColor: "#ffffff",
                        duration: 0.2,
                        ease: "power2.inOut",
                    });

                    exitTl.to(loaderRef.current, {
                        backgroundColor: "#000000",
                        duration: 0.2,
                        ease: "power2.inOut",
                    });

                    // Scale up and fade out particles
                    exitTl.to(
                        particlesRef.current?.children || [],
                        {
                            scale: 2,
                            opacity: 0,
                            duration: 0.5,
                            stagger: 0.05,
                            ease: "power2.out",
                        },
                        "-=0.3"
                    );

                    // Animate text out
                    exitTl.to(
                        textRef.current?.children || [],
                        {
                            y: -50,
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.4,
                            stagger: 0.05,
                            ease: "power2.in",
                        },
                        "-=0.2"
                    );

                    // Animate progress elements out
                    exitTl.to(
                        [progressBarRef.current, percentRef.current],
                        {
                            y: 30,
                            opacity: 0,
                            duration: 0.4,
                            ease: "power2.in",
                        },
                        "-=0.2"
                    );

                    // Final container exit
                    exitTl.to(loaderRef.current, {
                        y: "-100%",
                        scale: 1.1,
                        duration: 1,
                        ease: "power4.inOut",
                        onComplete: () => {
                            document.body.style.overflow = "";
                            onFinish();
                        },
                    });
                }, 400);
            } else {
                setPercent(current);
                // Animate progress bar fill
                gsap.to(progressFillRef.current, {
                    width: `${current}%`,
                    duration: 0.1,
                    ease: "power2.out",
                });
            }
        }, 40);

        return () => {
            clearInterval(interval);
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
                ref={particlesRef}
                className="absolute inset-0 pointer-events-none"
            >
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-red-400 rounded-full"
                        style={{
                            left: `${10 + i * 7}%`,
                            top: `${20 + i * 5}%`,
                        }}
                    />
                ))}
            </div>

            <div
                ref={textRef}
                className="flex text-2xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-wide"
            >
                {"BHARTIYACONSULTANTS".split("").map((letter, index) => (
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
