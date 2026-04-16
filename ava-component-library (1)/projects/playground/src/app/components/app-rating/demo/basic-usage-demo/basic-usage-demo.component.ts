import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRatingComponent } from '@aava/play-core';

@Component({
  selector: 'ava-rating-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaRatingComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrl: './basic-usage-demo.component.scss',
})
export class BasicUsageDemoComponent {
  ratingValue = 0;

  onRatingChange(value: number) {
    this.ratingValue = value;
    console.log('Rating changed to:', value);
  }

  resetRating() {
    this.ratingValue = 0;
  }
}
