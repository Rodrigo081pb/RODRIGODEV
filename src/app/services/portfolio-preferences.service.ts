import { effect, Injectable, signal } from '@angular/core';

export type Language = 'en' | 'pt';
export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class PortfolioPreferencesService {
  readonly language = signal<Language>(this.readStored('portfolio-language', 'en') as Language);
  readonly theme = signal<Theme>(this.readStored('portfolio-theme', 'dark') as Theme);

  private readonly translations: Record<Language, Record<string, string>> = {
    en: {
      language: 'Language',
      preferences: 'Preferences',
      chooseLanguage: 'Choose a language',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light',
      home: 'Home',
      about: 'About me',
      contact: 'Contact',
      skills: 'Skills',
      heroPrefix: "I'm",
      heroGreeting: 'Hello,',
      heroRole: 'Full Stack Developer',
      heroLocation: 'From Brazil',
      hireMe: 'Hire Me',
      experienceTitle: 'Experience',
      experienceDescription: 'My professional journey and the experiences that shaped my career',
      skillsTitle: 'Skills',
      certificationsTitle: 'Certifications',
      certificationsDescription: 'Certifications that changed my career',
      viewCredential: 'View Credential',
      showMore: 'Show More',
      showLess: 'Show Less',
      promoted: 'Promoted',
      positions: 'positions',
      current: 'Current',
      activities: 'Activities',
      skillsLabel: 'Skills',
      technologiesLabel: 'Technologies',
      aboutTitle: 'ABOUT ME',
      aboutIntro: 'I am Kaua Rodrigo and since I started studying programming, I realized how solving challenges has transformed my personal and professional life. Through code, I can change not only my own reality but also that of the entire world.',
      aboutSecondary: 'I believe that, just like every good developer who enjoys solving problems, I can also contribute to a better, more connected, and innovative world through technology.',
      birthday: 'Birthday:',
      city: 'City:',
      study: 'Study:',
      phone: 'Phone:',
      age: 'Age:',
      interests: 'Interests:',
      degree: 'Degree:',
      email: 'Email:',
      languageLabel: 'Language:',
      languageValue: 'PT-BR, English',
      birthdayValue: '23rd April 2004',
      cityValue: 'Recife, Brazil',
      studyValue: 'Systems analysis and development',
      phoneValue: '+55 81 98442-3591',
      ageValue: '21 years',
      interestsValue: 'Coding, Music, Nature, Football',
      degreeValue: 'Bachelor',
      emailValue: 'kauarodrigo1193@gmail.com',
      footerAvailability: 'Available for opportunities',
      footerDescription: 'Full Stack Developer focused on building clear, useful and reliable digital experiences.',
      explore: 'Explore',
      certifications: 'Certifications',
      footerContact: 'Contact',
      footerBuilt: 'Designed and built with code'
    },
    pt: {
      language: 'Idioma',
      preferences: 'Preferencias',
      chooseLanguage: 'Escolha um idioma',
      theme: 'Tema',
      dark: 'Escuro',
      light: 'Claro',
      home: 'Inicio',
      about: 'Sobre mim',
      contact: 'Contato',
      skills: 'Habilidades',
      heroPrefix: 'Eu sou',
      heroGreeting: '\u00D3la,',
      heroRole: 'Desenvolvedor Full Stack',
      heroLocation: 'De Recife, Brasil',
      hireMe: 'Entre em contato',
      experienceTitle: 'Experi\u00EAncia',
      experienceDescription: 'Minha jornada profissional e as experi\u00EAncias que moldaram minha carreira',
      skillsTitle: 'Habilidades',
      certificationsTitle: 'Certifica\u00E7\u00F5es',
      certificationsDescription: 'Certifica\u00E7\u00F5es que mudaram minha carreira',
      viewCredential: 'Ver credencial',
      showMore: 'Ver mais',
      showLess: 'Ver menos',
      promoted: 'Promovido',
      positions: 'cargos',
      current: 'Atual',
      activities: 'Atividades',
      skillsLabel: 'Habilidades',
      technologiesLabel: 'Tecnologias',
      aboutTitle: 'SOBRE MIM',
      aboutIntro: 'Eu sou Kaua Rodrigo e, desde que comecei a estudar programa\u00E7\u00E3o, percebi como resolver desafios transformou minha vida pessoal e profissional. Por meio do c\u00F3digo, posso mudar n\u00E3o apenas a minha realidade, mas tamb\u00E9m a de todo o mundo.',
      aboutSecondary: 'Acredito que, assim como todo bom desenvolvedor que gosta de resolver problemas, tamb\u00E9m posso contribuir para um mundo melhor, mais conectado e inovador por meio da tecnologia.',
      birthday: 'Nascimento:',
      city: 'Cidade:',
      study: 'Forma\u00E7\u00E3o:',
      phone: 'Telefone:',
      age: 'Idade:',
      interests: 'Interesses:',
      degree: 'Grau:',
      email: 'Email:',
      languageLabel: 'Idiomas:',
      languageValue: 'PT-BR, Ingl\u00EAs',
      birthdayValue: '23 de abril de 2004',
      cityValue: 'Recife, Brasil',
      studyValue: 'An\u00E1lise e desenvolvimento de sistemas',
      phoneValue: '+55 81 98442-3591',
      ageValue: '21 anos',
      interestsValue: 'Programa\u00E7\u00E3o, m\u00FAsica, natureza, futebol',
      degreeValue: 'Bacharelado',
      emailValue: 'kauarodrigo1193@gmail.com',
      footerAvailability: 'Dispon\u00EDvel para oportunidades',
      footerDescription: 'Desenvolvedor Full Stack focado em criar experi\u00EAncias digitais claras, \u00FAteis e confi\u00E1veis.',
      explore: 'Explorar',
      certifications: 'Certifica\u00E7\u00F5es',
      footerContact: 'Contato',
      footerBuilt: 'Projetado e construido com codigo'
    }
  };

  private readonly contentTranslations: Record<string, string> = {
    'Junior Full-Stack Developer': 'Desenvolvedor Full Stack Junior',
    'Assoc, Full-Stack Development': 'Associado, Desenvolvimento Full Stack',
    'Backend Development Intern': 'Estagiario de Desenvolvimento Back-end',
    'Full-stack development with modern technologies, focusing on clean architecture and best practices.': 'Desenvolvimento full stack com tecnologias modernas, com foco em arquitetura limpa e boas praticas.',
    'Full-stack development with modern technologies, applying Hexagonal Architecture patterns and working with Angular on the front-end and Java on the back-end.': 'Desenvolvimento full stack com tecnologias modernas, aplicando padroes de Arquitetura Hexagonal, Angular no front-end e Java no back-end.',
    'Development of a Python-based automation to extract, normalize, and consolidate JIRA data, enabling strategic visibility and risk tracking through Power BI dashboards and Development and maintenance of a legacy enterprise application using Java EE technologies, working in a full-stack role with strong focus on back-end systems.': 'Desenvolvimento de uma automacao em Python para extrair, normalizar e consolidar dados do JIRA, gerando visibilidade estrategica por meio de paineis do Power BI, alem da manutencao de uma aplicacao corporativa legada em Java EE, com foco em sistemas back-end.',
    'Development and maintenance of Robotic Process Automation (RPA). My activities include creating bots to automate repetitive and manual processes, using technologies that optimize workflows, reduce errors, and increase operational efficiency.': 'Desenvolvimento e manutencao de Automacao Robotica de Processos (RPA). Minhas atividades incluem a criacao de bots para automatizar processos repetitivos e manuais, usando tecnologias que otimizam fluxos, reduzem erros e aumentam a eficiencia operacional.',
    'Developing and maintaining full-stack applications using Angular for front-end': 'Desenvolvimento e manutencao de aplicacoes full stack usando Angular no front-end',
    'Building robust back-end services with Java 15, 17, and 21': 'Construcao de servicos back-end robustos com Java 15, 17 e 21',
    'Implementing Hexagonal Architecture (Ports and Adapters) for clean, maintainable code': 'Implementacao de Arquitetura Hexagonal (Portas e Adaptadores) para um codigo limpo e sustentavel',
    'Applying Domain-Driven Design principles and clean code practices': 'Aplicacao de principios de Domain-Driven Design e praticas de codigo limpo',
    'Working with RESTful APIs and microservices architecture': 'Trabalho com APIs RESTful e arquitetura de microsservicos',
    'Collaborating with cross-functional teams in agile environment': 'Colaboracao com equipes multidisciplinares em um ambiente agil',
    'Developed and maintained enterprise applications using Java 7, JSF, Spring Framework, and Hibernate': 'Desenvolvimento e manutencao de aplicacoes corporativas usando Java 7, JSF, Spring Framework e Hibernate',
    'Implemented business logic and integrated systems with mainframe environments': 'Implementacao de regras de negocio e integracao de sistemas com ambientes mainframe',
    'Developed user interfaces using JSP, RichFaces, and Ajax': 'Desenvolvimento de interfaces de usuario usando JSP, RichFaces e Ajax',
    'Integrated applications with DB2 databases using Hibernate and JDBC': 'Integracao de aplicacoes com bancos DB2 usando Hibernate e JDBC',
    'Consumed and exposed SOAP Web Services': 'Consumo e exposicao de Web Services SOAP',
    'Configured security layers using Spring Security': 'Configuracao de camadas de seguranca usando Spring Security',
    'Managed build and deployment processes using Apache Ant on IBM WebSphere': 'Gerenciamento de processos de build e deploy usando Apache Ant no IBM WebSphere',
    'Applied enterprise design patterns such as MVC, DAO, Service Layer, and Adapter': 'Aplicacao de padroes corporativos como MVC, DAO, Service Layer e Adapter',
    'Maintained logging, reporting, and configuration across multiple environments': 'Manutencao de logs, relatorios e configuracoes em varios ambientes',
    'Developed a Python automation to extract data from JIRA using REST API and JQL': 'Desenvolvimento de uma automacao em Python para extrair dados do JIRA usando API REST e JQL',
    'Implemented parallelized issue extraction with batching and caching to reduce latency and avoid timeouts': 'Implementacao de extracao paralelizada de issues com lotes e cache para reduzir latencia e evitar timeouts',
    'Parsed and normalized Sprint data (name, start, end, goal) with sprint calendar mapping': 'Analise e normalizacao de dados de Sprint (nome, inicio, fim e objetivo) com mapeamento do calendario de sprints',
    'Modeled and processed data using pandas, including date normalization and business-day calculations': 'Modelagem e processamento de dados com pandas, incluindo normalizacao de datas e calculo de dias uteis',
    'Implemented business rules and indicators for Blocks, Sub-Blocks, and Risks per sprint': 'Implementacao de regras de negocio e indicadores para Bloqueios, Sub-bloqueios e Riscos por sprint',
    'Delivered Power BI-ready datasets with robust exception handling and fallback mechanisms': 'Entrega de conjuntos de dados prontos para o Power BI, com tratamento de excecoes e mecanismos de fallback',
    'Collaborated with team members under technical leadership to ensure data quality and reliability': 'Colaboracao com a equipe sob lideranca tecnica para garantir qualidade e confiabilidade dos dados',
    'Systems development': 'Desenvolvimento de sistemas',
    'System migration to modern architecture': 'Migracao de sistemas para arquitetura moderna',
    'Systems integration': 'Integracao de sistemas',
    'RPA bot maintenance': 'Manutencao de bots RPA',
    'Process analysis and optimization': 'Analise e otimizacao de processos',
    'Automation of repetitive tasks': 'Automacao de tarefas repetitivas',
    'Automated report generation': 'Geracao automatizada de relatorios',
    'Monitoring and support for implemented bots': 'Monitoramento e suporte aos bots implementados',
    'Full-Stack Development': 'Desenvolvimento Full Stack',
    'Front-end Development': 'Desenvolvimento Front-end',
    'Back-end Development': 'Desenvolvimento Back-end',
    'Clean Architecture': 'Arquitetura Limpa',
    'Hexagonal Architecture': 'Arquitetura Hexagonal',
    'Domain-Driven Design': 'Domain-Driven Design',
    'Agile Methodologies': 'Metodologias Ageis',
    'Team Collaboration': 'Colaboracao em equipe',
    'Data Analysis': 'Analise de dados',
    'Process Automation': 'Automacao de processos',
    'Systems Integration': 'Integracao de sistemas',
    'Problem Solving': 'Resolucao de problemas',
    'Legacy Systems': 'Sistemas legados',
    'Enterprise Architecture': 'Arquitetura corporativa',
    'System Integration': 'Integracao de sistemas',
    'Software Maintenance': 'Manutencao de software',
    'Databases': 'Bancos de dados',
    'Requirements Analysis': 'Analise de requisitos',
    'Data Science': 'Ciencia de dados',
    'Technical documentation writing': 'Escrita de documentacao tecnica',
    'Teamwork': 'Trabalho em equipe',
    'Hexagonal Architecture patterns': 'padroes de Arquitetura Hexagonal',
    'RESTful APIs': 'APIs RESTful',
    'SOAP Web Services': 'Web Services SOAP',
    'Microsoft Certified: AI-900': 'Microsoft Certificado: AI-900',
    'Data Structures and Algorithms': 'Estruturas de Dados e Algoritmos',
    'RPA Fluency': 'Fluencia em RPA',
    'Bootcamp Banco PAN - Frontend Development with Angular': 'Bootcamp Banco PAN - Desenvolvimento Front-end com Angular',
    'JavaScript Developer Training': 'Treinamento de Desenvolvedor JavaScript',
    'Java Development with AI': 'Desenvolvimento Java com IA',
    'Bootcamp Sysvision - Data Analytics with Power BI': 'Bootcamp Sysvision - Analise de Dados com Power BI',
    'Bootcamp Deal Group - AI Centric .NET': 'Bootcamp Deal Group - .NET Centrado em IA',
    'Bootcamp Santander - Automation with N8N': 'Bootcamp Santander - Automacao com N8N',
    'Bootcamp LuizaLabs - Back-end with Python': 'Bootcamp LuizaLabs - Back-end com Python',
    'Bradesco Foundation - Java ADVANCED': 'Fundacao Bradesco - Java AVANCADO',
    'Bradesco Foundation': 'Fundacao Bradesco'
  };

  constructor() {
    effect(() => {
      const theme = this.theme();

      if (typeof document !== 'undefined') {
        document.body.classList.toggle('light-theme', theme === 'light');
        document.documentElement.style.colorScheme = theme;
      }

      this.persist('portfolio-theme', theme);
    });

    effect(() => {
      this.persist('portfolio-language', this.language());
    });
  }

  text(key: string): string {
    return this.translations[this.language()][key] ?? key;
  }

  content(value: string): string {
    if (this.language() === 'en') {
      return value;
    }

    return this.contentTranslations[value] ?? value;
  }

  setLanguage(language: Language) {
    this.language.set(language);
  }

  toggleTheme() {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
  }

  private readStored(key: string, fallback: string): string {
    if (typeof window === 'undefined') {
      return fallback;
    }

    const stored = window.localStorage.getItem(key);
    return stored ?? fallback;
  }

  private persist(key: string, value: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  }
}