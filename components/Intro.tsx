
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ASSETS } from '../constants';
import { Page } from '../types';
import { CustomCursor } from './CustomCursor';

interface IntroProps {
  onNavigate: (page: Page) => void;
}

/**
 * Single fog particle.
 * Each particle is a large, very soft circle that drifts, breathes (alpha oscillation),
 * and reacts to the mouse to create a volumetric fog illusion.
 */
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  angle: number;
  spin: number;
  fadeInFactor: number;
  fadeInSpeed: number;

  constructor(w: number, h: number) {
    // Start at a random position on the screen
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    // Base drift velocity (subtle constant movement)
    this.vx = (Math.random() - 0.5) * 0.5; 
    this.vy = (Math.random() - 0.5) * 0.5;

    // Particle radius – large values make wide, soft clouds
    this.size = Math.random() * 150 + 80; 

    // Target opacity for this particle (how dense this cloud feels)
    this.baseAlpha = Math.random() * 0.12 + 0.03; 

    // Current opacity (starts at 0 and fades in)
    this.alpha = 0;

    // Angle / spin are here if we want to rotate things in the future
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.002;
    
    // Growth logic: how far into the fade‑in this particle is (0 → 1)
    this.fadeInFactor = 0;

    // How fast this particular particle fades in.
    // Slower = takes longer for full fog to appear (more organic).
    this.fadeInSpeed = Math.random() * 0.003 + 0.001; 
  }

  update(w: number, h: number, mouseX: number, mouseY: number, time: number) {
    // 1. Basic Physics (constant drift)
    this.x += this.vx;
    this.y += this.vy;

    // 2. "Alive" turbulence (fake noise using sin/cos to avoid stillness)
    const noiseScale = 0.002;
    const timeScale = 0.0005;
    const turbulenceX = Math.sin(this.y * noiseScale + time * timeScale) * 1.5;
    const turbulenceY = Math.cos(this.x * noiseScale + time * timeScale) * 1.5;
    
    this.x += turbulenceX;
    this.y += turbulenceY;

    // 3. Build-up logic (fade in the fog density over time)
    if (this.fadeInFactor < 1) {
        this.fadeInFactor += this.fadeInSpeed;
    }

    // 4. Breathing (alpha oscillation) combined with fade in
    const breath = Math.sin(time * 0.002 + this.x * 0.01);
    // Apply fadeInFactor so particles do not pop in
    this.alpha = (this.baseAlpha + (breath * 0.03)) * Math.min(1, this.fadeInFactor);
    
    // 5. Wrap around screen with a buffer so particles recycle instead of disappearing
    const buffer = this.size * 2;
    if (this.x < -buffer) this.x = w + buffer;
    if (this.x > w + buffer) this.x = -buffer;
    if (this.y < -buffer) this.y = h + buffer;
    if (this.y > h + buffer) this.y = -buffer;

    // 6. Interaction: "fluid" repel from mouse (hover effect)
    // ─────────────────────────────────────────────────────────
    // If you want the hover reaction to be more visible/stronger,
    // tweak these values:
    //
    //  - `repelRange` → how far from the cursor the fog is affected.
    //  - multiplier in `force * 5` → how hard particles are pushed away.
    //  - `this.alpha = Math.max(0, this.alpha - 0.02)` → how much they fade locally.
    //
    // Increasing these will make the "hole" around the cursor larger and clearer.
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // How far from the cursor the fog gets disturbed.
    // Increase this for a larger cleared circle.
    const repelRange = 400;

    if (dist < repelRange) {
      // Normalized 0–1 strength based on distance (1 = at cursor center)
      const strength = (repelRange - dist) / repelRange;
      const force = strength;
      const angle = Math.atan2(dy, dx);
      
      // Push away
      // Increase multiplier (10) for stronger displacement.
      this.x -= Math.cos(angle) * force * 10;
      this.y -= Math.sin(angle) * force * 10;
      
      // Fade out locally when disturbed (makes the cleared gap more visible).
      // Multiply by `strength` so the center of the cursor is the clearest,
      // and the edge of the circle is softer.
      this.alpha = Math.max(0, this.alpha - 0.08 * strength);
    } 
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, `rgba(230, 235, 233, ${this.alpha})`);
    gradient.addColorStop(1, `rgba(230, 235, 233, 0)`);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

export const Intro: React.FC<IntroProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Intro Animation for content
  useEffect(() => {
    if (isLoaded && contentRef.current) {
      // Staggered fade‑up animation for the intro text/buttons
      gsap.fromTo(contentRef.current.children, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power2.out", delay: 0.5 }
      );
    }
  }, [isLoaded]);

  // Volumetric Fog Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    
    const particles: Particle[] = [];
    // Total number of fog particles. Increase for denser fog (more expensive).
    const particleCount = 200; 

    // Mouse position in viewport coordinates. Starts off‑screen (no interaction).
    const mouse = { x: -1000, y: -1000 };

    // Create particles and fit canvas to viewport
    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      // Track mouse so each particle can respond in its update step
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    init(); 

    const render = (time: number) => {
      // Clear entire canvas each frame
      ctx.clearRect(0, 0, width, height);
      
      // Base haze
      // Very soft constant veil behind particles.
      // The Particle system provides the main volumetric look.
      ctx.fillStyle = 'rgba(230, 235, 233, 0.05)';
      ctx.fillRect(0,0, width, height);

      // Update + draw each particle
      particles.forEach(p => {
        p.update(width, height, mouse.x, mouse.y, time);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-mos-dark font-sans cursor-none">
      <CustomCursor />
      {/* Background Image - Static */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
            className="w-full h-full bg-cover bg-center opacity-90"
            style={{
            backgroundImage: `url(${ASSETS.INTRO_BG})`,
            }}
        />
      </div>
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* 
        Volumetric Fog Canvas 
        Heavier blur creates "clouds" from the particles
      */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
        style={{ filter: 'blur(80px)', transform: 'scale(1.2)' }} 
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div ref={contentRef} className="text-center space-y-10 p-12 mix-blend-overlay">
          <div className="space-y-4">
            <p className="text-white/90 text-xs font-bold tracking-[0.6em] uppercase drop-shadow-lg">
              Experience Nature
            </p>
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter uppercase opacity-95 drop-shadow-2xl">
              Mosmuur
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 pt-12 pointer-events-auto items-center justify-center">
            <button 
              onClick={() => onNavigate('home')}
              className="group relative px-10 py-4 overflow-hidden bg-white text-mos-dark font-bold uppercase tracking-widest text-xs hover:text-white transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <span className="relative z-10">Enter Website</span>
              <div className="absolute inset-0 bg-mos-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            </button>
            
            <button 
              onClick={() => onNavigate('shop')}
              className="group relative px-10 py-4 overflow-hidden border border-white/50 backdrop-blur-sm text-white font-bold uppercase tracking-widest text-xs hover:text-mos-dark transition-colors duration-500"
            >
              <span className="relative z-10">Go to Shop</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
