import React, { useEffect, useRef } from 'react';
import { ASSETS } from '../constants';
import { Button } from './Button';
import { Page } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import image from '../assets/1998-970x649.jpg';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Hero Text Animation
    if (heroTextRef.current) {
      tl.fromTo(heroTextRef.current.children, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );
    }

    // Scroll Animations
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(sec => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <div className="w-full bg-neutral-50">
      {/* Section 1: Full Screen Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-mos-dark">
        <div ref={heroImageRef} className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${ASSETS.INTRO_BG})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
          <div ref={heroTextRef} className="text-center text-white max-w-6xl space-y-6">
            <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/70">
              Biophilic Design Studio
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mix-blend-overlay opacity-90">
              MOSMUUR
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light max-w-xl mx-auto leading-relaxed pt-6">
              Bridging the gap between architecture and nature with preserved moss installations.
            </p>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white mix-blend-overlay animate-pulse">
          <div className="h-16 w-[1px] bg-white mx-auto"></div>
          <span className="block mt-4 text-[10px] tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* Section 2: Minimal Intro */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-white fade-in-section">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl md:text-5xl font-light text-mos-dark leading-[1.1] tracking-tight">
              We create living <br/>
              <span className="font-serif italic text-mos-primary">breathing</span> spaces.
            </h3>
          </div>
          <div className="space-y-8">
            <p className="text-gray-500 leading-loose text-lg font-light">
              Our moss walls are 100% natural and require absolutely no maintenance. 
              Treated with a natural preservation process, they retain their 
              vibrant green color and soft texture for years without water or sunlight.
            </p>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('about')}
              className="pl-0 hover:pl-4 transition-all"
            >
              Read our Philosophy &rarr;
            </Button>
          </div>
        </div>
      </section>

      {/* Section 3: Visual Split */}
      <section className="w-full fade-in-section">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-screen bg-gray-200">
            <img 
              src={image}                                                   
              alt="Interior Detail" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-12 lg:p-32 bg-mos-mist/30">
            <span className="text-xs font-bold tracking-widest uppercase text-mos-primary mb-6">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold text-mos-dark mb-8">Acoustic Performance</h2>
            <p className="text-gray-600 leading-relaxed mb-12">
              Moss has exceptional sound-absorbing properties. A moss wall acts as a natural sound insulator, 
              reducing noise pollution in open offices or busy homes while adding a stunning visual element.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { label: 'Sound Absorbing', val: '0.9aw' },
                { label: 'Fire Retardant', val: 'B-s1' },
                { label: 'Maintenance', val: '0%' },
                { label: 'Natural', val: '100%' }
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-3xl font-light text-mos-dark">{stat.val}</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button 
              variant="outline"
              className="self-start border-mos-dark text-mos-dark hover:bg-mos-dark hover:text-white"
              onClick={() => onNavigate('shop')}
            >
              View Products
            </Button>
          </div>
        </div>
      </section>

      {/* Section 4: Large CTA */}
      <section className="py-40 bg-mos-dark text-white text-center px-6 relative overflow-hidden fade-in-section">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="https://www.nada.be/mosmuur/wp-content/uploads/sites/5/2018/09/1815-2-975x650.jpg" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Transform your space</h2>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            From custom corporate logos to entire wall installations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Button 
              onClick={() => onNavigate('contact')}
              size="lg"
              className="bg-white text-black hover:bg-mos-light hover:text-white border-transparent min-w-[200px]"
            >
              Get a Quote
            </Button>
             <Button 
              variant="outline"
              onClick={() => onNavigate('shop')}
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-black min-w-[200px]"
            >
              Shop Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};