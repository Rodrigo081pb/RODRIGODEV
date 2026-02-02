import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  credentialUrl: string;
  badgeImage: string;
}

@Component({
  selector: 'app-certifications-section',
  imports: [CommonModule],
  templateUrl: './certifications-section.html',
  styleUrl: './certifications-section.css',
})
export class CertificationsSection {
  certifications = signal<Certification[]>([
    {
      id: 1,
      title: 'Microsoft Certified: AI-900',
      issuer: 'Microsoft',
      credentialUrl: 'https://learn.microsoft.com/pt-pt/users/k-rodrigo/credentials/ebb4384a48954ab?ref=https%3A%2F%2Fwww.linkedin.com%2F',
      badgeImage: './badjes-certifications/microsoft-certified-fundamentals-badge.svg'
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      issuer: 'Udacity',
      credentialUrl: 'www.udacity.com/certificate/e/a6726362-9954-11f0-9a0e-a3ddcdff849c',
      badgeImage: './badjes-certifications/alg.png'
    },
    {
      id: 3,
      title: 'GitHub Actions',
      issuer: 'Udacity',
      credentialUrl: 'www.udacity.com/certificate/e/e2b389ec-a18c-11f0-b5f9-83757778e753',
      badgeImage: './badjes-certifications/github_icon.png'
    },
    {
      id: 4,
      title: 'RPA Fluency',
      issuer: 'Udacity',
      credentialUrl: 'www.udacity.com/certificate/e/f8502466-a440-11f0-8442-af451027b4e2',
      badgeImage: './badjes-certifications/rpa.png'
    },
    {
      id: 5,
      title: 'Bootcamp Banco PAN - Frontend Development with Angular',
      issuer: 'Banco PAN',
      credentialUrl: '',
      badgeImage: './badjes-certifications/angularBANCOPAN.png'
    },
    {
      id: 6,
      title: 'JavaScript Developer Training',
      issuer: 'Digital Innovation One',
      credentialUrl: '',
      badgeImage: './badjes-certifications/javascriptDeveloper.png'
    },
    {
      id: 7,
      title: 'Java Development with AI',
      issuer: 'Digital Innovation One',
      credentialUrl: '',
      badgeImage: './badjes-certifications/devJavaIA.png'
    },
    {
      id: 8,
      title: 'Bootcamp Sysvision - Data Analytics with Power BI',
      issuer: 'Digital Innovation One',
      credentialUrl: '',
      badgeImage: './badjes-certifications/Sysvision.png'
    },
    {
      id: 9,
      title: 'Bootcamp - DecolaTech',
      issuer: 'Digital Innovation One',
      credentialUrl: '',
      badgeImage: './badjes-certifications/DecolaTech.png'
    },
    {
      id: 10,
      title: 'Bootcamp Deal Group - AI Centric .NET',
      issuer: 'Digital Innovation One',
      credentialUrl: '',
      badgeImage: './badjes-certifications/AI-Deal.png'
    },
    {
      id: 11,
      title: 'Bootcamp Santander - Automation with N8N',
      issuer: 'Digital Innovation One',
      credentialUrl: '',
      badgeImage: './badjes-certifications/Automations.png'
    },
    {
      id: 12,
      title: 'Bootcamp LuizaLabs - Back-end with Python',
      issuer: 'Digital Innovation One',
      credentialUrl: '',
      badgeImage: './badjes-certifications/back-end-python.png'
    },
    {
      id: 13,
      title: 'Bradesco Foundation - Java ADVANCED',
      issuer: 'Bradesco Foundation',
      credentialUrl: '',
      badgeImage: './icons-skills/java.png'
    }
  ]);

  // Controle de paginação
  itemsPerPage = 3;
  visibleItems = signal<number>(3);

  // Certificações visíveis baseado na paginação
  get visibleCertifications() {
    return this.certifications().slice(0, this.visibleItems());
  }

  // Verifica se há mais certificações para mostrar
  get hasMore(): boolean {
    return this.visibleItems() < this.certifications().length;
  }

  // Verifica se está no estado expandido
  get isExpanded(): boolean {
    return this.visibleItems() > this.itemsPerPage;
  }

  // Mostra mais certificações
  showMore(): void {
    const newCount = Math.min(
      this.visibleItems() + this.itemsPerPage,
      this.certifications().length
    );
    this.visibleItems.set(newCount);
  }

  // Mostra menos certificações (volta ao estado inicial)
  showLess(): void {
    this.visibleItems.set(this.itemsPerPage);
  }

  navigateToCertification(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
