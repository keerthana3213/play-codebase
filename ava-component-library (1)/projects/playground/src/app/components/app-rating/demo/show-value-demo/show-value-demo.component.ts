import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRatingComponent } from '@aava/play-core';

@Component({
  selector: 'ava-rating-show-value-demo',
  standalone: true,
  imports: [CommonModule, AavaRatingComponent],
  templateUrl: './show-value-demo.component.html',
  styleUrl: './show-value-demo.component.scss',
})
export class ShowValueDemoComponent {
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
}
