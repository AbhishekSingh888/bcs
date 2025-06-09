'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const FAQ: React.FC = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                "#faqs .accordion-item",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                    },
                }
            );
            gsap.fromTo(
                "#faqs h2, #faqs p",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id='faqs' ref={sectionRef}>
            <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
                <div className="grid lg:grid-cols-2 gap-10 ">
                    <div className='lg:mx-0 mx-auto'>
                        <Image
                            src="/images/faqs/faq-image.png"
                            alt='image'
                            width={680}
                            height={644}
                            className='lg:w-full'
                            unoptimized={true}
                        />
                    </div>
                    <div className='lg:px-12'>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                            <Icon icon="mdi:briefcase-outline" className="text-2xl text-primary " />
                            FAQs
                        </p>
                        <h2 className='lg:text-52 text-40 leading-[1.2] font-medium text-dark dark:text-white'>
                            Everything about Bhartiya Consultants
                        </h2>
                        <p className='text-dark/50 dark:text-white/50 pr-20'>
                            We understand that navigating consultancy services can be challenging. Here are some frequently asked questions to help you understand how Bhartiya Consultants can assist you.
                        </p>
                        <div className="my-8">
                            <Accordion type="single" defaultValue="item-1" collapsible className="w-full flex flex-col gap-6">
                                <AccordionItem value="item-1" className="accordion-item">
                                    <AccordionTrigger>1. What services does Bhartiya Consultants offer?</AccordionTrigger>
                                    <AccordionContent>
                                        Bhartiya Consultants provides strategic business insights, operational efficiency solutions, and expert guidance tailored to your organization's needs.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="accordion-item">
                                    <AccordionTrigger>2. How can Bhartiya Consultants help my business grow?</AccordionTrigger>
                                    <AccordionContent>
                                        Our consultancy services focus on identifying growth opportunities, optimizing processes, and implementing strategies to drive sustainable success.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="accordion-item">
                                    <AccordionTrigger>3. How do I get started with Bhartiya Consultants?</AccordionTrigger>
                                    <AccordionContent>
                                        Reach out to us through our contact page or schedule a consultation to discuss your business needs and goals.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
