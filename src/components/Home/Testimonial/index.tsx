'use client';
import * as React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollSection from '@/components/shared/ScrollSection';
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
    subsets: ['latin'],
    variable: '--font-urbanist',
    display: 'swap',
});

gsap.registerPlugin(ScrollTrigger);

const consultancyTestimonials = [
    {
        review: "Their strategic insights transformed our business operations completely. The ROI was exceptional.",
        name: "Sarah Johnson",
        position: "CEO, TechVenture Inc",
        image: "/images/users/alkesh.jpg",
        rating: 5,
        bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
        review: "Outstanding consulting services that delivered results beyond our expectations. Highly recommended.",
        name: "Michael Chen",
        position: "Operations Director, Global Solutions",
        image: "/images/users/dwayn.jpg",
        rating: 5,
        bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
        review: "Professional, insightful, and results-driven. They helped us scale our business efficiently.",
        name: "Emily Rodriguez",
        position: "Founder, StartupHub",
        image: "/images/users/jack.jpg",
        rating: 5,
        bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
        review: "The team's expertise in our industry was impressive. They provided solutions that were both innovative and practical.",
        name: "David Wilson",
        position: "CTO, InnoTech Solutions",
        image: "/images/users/george.jpg",
        rating: 5,
        bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
];

const TestimonialModern = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const cardsRef = React.useRef<HTMLDivElement>(null);
    const quoteRef = React.useRef<HTMLDivElement>(null);
    const containerRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    React.useEffect(() => {
        const sections = containerRefs.current.filter(Boolean);

        if (!sections.length) return;

        // Create scroll-jacked sections
        let scrollTriggers: ScrollTrigger[] = [];

        sections.forEach((section, index) => {
            if (!section) return;

            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top 20%',
                end: 'bottom 20%',
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index)
            });

            scrollTriggers.push(trigger);
        });

        // Animate header elements
        if (headerRef.current) {
            const elements = headerRef.current.querySelectorAll('.animate-in');

            gsap.fromTo(
                elements,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }

        // Animate the quote icon
        if (quoteRef.current) {
            gsap.fromTo(
                quoteRef.current,
                { opacity: 0, scale: 0.5, rotation: -30 },
                {
                    opacity: 0.2,
                    scale: 1,
                    rotation: 0,
                    duration: 1.5,
                    ease: 'elastic.out(1, 0.3)',
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }

        return () => {
            scrollTriggers.forEach(trigger => trigger.kill());
        };
    }, []);

    // Auto-advance carousel every 6 seconds
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % consultancyTestimonials.length);
        }, 6000);
        return () => clearTimeout(timer);
    }, [activeIndex]);

    return (
        <ScrollSection id="testimonials" parallaxStrength={0.2} parallaxDirection="up">
            <div ref={sectionRef} className="relative overflow-hidden bg-white dark:bg-gray-900">
               

                {/* Large quote icon */}
                <div ref={quoteRef} className="absolute right-10 top-20 opacity-20 pointer-events-none">
                    <Icon icon="ph:quotes" className="text-9xl text-primary" />
                </div>

                <div className="container max-w-7xl mx-auto px-5 2xl:px-0 relative z-10">
                    {/* Header */}
                    <div ref={headerRef} className="text-center mb-20">
                        <p className={`animate-in text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center items-center ${urbanist.className}`}>
                            <Icon icon="ph:star-fill" className="text-2xl text-primary" />
                            <span className="uppercase tracking-[0.3em] text-xs">Client Stories</span>
                        </p>
                        <h2 className={`animate-in text-4xl sm:text-5xl lg:text-7xl mt-4 mb-6 font-black tracking-tight text-dark dark:text-white ${urbanist.className}`}>
                            What Our <span className="text-primary">Clients Say</span>
                        </h2>
                        <p className={`animate-in text-dark/50 dark:text-white/50 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${urbanist.className} font-light`}>
                            Discover how our consulting services have helped businesses transform, grow, and succeed in today's competitive landscape
                        </p>
                    </div>

                    {/* Testimonial Indicators */}
                    <div className="flex justify-center gap-3 mb-12">
                        {consultancyTestimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary w-10' : 'bg-gray-300 dark:bg-gray-700'}`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    if (containerRefs.current[index]) {
                                        containerRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                }}
                                aria-label={`View testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Testimonial Cards */}
                    <div ref={cardsRef} className="space-y-24 relative">
                        {consultancyTestimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                ref={el => { containerRefs.current[index] = el; }}
                                className={`transform transition-all duration-700 ${index === activeIndex
                                    ? 'opacity-100 scale-100 pointer-events-auto'
                                    : 'opacity-0 scale-95 pointer-events-none absolute top-0 left-0 w-full'
                                    }`}
                            >
                                <div className={`${testimonial.bgColor} rounded-3xl p-8 md:p-12 relative overflow-hidden`}>
                                    <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
                                    <div className="absolute left-0 bottom-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full"></div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                        <div className="md:col-span-2">
                                            <div className="relative mb-6">
                                                <Icon icon="ph:quotes" className="absolute -left-3 -top-3 text-5xl text-primary/20" />
                                                <p className={`text-xl md:text-2xl font-medium leading-relaxed text-gray-800 dark:text-white relative z-10 ${urbanist.className}`}>
                                                    "{testimonial.review}"
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1 mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Icon key={i} icon="ph:star-fill" className="text-amber-400 text-xl" />
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                                    <Image
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className={`text-xl font-bold text-gray-900 dark:text-white ${urbanist.className}`}>{testimonial.name}</h4>
                                                    <p className="text-gray-600 dark:text-gray-300">{testimonial.position}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden md:block relative h-72">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="relative w-full h-full max-w-xs mx-auto">
                                                    <div className="absolute w-full h-full bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-3xl transform rotate-3 scale-95"></div>
                                                    <div className="absolute w-full h-full bg-white dark:bg-gray-800 rounded-3xl transform -rotate-3 overflow-hidden">
                                                        <Image
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            fill
                                                            className="object-cover opacity-50 mix-blend-overlay"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center p-8">
                                                            <div className="text-center">
                                                                <Icon icon="ph:thumbs-up-fill" className="text-5xl text-primary mx-auto mb-4" />
                                                                <p className={`font-bold text-xl ${urbanist.className}`}>Success Story</p>
                                                                <p className="text-sm opacity-70">Transformed operations, increased productivity, and boosted revenue growth.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ScrollSection>
    );
};

export default TestimonialModern;
