import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRatingComponent } from '@aava/play-core';

@Component({
  selector: 'ava-rating-half-star-demo',
  standalone: true,
  imports: [CommonModule, AavaRatingComponent],
  templateUrl: './half-star-demo.component.html',
  styleUrl: './half-star-demo.component.scss',
})
export class HalfStarDemoComponent {
  ratingValue = 0;

  onRatingChange(value: number) {
    this.ratingValue = value;
    console.log('Rating changed to:', value);
  }

  setRating(value: number) {
    this.ratingValue = value;
  }

  resetRating() {
    this.ratingValue = 0;
  }

  getRatingText(rating: number): string {
    if (rating === 0) return 'No rating';
    if (rating === 0.5) return 'Half star';
    if (rating === Math.floor(rating)) return `${rating} stars`;
    return `${Math.floor(rating)}.5 stars`;
  }
}
