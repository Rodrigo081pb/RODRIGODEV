import { Component } from '@angular/core';
import { CardComponent } from '../card-holographic/card.component';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css'],
  standalone: true,
  imports: [CardComponent],
})
export class AboutSectionComponent {}
