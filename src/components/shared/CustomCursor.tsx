'use client';
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

// Throttle function to limit execution rate
const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Check if device is mobile
const isMobileDevice = () => {
    return (
        typeof window !== 'undefined' &&
        (window.navigator.userAgent.match(/Android/i) ||
            window.navigator.userAgent.match(/iPhone/i) ||
            window.navigator.userAgent.match(/iPad/i) ||
            window.navigator.userAgent.match(/iPod/i) ||
            window.navigator.userAgent.match(/BlackBerry/i) ||
            window.navigator.userAgent.match(/Windows Phone/i))
    );
};

interface CustomCursorProps {
    defaultSize?: number;
    activeSize?: number;
    inactivityTimeout?: number | null;
    disableOnMobile?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
    defaultSize = 40,
    activeSize = 60,
    inactivityTimeout = 3000,
    disableOnMobile = true,
}) => {
    const [cursorType, setCursorType] = useState<string>('default');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const cursorRef = useRef<HTMLDivElement>(null);
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isMobile = useRef<boolean>(false);

    useEffect(() => {
        isMobile.current = disableOnMobile && !!isMobileDevice();

        if (isMobile.current) {
            return; // Exit early if on mobile device
        }

        const cursor = cursorRef.current;
        if (!cursor) return;

        // Keep track of mouse coords
        let mouseX = 0;
        let mouseY = 0;

        // For trailing effect
        let posX = 0;
        let posY = 0;

        const render = () => {
            posX += (mouseX - posX) * 0.15;
            posY += (mouseY - posY) * 0.15;

            gsap.set(cursor, {
                x: posX,
                y: posY,
            });

            requestAnimationFrame(render);
        };

        // Throttle mousemove for performance
        const moveCursor = throttle(
            (e: MouseEvent) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                // Reset inactivity timer
                if (inactivityTimeout) {
                    setIsVisible(true);
                    if (inactivityTimerRef.current) {
                        clearTimeout(inactivityTimerRef.current);
                    }

                    inactivityTimerRef.current = setTimeout(() => {
                        setIsVisible(false);
                    }, inactivityTimeout);
                }
            },
            10
        );

        const handleHover = (e: Event) => {
            const target = e.target as HTMLElement;

            // Magnetic Cursor
            if (target.closest('button, a')) {
                const rect = target.getBoundingClientRect();
                gsap.to(cursorRef.current, {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    duration: 0.3,
                    ease: 'power3.out',
                });
                setCursorType('magnetic');
                return;
            }

            // Sticky Cursor
            if (target.closest('[data-sticky]')) {
                const rect = target.getBoundingClientRect();
                gsap.to(cursorRef.current, {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    duration: 0.3,
                    ease: 'power3.out',
                });
                setCursorType('sticky');
                return;
            }

            // Blob Cursor
            if (target.closest('[data-blob]')) {
                setCursorType('blob');
                return;
            }

            // Text Cursor
            if (target.closest('[data-text]')) {
                const text = target.getAttribute('data-text') || 'CLICK';
                cursorRef.current!.innerHTML = `<span>${text}</span>`;
                setCursorType('text');
                return;
            }

            // Media Cursor
            if (target.closest('[data-media]')) {
                const mediaSrc = target.getAttribute('data-media');
                cursorRef.current!.innerHTML = `<img src="${mediaSrc}" alt="preview" />`;
                setCursorType('media');
                return;
            }

            // Default Cursor
            setCursorType('default');
        };

        // Set initial inactivity timer
        if (inactivityTimeout) {
            inactivityTimerRef.current = setTimeout(() => {
                setIsVisible(false);
            }, inactivityTimeout);
        }

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        render(); // start animation loop

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, [inactivityTimeout, disableOnMobile]);

    useEffect(() => {
        const cursor = cursorRef.current;

        if (!cursor || isMobile.current) return;

        // Drag Cursor
        if (cursorType === 'drag') {
            gsap.to(cursor, {
                scale: 1.2,
                backgroundColor: 'var(--color-greenyellow)',
                mixBlendMode: 'difference',
                duration: 0.3,
                ease: 'power3.out',
            });
        }

        // Locked Cursor
        if (cursorType === 'locked') {
            const lockedElement = document.querySelector('[data-locked]');
            if (lockedElement) {
                const rect = lockedElement.getBoundingClientRect();
                gsap.to(cursor, {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                    scale: 1.5,
                    backgroundColor: 'var(--color-purple)',
                    mixBlendMode: 'exclusion',
                    duration: 0.3,
                    ease: 'power3.out',
                });
            }
        }

        // Media Cursor
        if (cursorType === 'media') {
            const mediaSrc = cursor.getAttribute('data-media');
            cursor.innerHTML = `<img src="${mediaSrc}" alt="preview" style="width: 100%; height: 100%; border-radius: 50%;" />`;
            gsap.to(cursor, {
                scale: 1.5,
                mixBlendMode: 'difference',
                duration: 0.3,
                ease: 'power3.out',
            });
        }

        // Default Cursor
        if (cursorType === 'default') {
            gsap.to(cursor, {
                scale: 1,
                width: defaultSize,
                height: defaultSize,
                opacity: isVisible ? 0.5 : 0,
                mixBlendMode: 'normal',
                duration: 0.3,
                ease: 'power3.out',
            });
        } else {
            gsap.to(cursor, {
                scale: 1.5,
                width: activeSize,
                height: activeSize,
                opacity: isVisible ? 1 : 0,
                mixBlendMode: 'normal',
                duration: 0.3,
                ease: 'power3.out',
            });
        }
    }, [cursorType, isVisible, defaultSize, activeSize]);

    // Don't render cursor on mobile
    if (isMobile.current) return null;

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${cursorType}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${defaultSize}px`,
                height: `${defaultSize}px`,
                borderRadius: '50%',
                border: '2px solid transparent',
                pointerEvents: 'none',
                zIndex: 9999,
                opacity: isVisible ? 0.5 : 0,
                transform: 'translate(-50%, -50%)',
            }}
        ></div>
    );
};

export default CustomCursor;
