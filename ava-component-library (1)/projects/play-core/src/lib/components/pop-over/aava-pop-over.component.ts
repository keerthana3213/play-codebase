import {
  Component,
  Input,
  ElementRef,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';

export interface PopOverData {
  header: string;
  description: string;
  learnMoreUrl?: string; // Optional URL for learn more functionality
}

export interface PopOverConfig {
  arrow?: 'start' | 'center' | 'end' | null;
  position?: 'top' | 'bottom' | 'left' | 'right';
  left: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
  showButtons?: boolean;
  showPagination?: boolean;
  showIcon?: boolean;
  showSkip?: boolean;
  showLearnMore?: boolean;
}

@Component({
  selector: 'aava-pop-over',
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-pop-over.component.html',
  styleUrl: './aava-pop-over.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaPopOverComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('popover', { static: false }) popoverEl!: ElementRef;
  @ViewChild('popoverW', { static: false }) popoverW!: ElementRef;

  @Input() config: PopOverConfig = {
    left: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0
  };
  @Input() data: PopOverData[] = [];
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  visible = false;
  currentIndex = 0;
  removeListeners: (() => void) | undefined;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.length > 0) {
      this.currentIndex = 0;
    }
    // Set visible immediately to show the popover
    this.visible = true;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.popoverEl && this.popoverW) {
        this.updatePosition();

        const onScrollOrResize = () => this.updatePosition();
        window.addEventListener('scroll', onScrollOrResize, true);
        window.addEventListener('resize', onScrollOrResize);

        this.removeListeners = () => {
          window.removeEventListener('scroll', onScrollOrResize, true);
          window.removeEventListener('resize', onScrollOrResize);
        };
      }
    }, 100);
  }

  get currentData(): PopOverData | null {
    return this.data && this.data.length > 0 ? this.data[this.currentIndex] : null;
  }

  get currentPage(): string {
    return `${this.currentIndex + 1}/${this.data?.length || 0}`;
  }

  get hasPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get hasNext(): boolean {
    return this.currentIndex < (this.data?.length || 0) - 1;
  }

  previous(event?: any): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (this.hasPrevious) {
      this.currentIndex--;
      this.cdr.markForCheck();
    }
  }

  next(event?: any): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (this.hasNext) {
      this.currentIndex++;
      this.cdr.markForCheck();
    }
  }

  skip(event?: any): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    // Close the popover when skip is clicked
    this.visible = false;
    this.cdr.markForCheck();
  }

  learnMore(event?: any): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    // Open URL from current data if provided, otherwise do nothing
    const url = this.currentData?.learnMoreUrl;
    if (url) {
      window.open(url, '_blank');
    }
  }

  updatePosition() {
    if (!this.popoverEl || !this.popoverW || !this.config ||
      typeof this.config.left !== 'number' ||
      typeof this.config.top !== 'number' ||
      typeof this.config.bottom !== 'number' ||
      typeof this.config.width !== 'number' ||
      typeof this.config.height !== 'number') {
      return;
    }

    const popoverWidth = this.popoverEl.nativeElement.getBoundingClientRect().width;
    const popoverHeight = this.popoverEl.nativeElement.getBoundingClientRect().height;

    if (this.config.position === 'top') {
      if (this.config.arrow === 'start') {
        const arrowPosition = this.config.left;
        const popoverPosition = arrowPosition;
        this.popoverW.nativeElement.style.left = `${popoverPosition}px`;
        this.popoverW.nativeElement.style.top = `${this.config.top - popoverHeight - 28}px`;
      } else if (this.config.arrow === 'center') {
        const arrowPosition = this.config.left + (this.config.width / 2);
        const popoverPosition = arrowPosition - (popoverWidth / 2);
        this.popoverW.nativeElement.style.left = `${popoverPosition}px`;
        this.popoverW.nativeElement.style.top = `${this.config.top - popoverHeight - 28}px`;
      } else if (this.config.arrow === 'end') {
        const arrowPosition = this.config.left + this.config.width;
        const popoverLeftPosition = arrowPosition - popoverWidth;
        this.popoverW.nativeElement.style.left = `${popoverLeftPosition}px`;
        this.popoverW.nativeElement.style.top = `${this.config.top - popoverHeight - 28}px`;
      }
    }

    if (this.config.position === 'bottom') {
      if (this.config.arrow === 'start') {
        const arrowPosition = this.config.left;
        const popoverPosition = arrowPosition;
        this.popoverW.nativeElement.style.left = `${popoverPosition}px`;
        this.popoverW.nativeElement.style.top = `${this.config.bottom + 20}px`;
      } else if (this.config.arrow === 'center') {
        const arrowPosition = this.config.left + (this.config.width / 2);
        const popoverPosition = arrowPosition - (popoverWidth / 2);
        this.popoverW.nativeElement.style.left = `${popoverPosition}px`;
        this.popoverW.nativeElement.style.top = `${this.config.bottom + 20}px`;
      } else if (this.config.arrow === 'end') {
        const arrowPosition = this.config.left + this.config.width;
        const popoverLeftPosition = arrowPosition - popoverWidth;
        this.popoverW.nativeElement.style.left = `${popoverLeftPosition}px`;
        this.popoverW.nativeElement.style.top = `${this.config.bottom + 20}px`;
      }
    }

    if (this.config.position === 'left') {
      const popoverPosition = this.config.top + (this.config.height / 2) - (popoverHeight / 2);
      this.popoverW.nativeElement.style.top = `${popoverPosition}px`;
      this.popoverW.nativeElement.style.left = `${this.config.left - popoverWidth - 30}px`;
    }

    if (this.config.position === 'right') {
      const popoverPosition = this.config.top + (this.config.height / 2) - (popoverHeight / 2);
      this.popoverW.nativeElement.style.top = `${popoverPosition}px`;
      this.popoverW.nativeElement.style.left = `${this.config.left + this.config.width + 10}px`;
    }

    this.setArrowPosition();
    this.popoverW.nativeElement.style.opacity = `1`;
    this.cdr.markForCheck();
  }

  setArrowPosition() {
    // Similar to tooltip arrow positioning logic
    if (this.config.position === 'top' || this.config.position === 'bottom') {
      if (this.config.arrow === 'start') {
        this.popoverW.nativeElement.style.setProperty('--arrow-left-position', '20px');
      } else if (this.config.arrow === 'center') {
        this.popoverW.nativeElement.style.setProperty('--arrow-left-position', '50%');
      } else if (this.config.arrow === 'end') {
        this.popoverW.nativeElement.style.setProperty('--arrow-left-position', 'calc(100% - 20px)');
      }
    }

    if (this.config.position === 'left' || this.config.position === 'right') {
      if (this.config.arrow === 'start') {
        this.popoverW.nativeElement.style.setProperty('--arrow-top-position', '20px');
      } else if (this.config.arrow === 'center') {
        this.popoverW.nativeElement.style.setProperty('--arrow-top-position', '50%');
      } else if (this.config.arrow === 'end') {
        this.popoverW.nativeElement.style.setProperty('--arrow-top-position', 'calc(100% - 20px)');
      }
    }
  }

  ngOnDestroy() {
    if (this.removeListeners) {
      this.removeListeners();
    }
  }
}
