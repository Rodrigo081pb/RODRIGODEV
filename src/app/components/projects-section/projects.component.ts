import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type FilterValue = 'all' | 'frontend' | 'backend' | 'fullstack';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: 'frontend' | 'backend' | 'fullstack';
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress';
  featured: boolean;
  year: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly filters: { label: string; value: FilterValue }[] = [
    { label: 'All', value: 'all' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Full Stack', value: 'fullstack' },
  ];

  readonly activeFilter = signal<FilterValue>('all');

  readonly allProjects: Project[] = [
    {
      id: 1,
      title: 'Developer Portfolio',
      subtitle: 'Personal space on the web',
      description:
        'My portfolio built with Angular 17. Holographic cards, animated timelines, smooth dark UI and a design system crafted entirely from scratch — hand-coded, no templates.',
      category: 'frontend',
      technologies: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'SCSS'],
      githubUrl: 'https://github.com',
      liveUrl: '#',
      status: 'in-progress',
      featured: true,
      year: '2025',
    },
    {
      id: 2,
      title: 'TaskFlow API',
      subtitle: 'Task management backend',
      description:
        'RESTful API with JWT authentication, role-based access control and real-time WebSocket notifications. Built for scale and high concurrency.',
      category: 'backend',
      technologies: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'JWT'],
      githubUrl: 'https://github.com',
      status: 'completed',
      featured: false,
      year: '2024',
    },
    {
      id: 3,
      title: 'CryptoTracker',
      subtitle: 'Real-time price dashboard',
      description:
        'Cryptocurrency dashboard with live WebSocket price feeds, custom chart components and a personal portfolio balance tracker.',
      category: 'frontend',
      technologies: ['Angular', 'TypeScript', 'WebSocket', 'Chart.js'],
      githubUrl: 'https://github.com',
      liveUrl: '#',
      status: 'completed',
      featured: false,
      year: '2024',
    },
    {
      id: 4,
      title: 'StockSync',
      subtitle: 'Inventory control system',
      description:
        'Full-stack inventory system for small businesses — product management, automated stock alerts, sales reports and an Angular dashboard.',
      category: 'fullstack',
      technologies: ['.NET 8', 'C#', 'Angular', 'SQL Server'],
      githubUrl: 'https://github.com',
      status: 'completed',
      featured: false,
      year: '2024',
    },
    {
      id: 5,
      title: 'FeedConnect',
      subtitle: 'Developer community API',
      description:
        'Async API for a developer forum — threads, upvotes, tag filters and full-text search powered by PostgreSQL and Redis caching.',
      category: 'backend',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com',
      status: 'in-progress',
      featured: false,
      year: '2025',
    },
    {
      id: 6,
      title: 'ClimaView',
      subtitle: 'Weather with intention',
      description:
        'Weather app with geolocation, 7-day forecast and dynamic backgrounds that shift with current conditions. Clean UI, precise data.',
      category: 'frontend',
      technologies: ['Angular', 'TypeScript', 'OpenWeather API', 'Leaflet'],
      githubUrl: 'https://github.com',
      liveUrl: '#',
      status: 'completed',
      featured: false,
      year: '2023',
    },
  ];

  readonly featuredProject = computed<Project | null>(() => {
    const filter = this.activeFilter();
    const featured = this.allProjects.find((p) => p.featured) ?? null;
    if (!featured) return null;
    return filter === 'all' || featured.category === filter ? featured : null;
  });

  readonly filteredProjects = computed<Project[]>(() => {
    const filter = this.activeFilter();
    const nonFeatured = this.allProjects.filter((p) => !p.featured);
    return filter === 'all'
      ? nonFeatured
      : nonFeatured.filter((p) => p.category === filter);
  });

  setFilter(value: FilterValue): void {
    this.activeFilter.set(value);
  }

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      frontend: 'Frontend',
      backend: 'Backend',
      fullstack: 'Full Stack',
    };
    return labels[category] ?? category;
  }
}
