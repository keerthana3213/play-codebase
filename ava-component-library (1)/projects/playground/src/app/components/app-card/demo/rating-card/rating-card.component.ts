import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AavaRatingCardComponent, RatingConfig } from '@aava/play-core';

const config: RatingConfig = {
  title: 'How did we do?',
  description: 'Your custom description...',
  minRating: 1,           // Start rating from
  maxRating: 5,           // End rating at  
  submitButtonText: 'Submit',
  thankYouTitle: 'Thank You',
  thankYouMessage: 'Your custom thank you message...',
  showIllustration: true  // Show/hide the people illustration
};

@Component({
  selector: 'app-rating-card',
  imports: [AavaRatingCardComponent],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.scss'
})
export class AppRatingCardComponent {
  handleRating($event: number) {
    throw new Error('Method not implemented.');
  }
  yourConfig: RatingConfig = config;


}
