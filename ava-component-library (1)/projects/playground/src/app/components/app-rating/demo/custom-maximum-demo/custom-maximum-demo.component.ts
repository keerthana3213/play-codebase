import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaRatingComponent } from '@aava/play-core';

@Component({
  selector: 'ava-rating-custom-maximum-demo',
  standalone: true,
  imports: [CommonModule, AavaRatingComponent],
  templateUrl: './custom-maximum-demo.component.html',
  styleUrl: './custom-maximum-demo.component.scss',
})
export class CustomMaximumDemoComponent {
  rating3Star = 0;
  rating4Star = 0;
  rating5Star = 0;
  rating10Star = 0;
  customMax = 7;
  customRating = 0;

  onRating3StarChange(value: number) {
    this.rating3Star = value;
    console.log('3-star rating changed to:', value);
  }

  onRating4StarChange(value: number) {
    this.rating4Star = value;
    console.log('4-star rating changed to:', value);
  }

  onRating5StarChange(value: number) {
    this.rating5Star = value;
    console.log('5-star rating changed to:', value);
  }

  onRating10StarChange(value: number) {
    this.rating10Star = value;
    console.log('10-star rating changed to:', value);
  }

  onMaxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (value >= 1 && value <= 20) {
      this.customMax = value;
      // Adjust rating if it exceeds new max
      if (this.customRating > this.customMax) {
        this.customRating = this.customMax;
      }
    }
  }

  onCustomRatingChange(value: number) {
    this.customRating = value;
    console.log('Custom rating changed to:', value);
  }

  resetAllRatings() {
    this.rating3Star = 0;
    this.rating4Star = 0;
    this.rating5Star = 0;
    this.rating10Star = 0;
    this.customRating = 0;
  }
}
