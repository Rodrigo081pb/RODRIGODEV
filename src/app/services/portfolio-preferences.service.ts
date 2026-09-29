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
      experienceTitle: 'Experiencia',
      experienceDescription: 'Minha jornada profissional e as experiencias que moldaram minha carreira',
      skillsTitle: 'Habilidades',
      certificationsTitle: 'Certificacoes',
      certificationsDescription: 'Certificacoes que mudaram minha carreira',
      viewCredential: 'Ver credencial',
      showMore: 'Ver mais',
      showLess: 'Ver menos',
      promoted: 'Promovido',
      positions: 'cargos',
      current: 'Atual',
      activities: 'Atividades',
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