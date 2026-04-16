import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { Router } from '@angular/router';

// Carousel item interface
export interface CarouselItem {
  id: string;
  title?: string;
  imageUrl?: string;
  imageAlt?: string;
  routeUrl?: string;
}

@Component({
  selector: 'aava-carousel',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-carousel.component.html',
  styleUrls: ['./aava-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'aava-carousel',
  },
})
export class AavaCarouselComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  // autoplay property is now only set via @Input()
  @Input() autoplayInterval: number = 2000; // ms
  private autoplayTimer: any;

  @Input() items: CarouselItem[] = [];
  @Input() activeIndex?: number;
  @Input() size: 'lg' | 'md' | 'sm' | 'xs' = 'md';
  @Input() customStyles: Record<string, string> = {};
  @Input() autoplay: boolean = false;

  @Output() itemChange = new EventEmitter<{ item: CarouselItem; index: number }>();

  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLElement>;
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef<HTMLElement>;

  transitionDuration = 600; // ms
  private _activeIndex = 0;
  private wheelTimeout: any;

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    // Set initial active index to 0 (first card/dot), unless explicitly provided
    this._activeIndex = this.activeIndex ?? 0;
    this.updateCarouselPosition();
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['autoplayInterval'] && !changes['autoplayInterval'].firstChange) {
      if (this.autoplay) {
        this.startAutoplay();
      }
    }
    if (changes['autoplay'] && !changes['autoplay'].firstChange) {
      if (this.autoplay) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
    }
    if (changes['activeIndex'] && !changes['activeIndex'].firstChange) {
      this._activeIndex = this.activeIndex ?? this._activeIndex;
      this.updateCarouselPosition();
    }
    if (changes['items'] && !changes['items'].firstChange) {
      // Ensure active index is still valid after items change
      if (this._activeIndex >= this.items.length) {
        this._activeIndex = Math.max(0, this.items.length - 1);
      }
      this.updateCarouselPosition();
    }
  }

  ngAfterViewInit(): void {
    this.updateCarouselPosition();
    setTimeout(() => this.cdr.detectChanges(), 0);

    // Setup wheel event for trackpad swipe
    const container = this.carouselContainer?.nativeElement;
    if (container) {
      container.addEventListener('wheel', this.onWheel, { passive: true });
    }
  }

  ngOnDestroy(): void {
    // Cleanup wheel event listener
    const container = this.carouselContainer?.nativeElement;
    if (container) {
      container.removeEventListener('wheel', this.onWheel);
    }
    if (this.wheelTimeout) {
      clearTimeout(this.wheelTimeout);
    }
    this.stopAutoplay();
  }
  // Autoplay controls
  startAutoplay(): void {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      this.goToNext();
    }, this.autoplayInterval);
  }

  stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  toggleAutoplay(): void {
    this.autoplay = !this.autoplay;
    if (this.autoplay) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  get computedStyles(): Record<string, string> {
    return {
      ...this.customStyles,
      'transition-duration': `${this.transitionDuration}ms`,
    };
  }

  get currentActiveIndex(): number {
    return this._activeIndex;
  }

  // Handle trackpad horizontal wheel swipe
  onWheel = (event: WheelEvent) => {
    if (Math.abs(event.deltaX) > 20) {
      clearTimeout(this.wheelTimeout);
      this.wheelTimeout = setTimeout(() => {
        if (event.deltaX > 0) this.goToNext();
        else this.goToPrevious();
      }, 50);
    }
  };

  // Get the CSS class for each card based on its position - EXACTLY like working POC
  getCardPositionClass(cardIndex: number): string {
    if (this.items.length === 0) {
      return `ava-carousel__item--hidden ava-carousel__item--${this.size}`;
    }

    const sizeClass = `ava-carousel__item--${this.size}`;

    // Calculate offset from active index (same logic as working POC)
    let offset = cardIndex - this._activeIndex;

    // Handle circular wrapping
    const halfLength = Math.floor(this.items.length / 2);
    if (offset > halfLength) {
      offset -= this.items.length;
    } else if (offset < -halfLength) {
      offset += this.items.length;
    }

    // Apply position class based on offset (exact POC logic)
    switch (offset) {
      case 0:
        return `ava-carousel__item--center ${sizeClass}`;
      case -1:
        return `ava-carousel__item--left-1 ${sizeClass}`;
      case -2:
        return `ava-carousel__item--left-2 ${sizeClass}`;
      case 1:
        return `ava-carousel__item--right-1 ${sizeClass}`;
      case 2:
        return `ava-carousel__item--right-2 ${sizeClass}`;
      default:
        return `ava-carousel__item--hidden ${sizeClass}`;
    }
  }

  // Get the CSS class based on offset from center (keeping for backward compatibility)
  getCardPositionClassByOffset(offset: number): string {
    const sizeClass = `ava-carousel__item--${this.size}`;
    switch (offset) {
      case 0: return `ava-carousel__item--center ${sizeClass}`;
      case -1: return `ava-carousel__item--left-1 ${sizeClass}`;
      case 1: return `ava-carousel__item--right-1 ${sizeClass}`;
      case -2: return `ava-carousel__item--left-2 ${sizeClass}`;
      case 2: return `ava-carousel__item--right-2 ${sizeClass}`;
      default: return `ava-carousel__item--hidden ${sizeClass}`;
    }
  }

  // Get the size class for the carousel container
  getCarouselSizeClass(): string {
    return `ava-carousel--${this.size}`;
  }

  // Get visible cards with smart positioning (keeping for backward compatibility)
  getVisibleCards(): Array<{ index: number, positionClass: string }> {
    const visibleCards: Array<{ index: number, positionClass: string }> = [];
    const total = this.items.length;

    // Show 5 cards: 2 left, center, 2 right
    for (let offset = -2; offset <= 2; offset++) {
      const wrappedIndex = (this._activeIndex + offset + total) % total;
      const positionClass = this.getCardPositionClassByOffset(offset);
      visibleCards.push({
        index: wrappedIndex,
        positionClass: positionClass,
      });
    }
    return visibleCards;
  }

  // Navigation methods
  goToPrevious(): void {
    this._activeIndex = (this._activeIndex - 1 + this.items.length) % this.items.length;
    this.updateCarouselPosition();
    this.emitItemChange();
  }

  goToNext(): void {
    this._activeIndex = (this._activeIndex + 1) % this.items.length;
    this.updateCarouselPosition();
    this.emitItemChange();
  }

  goToSlide(index: number): void {
    if (index < 0 || index >= this.items.length || index === this._activeIndex) {
      return;
    }
    this._activeIndex = index;
    this.updateCarouselPosition();
    this.emitItemChange();
  }

  // Handle click on cards
  onCardClick(index: number): void {
    if (index === this._activeIndex) {
      const item = this.items[index];
      if (item?.routeUrl) {
        this.router.navigate([item.routeUrl]);
      }
    } else {
      this.goToSlide(index);
    }
  }

  // Handle click on indicators
  onIndicatorClick(index: number): void {
    this.goToSlide(index);
  }

  // Check if indicator is active
  isIndicatorActive(index: number): boolean {
    return index === this._activeIndex;
  }

  // Update card positions (trigger change detection)
  private updateCarouselPosition(): void {
    this.cdr.markForCheck();
  }

  // Emit item change event
  private emitItemChange(): void {
    if (this.items[this._activeIndex]) {
      this.itemChange.emit({
        item: this.items[this._activeIndex],
        index: this._activeIndex
      });
    }
  }

  // TrackBy functions for better performance
  trackByCardIndex = (_: number, cardInfo: { index: number, positionClass: string }): number => {
    return cardInfo.index;
  };

  trackByItemId = (index: number, item: CarouselItem): string => {
    return item.id || index.toString();
  };
}