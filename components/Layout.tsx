
import React from 'react';
import { Navbar } from './Navbar';
import { Page } from '../types';
import { CustomCursor } from './CustomCursor';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-mos-dark bg-white cursor-none">
      <CustomCursor />
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-xl font-bold mb-6 uppercase tracking-tight">Mosmuur<span className="text-mos-primary">.</span></h4>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                Sustainable biophilic design for modern spaces. 
                Bringing nature indoors with preserved moss walls that require zero maintenance.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-mos-dark">Contact</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li>info@mosmuur.concept</li>
                <li>+32 123 45 67 89</li>
                <li>Antwerp, Belgium</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-mos-dark">Social</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-mos-primary cursor-pointer">Instagram</a></li>
                <li><a href="#" className="hover:text-mos-primary cursor-pointer">Pinterest</a></li>
                <li><a href="#" className="hover:text-mos-primary cursor-pointer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} Mosmuur Concept</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-mos-dark cursor-pointer">Privacy</a>
              <a href="#" className="hover:text-mos-dark cursor-pointer">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
