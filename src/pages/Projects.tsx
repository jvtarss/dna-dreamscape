
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DNABackground from '../components/DNABackground';
import ProjectCard from '../components/ProjectCard';
import Contact from '../components/Contact';
import { useLanguage } from '../contexts/LanguageContext';
import { projects, filters } from '../data/projects';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  useEffect(() => {
    // Reset filter when language changes
    setActiveFilter('All');
    setFilteredProjects(projects);
  }, [language]);
  
  useEffect(() => {
    // Filter projects
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => 
          project.categories.includes(activeFilter)
        )
      );
    }
  }, [activeFilter]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-24">
      <DNABackground />
      
      {/* Projects Header */}
      <section className="section pt-8 pb-16">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-lg">{t('myBioinformaticsProjects')}</h1>
            <p className="subheading">
              {t('projectsPageSubtitle')}
            </p>
          </motion.div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {filters.map((filter) => (
              <button
                key={filter.en}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === filter.en 
                    ? 'bg-bio-green text-white' 
                    : 'bg-white hover:bg-bio-green/10 border border-border'
                }`}
                onClick={() => setActiveFilter(filter.en)}
              >
                {filter[language]}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="section bg-white py-16">
        <div className="bio-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Projects;
