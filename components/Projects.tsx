
import React from 'react';
import { MOCK_PROJECTS } from '../constants';


interface ProjectsProps {
  onProjectClick: (id: number) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onProjectClick }) => {
  return (
    <div className="w-full bg-white min-h-screen pt-32">
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 mb-20 md:mb-32 fade-in-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-mos-primary block mb-4">Portfolio</span>
             <h1 className="text-5xl md:text-7xl font-bold text-mos-dark tracking-tighter">Selected Works</h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md pb-2">
            A curation of our most recent installations, exploring the symbiosis between structural architecture and botanical art.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 md:gap-y-32">
          {MOCK_PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              onClick={() => onProjectClick(project.id)}
              className={`group cursor-pointer flex flex-col ${index % 2 !== 0 ? 'md:pt-32' : ''}`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-mos-dark/0 group-hover:bg-mos-dark/5 transition-colors duration-500" />
                
                {/* View Project Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-none text-mos-dark text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     View Project
                   </div>
                </div>
              </div>

              {/* Meta Data */}
              <div className="flex flex-col space-y-2 border-t border-gray-200 pt-6 transition-colors group-hover:border-mos-dark">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-medium text-mos-dark group-hover:text-mos-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-mos-dark transition-colors">
                    {project.year}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400">
                  <span>{project.category}</span>
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
