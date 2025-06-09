import { NavLinks } from '@/types/navlink'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface NavLinkProps {
  item: NavLinks;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const path = usePathname()
  const itemLabelToPath = `/${item.label.toLowerCase().replace(/\s+/g, '-')}`
  const linkRef = useRef<HTMLAnchorElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const isActive = item.href === path || path.startsWith(itemLabelToPath)

  useEffect(() => {
    if (linkRef.current && indicatorRef.current && textRef.current) {
      // Initial state
      gsap.set(indicatorRef.current, { 
        width: isActive ? 32 : 0, 
        opacity: isActive ? 1 : 0 
      })
      
      // Hover animations
      const handleMouseEnter = () => {
        const tl = gsap.timeline()
        
        // Animate indicator
        tl.to(indicatorRef.current, {
          width: 32,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        })
        
        // Animate text with slight bounce
        tl.to(textRef.current, {
          x: 10,
          color: '#3B82F6', // primary color
          duration: 0.3,
          ease: "back.out(1.7)"
        }, "-=0.3")
      }

      const handleMouseLeave = () => {
        if (!isActive) {
          const tl = gsap.timeline()
          
          tl.to(indicatorRef.current, {
            width: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
          })
          
          tl.to(textRef.current, {
            x: 0,
            color: '#rgba(255, 255, 255, 0.6)',
            duration: 0.3,
            ease: "power2.out"
          }, "-=0.2")
        }
      }

      const element = linkRef.current
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isActive])

  const linkClasses = clsx(
    'group relative py-6 text-3xl sm:text-5xl font-medium transition-all duration-500 block w-full',
    {
      'text-primary': isActive,
      'text-white/60 hover:text-white': !isActive,
    }
  )

  return (
    <li className='flex items-center group w-full overflow-hidden'>
      {/* Animated indicator line */}
      <div 
        ref={indicatorRef}
        className="h-0.5 bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 mr-4 rounded-full"
        style={{ width: isActive ? '32px' : '0px' }}
      />
      
      {/* Enhanced link with stagger animation */}
      <Link 
        ref={linkRef}
        href={item.href} 
        className={linkClasses} 
        onClick={onClick}
      >
        <span 
          ref={textRef}
          className="relative inline-block"
          style={{
            background: isActive 
              ? 'linear-gradient(45deg, #3B82F6, #1D4ED8)' 
              : 'transparent',
            WebkitBackgroundClip: isActive ? 'text' : 'initial',
            WebkitTextFillColor: isActive ? 'transparent' : 'inherit',
            backgroundClip: isActive ? 'text' : 'initial',
          }}
        >
          {item.label}
          
          {/* Underline animation */}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 group-hover:w-full transition-all duration-500 ease-out" />
          
          {/* Text glow effect on hover */}
          <span 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #1D4ED8)',
              filter: 'blur(8px)',
              WebkitBackgroundClip: 'text',
              zIndex: -1
            }}
          >
            {item.label}
          </span>
        </span>
      </Link>
    </li>
  )
}

export default NavLink
