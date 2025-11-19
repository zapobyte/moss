
import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { ASSETS, MOCK_PROJECTS } from '../constants';
import { Button } from './Button';

interface ProjectDetailProps {
  projectId: number;
  onNavigate: (id: number) => void; // For "Next Project"
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onNavigate, onBack }) => {
  const [project, setProject] = useState<Project | null>(null);

  // Simulate data fetch from server
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const found = MOCK_PROJECTS.find(p => p.id === projectId);
    setProject(found || null);
  }, [projectId]);

  if (!project) return <div className="pt-32 text-center">Loading...</div>;

  // Find next project for navigation
  const currentIndex = MOCK_PROJECTS.findIndex(p => p.id === projectId);
  const nextProject = MOCK_PROJECTS[(currentIndex + 1) % MOCK_PROJECTS.length];

  return (
    <div className="w-full bg-white min-h-screen pt-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        
        {/* Top Navigation / Breadcrumb */}
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-mos-dark transition-colors flex items-center gap-2"
          >
            &larr; Back to Projects
          </button>
        </div>

        {/* Header Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-mos-dark tracking-tighter leading-none mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-8 pt-2 border-t border-gray-100 lg:border-none lg:pt-0">
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Client</span>
              <span className="block text-sm text-mos-dark font-medium">{project.client || 'Private'}</span>
            </div>
             <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Year</span>
              <span className="block text-sm text-mos-dark font-medium">{project.year}</span>
            </div>
             <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Location</span>
              <span className="block text-sm text-mos-dark font-medium">{project.location}</span>
            </div>
             <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Service</span>
              <span className="block text-sm text-mos-dark font-medium">{project.category}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[60vh] md:h-[80vh] bg-gray-100 mb-20 overflow-hidden">
           <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="prose prose-lg prose-neutral text-gray-600 font-light leading-loose">
            {project.content?.map((paragraph, idx) => (
              <p key={idx} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
            {project.gallery.map((img, idx) => (
              <div key={idx} className={`bg-gray-100 overflow-hidden ${idx === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/5]'}`}>
                <img src={img} alt="Gallery detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Project Footer */}
      <div className="w-full bg-neutral-50 border-t border-gray-200 py-20 cursor-pointer group" onClick={() => onNavigate(nextProject.id)}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Next Project</span>
          <h2 className="text-4xl md:text-6xl font-bold text-mos-dark tracking-tighter group-hover:text-mos-primary transition-colors">
            {nextProject.title}
          </h2>
        </div>
      </div>
    </div>
  );
};
