
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
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
          <h2 className="heading-lg text-center">{t('getInTouch')}</h2>
          <p className="subheading text-center mx-auto">
            {t('contactText')}
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
                <span className="text-bio-green">{link.icon}</span>
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
