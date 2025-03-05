
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GlobeIcon } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 bg-white/80 hover:bg-white border border-bio-green/10 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
    >
      <GlobeIcon size={16} className="text-bio-green" />
      {language === 'en' ? 'PT' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
