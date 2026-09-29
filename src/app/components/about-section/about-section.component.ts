import { Component, inject } from '@angular/core';
import { CardComponent } from '../card-holographic/card.component';
import { PortfolioPreferencesService } from '../../services/portfolio-preferences.service';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css'],
  standalone: true,
  imports: [CardComponent],
})
export class AboutSectionComponent {
  readonly preferences = inject(PortfolioPreferencesService);
}
