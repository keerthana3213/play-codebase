import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aava-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aava-rating.component.html',
  styleUrls: ['./aava-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaRatingComponent {
  @Input() value = 0;        // Supports halves like 4.5
  @Input() max = 5;          // Number of stars
  @Input() readonly = false; // Disable interaction
  @Input() size: number | 'xs' | 'sm' | 'md' | 'lg' = 'md'; // Predefined sizes

  @Input() showValue = false;// Show numeric rating
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  @Output() rated = new EventEmitter<number>();

  hoveredValue = 0;

  // Paths to your assets
  starFilled = 'assets/star-filled.svg';
  starHalf = 'assets/star-half.svg';
  starEmpty = 'assets/star-outline.svg';

  // Map size names to pixel values
  sizeMap: Record<'xs' | 'sm' | 'md' | 'lg', number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32
  };

  get starSize(): number {
    if (typeof this.size === 'number') {
      return this.size; // If number passed, use directly
    }
    const sizeMap: Record<'xs' | 'sm' | 'md' | 'lg', number> = {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32
    };
    return sizeMap[this.size] || 24;
  }


  get displayValue(): number {
    return this.hoveredValue || this.value;
  }

  isFullStar(index: number): boolean {
    return this.displayValue >= index + 1;
  }

  isHalfStar(index: number): boolean {
    return (
      this.displayValue >= index + 0.5 &&
      this.displayValue < index + 1
    );
  }

  onStarClick(event: MouseEvent, index: number) {
    if (this.readonly) return;

    const { offsetX, target } = event;
    const targetWidth = (target as HTMLElement).clientWidth;

    const isHalf = offsetX < targetWidth / 2;
    this.value = isHalf ? index + 0.5 : index + 1;

    this.rated.emit(this.value);
  }

  onHoverStar(event: MouseEvent, index: number) {
    if (this.readonly) return;

    const { offsetX, target } = event;
    const targetWidth = (target as HTMLElement).clientWidth;

    const isHalf = offsetX < targetWidth / 2;
    this.hoveredValue = isHalf ? index + 0.5 : index + 1;
  }

  onLeave() {
    this.hoveredValue = 0;
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (this.readonly) return;

    const key = event.key;

    if (key === 'ArrowRight' || key === 'ArrowUp') {
      // Move rating up
      this.value = Math.min(this.max, this.value + 1);
      this.rated.emit(this.value);
      event.preventDefault();
    }
    else if (key === 'ArrowLeft' || key === 'ArrowDown') {
      // Move rating down
      this.value = Math.max(0, this.value - 1);
      this.rated.emit(this.value);
      event.preventDefault();
    }
    else if (key === 'Enter' || key === ' ') {
      // Select the hovered star
      this.value = index + 1;
      this.rated.emit(this.value);
      event.preventDefault();
    }
  }
}
