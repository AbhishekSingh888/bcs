'use client';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import ScrollSection from '@/components/shared/ScrollSection';
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const servicesData = [
  {
    id: 1,
    title: 'Skill Development',
    description: 'Central, State and In-house Programs',
    fullDescription:
      'Comprehensive skill development programs designed to enhance professional capabilities through government-backed initiatives and customized in-house training modules.',
    image: '/images/categories/skill-development.jpg',
    link: '/skill-development',
    icon: 'ph:graduation-cap-fill',
  },
  {
    id: 2,
    title: 'Recruitment',
    description: 'Identifying, selection and onboarding',
    fullDescription:
      'End-to-end recruitment solutions focusing on talent identification, rigorous selection processes, and seamless onboarding experiences for sustainable growth.',
    image: '/images/categories/recruitment.jpg',
    link: '/recruitment',
    icon: 'ph:users-fill',
  },
  {
    id: 3,
    title: 'Event, Advertising & Branding',
    description: 'Planning, Execution and Promotions',
    fullDescription:
      'Strategic event management, creative advertising campaigns, and comprehensive branding solutions that amplify your market presence and drive engagement.',
    image: '/images/categories/event-branding.jpg',
    link: '/event-branding',
    icon: 'ph:megaphone-fill',
  },
  {
    id: 4,
    title: 'Staffing & Government Payrolling',
    description: 'Systematic recruitment and evaluation',
    fullDescription:
      'Professional staffing solutions with specialized government payrolling services, ensuring compliance and efficient workforce management systems.',
    image: '/images/categories/staffing.jpg',
    link: '/staffing-payrolling',
    icon: 'ph:briefcase-fill',
  },
];

const ServicesModern = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuredServiceRef = useRef<HTMLDivElement>(null);
  const magazineLayoutRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create magazine-style animations
    if (titleRef.current && typeof SplitText !== 'undefined') {
      const splitTitle = new SplitText(titleRef.current, { type: 'words,chars' });

      gsap.fromTo(
        splitTitle.chars,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.02,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    // Description text animation
    if (descRef.current && typeof SplitText !== 'undefined') {
      const splitDesc = new SplitText(descRef.current, { type: 'words' });

      gsap.fromTo(
        splitDesc.words,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Featured service animation
    if (featuredServiceRef.current) {
      const featuredImage = featuredServiceRef.current.querySelector('.featured-image');
      const featuredContent = featuredServiceRef.current.querySelector('.featured-content');

      gsap.fromTo(
        featuredImage,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: featuredServiceRef.current,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo(
        featuredContent,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredServiceRef.current,
            start: 'top 70%',
          }
        }
      );
    }

    // Magazine layout animations
    if (magazineLayoutRef.current) {
      const columns = magazineLayoutRef.current.querySelectorAll('.magazine-column');

      gsap.fromTo(
        columns,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: magazineLayoutRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Service cards animation
    if (serviceCardsRef.current) {
      const cards = serviceCardsRef.current.querySelectorAll('.service-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: serviceCardsRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <ScrollSection id="services" className="hero-section-next">
      {/* Magazine style layout for Services */}
      <div className="relative  bg-white dark:bg-gray-900 overflow-hidden">
        {/* Background elements */}
        <div className="absolute left-0 top-0 opacity-20">
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
          <div className="text-center mb-20">
            <p
              ref={subtitleRef}
              className={`text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center items-center ${urbanist.className}`}
            >
              <Icon
                icon="ph:house-simple-fill"
                className="text-2xl text-primary"
              />
              <span className="uppercase tracking-[0.3em] text-xs">What we offer</span>
            </p>
            <h2
              ref={titleRef}
              className={`text-7xl sm:text-8xl lg:text-9xl mt-4 mb-6 font-black tracking-tight leading-[0.9] text-dark dark:text-white ${urbanist.className}`}
            >
              <span className="text-primary">Our</span> Services
            </h2>
            <p
              ref={descRef}
              className={`text-dark/50 dark:text-white/50 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${urbanist.className} font-light`}
            >
              Integrated solutions that drive transformation, empower growth, and
              create lasting impact across industries
            </p>
          </div>

          {/* Featured Service - Magazine Hero Style */}
          <div ref={featuredServiceRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
            <div className="featured-image relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl">
              <Image
                src="/images/categories/skill-development.jpg"
                alt="Skill Development"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className={`text-white/70 uppercase tracking-[0.2em] text-sm ${urbanist.className}`}>Featured Service</span>
                <h3 className={`text-white text-4xl font-bold mt-2 ${urbanist.className}`}>Skill Development</h3>
              </div>
            </div>

            <div className="featured-content space-y-6">
              <h3 className={`text-5xl font-bold text-dark dark:text-white ${urbanist.className}`}>
                Comprehensive Training & Development
              </h3>
              <p className="text-lg text-dark/70 dark:text-white/70 leading-relaxed">
                Our skill development programs are designed to enhance professional capabilities through
                government-backed initiatives and customized in-house training modules. We focus on practical
                skills that drive real-world results and career advancement.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Icon icon="ph:check-circle-fill" className="text-primary text-xl mt-1" />
                  <span>Central & State Government Programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="ph:check-circle-fill" className="text-primary text-xl mt-1" />
                  <span>Customized In-house Training Solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon icon="ph:check-circle-fill" className="text-primary text-xl mt-1" />
                  <span>Career Development & Professional Growth</span>
                </li>
              </ul>
              <Link
                href="/skill-development"
                className="inline-flex items-center gap-2 bg-primary text-white py-3 px-8 rounded-full font-medium hover:bg-dark duration-300 mt-4"
              >
                Learn More
                <Icon icon="ph:arrow-right" className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Magazine Grid Layout */}
          <div ref={magazineLayoutRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {servicesData.slice(1).map((service, index) => (
              <div key={service.id} className="magazine-column group">
                <div className="overflow-hidden rounded-xl aspect-[3/4] mb-4 relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className={`text-white/80 uppercase tracking-wider text-xs ${urbanist.className}`}>
                      {index === 0 ? 'Recruitment' : index === 1 ? 'Marketing' : 'Staffing'}
                    </span>
                    <h3 className={`text-white text-2xl font-bold mt-1 ${urbanist.className}`}>{service.title}</h3>
                  </div>
                </div>
                <p className="text-dark/70 dark:text-white/70 line-clamp-3 mb-3">{service.fullDescription}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-primary font-medium hover:gap-2.5 transition-all duration-300"
                >
                  Read More
                  <Icon icon="ph:arrow-right" className="text-sm" />
                </Link>
              </div>
            ))}
          </div>

          {/* Service Cards - Asymmetrical Layout */}
          <div ref={serviceCardsRef} className="my-20">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="service-card bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:w-7/12 transform rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white p-4 rounded-full">
                    <Icon icon="ph:graduation-cap-fill" className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${urbanist.className}`}>Professional Development</h3>
                    <p className="text-dark/70 dark:text-white/70">
                      Tailored programs to enhance skills and advance careers through practical training and mentorship.
                    </p>
                    <Link href="/services/development" className="mt-4 inline-flex items-center gap-2 text-primary font-medium">
                      Explore Programs
                      <Icon icon="ph:arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="service-card bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:w-5/12 transform rotate-[1deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white p-4 rounded-full">
                    <Icon icon="ph:chart-line-up-fill" className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${urbanist.className}`}>Business Growth</h3>
                    <p className="text-dark/70 dark:text-white/70">
                      Strategic consulting to accelerate business expansion and market penetration.
                    </p>
                    <Link href="/services/growth" className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium">
                      Learn More
                      <Icon icon="ph:arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="service-card bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:w-4/12 transform rotate-[1deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white p-4 rounded-full">
                    <Icon icon="ph:users-three-fill" className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${urbanist.className}`}>Team Building</h3>
                    <p className="text-dark/70 dark:text-white/70">
                      Create cohesive teams through targeted activities and leadership development.
                    </p>
                    <Link href="/services/team-building" className="mt-4 inline-flex items-center gap-2 text-purple-600 font-medium">
                      Discover More
                      <Icon icon="ph:arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="service-card bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:w-8/12 transform rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 text-white p-4 rounded-full">
                    <Icon icon="ph:trend-up-fill" className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-3 ${urbanist.className}`}>Strategic Marketing & Brand Development</h3>
                    <p className="text-dark/70 dark:text-white/70">
                      Comprehensive marketing solutions to establish brand identity and drive customer engagement through targeted campaigns and creative content development.
                    </p>
                    <Link href="/services/marketing" className="mt-4 inline-flex items-center gap-2 text-orange-500 font-medium">
                      Explore Solutions
                      <Icon icon="ph:arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 py-4 px-8 bg-primary text-base leading-4 text-white rounded-full font-semibold hover:bg-dark duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl transition-all"
            >
              View All Services
              <Icon icon="ph:arrow-right" className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default ServicesModern;
