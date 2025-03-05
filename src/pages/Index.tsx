
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import DNABackground from '../components/DNABackground';
import ProjectCard from '../components/ProjectCard';
import Contact from '../components/Contact';
import { useLanguage } from '../contexts/LanguageContext';
import { projects } from '../data/projects';

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const featuredProjects = projects.filter(project => project.featured);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      <DNABackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="bio-container">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div className="inline-flex px-3 py-1.5 rounded-full bg-bio-green/10 text-bio-darkGreen text-sm font-medium self-start mb-3">
                {t('bioinfPortfolio')}
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span dangerouslySetInnerHTML={{ 
                  __html: t('heroTitle')
                    .replace('Data', '<span class="text-bio-green">Data</span>')
                    .replace('Life Science', '<span class="text-bio-green">Life Science</span>')
                    .replace('Dados', '<span class="text-bio-green">Dados</span>')
                    .replace('Ciências da Vida', '<span class="text-bio-green">Ciências da Vida</span>')
                }} />
              </h1>
              
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl my-4">
                {t('heroSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link 
                  to="/projects" 
                  className="bg-bio-green text-white font-medium px-8 py-3 rounded-md hover:bg-bio-green/90 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  {t('viewProjects')}
                  <ArrowRight size={16} />
                </Link>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-foreground font-medium px-8 py-3 rounded-md hover:bg-white/90 border border-border shadow-sm transition-colors inline-flex items-center justify-center"
                >
                  {t('githubProfile')}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-bio-green" size={28} />
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="section bg-white">
        <div className="bio-container">
          <div className="mb-12">
            <h2 className="heading-lg">{t('featuredProjects')}</h2>
            <p className="subheading">
              {t('projectsSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                delay={index}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-bio-green hover:underline font-medium"
            >
              {t('viewAllProjects')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section Preview */}
      <section className="section bg-bio-lightGreen">
        <div className="bio-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg">{t('aboutMe')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('aboutMeText')}
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-bio-green hover:underline font-medium"
              >
                {t('learnMoreAboutMe')}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-2xl bg-bio-green/10 backdrop-blur-sm border border-bio-green/20 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-bio-green/20 animate-pulse-subtle flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-bio-green/30 animate-pulse-subtle flex items-center justify-center">
                      <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-bio-green/40 animate-pulse-subtle"></div>
                    </div>
                  </div>
                </div>
                
                {/* DNA Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-2 h-8 rounded-full bg-bio-green/20 animate-float" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-2/3 right-1/4 w-3 h-10 rounded-full bg-bio-green/20 animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-bio-green/20 animate-float" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-bio-green/20 animate-float" style={{ animationDelay: '1.2s' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Index;
