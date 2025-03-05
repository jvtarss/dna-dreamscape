
// This file contains all project data and can be easily edited

export interface Project {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  categories: string[];
}

export const projects: Project[] = [
  {
    id: "genomic-viz",
    title: {
      en: 'Genomic Data Visualization',
      pt: 'Visualização de Dados Genômicos'
    },
    description: {
      en: 'Interactive tool for visualizing genomic data with customizable parameters and export options.',
      pt: 'Ferramenta interativa para visualização de dados genômicos com parâmetros personalizáveis e opções de exportação.'
    },
    technologies: ['React', 'D3.js', 'Python', 'Flask'],
    imageUrl: 'https://images.unsplash.com/photo-1542992015-3a7478a1cc46?q=80&w=2070&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    categories: ['Genomics', 'Data Visualization']
  },
  {
    id: "protein-structure",
    title: {
      en: 'Protein Structure Prediction',
      pt: 'Previsão de Estrutura de Proteínas'
    },
    description: {
      en: 'Machine learning model for predicting protein structures from amino acid sequences.',
      pt: 'Modelo de aprendizado de máquina para prever estruturas de proteínas a partir de sequências de aminoácidos.'
    },
    technologies: ['PyTorch', 'Scikit-learn', 'Bio.PDB', 'TypeScript'],
    imageUrl: 'https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?q=80&w=2070&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    featured: true,
    categories: ['Proteomics', 'Machine Learning']
  },
  {
    id: "dna-analyzer",
    title: {
      en: 'DNA Sequence Analyzer',
      pt: 'Analisador de Sequências de DNA'
    },
    description: {
      en: 'Tool for analyzing DNA sequences, identifying patterns, and generating statistical reports.',
      pt: 'Ferramenta para análise de sequências de DNA, identificação de padrões e geração de relatórios estatísticos.'
    },
    technologies: ['React', 'Node.js', 'Biopython', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=2125&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    categories: ['Genomics', 'Algorithms']
  },
  {
    id: "phylogenetic",
    title: {
      en: 'Phylogenetic Tree Builder',
      pt: 'Construtor de Árvores Filogenéticas'
    },
    description: {
      en: 'Application for generating and visualizing evolutionary relationships between species.',
      pt: 'Aplicação para gerar e visualizar relações evolutivas entre espécies.'
    },
    technologies: ['D3.js', 'R', 'Shiny', 'JavaScript'],
    imageUrl: 'https://images.unsplash.com/photo-1622219809260-ce065fc5277f?q=80&w=2070&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    categories: ['Genomics', 'Data Visualization']
  },
  {
    id: "crispr",
    title: {
      en: 'CRISPR Guide RNA Designer',
      pt: 'Designer de RNA Guia CRISPR'
    },
    description: {
      en: 'Tool for designing and evaluating CRISPR guide RNAs with off-target prediction.',
      pt: 'Ferramenta para projetar e avaliar RNAs guia CRISPR com previsão de alvos não específicos.'
    },
    technologies: ['Python', 'Flask', 'React', 'BioPython'],
    imageUrl: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?q=80&w=2072&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    categories: ['Genomics', 'Algorithms']
  },
  {
    id: "metabolic",
    title: {
      en: 'Metabolic Pathway Analyzer',
      pt: 'Analisador de Vias Metabólicas'
    },
    description: {
      en: 'Visualization tool for metabolic pathways with flux analysis capabilities.',
      pt: 'Ferramenta de visualização para vias metabólicas com capacidades de análise de fluxo.'
    },
    technologies: ['React', 'Cytoscape.js', 'Python', 'Django'],
    imageUrl: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=2127&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    categories: ['Data Visualization', 'Algorithms']
  }
];

export const filters = [
  {
    en: 'All',
    pt: 'Todos'
  },
  {
    en: 'Genomics',
    pt: 'Genômica'
  },
  {
    en: 'Proteomics',
    pt: 'Proteômica'
  },
  {
    en: 'Machine Learning',
    pt: 'Aprendizado de Máquina'
  },
  {
    en: 'Data Visualization',
    pt: 'Visualização de Dados'
  },
  {
    en: 'Algorithms',
    pt: 'Algoritmos'
  }
];
