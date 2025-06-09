'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
    const arrowRef = useRef<HTMLSpanElement>(null)
    const arrowBoxRef = useRef<HTMLSpanElement>(null)

    const handleMouseEnter = () => {
        if (arrowRef.current && arrowBoxRef.current) {
            gsap.to(arrowBoxRef.current, { x: 0, duration: 0.35, ease: 'power2.out' })
            gsap.to(arrowRef.current, { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
        }
    }

    const handleMouseLeave = () => {
        if (arrowRef.current && arrowBoxRef.current) {
            gsap.to(arrowBoxRef.current, { x: 40, duration: 0.35, ease: 'power2.in' })
            gsap.to(arrowRef.current, { x: -10, opacity: 0, duration: 0.35, ease: 'power2.in' })
        }
    }

    // Set initial state for arrow and arrow box using gsap.set
    useEffect(() => {
        if (arrowBoxRef.current && arrowRef.current) {
            gsap.set(arrowBoxRef.current, { x: 40 })
            gsap.set(arrowRef.current, { x: -10, opacity: 0 })
        }
    }, [])

    return (
        <button
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative flex items-center px-6 py-3 rounded-lg border-2 border-[#3B3BFF] bg-white text-[#3B3BFF] font-semibold text-lg transition-colors duration-200 overflow-hidden group ${className}`}
            style={{ background: '#F8EDDD' }}
        >
            <span
                ref={arrowBoxRef}
                className="relative right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-[#3B3BFF] rounded-md flex items-center justify-center transition-all duration-300"
            >
                <span ref={arrowRef}>
                    <svg width="24" height="24" fill="none" stroke="#3B3BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 8l6 4-6 4" />
                    </svg>
                </span>
            </span>
            <span className="ml-2">{children}</span>
        </button>
    )
}

export default Button