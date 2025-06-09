'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Urbanist } from 'next/font/google';
import Button from '@/components/shared/Button'

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
})

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set initial state for text container and video container
    if (textContainerRef.current) {
      gsap.set(textContainerRef.current, { opacity: 1, y: 0 })
    }

    if (videoContainerRef.current) {
      gsap.set(videoContainerRef.current, {
        scale: 0.95,
        borderRadius: '2rem'
      })
    }

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      }
    })

    // Text animations with better performance
    if (titleRef.current && subtitleRef.current) {
      if (typeof SplitText !== 'undefined') {
        const splitTitle = new SplitText(titleRef.current, { type: 'words' })
        const splitSubtitle = new SplitText(subtitleRef.current, { type: 'words' })

        tl.from(splitTitle.words, {
          duration: 0.8,
          opacity: 0,
          y: 20,
          stagger: 0.05,
          ease: 'power2.out',
        })

          .from(splitSubtitle.words, {
            duration: 0.8,
            opacity: 0,
            y: 30,
            stagger: 0.08,
            ease: 'power2.out',
          }, "-=0.3")
      }
    }

    // Optimized scroll effects
    if (textContainerRef.current && videoContainerRef.current) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: '+=600',
          scrub: 1,
        }
      })
        .to(textContainerRef.current, {
          opacity: 0,
          y: -60,
          ease: 'power2.out',
        }, 0)
        .to(videoContainerRef.current, {
          scale: 2.4,
          y: -100,
          borderRadius: '0rem',
          ease: 'none',
        }, 0)
    }

    // Fade in scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out'
      })
    }
  }, [])

  const handleScrollClick = () => {
    if (typeof window !== 'undefined') {
      const nextSection = document.querySelector('.hero-section-next')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className='hero-section relative h-screen w-full overflow-hidden flex items-center justify-center bg-white'>
      <div
        ref={videoContainerRef}
        className="absolute inset-1 z-0 overflow-hidden will-change-transform rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/40 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/consulting-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 opacity-0">
          <Image
            src="/images/hero/consulting-bg-fallback.jpg"
            alt="BSC Consulting"
            fill
            sizes="100vw"
            priority={false}
            className="object-cover"
          />
        </div>
      </div>

      <div
        ref={textContainerRef}
        className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-6 md:px-12"
      >
        <h1
          ref={titleRef}
          className={`${urbanist.className} text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6`}
        >
          <span className="text-orange-600 bg-clip-text">
            Empowering Growth,
          </span>
          <br />
          <span className="inline-block transition-transform duration-300 hover:translate-x-1">
            Enabling Success
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className={`${urbanist.className} text-gray-100 text-lg sm:text-xl md:text-2xl mt-6 max-w-3xl leading-relaxed font-light opacity-90`}
        >
          Welcome to BCS Consulting Pvt. Ltd., where we believe that the right people, the right skills, and the right strategies can change the game.
        </p>
      </div>

      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute left-1/2 bottom-10 z-30 -translate-x-1/2 cursor-pointer flex flex-col items-center group transition-transform duration-300 hover:translate-y-1"
        aria-label="Scroll down"
      >
        <div className="relative">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            className="transition-transform duration-300"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
              fill="none"
              className="group-hover:stroke-orange-400 transition-colors duration-300"
            />

            {/* Arrow down - simplified */}
            <path
              d="M13 18 L20 25 L27 18"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-orange-400 transition-colors duration-300"
            />
          </svg>
        </div>

        <span className="mt-2 text-white/70 text-xs font-medium tracking-wider group-hover:text-orange-400 transition-colors duration-300 uppercase">
          Explore
        </span>
      </div>
    </section>
  )
}

export default Hero
