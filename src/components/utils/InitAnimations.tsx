'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useSmoothScroll } from '@/components/shared/SmoothScrollProvider';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function InitAnimations() {
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (!lenis) return;

    // Global animation defaults
    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
    });

    // Setup ScrollTrigger to work with Lenis
    ScrollTrigger.refresh();

    // Default animations for common elements as they come into view
    const setupDefaultAnimations = () => {
      // Headings animation
      gsap.utils.toArray('.animate-title').forEach((element: any) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
            },
          }
        );
      });

      // Paragraphs animation
      gsap.utils.toArray('.animate-paragraph').forEach((element: any) => {
        gsap.fromTo(
          element,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
            },
          }
        );
      });

      // Images animation
      gsap.utils.toArray('.animate-image').forEach((element: any) => {
        gsap.fromTo(
          element,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
            },
          }
        );
      });

      // Cards animation
      gsap.utils.toArray('.animate-card').forEach((element: any, index: number) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
            },
          }
        );
      });

      // Background parallax elements
      gsap.utils.toArray('.parallax-bg').forEach((element: any) => {
        gsap.fromTo(
          element,
          { y: 0 },
          {
            y: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentNode,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    };

    // Only run animations after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setupDefaultAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [lenis]);

  return null;
}
