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
      badgeImage: './microsoft-certified-fundamentals-badge.svg'
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      issuer: 'Udacity',
      credentialUrl: 'www.udacity.com/certificate/e/a6726362-9954-11f0-9a0e-a3ddcdff849c',
      badgeImage: './alg.png'
    },
    {
      id: 3,
      title: 'GitHub Actions',
      issuer: 'Udacity',
      credentialUrl: 'www.udacity.com/certificate/e/e2b389ec-a18c-11f0-b5f9-83757778e753',
      badgeImage: '/github_icon.png'
    }
  ]);

  navigateToCertification(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
