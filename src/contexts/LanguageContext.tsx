
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface Translations {
  [key: string]: {
    en: string;
    pt: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Common
  'bioinfPortfolio': {
    en: 'Bioinformatics Portfolio',
    pt: 'Portfólio de Bioinformática'
  },
  'viewProjects': {
    en: 'View Projects',
    pt: 'Ver Projetos'
  },
  'viewAllProjects': {
    en: 'View All Projects',
    pt: 'Ver Todos os Projetos'
  },
  'githubProfile': {
    en: 'GitHub Profile',
    pt: 'Perfil do GitHub'
  },
  
  // Nav
  'home': {
    en: 'Home',
    pt: 'Início'
  },
  'projects': {
    en: 'Projects',
    pt: 'Projetos'
  },
  'about': {
    en: 'About',
    pt: 'Sobre'
  },
  
  // Hero
  'heroTitle': {
    en: 'Where Data Meets Life Science',
    pt: 'Onde Dados Encontram Ciências da Vida'
  },
  'heroSubtitle': {
    en: 'Exploring the intersection of computational methods and biological research through innovative bioinformatics solutions.',
    pt: 'Explorando a interseção de métodos computacionais e pesquisa biológica através de soluções inovadoras em bioinformática.'
  },
  
  // Projects
  'featuredProjects': {
    en: 'Featured Projects',
    pt: 'Projetos em Destaque'
  },
  'projectsSubtitle': {
    en: 'Explore some of my recent work in bioinformatics, computational biology, and data visualization.',
    pt: 'Explore alguns dos meus trabalhos recentes em bioinformática, biologia computacional e visualização de dados.'
  },
  'myBioinformaticsProjects': {
    en: 'My Bioinformatics Projects',
    pt: 'Meus Projetos de Bioinformática'
  },
  'projectsPageSubtitle': {
    en: 'A collection of projects focused on solving computational challenges in biology and life sciences.',
    pt: 'Uma coleção de projetos focados em resolver desafios computacionais em biologia e ciências da vida.'
  },
  'viewLive': {
    en: 'View Live',
    pt: 'Ver Online'
  },
  
  // About
  'aboutMe': {
    en: 'About Me',
    pt: 'Sobre Mim'
  },
  'aboutMeText': {
    en: "I'm a bioinformatician passionate about developing tools and algorithms that help scientists analyze complex biological data. With expertise in computational biology and software development, I create solutions that bridge the gap between biology and computer science.",
    pt: "Sou um bioinformata apaixonado por desenvolver ferramentas e algoritmos que ajudam cientistas a analisar dados biológicos complexos. Com experiência em biologia computacional e desenvolvimento de software, crio soluções que preenchem a lacuna entre biologia e ciência da computação."
  },
  'learnMoreAboutMe': {
    en: 'Learn More About Me',
    pt: 'Saiba Mais Sobre Mim'
  },
  
  // Contact
  'getInTouch': {
    en: 'Get In Touch',
    pt: 'Entre em Contato'
  },
  'contactText': {
    en: 'Interested in collaborating on bioinformatics projects or have questions about my work? Feel free to reach out through any of these channels.',
    pt: 'Interessado em colaborar em projetos de bioinformática ou tem perguntas sobre meu trabalho? Sinta-se à vontade para entrar em contato através de qualquer um desses canais.'
  },
  
  // 404
  'pageNotFound': {
    en: 'Page Not Found',
    pt: 'Página Não Encontrada'
  },
  'pageNotFoundText': {
    en: "The page you're looking for doesn't exist or has been moved.",
    pt: 'A página que você está procurando não existe ou foi movida.'
  },
  'returnToHome': {
    en: 'Return to Home',
    pt: 'Voltar para o Início'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
