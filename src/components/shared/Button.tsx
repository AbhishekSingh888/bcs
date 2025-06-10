'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, href = '#', className = '' }) => {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const span = spanRef.current;

        if (!button || !span) return;

        const handleMouseEnter = () => {
            gsap.timeline()
                .to(span, { duration: 0.2, yPercent: -150, ease: 'power2.in' })
                .set(span, { yPercent: 150 })
                .to(span, { duration: 0.2, yPercent: 0, ease: 'power2.out' });
        };

        const handleMouseLeave = () => {
            gsap.timeline()
                .to(span, { duration: 0.2, yPercent: 150, ease: 'power2.in' })
                .set(span, { yPercent: -150 })
                .to(span, { duration: 0.2, yPercent: 0, ease: 'power2.out' });
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <a
            href={href}
            ref={buttonRef}
            className={`inline-grid border border-black rounded-full px-6 py-2 w-40 text-center text-black overflow-hidden relative ${className}`}
        >
            <span
                ref={spanRef}
                className="block will-change-transform"
            >
                {children}
            </span>
        </a>
    );
};

export default AnimatedButton;
