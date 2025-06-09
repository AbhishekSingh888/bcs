import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onFinish }: { onFinish: () => void }) {
    const [percent, setPercent] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable body scroll while loading
        document.body.style.overflow = "hidden";

        let current = 0;
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 7) + 1;
            if (current >= 100) {
                setPercent(100);
                clearInterval(interval);
                setTimeout(() => {
                    // Animate out with fade and slide
                    if (loaderRef.current) {
                        gsap.to(loaderRef.current, {
                            y: "-100%",
                            opacity: 0,
                            duration: 1,
                            ease: "power4.inOut",
                            onComplete: () => {
                                // Re-enable scroll after animation
                                document.body.style.overflow = "";
                                onFinish();
                            },
                        });
                    }
                }, 400);
            } else {
                setPercent(current);
            }
        }, 40);

        return () => {
            clearInterval(interval);
            // Clean up overflow in case component unmounts early
            document.body.style.overflow = "";
        };
    }, [onFinish]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white transition-all will-change-transform will-change-opacity"
            style={{ pointerEvents: "all" }}
        >
            <div className="text-5xl font-bold mb-4 tracking-widest">BCS</div>
            <div className="text-2xl font-mono">{percent}%</div>
            <div className="w-64 h-2 bg-gray-700 mt-6 rounded overflow-hidden">
                <div
                    className="h-full bg-green-400 transition-all"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
