import React from 'react';
import { Button } from './Button';

export const Contact: React.FC = () => {
  return (
    <div className="w-full bg-neutral-50 min-h-screen pt-32 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto px-6 w-full pb-20">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-mos-dark mb-4 tracking-tight">Say Hello.</h1>
          <p className="text-gray-400 text-lg font-light">Tell us about your vision. We'll help you grow it.</p>
        </div>

        <form className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative group">
              <input type="text" required className="w-full py-4 border-b border-gray-300 focus:border-mos-dark outline-none transition-colors bg-transparent text-mos-dark" placeholder=" " />
              <label className="absolute left-0 top-4 text-gray-400 text-sm transition-all pointer-events-none group-focus-within:-top-6 group-focus-within:text-xs group-focus-within:text-mos-dark uppercase tracking-wider">First Name</label>
            </div>
            <div className="relative group">
              <input type="text" required className="w-full py-4 border-b border-gray-300 focus:border-mos-dark outline-none transition-colors bg-transparent text-mos-dark" placeholder=" " />
               <label className="absolute left-0 top-4 text-gray-400 text-sm transition-all pointer-events-none group-focus-within:-top-6 group-focus-within:text-xs group-focus-within:text-mos-dark uppercase tracking-wider">Last Name</label>
            </div>
          </div>
          
          <div className="relative group">
            <input type="email" required className="w-full py-4 border-b border-gray-300 focus:border-mos-dark outline-none transition-colors bg-transparent text-mos-dark" placeholder=" " />
            <label className="absolute left-0 top-4 text-gray-400 text-sm transition-all pointer-events-none group-focus-within:-top-6 group-focus-within:text-xs group-focus-within:text-mos-dark uppercase tracking-wider">Email Address</label>
          </div>

          <div className="relative group">
            <textarea rows={4} required className="w-full py-4 border-b border-gray-300 focus:border-mos-dark outline-none transition-colors bg-transparent text-mos-dark resize-none" placeholder=" "></textarea>
            <label className="absolute left-0 top-4 text-gray-400 text-sm transition-all pointer-events-none group-focus-within:-top-6 group-focus-within:text-xs group-focus-within:text-mos-dark uppercase tracking-wider">Your Message</label>
          </div>

          <div className="pt-8">
            <Button type="submit" size="lg" className="w-full bg-mos-dark text-white hover:bg-mos-primary">
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};