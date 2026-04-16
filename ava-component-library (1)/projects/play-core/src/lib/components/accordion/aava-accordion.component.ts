import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter, OnDestroy, AfterViewChecked } from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';

@Component({
  selector: 'aava-accordion',
  imports: [CommonModule, AavaIconComponent],
  standalone: true,
  templateUrl: './aava-accordion.component.html',
  styleUrl: './aava-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaAccordionComponent implements AfterViewChecked, OnInit, OnChanges, OnDestroy {
  @Input() expanded = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
  @Input() animation = true;
  @Input() controlled = false;
  @Input() iconClosed = '';
  @Input() iconOpen = '';
  @Input() titleIcon = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() type: 'default' | 'titleIcon' = 'default';
  @Input() withoutBox = false;
  @Input() customStyles: Record<string, string> = {};
  @Input() disabled = false;
  @Input() id = '';

  @Output() panelToggled = new EventEmitter<{ expanded: boolean }>();

  contentHeight = 0;
  hasInitialized = false;
  @ViewChild('bodyRef') bodyRef!: ElementRef;
  @ViewChild('containerRef') containerRef!: ElementRef;

  showHeaderDivider = true;
  showContentDivider = false;
  isClosing = false;
  iconSize = 24;
  private animationFrameId?: number;
  private _uniqueId = `accordion-${Math.random().toString(36).slice(2, 11)}`;
  private resizeObserver?: ResizeObserver;
  
  get headerId(): string {
    return this.id ? `aava-accordion-${this.id}-header` : `${this._uniqueId}-header`;
  }
  
  get contentId(): string {
    return this.id ? `aava-accordion-${this.id}-content` : `${this._uniqueId}-content`;
  }

  private readonly heights = {
    sm: { normal: 36, withoutBox: 54 },
    md: { normal: 44, withoutBox: 60 },
    lg: { normal: 48, withoutBox: 62 }
  };

  constructor(private cdr: ChangeDetectorRef) { }

  get accordionClasses() {
    return {
      animated: this.animation,
      expanded: this.expanded,
      'without-box': this.withoutBox,
      [`size-${this.size}`]: true,
      disabled: this.disabled
    };
  }

  readonly iconColor = 'var(--accordion-icon-color)';

  get currentIconSize(): number {
    switch (this.size) {
      case 'sm': return 16;
      case 'md': return 20;
      case 'lg': return 24;
      default: return 24;
    }
  }

  get currentFontSize(): string {
    switch (this.size) {
      case 'sm': return '100';
      case 'md': return '200';
      case 'lg': return '300';
      default: return '300';
    }
  }

  get collapsedHeight(): number {
    if (this.containerRef && !this.withoutBox) {
      const headerEl = this.containerRef.nativeElement.querySelector('.accordion-header');
      if (headerEl) {
        return headerEl.getBoundingClientRect().height;
      }
    }

    // fallback: sizeConfig if headerEl not yet rendered
    const sizeConfig = this.heights[this.size];
    return this.withoutBox ? sizeConfig.withoutBox : sizeConfig.normal;
  }

  get containerHeightStyle(): string {
    if (this.expanded) {
      return 'auto';
    } else {
      return `${this.collapsedHeight}px`;
    }
  }

  get containerOverflowStyle(): string {
    // During closing animation, keep overflow hidden to prevent content visibility
    if (this.isClosing) {
      return 'hidden';
    }
    return this.expanded ? 'visible' : 'hidden';
  }

  ngAfterViewChecked() {

      if (!this.hasInitialized ) {
    if (this.bodyRef?.nativeElement) {
      const content = this.bodyRef.nativeElement.querySelector('.accordion-content');
      if (content) {
        this.contentHeight = content.scrollHeight;
        this.setupResizeObserver(content);
      }
      // Set initial overflow based on expanded state
      this.bodyRef.nativeElement.style.overflow = this.expanded ? 'visible' : 'hidden';
    }
    if (this.expanded) {
      // Ensure body is fully open
      this.setBodyHeight('auto');
    }
    this.updateContainerHeight();
  }
   
  }

  private setupResizeObserver(content: Element): void {
    // Only setup if ResizeObserver is supported
    // Note: ResizeObserver is supported in all modern browsers (Chrome 64+, Firefox 69+, Safari 13.1+)
    // For older browsers, consider using a polyfill or the component will gracefully degrade
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      // Early return if component is destroyed or accordion is collapsed
      // Only process resize events when expanded to optimize performance
      if (!this.bodyRef?.nativeElement || !this.expanded) {
        return;
      }

      const newHeight = content.scrollHeight;
      
      // Update contentHeight to track current size
      if (newHeight !== this.contentHeight) {
        this.contentHeight = newHeight;
        // If accordion is expanded, ensure body height adjusts properly
        this.setBodyHeight('auto');
        // Trigger change detection for any dependent UI
        this.cdr.markForCheck();
      }
    });

    this.resizeObserver.observe(content);
  }

  ngOnInit() {
    this.showHeaderDivider = !this.expanded;
    this.showContentDivider = this.expanded;
    this.iconSize = this.currentIconSize;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('expanded' in changes && !changes['expanded'].firstChange) {
      const prev = changes['expanded'].previousValue;
      const curr = changes['expanded'].currentValue;
      if (prev === true && curr === false) {
        this.isClosing = true;
        this.showHeaderDivider = false;
        this.showContentDivider = true;
      } else if (prev === false && curr === true) {
        this.isClosing = false;
        this.showHeaderDivider = false;
        this.showContentDivider = true;
      }
    }

    if ('size' in changes) {
      this.iconSize = this.currentIconSize;
      this.updateContainerHeight();
    }

    if ('withoutBox' in changes) {
      this.updateContainerHeight();
    }
  }

  private updateContainerHeight() {
    if (this.containerRef?.nativeElement) {
      const height = this.containerHeightStyle;
      this.containerRef.nativeElement.style.height = height;
      this.containerRef.nativeElement.style.maxHeight = this.expanded ? 'none' : `${this.collapsedHeight}px`;
      this.cdr.markForCheck();
    }
  }

  /**
   * Helper method to set the accordion body height consistently.
   * Centralizes height management logic for better maintainability.
   * @param height - Height value ('auto' or pixel value like '100px')
   */
  private setBodyHeight(height: string): void {
    if (this.bodyRef?.nativeElement) {
      this.bodyRef.nativeElement.style.height = height;
    }
  }

  /**
   * Public method to manually update content height.
   * Useful when content is dynamically loaded and ResizeObserver may not detect the change immediately.
   * 
   * This method is particularly helpful in scenarios where:
   * - Content is loaded asynchronously (e.g., via HTTP requests)
   * - Images or other media are loaded after initial render
   * - Content is modified programmatically outside of Angular's change detection
   * 
   * @example
   * ```typescript
   * // After loading content dynamically
   * this.accordionRef.updateContentHeight();
   * ```
   */
  public updateContentHeight(): void {
    if (this.bodyRef?.nativeElement) {
      const content = this.bodyRef.nativeElement.querySelector('.accordion-content');
      if (content) {
        const newHeight = content.scrollHeight;
        if (newHeight !== this.contentHeight) {
          this.contentHeight = newHeight;
          
          // If expanded, ensure body height is properly set
          if (this.expanded) {
            this.setBodyHeight('auto');
          }
          
          this.cdr.markForCheck();
        }
      }
    }
  }

  toggleExpand() {
    if (this.disabled) return;
    
    // Cancel any pending animation frame
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
    
    if (!this.bodyRef?.nativeElement) return;
    const bodyEl = this.bodyRef.nativeElement;

    if (this.expanded) {
      this.isClosing = true;
      this.showHeaderDivider = false;
      this.showContentDivider = true;
      // Immediately set overflow to hidden when starting to collapse to prevent content visibility
      bodyEl.style.overflow = 'hidden';
      // Also ensure container overflow is hidden
      if (this.containerRef?.nativeElement) {
        this.containerRef.nativeElement.style.overflow = 'hidden';
      }
      // Force a reflow to ensure overflow is applied before height change
      bodyEl.offsetHeight;
      // Set the current height before starting collapse animation
      const currentHeight = bodyEl.scrollHeight;
      this.setBodyHeight(`${currentHeight}px`);
      this.panelToggled.emit({ expanded: false });
      
      if (!this.controlled) {
        // Use double requestAnimationFrame to ensure overflow is applied first
        this.animationFrameId = requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.expanded = false;
            this.setBodyHeight('0px');
            this.updateContainerHeight();
            this.animationFrameId = undefined;
          });
        });
      } else {
        // For controlled mode, still update container height
        this.updateContainerHeight();
      }
    } else {
      this.isClosing = false;
      this.showHeaderDivider = false;
      this.showContentDivider = true;
      this.panelToggled.emit({ expanded: true });
      
      if (!this.controlled) {
        this.expanded = true;
        this.animationFrameId = requestAnimationFrame(() => {
          this.setBodyHeight(`${bodyEl.scrollHeight}px`);
          // Set overflow to visible after expanding to allow scrollable content
          bodyEl.style.overflow = 'visible';
          this.animationFrameId = undefined;
        });
      }
    }
  }

  onBodyTransitionEnd(event: TransitionEvent) {
    if (event.propertyName !== 'height') return;

    if (this.expanded) {
      this.setBodyHeight('auto');
      // Ensure overflow is visible when fully expanded to allow scrollable content
      if (this.bodyRef?.nativeElement) {
        this.bodyRef.nativeElement.style.overflow = 'visible';
      }
      if (this.containerRef?.nativeElement) {
        this.containerRef.nativeElement.style.overflow = 'visible';
      }
    } else if (this.isClosing) {
      // Ensure overflow stays hidden when fully collapsed
      if (this.bodyRef?.nativeElement) {
        this.bodyRef.nativeElement.style.overflow = 'hidden';
        // Also ensure height is 0 after transition
        this.setBodyHeight('0px');
      }
      if (this.containerRef?.nativeElement) {
        this.containerRef.nativeElement.style.overflow = 'hidden';
      }
      this.showContentDivider = false;
      this.showHeaderDivider = true;
      this.isClosing = false;
      this.updateContainerHeight();
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }
}