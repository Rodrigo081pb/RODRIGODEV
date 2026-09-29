import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { PortfolioPreferencesService } from '../../services/portfolio-preferences.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  readonly preferences = inject(PortfolioPreferencesService);
}