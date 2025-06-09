'use client';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


export default function ContactUs() {
  const headerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
  }, []);

  const contactDetails = [
    {
      icon: 'ph:phone',
      text: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: 'ph:envelope-simple',
      text: 'support@bhartiyaconsultants.com',
      href: 'mailto:support@bhartiyaconsultants.com',
    },
    {
      icon: 'ph:map-pin',
      text: 'Connaught Place, New Delhi',
    },
  ];

  return (
    <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
      <div ref={headerRef} className='mb-16'>
        <div className='flex gap-2.5 items-center justify-center mb-3'>
          <span>
            <Icon
              icon={'ph:house-simple-fill'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-badge dark:text-white/90'>
            Contact us
          </p>
        </div>
        <div className='text-center'>
          <h3 className='text-4xl sm:text-52 font-medium tracking-tighter text-black dark:text-white mb-3 leading-10 sm:leading-14'>
            Have questions? We're here to assist!
          </h3>
          <p className='text-xm font-normal tracking-tight text-black/50 dark:text-white/50 leading-6'>
            Discover expert consultancy services tailored to your needs. Bhartiya Consultants is your trusted partner for personalized solutions.
          </p>
        </div>
      </div>
      {/* form */}
      <div ref={formRef} className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
          <div className='relative w-fit'>
            <Image
              src={'/images/contactUs/contactUs.jpg'}
              alt='Contact Us'
              width={497}
              height={535}
              className='rounded-2xl brightness-50 h-full'
              unoptimized={true}
            />
            <div className='absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2'>
              <h5 className='text-xl xs:text-2xl mobile:text-3xl font-medium tracking-tight text-white'>
                Contact Information
              </h5>
              <p className='text-sm xs:text-base mobile:text-xm font-normal text-white/80'>
                Reach out to us for expert consultancy services. We're here to help!
              </p>
            </div>
            <div className='absolute bottom-6 left-6 lg:bottom-12 lg:left-12 flex flex-col gap-4 text-white'>
              {contactDetails.map((detail, index) => (
                detail.href ? (
                  <Link href={detail.href} key={index} className='w-fit'>
                    <div className='flex items-center gap-4 group w-fit'>
                      <Icon icon={detail.icon} width={32} height={32} />
                      <p className='text-sm xs:text-base mobile:text-xm font-normal group-hover:text-primary'>
                        {detail.text}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div key={index} className='flex items-center gap-4'>
                    <Icon icon={detail.icon} width={32} height={32} />
                    <p className='text-sm xs:text-base mobile:text-xm font-normal'>
                      {detail.text}
                    </p>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className='flex-1/2'>
            <form>
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col lg:flex-row gap-6'>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autoComplete='username'
                    placeholder='Name*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
                  />
                  <input
                    type='number'
                    name='mobile'
                    id='mobile'
                    autoComplete='mobile'
                    placeholder='Phone number*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
                  />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  placeholder='Email address*'
                  required
                  className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline'
                />
                <textarea
                  rows={8}
                  cols={50}
                  name='message'
                  id='message'
                  placeholder='Write your message here'
                  required
                  className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline'></textarea>
                <button className='px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:cursor-pointer hover:bg-dark duration-300'>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
