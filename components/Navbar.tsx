import React, { useEffect, useState } from 'react';
import { NAVIGATION } from '../constants';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentPage === 'home';
  // On Home page: transparent when at top, white when scrolled.
  // On other pages: always white (or transparent if we wanted a hero there too, but let's keep it simple).
  const isTransparent = isHome && !isScrolled;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${isTransparent 
          ? 'bg-transparent py-8' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-4'
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="cursor-pointer z-50" 
            onClick={() => onNavigate('home')}
          >
            <h1 className={`text-xl font-bold tracking-tighter uppercase transition-colors duration-300
              ${isTransparent ? 'text-white' : 'text-mos-dark'}`}
            >
              Mosmuur<span className="text-mos-primary">.</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {NAVIGATION.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Page)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300
                  ${isTransparent 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-gray-500 hover:text-mos-dark'
                  }
                  ${currentPage === item.id && !isTransparent ? 'text-mos-dark border-b border-mos-dark pb-1' : ''}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Icon (Placeholder logic) */}
          <div className="md:hidden z-50">
             <button 
              className={`p-2 transition-colors
                ${isTransparent ? 'text-white' : 'text-mos-dark'}
              `}
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};