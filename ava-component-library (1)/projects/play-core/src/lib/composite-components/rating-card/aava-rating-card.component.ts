import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { AavaDefaultCardComponent } from '../../components/card/default-card/aava-default-card.component';
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaTextareaComponent } from '../../components/textarea/aava-textarea.component';



export interface RatingConfig {
  title?: string;
  description?: string;
  minRating?: number;
  maxRating?: number;
  submitButtonText?: string;
  thankYouTitle?: string;
  thankYouMessage?: string;
  showIllustration?: boolean;
}

@Component({
  selector: 'aava-rating-card',
  standalone: true,
  imports: [CommonModule, AavaDefaultCardComponent, AavaButtonComponent, AavaIconComponent, AavaTextareaComponent],
  templateUrl: './aava-rating-card.component.html',
  styleUrls: ['./aava-rating-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})

export class AavaRatingCardComponent {
  @Input() config: RatingConfig = {};
  @Input() isSubmitted: boolean = false;
  @Input() showRatingButtons: boolean = true; // New input property to control the visibility of rating buttons
  @Output() ratingSubmitted = new EventEmitter<number>();

  selectedRating: number | null = null;
  ratingOptions: number[] = [];
  stars: { index: number; filled: boolean }[] = [];

  ngOnInit() {
    const minRating = this.config.minRating || 1;
    const maxRating = this.config.maxRating || 5;
    this.ratingOptions = Array.from({ length: maxRating - minRating + 1 }, (_, i) => minRating + i);
    this.stars = this.ratingOptions.map((_, index) => ({ index, filled: false }));
  }

  selectRating(rating: number) {
    this.selectedRating = rating;
    this.stars = this.stars.map(star => ({
      ...star,
      filled: star.index < rating
    }));
  }

  submitRating() {
    if (this.selectedRating) {
      this.isSubmitted = true;
      this.ratingSubmitted.emit(this.selectedRating);
    }
  }

  reset() {
    this.selectedRating = null;
    this.isSubmitted = false;
    this.stars = this.stars.map(star => ({
      ...star,
      filled: false
    }));
  }

}