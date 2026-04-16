import {
  Component,
  Input,
  ElementRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AavaIconComponent } from '../icon/aava-icon.component';

/**
 * Configuration interface for tooltip component
 */
export interface TooltipConfig {
  title?: string;
  description?: string;
  type: 'simple' | 'card' | 'guided';
  arrow: 'start' | 'center' | 'end';
  size: 'sm' | 'md' | 'lg';
  position: 'top' | 'bottom' | 'left' | 'right';
  variant: 'default';
  icon?: string;
  iconColor?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  tooltipWidth: number | string;
  offsetTop?: number;
  offsetLeft?: number;
}

@Component({
  selector: 'aava-tooltip',
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-tooltip.component.html',
  styleUrl: './aava-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.position]': "'absolute'",
    '[style.top.px]': '0',
    '[style.left.px]': '0'
  }
})
export class AavaTooltipComponent implements AfterViewInit, OnDestroy {
  @Input() customStyles: Record<string, string> = {};

  @ViewChild('tooltip', { static: true }) tooltipEl!: ElementRef;
  @ViewChild('tooltipW', { static: true }) tooltipW!: ElementRef;

  @Input() config!: TooltipConfig;
  @Input() id = '';

  visible = false;
  private removeListeners: (() => void) | undefined;
  private positionTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly uniqueId = `aava-tooltip-${Math.random().toString(36).slice(2, 11)}`;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * Gets the unique ID for this tooltip instance
   */
  get tooltipId(): string {
    return this.id || this.uniqueId;
  }

  ngAfterViewInit(): void {
    this.positionTimeout = setTimeout(() => {
      if (!this.tooltipEl?.nativeElement || !this.tooltipW?.nativeElement) {
        return;
      }

      this.updatePosition();

      const onScrollOrResize = () => {
        if (this.tooltipEl?.nativeElement && this.tooltipW?.nativeElement) {
          this.updatePosition();
        }
      };

      window.addEventListener('scroll', onScrollOrResize, true);
      window.addEventListener('resize', onScrollOrResize);

      this.removeListeners = () => {
        window.removeEventListener('scroll', onScrollOrResize, true);
        window.removeEventListener('resize', onScrollOrResize);
      };
    }, 100);
  }
  /**
   * Updates the tooltip position based on configuration
   */
  updatePosition(): void {
    if (!this.config || !this.tooltipW?.nativeElement || !this.tooltipEl?.nativeElement) {
      return;
    }

    const cWidth = typeof this.config.tooltipWidth === 'number' ? this.config.tooltipWidth : Number(this.config.tooltipWidth) || 0;
    const tooltipWidth = cWidth > 0 ? cWidth : this.tooltipW.nativeElement.getBoundingClientRect().width;
    const toolTipheight = this.tooltipEl.nativeElement.getBoundingClientRect().height;

    if (cWidth > 0) {
      this.tooltipW.nativeElement.style.width = `${cWidth}px`;
      this.tooltipEl.nativeElement.style.whiteSpace = 'normal';
    }

    if (this.config.position === 'top') {
      const offsetTop = this.config.offsetTop || 0;
      const offsetLeft = this.config.offsetLeft || 0;
      
      if (this.config.arrow === 'start') {
        // Arrow at left - align tooltip left with trigger left
        const arrowPosition = this.config.left;
        const tooltipPosition = arrowPosition + offsetLeft;
        this.tooltipW.nativeElement.style.left = `${tooltipPosition}px`;
      } else if (this.config.arrow === 'center') {
        // Arrow at center - center tooltip relative to trigger
        const arrowPosition = this.config.left + (this.config.width / 2);
        const tooltipPosition = arrowPosition - (tooltipWidth / 2) + offsetLeft;
        this.tooltipW.nativeElement.style.left = `${tooltipPosition}px`;
      } else if (this.config.arrow === 'end') {
        // Arrow at right - align tooltip right with trigger right
        // Arrow is positioned at calc(100% - 20px) from left of tooltip (20px from right edge)
        // We want tooltip right to align with trigger right
        // So: tooltipLeftPosition + tooltipWidth = triggerRight
        // Therefore: tooltipLeftPosition = triggerRight - tooltipWidth
        const triggerRight = this.config.left + this.config.width;
        const tooltipLeftPosition = triggerRight - tooltipWidth + offsetLeft;
        this.tooltipW.nativeElement.style.left = `${tooltipLeftPosition}px`;
      }
      this.tooltipW.nativeElement.style.top = `${this.config.top - 5 + offsetTop}px`;
      this.tooltipW.nativeElement.style.transform = 'translateY(-100%)';
    }

    if (this.config.position === 'left') {
      const offsetTop = this.config.offsetTop || 0;
      const offsetLeft = this.config.offsetLeft || 0;
      let tooltipPosition: number;
      
      if (this.config.arrow === 'start') {
        // Arrow at top - align tooltip top with trigger top
        // Arrow is positioned at 10px from top of tooltip
        // We want tooltip top to align with trigger top
        tooltipPosition = this.config.top + offsetTop;
      } else if (this.config.arrow === 'end') {
        // Arrow at bottom - align tooltip bottom with trigger bottom
        // Arrow is positioned at calc(100% - 20px) from top of tooltip
        // We want tooltip bottom to align with trigger bottom
        // So: tooltipPosition + toolTipheight = triggerBottom
        // Therefore: tooltipPosition = triggerBottom - toolTipheight
        const triggerBottom = this.config.top + this.config.height;
        tooltipPosition = triggerBottom - toolTipheight + offsetTop;
      } else {
        // Center alignment - center the tooltip body relative to the button
        tooltipPosition = this.config.top + (this.config.height / 2) - (toolTipheight / 2) + offsetTop;
      }
      
      this.tooltipW.nativeElement.style.top = `${tooltipPosition}px`;
      this.tooltipW.nativeElement.style.left = `${this.config.left - 5 + offsetLeft}px`;
      this.tooltipW.nativeElement.style.transform = 'translateX(-100%)';
    }
    if (this.config.position === 'right') {
      const offsetTop = this.config.offsetTop || 0;
      const offsetLeft = this.config.offsetLeft || 0;
      let tooltipPosition: number;
      
      if (this.config.arrow === 'start') {
        // Arrow at top - align tooltip top with trigger top (with gap)
        tooltipPosition = this.config.top + offsetTop;
      } else if (this.config.arrow === 'end') {
        // Arrow at bottom - align tooltip bottom with trigger bottom
        // Arrow is positioned at calc(100% - 20px) from top of tooltip
        // We want tooltip bottom to align with trigger bottom
        // So: tooltipPosition + toolTipheight = triggerBottom
        // Therefore: tooltipPosition = triggerBottom - toolTipheight
        const triggerBottom = this.config.top + this.config.height;
        tooltipPosition = triggerBottom - toolTipheight + offsetTop;
      } else {
        // Center alignment - center the tooltip body relative to the button
        tooltipPosition = this.config.top + (this.config.height / 2) - (toolTipheight / 2) + offsetTop;
      }
      
      this.tooltipW.nativeElement.style.top = `${tooltipPosition}px`;
      this.tooltipW.nativeElement.style.left = `${this.config.left + this.config.width + 10 + offsetLeft}px`;
    }
    if (this.config.position === 'bottom') {
      const offsetTop = this.config.offsetTop || 0;
      const offsetLeft = this.config.offsetLeft || 0;
      
      if (this.config.arrow === 'start') {
        // Arrow at left - align tooltip left with trigger left
        const arrowPosition = this.config.left;
        const tooltipPosition = arrowPosition + offsetLeft;
        this.tooltipW.nativeElement.style.left = `${tooltipPosition}px`;
      } else if (this.config.arrow === 'center') {
        // Arrow at center - center tooltip relative to trigger
        const arrowPosition = this.config.left + (this.config.width / 2);
        const tooltipPosition = arrowPosition - (tooltipWidth / 2) + offsetLeft;
        this.tooltipW.nativeElement.style.left = `${tooltipPosition}px`;
      } else if (this.config.arrow === 'end') {
        // Arrow at right - align tooltip right with trigger right
        // Arrow is positioned at calc(100% - 20px) from left of tooltip (20px from right edge)
        // We want tooltip right to align with trigger right
        // So: tooltipLeftPosition + tooltipWidth = triggerRight
        // Therefore: tooltipLeftPosition = triggerRight - tooltipWidth
        const triggerRight = this.config.left + this.config.width;
        const tooltipLeftPosition = triggerRight - tooltipWidth + offsetLeft;
        this.tooltipW.nativeElement.style.left = `${tooltipLeftPosition}px`;
      }
      this.tooltipW.nativeElement.style.top = `${this.config.top + this.config.height + 5 + offsetTop}px`;
    }

    // Set arrow position after all positioning is complete
    this.setArrowPosition();

    this.tooltipW.nativeElement.style.opacity = `1`;
    this.visible = true;
    this.cdr.markForCheck();
  }

  /**
   * Sets the arrow position based on configuration
   */
  setArrowPosition(): void {
    if (!this.config || !this.tooltipW?.nativeElement || !this.tooltipEl?.nativeElement) {
      return;
    }

    if (this.config.position === 'right' || this.config.position === 'left') {
      // For left/right positions, arrow moves vertically
      let arrowTopPosition = '50%'; // default center

      if (this.config.arrow === 'start') {
        // Arrow points to the start (top) of the button - position at top with 10px gap
        arrowTopPosition = '10px'; // Fixed position at top with 10px gap
      } else if (this.config.arrow === 'end') {
        // Arrow points to the end (bottom) of the button - position at bottom with 20px gap
        arrowTopPosition = `calc(100% - 20px)`; // Fixed position at bottom with 20px gap
      } else if (this.config.arrow === 'center') {
        arrowTopPosition = '50%';
      }

      this.tooltipW.nativeElement.style.setProperty('--arrow-top-position', arrowTopPosition, 'important');
      this.tooltipEl.nativeElement.style.setProperty('--arrow-top-position', arrowTopPosition, 'important');

    } else if (this.config.position === 'top' || this.config.position === 'bottom') {
      // For top/bottom positions, arrow moves horizontally
      let arrowLeftPosition = '50%'; // default center

      if (this.config.arrow === 'start') {
        // Arrow points to the start (left) of the button - position at left corner with 10px gap
        arrowLeftPosition = '10px'; // Fixed position at left corner
      } else if (this.config.arrow === 'end') {
        // Arrow points to the end (right) of the button - position at right corner with 20px gap
        arrowLeftPosition = `calc(100% - 20px)`; // Fixed position at right corner
      } else if (this.config.arrow === 'center') {
        arrowLeftPosition = '50%';
      }

      this.tooltipW.nativeElement.style.setProperty('--arrow-left-position', arrowLeftPosition);
      this.tooltipEl.nativeElement.style.setProperty('--arrow-left-position', arrowLeftPosition);
    }
  }

  /**
   * Sanitizes HTML content for safe rendering
   * @param html - HTML string to sanitize
   * @returns Sanitized SafeHtml
   */
  sanitizeHTML(html: string | null | undefined): SafeHtml {
    const content = (html ?? '')
      .replace(/\\n/g, '<br>')
      .replace(/\/n/g, '<br>')
      .replace(/\r?\n/g, '<br>');

    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnDestroy(): void {
    // Clear timeout if it exists
    if (this.positionTimeout) {
      clearTimeout(this.positionTimeout);
      this.positionTimeout = null;
    }

    // Remove event listeners
    if (this.removeListeners) {
      this.removeListeners();
      this.removeListeners = undefined;
    }
  }
}
