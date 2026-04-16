import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRatingComponent } from '@aava/play-core';

@Component({
  selector: 'ava-rating-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaRatingComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrl: './sizes-demo.component.scss',
})
export class SizesDemoComponent {
  ratingValue = 3.5;

  onRatingChange(value: number) {
    this.ratingValue = value;
    console.log('Rating changed to:', value);
  }

  resetRating() {
    this.ratingValue = 3.5;
  }
}
