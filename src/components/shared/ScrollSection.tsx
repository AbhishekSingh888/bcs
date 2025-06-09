'use client';
import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './SmoothScrollProvider';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  snapToSection?: boolean;
  parallaxStrength?: number; // 0-1 value for parallax effect strength
  parallaxDirection?: 'up' | 'down' | 'left' | 'right';
  darkMode?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

const ScrollSection = ({
  children,
  id,
  className = '',
  snapToSection = false,
  parallaxStrength = 0,
  parallaxDirection = 'up',
  darkMode = false,
  onEnter,
  onLeave,
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Calculate parallax values
    let xTo = 0;
    let yTo = 0;
    const parallaxValue = parallaxStrength * 100; // Convert to percentage

    switch (parallaxDirection) {
      case 'up':
        yTo = parallaxValue;
        break;
      case 'down':
        yTo = -parallaxValue;
        break;
      case 'left':
        xTo = parallaxValue;
        break;
      case 'right':
        xTo = -parallaxValue;
        break;
    }

    // Create parallax effect if strength > 0
    let parallaxTl: gsap.core.Timeline | null = null;
    
    if (parallaxStrength > 0) {
      parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      parallaxTl.fromTo(
        contentRef.current,
        { x: 0, y: 0 },
        { x: xTo, y: yTo, ease: 'none' }
      );
    }
    
    // Create snap scroll if enabled
    let snapScrollTrigger: ScrollTrigger | null = null;
    
    if (snapToSection) {
      snapScrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 20%',
        end: 'bottom 80%',
        onEnter: () => {
          if (sectionRef.current) {
            lenis?.scrollTo(sectionRef.current, { duration: 1.2 });
          }
          onEnter?.();
        },
        onEnterBack: () => {
          if (sectionRef.current) {
            lenis?.scrollTo(sectionRef.current, { duration: 1.2 });
          }
          onEnter?.();
        },
        onLeave: () => onLeave?.(),
        onLeaveBack: () => onLeave?.(),
      });
    }

    return () => {
      parallaxTl?.kill();
      snapScrollTrigger?.kill();
    };
  }, [lenis, snapToSection, parallaxStrength, parallaxDirection, onEnter, onLeave]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${
        snapToSection ? 'min-h-screen' : ''
      } ${darkMode ? 'bg-gray-900 text-white' : ''} ${className}`}
    >
      <div ref={contentRef} className="relative w-full h-full">
        {children}
      </div>
    </section>
  );
};

export default ScrollSection;
