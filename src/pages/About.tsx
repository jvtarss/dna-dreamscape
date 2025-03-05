
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Dna, Microscope, Code, Brain, LucideIcon } from 'lucide-react';
import DNABackground from '../components/DNABackground';
import Contact from '../components/Contact';

interface SkillItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ icon, title, description, delay = 0 }) => (
  <motion.div 
    className="glass-panel p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="bg-bio-blue/10 w-12 h-12 rounded-md flex items-center justify-center text-bio-blue mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const Experience = ({ 
  title, 
  company, 
  period, 
  description, 
  delay = 0 
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: string; 
  delay?: number;
}) => (
  <motion.div 
    className="mb-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    viewport={{ once: true }}
  >
    <div className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-bio-blue before:rounded-full before:z-10 after:content-[''] after:absolute after:left-[3.5px] after:top-4 after:bottom-0 after:w-0.5 after:bg-border last:after:bg-transparent">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
        <span className="text-bio-blue font-medium">{company}</span>
        <span className="hidden sm:block text-muted-foreground">•</span>
        <span className="text-muted-foreground text-sm">{period}</span>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const About: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const skills = [
    {
      icon: <Dna size={24} />,
      title: 'Genomics Analysis',
      description: 'Expertise in analyzing DNA sequencing data, variant calling, and genome assembly.'
    },
    {
      icon: <Code size={24} />,
      title: 'Software Development',
      description: 'Creating intuitive and efficient bioinformatics tools and web applications.'
    },
    {
      icon: <Microscope size={24} />,
      title: 'Research Methods',
      description: 'Experience with experimental design and integrating computational and lab-based approaches.'
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Data Analysis',
      description: 'Statistical analysis of biological data using R, Python, and specialized bioinformatics tools.'
    },
    {
      icon: <Brain size={24} />,
      title: 'Machine Learning',
      description: 'Applying ML techniques to biological problems like protein structure prediction and gene expression analysis.'
    },
    {
      icon: <Dna size={24} />,
      title: 'Systems Biology',
      description: 'Modeling and analysis of biological systems and pathways using computational approaches.'
    }
  ];
  
  return (
    <div className="min-h-screen pt-24">
      <DNABackground />
      
      {/* About Header */}
      <section className="section pt-8 pb-16">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-lg">About Me</h1>
            <p className="subheading max-w-3xl">
              I'm a bioinformatician with a passion for developing computational tools that help researchers 
              unlock insights from biological data. My work focuses on the intersection of computer science, 
              statistics, and molecular biology.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Bio Section */}
      <section className="section bg-white py-16">
        <div className="bio-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-md mb-6">My Journey</h2>
              <p className="text-muted-foreground mb-4">
                I began my journey at the intersection of biology and computer science, 
                fascinated by how computational methods could unravel the complexities of 
                biological systems. With a background in both fields, I've dedicated my career 
                to developing tools and methodologies that accelerate research in genomics, 
                proteomics, and systems biology.
              </p>
              <p className="text-muted-foreground mb-4">
                My expertise includes next-generation sequencing analysis, machine learning 
                applications in biology, and the development of web-based visualization tools 
                for complex biological data. I'm particularly interested in making advanced 
                computational methods accessible to researchers through intuitive interfaces.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding or analyzing data, I enjoy contributing to open-source 
                bioinformatics projects and mentoring students interested in computational biology.
              </p>
            </motion.div>
            
            <motion.div 
              className="order-1 md:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-2xl bg-bio-blue/5 backdrop-blur-sm border border-bio-blue/10 overflow-hidden flex items-center justify-center p-6">
                <div className="w-full h-full rounded-xl bg-bio-blue/10 flex items-center justify-center p-6 animate-float" style={{ animationDuration: '8s' }}>
                  <div className="w-full h-full bg-bio-blue/20 rounded-lg flex items-center justify-center p-6">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-bio-blue">BIO</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="section py-16">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="heading-md text-center">Skills & Expertise</h2>
            <p className="subheading text-center mx-auto">
              My technical toolkit combines computational methods, biological knowledge, and software development.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillItem 
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="section bg-white py-16">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="heading-md">Professional Experience</h2>
            <p className="subheading">
              A timeline of my career journey in bioinformatics and computational biology.
            </p>
          </motion.div>
          
          <div className="mt-10">
            <Experience 
              title="Senior Bioinformatics Scientist"
              company="Genomics Research Institute"
              period="2020 - Present"
              description="Leading the development of computational pipelines for analysis of single-cell RNA-seq data. Implementing machine learning approaches for gene expression pattern recognition."
              delay={0}
            />
            
            <Experience 
              title="Bioinformatics Developer"
              company="BioTech Solutions"
              period="2017 - 2020"
              description="Developed web applications for visualizing genomic data. Created algorithms for protein structure prediction and optimization of CRISPR guide RNAs."
              delay={1}
            />
            
            <Experience 
              title="Research Assistant"
              company="University Research Lab"
              period="2015 - 2017"
              description="Conducted research on computational methods for metagenomics analysis. Contributed to open-source bioinformatics software for sequence alignment and phylogenetic analysis."
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="section py-16">
        <div className="bio-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="heading-md">Education</h2>
            <p className="subheading">
              My academic foundation in computational biology and computer science.
            </p>
          </motion.div>
          
          <div className="mt-10">
            <Experience 
              title="Ph.D. in Bioinformatics"
              company="University of Science"
              period="2012 - 2015"
              description="Research focused on developing algorithms for genome assembly and comparative genomics. Thesis: 'Novel Computational Approaches for Large-Scale Genomic Analysis'"
              delay={0}
            />
            
            <Experience 
              title="M.S. in Computer Science"
              company="Tech University"
              period="2010 - 2012"
              description="Specialized in machine learning and computational biology. Research project on protein-protein interaction network analysis."
              delay={1}
            />
            
            <Experience 
              title="B.S. in Molecular Biology"
              company="Science College"
              period="2006 - 2010"
              description="Minor in Computer Science. Undergraduate research in genomics and computational methods for sequence analysis."
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default About;
