// marquee.component.ts
import { Component, Input } from '@angular/core';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css'],
  imports: [ReviewCardComponent,CommonModule],
})
export class MarqueeComponent {
  @Input() items: any[] = [];
  @Input() reverse = false;
}
