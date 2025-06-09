"use client";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const servicesData = [
  {
    id: 1,
    title: "Skill Development",
    description: "Central, State and In-house Programs",
    fullDescription:
      "Comprehensive skill development programs designed to enhance professional capabilities through government-backed initiatives and customized in-house training modules.",
    image: "/images/categories/skill-development.jpg",
    link: "/skill-development",
    icon: "ph:graduation-cap-fill",
  },
  {
    id: 2,
    title: "Recruitment",
    description: "Identifying, selection and onboarding",
    fullDescription:
      "End-to-end recruitment solutions focusing on talent identification, rigorous selection processes, and seamless onboarding experiences for sustainable growth.",
    image: "/images/categories/recruitment.jpg",
    link: "/recruitment",
    icon: "ph:users-fill",
  },
  {
    id: 3,
    title: "Event, Advertising & Branding",
    description: "Planning, Execution and Promotions",
    fullDescription:
      "Strategic event management, creative advertising campaigns, and comprehensive branding solutions that amplify your market presence and drive engagement.",
    image: "/images/categories/event-branding.jpg",
    link: "/event-branding",
    icon: "ph:megaphone-fill",
  },
  {
    id: 4,
    title: "Staffing & Government Payrolling",
    description: "Systematic recruitment and evaluation",
    fullDescription:
      "Professional staffing solutions with specialized government payrolling services, ensuring compliance and efficient workforce management systems.",
    image: "/images/categories/staffing.jpg",
    link: "/staffing-payrolling",
    icon: "ph:briefcase-fill",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const serviceListRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentTextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const morphingBgRef = useRef<HTMLDivElement>(null);

  const [activeService, setActiveService] = useState(servicesData[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const createParticleEffect = () => {
    if (!particlesRef.current) return;

    const particles = Array.from({ length: 8 }, (_, i) => {
      const particle = document.createElement("div");
      particle.className = "absolute w-2 h-2 bg-primary/30 rounded-full";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particlesRef.current?.appendChild(particle);
      return particle;
    });

    gsap.set(particles, { scale: 0, opacity: 0 });

    gsap.to(particles, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: {
        amount: 0.3,
        from: "random",
      },
      ease: "back.out(2)",
      onComplete: () => {
        gsap.to(particles, {
          scale: 0,
          opacity: 0,
          y: -50,
          duration: 0.8,
          stagger: {
            amount: 0.4,
            from: "random",
          },
          ease: "power2.in",
          onComplete: () => {
            particles.forEach((p) => p.remove());
          },
        });
      },
    });
  };

  const handleServiceHover = (service: typeof servicesData[0]) => {
    if (isAnimating || service.id === activeService.id) return;

    setIsAnimating(true);
    createParticleEffect();

    // Creative morphing transition
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveService(service);
        setIsAnimating(false);
      },
    });

    // Morphing background effect
    tl
      .to(morphingBgRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        morphingBgRef.current,
        {
          scale: 1,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.1"
      ) // Image transformation with creative effects
      .to(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: 15,
          transformOrigin: "center center",
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      ) // Content text with stagger effect
      .to(
        contentTextRef.current?.children || [],
        {
          opacity: 0,
          y: 30,
          rotationX: 10,
          duration: 0.3,
          stagger: {
            amount: 0.2,
            from: "start",
          },
          ease: "power2.inOut",
        },
        "-=0.2"
      );
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation with stagger
      if (titleRef.current) {
        const titleSplit = new SplitText(titleRef.current, { type: "chars,words" });
        gsap.fromTo(
          titleSplit.chars,
          {
            y: 100,
            opacity: 0,
            rotationX: 90,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1,
            stagger: {
              amount: 0.8,
              from: "center",
              ease: "power2.out",
            },
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "bottom 20%",
            },
          }
        );
      }

      // Enhanced subtitle with floating effect
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          {
            x: -100,
            opacity: 0,
            scale: 0.8,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 80%",
            },
          }
        );

        // Floating animation
        gsap.to(subtitleRef.current, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: 1,
        });
      }

      // Enhanced description with typewriter effect
      if (descRef.current) {
        const descSplit = new SplitText(descRef.current, { type: "words" });
        gsap.fromTo(
          descSplit.words,
          {
            opacity: 0,
            y: 20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: {
              amount: 1.2,
              from: "start",
              ease: "power2.out",
            },
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: descRef.current,
              start: "top 80%",
            },
          }
        );
      }


      // Enhanced service list with wave animation
      if (serviceListRef.current) {
        const serviceItems = serviceListRef.current.querySelectorAll(".service-item");

        gsap.fromTo(
          serviceItems,
          {
            x: -100,
            opacity: 0,
            scale: 0.8,
            rotationY: -30,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: {
              amount: 0.6,
              from: "start",
              ease: "power2.out",
            },
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: serviceListRef.current,
              start: "top 80%",
            },
          }
        );

        // Add hover animations for each service item
        serviceItems.forEach((item, index) => {
          const icon = item.querySelector(".service-icon");
          const content = item.querySelector(".service-content");
          const arrow = item.querySelector(".service-arrow");

          item.addEventListener("mouseenter", () => {
            gsap.to(icon, {
              scale: 1.2,
              rotationZ: 10,
              duration: 0.3,
              ease: "back.out(2)",
            });
            gsap.to(content, {
              x: 10,
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(arrow, {
              x: 5,
              scale: 1.2,
              duration: 0.3,
              ease: "back.out(2)",
            });
          });

          item.addEventListener("mouseleave", () => {
            gsap.to([icon, content, arrow], {
              scale: 1,
              rotationZ: 0,
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Enhanced content area with 3D effect
      if (contentAreaRef.current) {
        gsap.fromTo(
          contentAreaRef.current,
          {
            x: 100,
            opacity: 0,
            rotationY: 30,
            transformPerspective: 1000,
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentAreaRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Enhanced timeline with progressive reveal
      if (timelineRef.current) {
        const timeline = timelineRef.current;
        const pathLines = timeline.querySelectorAll(".timeline-path");
        const circles = timeline.querySelectorAll(".timeline-circle");

        gsap.set(pathLines, { strokeDasharray: "100%", strokeDashoffset: "100%" });
        gsap.set(circles, { scale: 0, opacity: 0 });

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(pathLines, {
                strokeDashoffset: `${100 - progress * 100}%`,
                duration: 0.1,
                ease: "none",
              });

              circles.forEach((circle, index) => {
                const circleProgress = Math.max(0, Math.min(1, progress * 4 - index));
                if (circleProgress > 0) {
                  gsap.to(circle, {
                    scale: 1.2,
                    opacity: 1,
                    duration: 0.3,
                    ease: "back.out(2)",
                  });
                  // Add ripple effect
                  gsap.to(circle, {
                    scale: 1,
                    duration: 0.4,
                    delay: 0.1,
                    ease: "power2.out",
                  });
                }
              });
            },
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Enhanced content animation when activeService changes
  useLayoutEffect(() => {
    if (imageRef.current && contentTextRef.current) {
      // Image reveal with creative entrance
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: -15,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Content text reveal with stagger
      const contentElements = contentTextRef.current.children;
      gsap.fromTo(
        contentElements,
        {
          opacity: 0,
          y: 30,
          rotationX: 10,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: "start",
          },
          delay: 0.3,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [activeService]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20">
      {/* Morphing Background */}
      <div
        ref={morphingBgRef}
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 opacity-0"
      />

      {/* Particles Container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Enhanced Background SVG Timeline */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg
          ref={timelineRef}
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="timeline-path"
            d="M100 200 Q300 150 500 200 T900 250 Q1000 275 1100 300"
            stroke="url(#timelineGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle className="timeline-circle" cx="200" cy="180" r="8" fill="#3B82F6" />
          <circle className="timeline-circle" cx="500" cy="200" r="8" fill="#3B82F6" />
          <circle className="timeline-circle" cx="700" cy="225" r="8" fill="#3B82F6" />
          <circle className="timeline-circle" cx="900" cy="250" r="8" fill="#3B82F6" />
          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Existing background vectors */}
      <div className="absolute left-0 top-0 opacity-50">
        <Image
          src="/images/categories/Vector.svg"
          alt="vector"
          width={800}
          height={1050}
          className="dark:hidden"
          unoptimized={true}
        />
        <Image
          src="/images/categories/Vector-dark.svg"
          alt="vector"
          width={800}
          height={1050}
          className="hidden dark:block"
          unoptimized={true}
        />
      </div>

      <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p
            ref={subtitleRef}
            className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center items-center"
          >
            <Icon
              icon="ph:house-simple-fill"
              className="text-2xl text-primary"
            />
            Our Services
          </p>
          <h2
            ref={titleRef}
            className="lg:text-52 text-40 mt-4 mb-2 font-medium leading-[1.2] text-dark dark:text-white"
          >
            Our Core Services
          </h2>
          <p
            ref={descRef}
            className="text-dark/50 dark:text-white/50 text-lg leading-[1.3] max-w-2xl mx-auto"
          >
            Integrated solutions that drive transformation, empower growth, and
            create lasting impact across industries
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-12 items-start">
          {/* Service List - Left Side */}
          <div ref={serviceListRef} className="lg:col-span-5 col-span-12">
            <div className="space-y-4">
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  className={`service-item p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer group relative overflow-hidden ${activeService.id === service.id
                      ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-lg shadow-primary/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-md"
                    }`}
                  onMouseEnter={() => handleServiceHover(service)}
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className={`service-icon p-3 rounded-full transition-all duration-300 ${activeService.id === service.id
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg"
                        }`}
                    >
                      <Icon icon={service.icon} className="text-xl" />
                    </div>
                    <div className="service-content flex-1">
                      <h3
                        className={`text-xl font-semibold mb-2 transition-all duration-300 ${activeService.id === service.id
                            ? "text-primary"
                            : "text-dark dark:text-white group-hover:text-primary"
                          }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-dark/70 dark:text-white/70 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <Icon
                      icon="ph:arrow-right"
                      className={`service-arrow text-lg transition-all duration-300 ${activeService.id === service.id
                          ? "text-primary transform translate-x-1"
                          : "text-gray-400 group-hover:text-primary group-hover:transform group-hover:translate-x-1"
                        }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full font-semibold mt-8 hover:bg-dark duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl transition-all"
            >
              View All Services
            </Link>
          </div>

          {/* Content Area - Right Side */}
          <div ref={contentAreaRef} className="lg:col-span-7 col-span-12">
            <div className="relative">
              {/* Image */}
              <div
                ref={imageRef}
                className="relative rounded-2xl overflow-hidden mb-6 shadow-2xl"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  width={680}
                  height={480}
                  className="w-full h-[480px] object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-3xl font-semibold mb-2 transform transition-transform duration-300">
                    {activeService.title}
                  </h3>
                  <p className="text-white/90 text-lg">
                    {activeService.description}
                  </p>
                </div>
                <Link
                  href={activeService.link}
                  className="absolute top-6 right-6 bg-white text-dark rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Icon icon="ph:arrow-right" className="text-lg" />
                </Link>
              </div>

              {/* Content Text */}
              <div ref={contentTextRef} className="space-y-4">
                <p className="text-dark/70 dark:text-white/70 text-lg leading-relaxed">
                  {activeService.fullDescription}
                </p>
                <Link
                  href={activeService.link}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                  <Icon icon="ph:arrow-right" className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
