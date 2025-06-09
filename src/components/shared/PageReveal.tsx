import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageReveal({ children }: { children: React.ReactNode }) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (revealRef.current) {
      gsap.fromTo(
        revealRef.current,
        { y: "100vh" },
        {
          y: 0,
          duration: 1.2,
          ease: "power4.out",
        }
      );
    }
  }, []);

  return (
    <div ref={revealRef} className="min-h-screen">
      {children}
    </div>
  );
}