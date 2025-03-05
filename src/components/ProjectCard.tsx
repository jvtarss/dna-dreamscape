
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  githubUrl,
  liveUrl,
  delay = 0
}) => {
  return (
    <motion.div
      className="card-hover glass-panel overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="relative aspect-video overflow-hidden bg-muted/30">
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-between items-center">
            <div className="flex space-x-2">
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/90 text-black text-xs font-medium px-3 py-1.5 rounded-md hover:bg-white transition-colors"
                >
                  GitHub
                </a>
              )}
              {liveUrl && (
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-bio-blue text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-bio-blue/90 transition-colors"
                >
                  View Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          {title}
          <ArrowUpRight size={16} className="text-bio-blue" />
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="text-xs font-medium bg-bio-blue/10 text-bio-blue px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
