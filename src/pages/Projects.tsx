
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DNABackground from '../components/DNABackground';
import ProjectCard from '../components/ProjectCard';
import Contact from '../components/Contact';

const projects = [
  {
    title: 'Genomic Data Visualization',
    description: 'Interactive tool for visualizing genomic data with customizable parameters and export options.',
    technologies: ['React', 'D3.js', 'Python', 'Flask'],
    imageUrl: 'https://images.unsplash.com/photo-1542992015-3a7478a1cc46?q=80&w=2070&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    title: 'Protein Structure Prediction',
    description: 'Machine learning model for predicting protein structures from amino acid sequences.',
    technologies: ['PyTorch', 'Scikit-learn', 'Bio.PDB', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?q=80&w=2070&auto=format&fit=crop',
    githubUrl: 'https://github.com'
  },
  {
    title: 'DNA Sequence Analyzer',
    description: 'Tool for analyzing DNA sequences, identifying patterns, and generating statistical reports.',
    technologies: ['React', 'Node.js', 'Biopython', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=2125&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    title: 'Phylogenetic Tree Builder',
    description: 'Application for generating and visualizing evolutionary relationships between species.',
    technologies: ['D3.js', 'R', 'Shiny', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1622219809260-ce065fc5277f?q=80&w=2070&auto=format&fit=crop',
    githubUrl: 'https://github.com'
  },
  {
    title: 'CRISPR Guide RNA Designer',
    description: 'Tool for designing and evaluating CRISPR guide RNAs with off-target prediction.',
    technologies: ['Python', 'Flask', 'React', 'BioPython'],
    imageUrl: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?q=80&w=2072&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    title: 'Metabolic Pathway Analyzer',
    description: 'Visualization tool for metabolic pathways with flux analysis capabilities.',
    technologies: ['React', 'Cytoscape.js', 'Python', 'Django'],
    imageUrl: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=2127&auto=format&fit=crop',
    githubUrl: 'https://github.com'
  }
];

const filters = [
  'All',
  'Genomics',
  'Proteomics',
  'Machine Learning',
  'Data Visualization',
  'Algorithms'
];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');
  
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
            <h1 className="heading-lg">My Bioinformatics Projects</h1>
            <p className="subheading">
              A collection of projects focused on solving computational challenges in biology and life sciences.
            </p>
          </motion.div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === filter 
                    ? 'bg-bio-blue text-white' 
                    : 'bg-white hover:bg-bio-blue/10 border border-border'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="section bg-white py-16">
        <div className="bio-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.title}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                imageUrl={project.imageUrl}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
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
