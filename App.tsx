
import React, { useState } from 'react';
import { Page } from './types';
import { Intro } from './components/Intro';
import { Home } from './components/Home';
import { Shop } from './components/Shop';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('intro');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const handleNavigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const handleProjectClick = (id: number) => {
    setSelectedProjectId(id);
    handleNavigate('project-details');
  };

  // Render logic
  if (currentPage === 'intro') {
    return <Intro onNavigate={handleNavigate} />;
  }

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'projects' && <Projects onProjectClick={handleProjectClick} />}
      {currentPage === 'project-details' && selectedProjectId && (
        <ProjectDetail 
          projectId={selectedProjectId} 
          onNavigate={handleProjectClick}
          onBack={() => handleNavigate('projects')}
        />
      )}
      {currentPage === 'shop' && <Shop />}
      {currentPage === 'about' && <About />}
      {currentPage === 'contact' && <Contact />}
    </Layout>
  );
};

export default App;
