import { ASSETS } from '@/constants';
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="w-full bg-white pt-32 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-20 text-center">
           <span className="text-xs font-bold tracking-[0.2em] uppercase text-mos-primary block mb-4">Our Story</span>
           <h1 className="text-5xl md:text-7xl font-bold text-mos-dark tracking-tighter">Biophilic Design</h1>
        </div>
        
        <div className="prose prose-xl mx-auto text-gray-500 space-y-12 font-light leading-relaxed text-justify">
          <p>
            Mosmuur was founded with a simple mission: to reconnect people with nature in their daily lives.
            In an increasingly urbanized world, we spend 90% of our time indoors. We believe that interior
            spaces should not be sterile boxes, but living environments that breathe.
          </p>
          
          <div className="relative h-[500px] w-full my-12 overflow-hidden">
             <img 
              src={ASSETS.ABOUT_IMAGE}
              alt="Workshop" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
            />
          </div>

          <p>
            Our moss walls are created using sustainably harvested moss from European forests. 
            The moss undergoes a careful preservation process using natural glycerin and food coloring.
            This replaces the water in the plant, allowing it to maintain its soft texture and vibrant color
            without the need for sunlight, watering, or soil.
          </p>
        </div>
      </div>
    </div>
  );
};