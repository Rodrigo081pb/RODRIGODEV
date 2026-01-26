import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../../components/skills-section/skills.component';
import { ExperienceComponent } from '../../components/experience-section/experience.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SkillsComponent, ExperienceComponent, AboutSectionComponent],
  templateUrl: './home-section.html',
  styleUrls: ['./home-section.css']
})
export class HomeComponent implements OnInit {
  displayedGreeting = '';
  displayedRole = '';
  displayedLocation = '';
  showCursor = true;
  
  private greeting = 'Hello,';
  private role = 'Full Stack Developer';
  private location = 'From Brasil';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Pequeno delay antes de começar a animação
    setTimeout(() => {
      this.startTypingAnimation();
    }, 500);
  }

  private async startTypingAnimation() {
    // Typing greeting
    await this.typeText(this.greeting, 'greeting', 100);
    await this.delay(400);
    
    // Typing role
    await this.typeText(this.role, 'role', 60);
    await this.delay(400);
    
    // Typing location
    await this.typeText(this.location, 'location', 60);
  }

  private typeText(text: string, field: 'greeting' | 'role' | 'location', speed: number): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          if (field === 'greeting') {
            this.displayedGreeting += text.charAt(index);
          } else if (field === 'role') {
            this.displayedRole += text.charAt(index);
          } else {
            this.displayedLocation += text.charAt(index);
          }
          this.cdr.detectChanges(); // Força o Angular a detectar mudanças
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}