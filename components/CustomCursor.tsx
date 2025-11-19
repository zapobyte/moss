
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    if (isHovering) {
      gsap.to(follower, {
        scale: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        mixBlendMode: 'difference',
        borderWidth: 0,
        duration: 0.3
      });
    } else {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        mixBlendMode: 'normal',
        borderWidth: '1px',
        duration: 0.3
      });
    }
  }, [isHovering]);

  return (
    <>
      {/* Main Dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-red-900 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion"
      />
      {/* Follower Ring */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-mos-dark rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 "
      />
    </>
  );
};
