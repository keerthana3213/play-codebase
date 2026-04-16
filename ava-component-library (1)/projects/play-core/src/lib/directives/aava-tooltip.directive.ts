import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  ComponentRef,
  ViewContainerRef,
  Injector,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { AavaTooltipComponent, TooltipConfig } from '../components/tooltip/aava-tooltip.component';

@Directive({
  selector: '[tooltipTitle], [tooltipDescription]',
})
export class AavaTooltipDirective implements OnDestroy {
  // Keep track of all open tooltips
  private static openTooltips: AavaTooltipDirective[] = [];

  @Input() tooltipTitle = '';
  @Input() tooltipDescription = '';
  @Input() tooltipType: 'simple' | 'card' | 'guided' = 'simple';
  @Input() tooltipArrow: 'start' | 'center' | 'end' = 'center';
  @Input() tooltipTrigger: 'hover' | 'click' | 'focus' = 'hover';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() tooltipSize: 'sm' | 'md' | 'lg' = 'md';
  @Input() tooltipVariant: 'default' = 'default';
  @Input() tooltipIcon = '';
  @Input() tooltipIconColor = '';
  @Input() tooltipWidth: number | string = 0;
  @Input() tooltipOffsetTop: number = 0;
  @Input() tooltipOffsetLeft: number = 0;

  private tooltipRef: ComponentRef<AavaTooltipComponent> | null = null;
  private escapeKeyListener: (() => void) | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;
  private tooltipMouseEnterListener: (() => void) | null = null;
  private tooltipMouseLeaveListener: (() => void) | null = null;
  private readonly uniqueId = `aava-tooltip-trigger-${Math.random().toString(36).slice(2, 11)}`;

  constructor(
    private vcRef: ViewContainerRef,
    private injector: Injector,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) { }

  /**
   * Gets the unique ID for this tooltip trigger
   */
  get triggerId(): string {
    return this.uniqueId;
  }

  ngOnDestroy(): void {
    this.hide();
    this.unregisterAsOpen();
  }

  /** Events */
  @HostListener('mouseenter') onMouseEnter() {
    if (this.tooltipTrigger === 'hover') {
      this.cancelHide();
      this.show();
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipTrigger === 'hover') {
      this.scheduleHide();
    }
  }
  @HostListener('focus') onFocus() {
    if (this.tooltipTrigger === 'focus') this.show();
  }
  @HostListener('blur') onBlur() {
    if (this.tooltipTrigger === 'focus') this.hide();
  }
  @HostListener('click') onClick() {
    if (this.tooltipTrigger === 'click') {
      this.tooltipRef ? this.hide() : this.show();
    }
  }

  /**
   * Shows the tooltip
   */
  show(): void {
    // Don't show tooltip if there's no content to display
    if (!this.tooltipTitle && !this.tooltipDescription) {
      return;
    }

    if (this.tooltipRef) {
      return;
    }

    this.closeOtherTooltips();

    const rect = this.el.nativeElement.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Create component (Ivy style)
    this.tooltipRef = this.vcRef.createComponent(AavaTooltipComponent, {
      injector: this.injector,
    });

    // Append to body to avoid clipping
    document.body.appendChild(this.tooltipRef.location.nativeElement);

    // Generate unique tooltip ID
    const tooltipId = this.tooltipRef.instance.tooltipId;

    // Set aria-describedby on trigger element
    this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', tooltipId);

    // Pass configuration to tooltip
    const config: TooltipConfig = {
      title: this.tooltipTitle,
      description: this.tooltipDescription,
      type: this.tooltipType,
      arrow: this.tooltipArrow,
      size: this.tooltipSize,
      position: this.tooltipPosition,
      variant: this.tooltipVariant,
      icon: this.tooltipIcon,
      iconColor: this.tooltipIconColor,
      left: rect.left + scrollX,
      top: rect.top + scrollY,
      width: rect.width,
      height: rect.height,
      tooltipWidth: this.tooltipWidth,
      offsetTop: this.tooltipOffsetTop,
      offsetLeft: this.tooltipOffsetLeft
    };

    this.tooltipRef.instance.config = config;
    this.tooltipRef.instance.id = tooltipId;

    // Force tooltip to render if it's OnPush
    this.tooltipRef.changeDetectorRef.detectChanges();

    // Add Escape key listener for click-triggered tooltips
    if (this.tooltipTrigger === 'click') {
      this.escapeKeyListener = this.renderer.listen('document', 'keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape' && this.tooltipRef) {
          this.hide();
        }
      });
    }

    // Add mouseenter/mouseleave handlers to tooltip to prevent flickering
    // Wait for tooltip to be positioned before attaching listeners
    if (this.tooltipTrigger === 'hover' && this.tooltipRef?.location.nativeElement) {
      // Use requestAnimationFrame to ensure tooltip is positioned and visible
      requestAnimationFrame(() => {
        if (this.tooltipRef?.location.nativeElement) {
          const tooltipElement = this.tooltipRef.location.nativeElement;
          
          this.tooltipMouseEnterListener = this.renderer.listen(tooltipElement, 'mouseenter', () => {
            this.cancelHide();
          });
          
          this.tooltipMouseLeaveListener = this.renderer.listen(tooltipElement, 'mouseleave', () => {
            this.scheduleHide();
          });
        }
      });
    }

    this.registerAsOpen();
  }

  /**
   * Schedules the tooltip to hide after a short delay
   * This prevents flickering when moving mouse from trigger to tooltip
   */
  private scheduleHide(): void {
    this.cancelHide();
    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, 100); // 100ms delay to allow mouse to move to tooltip
  }

  /**
   * Cancels any scheduled hide operation
   */
  private cancelHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  /**
   * Hides the tooltip
   */
  hide(): void {
    this.cancelHide();
    
    if (this.tooltipRef) {
      // Remove aria-describedby from trigger element
      this.renderer.removeAttribute(this.el.nativeElement, 'aria-describedby');

      // Remove Escape key listener
      if (this.escapeKeyListener) {
        this.escapeKeyListener();
        this.escapeKeyListener = null;
      }

      // Remove tooltip mouse event listeners
      if (this.tooltipMouseEnterListener) {
        this.tooltipMouseEnterListener();
        this.tooltipMouseEnterListener = null;
      }
      if (this.tooltipMouseLeaveListener) {
        this.tooltipMouseLeaveListener();
        this.tooltipMouseLeaveListener = null;
      }

      this.tooltipRef.destroy();
      this.tooltipRef = null;
      this.unregisterAsOpen();
    }
  }

  /**
   * Registers this directive as having an open tooltip
   */
  private registerAsOpen(): void {
    AavaTooltipDirective.openTooltips.push(this);
  }

  /**
   * Unregisters this directive from open tooltips
   */
  private unregisterAsOpen(): void {
    const index = AavaTooltipDirective.openTooltips.indexOf(this);
    if (index > -1) {
      AavaTooltipDirective.openTooltips.splice(index, 1);
    }
  }

  /**
   * Closes other tooltips before opening this one
   */
  private closeOtherTooltips(): void {
    AavaTooltipDirective.openTooltips.forEach((tooltip) => {
      if (tooltip !== this && tooltip.tooltipRef) {
        tooltip.hide();
      }
    });
  }
}
