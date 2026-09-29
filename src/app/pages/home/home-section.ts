import { Component, ChangeDetectorRef, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../../components/skills-section/skills.component';
import { ExperienceComponent } from '../../components/experience-section/experience.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { CertificationsSection } from '../../components/certifications-section/certifications-section';
import { FooterComponent } from '../../components/footer/footer.component';
import { PortfolioPreferencesService } from '../../services/portfolio-preferences.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SkillsComponent, ExperienceComponent, AboutSectionComponent, CertificationsSection, FooterComponent],
  templateUrl: './home-section.html',
  styleUrls: ['./home-section.css']
})
export class HomeComponent {
  readonly preferences = inject(PortfolioPreferencesService);
  displayedGreeting = '';
  displayedRole = '';
  displayedLocation = '';
  showCursor = true;
  
  private greeting = 'Hello,';
  private role = 'Full Stack Developer';
  private location = 'From Brasil';
  private typingRun = 0;

  constructor(private cdr: ChangeDetectorRef) {
    effect(() => {
      this.preferences.language();
      this.restartTypingAnimation();
    });
  }

  private restartTypingAnimation() {
    const run = ++this.typingRun;
    this.displayedGreeting = '';
    this.displayedRole = '';
    this.displayedLocation = '';

    setTimeout(() => {
      void this.startTypingAnimation(run);
    }, 500);
  }

  private async startTypingAnimation(run: number) {
    // Typing greeting
    await this.typeText(this.preferences.text('heroGreeting'), 'greeting', 100, run);
    if (run !== this.typingRun) return;
    await this.delay(400);
    
    // Typing role
    await this.typeText(this.preferences.text('heroRole'), 'role', 60, run);
    if (run !== this.typingRun) return;
    await this.delay(400);
    
    // Typing location
    await this.typeText(this.preferences.text('heroLocation'), 'location', 60, run);
  }

  private typeText(text: string, field: 'greeting' | 'role' | 'location', speed: number, run: number): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        if (run !== this.typingRun) {
          clearInterval(interval);
          resolve();
          return;
        }

        if (index < text.length) {
          if (field === 'greeting') {
            this.displayedGreeting += text.charAt(index);
          } else if (field === 'role') {
            this.displayedRole += text.charAt(index);
          } else {
            this.displayedLocation += text.charAt(index);
          }
          this.cdr.detectChanges(); // ForÃ§a o Angular a detectar mudanÃ§as
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