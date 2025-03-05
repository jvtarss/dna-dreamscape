
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: 'https://twitter.com' },
    { name: 'Email', icon: <Mail size={20} />, url: 'mailto:your.email@example.com' }
  ];
  
  return (
    <section className="section py-16" id="contact">
      <div className="bio-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-lg text-center">Get In Touch</h2>
          <p className="subheading text-center mx-auto">
            Interested in collaborating on bioinformatics projects or have questions about my work? 
            Feel free to reach out through any of these channels.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel flex items-center gap-3 px-6 py-4 min-w-44 justify-center hover:bg-white/90 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-bio-blue">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
