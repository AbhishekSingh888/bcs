'use client';
import { navLinks } from '@/app/api/navlink';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import NavLink from './Navigation/NavLink';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';

const Header: React.FC = () => {
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const sideMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const sideMenuOverlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sideMenuRef.current &&
      !sideMenuRef.current.contains(event.target as Node)
    ) {
      closeMenu();
    }
  };

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleScroll]);

  // Animate logo on sticky change
  useEffect(() => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: sticky ? 0.9 : 1,
        opacity: sticky ? 0.8 : 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [sticky]);

  const openMenu = () => {
    setNavbarOpen(true);
    // Animate side menu & overlay
    gsap.to(sideMenuOverlayRef.current, {
      opacity: 1,
      duration: 0.5,
      pointerEvents: 'auto',
    });
    gsap.to(sideMenuRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  const closeMenu = () => {
    gsap.to(sideMenuOverlayRef.current, {
      opacity: 0,
      duration: 0.5,
      pointerEvents: 'none',
    });
    gsap.to(sideMenuRef.current, {
      x: '100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => setNavbarOpen(false),
    });
  };

  const isHomepage = pathname === '/';

  return (
    <header
      className={`fixed h-24 py-5 z-50 w-full bg-transparent transition-all duration-300 lg:px-0 px-4 ${sticky ? 'top-3' : 'top-0'
        }`}
    >
      <nav
        className={`container mx-auto max-w-8xl flex items-center justify-between py-4 duration-300 ${sticky
          ? 'shadow-lg bg-white dark:bg-dark rounded-full top-5 px-6'
          : 'shadow-none top-0'
          }`}
      >
        <div className="flex justify-between items-center gap-2 w-full">
          <div>
            <Image
              ref={logoRef}
              src={
                sticky
                  ? '/images/header/bcs-logo.png'
                  : '/images/header/bcs-logo.png'
              }
              alt="Logo"
              width={80}
              height={50}
              className={`transition-transform duration-300 ${sticky ? 'scale-90 opacity-80' : 'scale-100 opacity-100'
                }`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              className="hover:cursor-pointer"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Icon
                icon={'solar:sun-bold'}
                width={32}
                height={32}
                className={`dark:hidden block ${isHomepage
                  ? sticky
                    ? 'text-dark'
                    : 'text-white'
                  : 'text-dark'
                  }`}
              />
              <Icon
                icon={'solar:moon-bold'}
                width={32}
                height={32}
                className="dark:block hidden text-white"
              />
            </button>
            <div className={`hidden md:block`}>
              <Link
                href="#"
                className={`text-base text-inherit flex items-center gap-2 border-r pr-6 ${isHomepage
                  ? sticky
                    ? 'text-dark dark:text-dark hover:text-primary border-dark dark:border-dark'
                    : 'text-dark hover:text-primary'
                  : 'text-dark hover:text-primary'
                  }`}
              >
                <Icon icon={'ph:phone-bold'} width={24} height={24} />
                +1-212-456-789
              </Link>
            </div>
            <div>
              <button
                onClick={openMenu}
                className={`flex items-center gap-2 text-dark dark:text-white hover:text-primary transition-colors `}
                aria-label="Toggle mobile menu"
              >
                <span>
                  <Icon icon={'ph:list'} width={24} height={24} />
                </span>
                <span className="hidden sm:block">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        ref={sideMenuOverlayRef}
        className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 opacity-0 pointer-events-none`}
      />

      {/* Side Menu */}
      <div
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-full bg-dark shadow-lg max-w-2xl z-50 px-20 overflow-auto no-scrollbar translate-x-full opacity-0`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-start py-10">
              <button
                onClick={closeMenu}
                aria-label="Close mobile menu"
                className="bg-white p-3 rounded-full hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col items-start gap-4">
              <ul className="w-full">
                {navLinks.map((item, index) => (
                  <NavLink key={index} item={item} onClick={closeMenu} />
                ))}
                <li className="flex items-center gap-4">
                  <Link
                    href="/signin"
                    className="py-4 px-8 bg-primary text-base leading-4 block w-fit text-white rounded-full border border-primary font-semibold mt-3 hover:bg-transparent hover:text-primary duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/"
                    className="py-4 px-8 bg-transparent border border-primary text-base leading-4 block w-fit text-primary rounded-full font-semibold mt-3 hover:bg-primary hover:text-white duration-300"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-1 my-16 text-white">
            <p className="text-base sm:text-xm font-normal text-white/40">
              Contact
            </p>
            <Link
              href="#"
              className="text-base sm:text-xm font-medium text-inherit hover:text-primary"
            >
              hello@bcs.com
            </Link>
            <Link
              href="#"
              className="text-base sm:text-xm font-medium text-inherit hover:text-primary"
            >
              +1-212-456-7890{' '}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
