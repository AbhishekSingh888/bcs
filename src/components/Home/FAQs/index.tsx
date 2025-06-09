'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSection from '@/components/shared/ScrollSection';
import { Urbanist } from 'next/font/google';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const urbanist = Urbanist({
    subsets: ['latin'],
    variable: '--font-urbanist',
    display: 'swap',
});

const faqCategories = [
    {
        id: 'services',
        label: 'Our Services',
        icon: 'ph:briefcase-fill'
    },
    {
        id: 'process',
        label: 'Our Process',
        icon: 'ph:flow-arrow-fill'
    },
    {
        id: 'pricing',
        label: 'Pricing & Plans',
        icon: 'ph:currency-circle-dollar-fill'
    }
];

const faqItems = {
    services: [
        {
            question: "What services does Bhartiya Consultants offer?",
            answer: "Bhartiya Consultants provides strategic business insights, operational efficiency solutions, and expert guidance tailored to your organization's needs. Our comprehensive service offerings include skill development, recruitment, event management, advertising & branding, and staffing & government payrolling."
        },
        {
            question: "Do you work with specific industries or sectors?",
            answer: "We work across multiple industries including technology, healthcare, finance, retail, manufacturing, and public sector organizations. Our consultants have specialized expertise in various domains, allowing us to provide industry-specific solutions for any business challenge."
        },
        {
            question: "Can you customize services for my specific business needs?",
            answer: "Absolutely. We believe in providing tailored solutions that address your unique challenges. Our consultancy approach begins with a thorough assessment of your business requirements before creating a customized strategy and implementation plan."
        }
    ],
    process: [
        {
            question: "How do you approach new client engagements?",
            answer: "Our process starts with a discovery session to understand your challenges and goals. We then conduct a thorough analysis of your current operations, develop a strategic plan with clear deliverables, implement solutions in collaboration with your team, and provide ongoing support to ensure sustainable results."
        },
        {
            question: "What is your typical project timeline?",
            answer: "Project timelines vary based on scope and complexity. Small consulting engagements may take 4-6 weeks, while comprehensive organizational transformations can span several months. We always provide clear timelines and milestones at the beginning of each engagement."
        },
        {
            question: "How do you measure the success of your consulting projects?",
            answer: "We establish clear, measurable KPIs at the beginning of each project, tailored to your business objectives. These might include revenue growth, cost reduction, efficiency improvements, employee satisfaction, or other relevant metrics. We provide regular progress reports and a final assessment of results achieved."
        }
    ],
    pricing: [
        {
            question: "How do you structure your consulting fees?",
            answer: "We offer flexible pricing models including project-based fees, retainer arrangements, and performance-based compensation. The specific structure depends on your needs, project scope, and preferred engagement model. We provide transparent pricing with no hidden costs."
        },
        {
            question: "Do you offer any free initial consultation?",
            answer: "Yes, we provide a complimentary 60-minute consultation to understand your business challenges and determine how we can help. This session allows us to assess if there's a good fit between your needs and our capabilities before any commitment."
        },
        {
            question: "What kind of ROI can I expect from your services?",
            answer: "While ROI varies by project and industry, our clients typically see returns of 3-5x their investment in our services. We focus on delivering measurable value, whether through revenue growth, cost reduction, or operational improvements, and track these metrics throughout our engagement."
        }
    ]
};

const FAQModern: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('services');
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const tabsRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRef = useRef<HTMLDivElement>(null);
    const decorationRef = useRef<HTMLDivElement>(null);
    const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation with improved timing
            const headerElements = headerRef.current?.querySelectorAll('.animate-in');
            if (headerElements && headerElements.length > 0) {
                gsap.fromTo(
                    headerElements,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.15,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Tabs animation with bounce effect
            const tabItems = tabsRef.current?.querySelectorAll('.tab-item');
            if (tabItems && tabItems.length > 0) {
                gsap.fromTo(
                    tabItems,
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.1,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: tabsRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Content area animation
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current,
                    {
                        opacity: 0,
                        x: -50,
                        rotationY: -15
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotationY: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Enhanced image parallax with 3D effect
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    {
                        y: 100,
                        opacity: 0,
                        rotationX: 15
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: imageRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                // Continuous parallax
                gsap.to(imageRef.current, {
                    y: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }

            // Stats animation
            statsRefs.current.forEach((stat, index) => {
                if (stat) {
                    gsap.fromTo(
                        stat,
                        {
                            opacity: 0,
                            scale: 0,
                            rotation: index % 2 === 0 ? -10 : 10
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            rotation: index % 2 === 0 ? -3 : 3,
                            duration: 0.8,
                            delay: index * 0.2,
                            ease: 'back.out(1.7)',
                            scrollTrigger: {
                                trigger: stat,
                                start: "top 90%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            });

            // Enhanced decorative element rotation
            if (decorationRef.current) {
                gsap.set(decorationRef.current, { rotation: 0 });
                gsap.to(decorationRef.current, {
                    rotation: 360,
                    duration: 30,
                    repeat: -1,
                    ease: 'none',
                });

                // Scale on scroll
                gsap.to(decorationRef.current, {
                    scale: 1.2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: decorationRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Enhanced animation when changing categories
    useEffect(() => {
        if (contentRef.current) {
            const tl = gsap.timeline();

            tl.to(accordionRefs.current.filter(Boolean), {
                opacity: 0,
                y: -60,
                stagger: 0.15,
                duration: 0.3,
                ease: 'power2.in',
            })
                .fromTo(
                    accordionRefs.current.filter(Boolean),
                    { opacity: 0, y: 10, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 10,
                        scale: 1,
                        stagger: 0.1,
                        duration: 0.6,
                        ease: 'back.out(1.2)',
                    }
                );
        }
    }, [activeCategory]);

    return (
        <ScrollSection id='faqs' parallaxStrength={0.1} parallaxDirection="up">
            <div ref={sectionRef} className="relative  bg-white dark:bg-gray-900 overflow-hidden">
                {/* Decorative elements */}
                <div ref={decorationRef} className="absolute top-20 left-20 w-80 h-80 rounded-full border-2 border-dashed border-primary/20 opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-20 right-40 w-60 h-60 rounded-full bg-gradient-to-tr from-primary/5 to-blue-500/5 blur-3xl pointer-events-none"></div>

                <div className="container max-w-7xl mx-auto px-5 2xl:px-0 relative z-10">
                    {/* Header - Fixed visibility */}
                    <div
                        ref={headerRef}
                        className="text-center mb-16 relative z-20"
                    >
                        <p className={`animate-in text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center items-center ${urbanist.className}`}>
                            <Icon icon="ph:question-fill" className="text-2xl text-primary" />
                            <span className="uppercase tracking-[0.2em] text-xs">Common Questions</span>
                        </p>
                        <h2 className={`animate-in text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6 font-black tracking-tight text-dark dark:text-white ${urbanist.className}`}>
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h2>
                        <p className={`animate-in text-dark/50 dark:text-white/50 text-lg leading-relaxed max-w-3xl mx-auto ${urbanist.className} font-light`}>
                            We understand that navigating consultancy services can be challenging. Here are some frequently asked questions to help you understand how Bhartiya Consultants can assist you.
                        </p>
                    </div>

                    {/* Main content area */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left side - FAQ Categories and Questions */}
                        <div className="lg:col-span-7 lg:order-1 order-2">
                            {/* Category tabs */}
                            <div ref={tabsRef} className="flex flex-wrap gap-3 mb-8">
                                {faqCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`tab-item flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        <Icon icon={category.icon} className="text-lg" />
                                        {category.label}
                                    </button>
                                ))}
                            </div>

                            {/* Accordion */}
                            <div ref={contentRef} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl dark:shadow-gray-900/20">
                                <Accordion
                                    type="single"
                                    defaultValue="item-0"
                                    collapsible
                                >
                                    {faqItems[activeCategory].map((item, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`item-${index}`}
                                            className="overflow-hidden border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 mb-2 last:mb-0"
                                            ref={el => { accordionRefs.current[index] = el; }}
                                        >
                                            <AccordionTrigger className={`text-xl font-semibold text-gray-900 dark:text-white ${urbanist.className} hover:text-primary dark:hover:text-primary`}>
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-gray-600 dark:text-gray-300 text-lg">
                                                {item.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>

                        {/* Right side - Image and decoration */}
                        <div className="lg:col-span-5 lg:order-2 order-1 relative">
                            <div className="relative z-10">
                                <div ref={imageRef} className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                                    <Image
                                        src="/images/faqs/faq-image.png"
                                        alt="Bhartiya Consultants FAQ"
                                        fill
                                        className="object-cover"
                                        unoptimized={true}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <span className={`text-white/80 uppercase tracking-wider text-xs ${urbanist.className}`}>
                                            Expert Guidance
                                        </span>
                                        <h3 className={`text-white text-3xl font-bold mt-1 ${urbanist.className}`}>
                                            We Have Answers
                                        </h3>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-lg"></div>
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-lg"></div>

                                {/* Stats */}
                                <div
                                    ref={el => { statsRefs.current[0] = el; }}
                                    className="absolute -bottom-10 left-10 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl transform rotate-[-3deg]"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon icon="ph:users-three-fill" className="text-3xl text-primary" />
                                        <div>
                                            <h4 className={`text-xl font-bold text-gray-900 dark:text-white ${urbanist.className}`}>95%</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Client Satisfaction</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    ref={el => { statsRefs.current[1] = el; }}
                                    className="absolute -right-5 top-1/3 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl transform rotate-[3deg]"
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon icon="ph:lightning-fill" className="text-3xl text-amber-500" />
                                        <div>
                                            <h4 className={`text-xl font-bold text-gray-900 dark:text-white ${urbanist.className}`}>Fast Results</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">Quick Solutions</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollSection>
    );
};

export default FAQModern;
