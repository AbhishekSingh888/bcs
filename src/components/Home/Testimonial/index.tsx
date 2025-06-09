"use client";
import * as React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

const consultancyTestimonials = [
    {
        review: "Their strategic insights transformed our business operations completely. The ROI was exceptional.",
        name: "Sarah Johnson",
        position: "CEO, TechVenture Inc",
        image: "/images/users/alkesh.jpg"
    },
    {
        review: "Outstanding consulting services that delivered results beyond our expectations. Highly recommended.",
        name: "Michael Chen",
        position: "Operations Director, Global Solutions",
        image: "/images/users/dwayn.jpg"
    },
    {
        review: "Professional, insightful, and results-driven. They helped us scale our business efficiently.",
        name: "Emily Rodriguez",
        position: "Founder, StartupHub",
        image: "/images/users/jack.jpg"
    }
];

const Testimonial = () => {
    const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const sectionRef = React.useRef<HTMLElement>(null);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const dotsRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    React.useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(headerRef.current,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Carousel animation
            gsap.fromTo(carouselRef.current,
                {
                    opacity: 0,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: carouselRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Dots animation
            gsap.fromTo(dotsRef.current,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: dotsRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Background image parallax
            gsap.to(".bg-vector", {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleDotClick = (index: number) => {
        if (api) {
            api.scrollTo(index);

            // Add click animation
            gsap.to(`.dot-${index}`, {
                scale: 1.3,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }
    };

    return (
        <section ref={sectionRef} className="bg-dark relative overflow-hidden py-12" id="testimonial">
            <div className="absolute right-0 bg-vector">
                <Image
                    src="/images/testimonial/Vector.png"
                    alt="background vector"
                    width={500}
                    height={739}
                    unoptimized={true}
                />
            </div>
            <div className="container max-w-6xl mx-auto px-5 2xl:px-0">
                <div ref={headerRef}>
                    <p className="text-white text-sm font-semibold flex gap-2 items-center">
                        <Icon icon="mdi:briefcase-outline" className="text-lg text-primary" />
                        Client Success Stories
                    </p>
                    <h2 className="lg:text-3xl text-2xl font-medium text-white mt-3">
                        Transforming businesses <br />
                        <span className="text-primary">through expert guidance</span>
                    </h2>
                    <p className="text-white/70 mt-4 max-w-xl text-sm">
                        Discover how our strategic consulting has helped businesses achieve their goals and drive sustainable growth.
                    </p>
                </div>
                <div ref={carouselRef}>
                    <Carousel
                        setApi={setApi}
                        opts={{
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {consultancyTestimonials.map((item, index) => (
                                <CarouselItem key={index} className="mt-8">
                                    <div className="lg:flex items-center gap-8">
                                        <div className="flex items-start gap-6 lg:pr-12">
                                            <div className="bg-primary/10 p-3 rounded-lg">
                                                <Icon icon="mdi:quote-right" width={24} height={24} className="text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-white lg:text-xl text-lg leading-relaxed mb-4">
                                                    "{item.review}"
                                                </h4>
                                                <div className="flex items-center mt-4 gap-4">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-full lg:hidden block object-cover"
                                                        unoptimized={true}
                                                    />
                                                    <div>
                                                        <h6 className="text-white text-base font-medium">{item.name}</h6>
                                                        <p className="text-primary/80 font-medium text-sm">{item.position}</p>
                                                        <div className="flex gap-1 mt-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Icon key={i} icon="mdi:star" className="text-yellow-400 text-xs" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full h-60 rounded-xl overflow-hidden mt-6 lg:mt-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={300}
                                                height={300}
                                                className="lg:block hidden object-cover w-full h-full"
                                                unoptimized={true}
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div ref={dotsRef} className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`dot-${index} w-2.5 h-2.5 rounded-full transition-all duration-300 ${current === index + 1
                                ? "bg-primary scale-110"
                                : "bg-white/50 hover:bg-white/70"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
