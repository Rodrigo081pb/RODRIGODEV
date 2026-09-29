import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioPreferencesService } from '../../services/portfolio-preferences.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  readonly preferences = inject(PortfolioPreferencesService);
  isMenuOpen = signal(false);
  isTranslatorOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  toggleTranslator() {
    this.isTranslatorOpen.set(!this.isTranslatorOpen());
  }

  closeTranslator() {
    this.isTranslatorOpen.set(false);
  }
}
