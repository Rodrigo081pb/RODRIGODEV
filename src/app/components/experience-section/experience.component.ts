import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioPreferencesService } from '../../services/portfolio-preferences.service';

interface Technology {
  name: string;
  icon?: string;
}

interface Position {
  role: string;
  startYear: string;
  endYear?: string;
  description: string;
  activities: string[];
  skills: string[];
  technologies: Technology[];
  current?: boolean;
}

interface Experience {
  id: number;
  year: string;
  endYear?: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  description: string;
  activities: string[];
  skills: string[];
  technologies: Technology[];
  current?: boolean;
  positions?: Position[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  readonly preferences = inject(PortfolioPreferencesService);
  experiences = signal<Experience[]>([
    {
      id: 1,
      year: '2025',
      role: 'Junior Full-Stack Developer',
      company: 'Avanade',
      companyUrl: '',
      location: 'Recife, Brasil',
      description: 'Full-stack development with modern technologies, focusing on clean architecture and best practices.',
      activities: [],
      skills: [],
      technologies: [],
      current: true,
      positions: [
        {
          role: 'Junior Full-Stack Developer',
          startYear: '03/2026',
          description: 'Full-stack development with modern technologies, applying Hexagonal Architecture patterns and working with Angular on the front-end and Java on the back-end.',
          activities: [
            'Developing and maintaining full-stack applications using Angular for front-end',
            'Building robust back-end services with Java 15, 17, and 21',
            'Implementing Hexagonal Architecture (Ports and Adapters) for clean, maintainable code',
            'Applying Domain-Driven Design principles and clean code practices',
            'Working with RESTful APIs and microservices architecture',
            'Collaborating with cross-functional teams in agile environment'
          ],
          skills: [
            'Full-Stack Development',
            'Front-end Development',
            'Back-end Development',
            'Clean Architecture',
            'Hexagonal Architecture',
            'Domain-Driven Design',
            'Agile Methodologies',
            'Team Collaboration'
          ],
          technologies: [
            { name: 'Angular' },
            { name: 'TypeScript' },
            { name: 'Java 15' },
            { name: 'Java 17' },
            { name: 'Java 21' },
            { name: 'Spring Boot' },
            { name: 'Hexagonal Architecture' },
            { name: 'RESTful APIs' },
            { name: 'Git' }
          ],
          current: true
        },
        {
          role: 'Assoc, Full-Stack Development',
          startYear: '06/2025',
          endYear: '03/2026',
          description: 'Development of a Python-based automation to extract, normalize, and consolidate JIRA data, enabling strategic visibility and risk tracking through Power BI dashboards and Development and maintenance of a legacy enterprise application using Java EE technologies, working in a full-stack role with strong focus on back-end systems.',
          activities: [
            'Developed and maintained enterprise applications using Java 7, JSF, Spring Framework, and Hibernate',
            'Implemented business logic and integrated systems with mainframe environments',
            'Developed user interfaces using JSP, RichFaces, and Ajax',
            'Integrated applications with DB2 databases using Hibernate and JDBC',
            'Consumed and exposed SOAP Web Services',
            'Configured security layers using Spring Security',
            'Managed build and deployment processes using Apache Ant on IBM WebSphere',
            'Applied enterprise design patterns such as MVC, DAO, Service Layer, and Adapter',
            'Maintained logging, reporting, and configuration across multiple environments',
            'Developed a Python automation to extract data from JIRA using REST API and JQL',
            'Implemented parallelized issue extraction with batching and caching to reduce latency and avoid timeouts',
            'Parsed and normalized Sprint data (name, start, end, goal) with sprint calendar mapping',
            'Modeled and processed data using pandas, including date normalization and business-day calculations',
            'Implemented business rules and indicators for Blocks, Sub-Blocks, and Risks per sprint',
            'Delivered Power BI-ready datasets with robust exception handling and fallback mechanisms',
            'Collaborated with team members under technical leadership to ensure data quality and reliability'
          ],
          skills: [
            'Back-end Development',
            'Front-end Development',
            'Data Analysis',
            'Process Automation',
            'Systems Integration',
            'Problem Solving',
            'Team Collaboration',
            'Legacy Systems',
            'Enterprise Architecture',
            'System Integration',
            'Software Maintenance'
          ],
          technologies: [
            { name: 'Python' },
            { name: 'pandas' },
            { name: 'JIRA REST API' },
            { name: 'JQL' },
            { name: 'ThreadPoolExecutor' },
            { name: 'Power BI' },
            { name: 'Git' },
            { name: '.NET 8' },
            { name: 'SQL SERVER' },
            { name: 'Nest.js' },
            { name: 'Java 7' },
            { name: 'Java 8' },
            { name: 'Java 17' },
            { name: 'Java 21' },
            { name: 'Spring Framework' },
            { name: 'Hibernate 3' },
            { name: 'JSF 1.1' },
            { name: 'IBM WebSphere 8.5' },
            { name: 'DB2' },
            { name: 'Apache Ant' },
            { name: 'SOAP Web Services' },
            { name: 'JSP' },
            { name: 'RichFaces' },
            { name: 'Log4j' },
            { name: 'JasperReports' },
            { name: 'COBOL Batch' }
          ],
          current: false
        }
      ]
    },
    {
      id: 2,
      year: '2024',
      endYear: '2025',
      role: 'Backend Development Intern',
      company: 'Queiroz Cavalcanti Advocacia',
      location: 'Recife, Brasil',
      description: 'Development and maintenance of Robotic Process Automation (RPA). My activities include creating bots to automate repetitive and manual processes, using technologies that optimize workflows, reduce errors, and increase operational efficiency.',
      activities: [
        'Systems development',
        'System migration to modern architecture',
        'Systems integration',
        'RPA bot maintenance',
        'Process analysis and optimization',
        'Automation of repetitive tasks',
        'Automated report generation',
        'Monitoring and support for implemented bots',
      ],
      skills: [
        'Legacy Systems',
        'Systems Integration',
        'Databases',
        'Requirements Analysis',
        'Data Science',
        'Technical documentation writing',
        'Teamwork',
      ],
      technologies: [
        { name: 'Python' },
        { name: 'JavaScript' },
        { name: 'Pandas' },
        { name: 'RPA' },
        { name: 'Selenium' },
        { name: 'Requests' },
        { name: 'IA' },
        { name: 'Git'}
    ],
      current: false
    },
  ]);

  expandedCards = signal<Set<number>>(new Set());

  toggleCard(id: number) {
    const current = this.expandedCards();
    const newSet = new Set(current);
    
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    
    this.expandedCards.set(newSet);
  }

  isExpanded(id: number): boolean {
    return this.expandedCards().has(id);
  }
}