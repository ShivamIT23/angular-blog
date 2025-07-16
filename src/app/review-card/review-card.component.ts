// review-card.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input() img!: string;
  @Input() name!: string;
  @Input() username!: string;
  @Input() body!: string;
}
