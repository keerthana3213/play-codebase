import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
  Renderer2,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  OnDestroy,
  HostListener,
  inject,
} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export type FlyoutAlignment = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'aava-flyout',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './aava-flyout.component.html',
  styleUrl: './aava-flyout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AavaFlyoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('panel') panelRef?: ElementRef<HTMLDivElement>;
  private containerElement?: HTMLElement;
  isOpen = false;
  /**
   * Width of the flyout panel in pixels.
   * If not set or set to 0, the panel width will be 'auto' (determined by content).
   * @default 0 (auto width)
   */
  @Input() width = 0;
  
  /**
   * Vertical offset in pixels to adjust the flyout position.
   * Positive values move the flyout down, negative values move it up.
   * Useful for fine-tuning spacing between the trigger and flyout.
   * @example
   * <aava-flyout [offsetTop]="8"> // 8px gap below trigger
   * <aava-flyout [offsetTop]="-4"> // 4px overlap above trigger
   */
  @Input() offsetTop = 0;
  
  /**
   * Horizontal offset in pixels to adjust the flyout position.
   * Positive values move the flyout right, negative values move it left.
   * Useful for fine-tuning horizontal alignment.
   * @example
   * <aava-flyout [offsetLeft]="10"> // 10px shift to the right
   * <aava-flyout [offsetLeft]="-5"> // 5px shift to the left
   */
  @Input() offsetLeft = 0;
  
  /**
   * Alignment of the flyout relative to the trigger element.
   * - 'left': Flyout's left edge aligns with trigger's left edge (default)
   * - 'right': Flyout's right edge aligns with trigger's right edge
   * - 'top': Flyout's top edge aligns with trigger's top edge
   * - 'bottom': Flyout's bottom edge aligns with trigger's bottom edge
   */
  @Input() alignment: FlyoutAlignment = 'left';
  
  /**
   * Boundary adjustment behavior for the flyout positioning.
   * - 'auto': Automatically flip to opposite direction when there's not enough space (default)
   *   Example: If alignment is 'bottom' but no space below, flip to 'top'
   * - 'viewport': Same as 'auto' - automatically flip based on available space
   * - 'none': Position exactly as specified by alignment, never flip even if space is insufficient
   * 
   * @example
   * <aava-flyout boundaryAdjustment="auto" alignment="bottom"> // Flips to top if no space below
   * <aava-flyout boundaryAdjustment="none" alignment="bottom"> // Always shows below, even if off-screen
   * @default 'auto'
   */
  @Input() boundaryAdjustment: 'auto' | 'none' | 'viewport' = 'auto';
  
  @Input() customPanelStyles: Record<string, string> = {};
  @Input() customOverlayStyles: Record<string, string> = {};
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
  /**
   * Whether to show an overlay behind the flyout panel.
   * When false, clicking outside the flyout will still close it.
   * @default false
   */
  @Input() overlay = false;
  @Input() closeOnOverlayClick = true;
  @Input() panelLabelId = '';
  @Input() panelDescriptionId = '';
  @Input() classNames = '';
  
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  
  private positionTimeout?: number;
  private triggerElement?: HTMLElement;
  private previousActiveElement?: HTMLElement | null;
  private isPositioned = false;
  private justOpened = false; // Flag to prevent immediate close when opening
  private routerSubscription?: Subscription;
  private router = inject(Router, { optional: true });
  
  constructor(
    private renderer: Renderer2, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Subscribe to router navigation events to close flyout on navigation
    if (this.router) {
      this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationStart))
        .subscribe(() => {
          if (this.isOpen) {
            this.close();
          }
        });
    } else {
      // Router not available - this is expected if RouterModule is not imported in the app
      console.debug('AavaFlyoutComponent: Router not available, flyout will close on outside clicks only');
    }
  }
  
  ngAfterViewInit() {
    // Store reference to the container element to avoid DOM queries during positioning
    // This ensures we always use the correct container for this flyout instance
    // We do this in AfterViewInit and also when panel is first accessed
    if (this.panelRef?.nativeElement) {
      this.containerElement = this.panelRef.nativeElement.closest('.flyout-container') as HTMLElement;
    }
  }
  
  private ensureContainerElement(panelEl: HTMLElement): HTMLElement | null {
    // Get or cache the container element reference to ensure we use the correct container
    // This is important when multiple flyouts exist (e.g., in *ngFor)
    if (!this.containerElement && panelEl) {
      this.containerElement = panelEl.closest('.flyout-container') as HTMLElement;
    }
    return this.containerElement || null;
  }

  /** 
   * Open flyout relative to the clicked element
   * 
   * @param triggerElement - Accepts:
   *   - HTMLElement: Direct DOM elements (div, span, button, etc.)
   *   - ElementRef<HTMLElement>: Angular ElementRef instances
   *   - Angular Component instances: Components like AavaButtonComponent, AavaIconComponent (via template refs like #buttonRef)
   *   - EventTarget: Event targets from click events
   *   - null: For optional triggers
   * 
   * @example
   * // Using HTML element
   * <div #myDiv (click)="flyout.open(myDiv)">Click me</div>
   * 
   * @example
   * // Using template reference variable on Angular component
   * <aava-button #btnRef (userClick)="flyout.open(btnRef)"></aava-button>
   * 
   * @example
   * // Using event target
   * <button (click)="flyout.open($event.target)">Open</button>
   */
  open(triggerElement: any) {
    // Handle ElementRef, HTMLElement, EventTarget, or Angular Component instances
    let element: HTMLElement | null = null;
    
    if (!triggerElement) {
      return;
    }
    
    // Check for HTMLElement
    if (triggerElement instanceof HTMLElement) {
      element = triggerElement;
    }
    // Check for ElementRef
    else if (triggerElement instanceof ElementRef) {
      element = triggerElement.nativeElement;
    }
    // Check for EventTarget
    else if (triggerElement instanceof EventTarget) {
      element = triggerElement as HTMLElement;
    }
    // Handle objects (Angular components, ElementRef-like objects, etc.)
    else if (typeof triggerElement === 'object') {
      const obj = triggerElement as any;
      
      // Check for Angular Component instance with elementRef property (private but accessible at runtime)
      if (obj.elementRef && obj.elementRef.nativeElement instanceof HTMLElement) {
        element = obj.elementRef.nativeElement;
      }
      // Check for ElementRef-like objects (objects with nativeElement directly)
      else if (obj.nativeElement instanceof HTMLElement) {
        element = obj.nativeElement;
      }
    }
    
    if (!element) return;
    
    // If already open, close first to ensure clean state
    // This prevents issues when multiple flyouts share the same component instance
    if (this.isOpen) {
      this.close();
      // Wait a frame to ensure cleanup is complete before opening with new trigger
      requestAnimationFrame(() => {
        this.openWithElement(element!);
      });
      return;
    }
    
    this.openWithElement(element);
  }
  
  private openWithElement(element: HTMLElement) {
    // Clear any existing timeout
    if (this.positionTimeout) {
      clearTimeout(this.positionTimeout);
    }
    
    // Store trigger element and previous focus
    this.triggerElement = element;
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.isPositioned = false;
    
    // Set flag to prevent immediate close when opening
    this.justOpened = true;
    setTimeout(() => {
      this.justOpened = false;
    }, 0);
    
    // Set isOpen first, but hide panel until positioned
    this.isOpen = true;
    this.opened.emit();
    
    // Position panel immediately before animation starts
    // Pass the exact element to ensure we use the correct trigger
    this.positionPanelImmediate(element);
    
    this.cdr.markForCheck();
  }
  
  /** Position panel immediately to prevent flickering */
  private positionPanelImmediate(triggerElement: HTMLElement) {
    if (!this.panelRef?.nativeElement) {
      // If panel not ready, wait a bit
      this.positionTimeout = window.setTimeout(() => {
        this.positionPanelImmediate(triggerElement);
        this.positionTimeout = undefined;
      }, 0);
      return;
    }

    const panelEl = this.panelRef.nativeElement;
    
    const triggerRect = triggerElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check if trigger is visible
    if (triggerRect.width === 0 || triggerRect.height === 0) {
      const centerX = viewportWidth / 2;
      const centerY = viewportHeight / 2;
      const finalWidth = (!this.width || this.width <= 0) ? null : this.width;
      this.applyPanelStyles(panelEl, centerX, centerY, finalWidth);
      this.isPositioned = true;
      return;
    }

    // Determine panel width - use auto if width is not set
    const useAutoWidth = !this.width || this.width <= 0;
    
    // Set width immediately and ensure panel is hidden
    if (useAutoWidth) {
      this.renderer.setStyle(panelEl, 'width', 'auto');
    } else {
      this.renderer.setStyle(panelEl, 'width', `${this.width}px`);
    }
    this.renderer.removeClass(panelEl, 'positioned');
    
    // Calculate initial position estimate (will refine after measurement)
    const gap = 4;
    let estimatedTop = triggerRect.bottom + gap;
    let estimatedLeft = triggerRect.left;
    
    // For auto width, we'll position based on trigger left, measurement will adjust
    // For fixed width, we can estimate position
    const estimatedPanelWidth = useAutoWidth ? (triggerRect.width || 200) : this.width;
    
    if (this.alignment === 'right') {
      estimatedLeft = triggerRect.right - estimatedPanelWidth;
    }
    
    // Apply estimated position immediately
    this.applyPanelStyles(panelEl, estimatedLeft, estimatedTop, useAutoWidth ? null : this.width);
    
    // CRITICAL: Capture the trigger element in closure to prevent it from being overwritten
    // This is essential when multiple flyouts share the same component instance
    const capturedTriggerElement = triggerElement;
    
    // Now measure and refine position
    requestAnimationFrame(() => {
      if (!this.panelRef?.nativeElement || !capturedTriggerElement) return;
      
      // Recalculate trigger position using the captured element
      // This ensures we use the correct trigger even if this.triggerElement was overwritten
      const currentTriggerRect = capturedTriggerElement.getBoundingClientRect();
      
      const panelRect = this.panelRef.nativeElement.getBoundingClientRect();
      const actualPanelWidth = panelRect.width || (this.width > 0 ? this.width : 200);
      const actualPanelHeight = panelRect.height || 100;
      
      let top = 0;
      let left = 0;

      // Determine effective alignment based on available space
      let effectiveAlignment = this.alignment;
      
      // For left/right alignments, check space availability and switch if needed
      if (this.boundaryAdjustment !== 'none') {
        if (this.alignment === 'left') {
          // Calculate position for left alignment
          const leftPosition = currentTriggerRect.left + this.offsetLeft;
          const leftPanelRightEdge = leftPosition + actualPanelWidth;
          
          // Check if left alignment would go off-screen (left edge or right edge)
          const wouldGoOffScreen = leftPosition < 20 || leftPanelRightEdge > viewportWidth - 20;
          
          if (wouldGoOffScreen) {
            // Check if right alignment has enough space
            const rightPosition = currentTriggerRect.right - actualPanelWidth + this.offsetLeft;
            const rightPanelRightEdge = rightPosition + actualPanelWidth;
            
            // Use right alignment if it fits within viewport
            if (rightPosition >= 20 && rightPanelRightEdge <= viewportWidth - 20) {
              effectiveAlignment = 'right';
            }
          }
        } else if (this.alignment === 'right') {
          // Calculate position for right alignment
          const rightPosition = currentTriggerRect.right - actualPanelWidth + this.offsetLeft;
          const rightPanelRightEdge = rightPosition + actualPanelWidth;
          
          // Check if right alignment would go off-screen (left edge or right edge)
          const wouldGoOffScreen = rightPosition < 20 || rightPanelRightEdge > viewportWidth - 20;
          
          if (wouldGoOffScreen) {
            // Check if left alignment has enough space
            const leftPosition = currentTriggerRect.left + this.offsetLeft;
            const leftPanelRightEdge = leftPosition + actualPanelWidth;
            
            // Use left alignment if it fits within viewport
            if (leftPosition >= 20 && leftPanelRightEdge <= viewportWidth - 20) {
              effectiveAlignment = 'left';
            }
          }
        }
      }

      // Calculate position based on effective alignment using the current trigger position
      switch (effectiveAlignment) {
        case 'right':
          // Right alignment: panel's right edge aligns with trigger's right edge
          // Panel's right edge = trigger.right + offsetLeft
          // Panel's left edge = trigger.right + offsetLeft - panelWidth
          left = currentTriggerRect.right - actualPanelWidth + this.offsetLeft;
          top = currentTriggerRect.bottom + gap + this.offsetTop;
          break;
        
        case 'left':
          // Left alignment: panel's left edge aligns with trigger's left edge
          left = currentTriggerRect.left + this.offsetLeft;
          top = currentTriggerRect.bottom + gap + this.offsetTop;
          break;
        
        case 'top':
          top = currentTriggerRect.top - actualPanelHeight - gap + this.offsetTop;
          left = currentTriggerRect.left + this.offsetLeft;
          break;
        
        case 'bottom':
          top = currentTriggerRect.bottom + gap + this.offsetTop;
          left = currentTriggerRect.left + this.offsetLeft;
          break;
      }

      // Boundary adjustment: Flip to opposite direction when there's not enough space
      if (this.boundaryAdjustment !== 'none') {
        // For left/right alignment, check if we need to flip above/below
        if (effectiveAlignment === 'left' || effectiveAlignment === 'right') {
          // Check if there's not enough space below (current position)
          if (top + actualPanelHeight > viewportHeight - 20) {
            // Try flipping to above
            const aboveTop = currentTriggerRect.top - actualPanelHeight - gap + this.offsetTop;
            // Flip to above if there's enough space above
            if (aboveTop >= 20) {
              top = aboveTop;
            }
          }
        }
        
        // For top alignment, check if we need to flip to bottom
        if (effectiveAlignment === 'top') {
          // Check if there's not enough space above
          if (top < 20) {
            // Try flipping to below
            const belowTop = currentTriggerRect.bottom + gap + this.offsetTop;
            // Flip to below if there's enough space below
            if (belowTop + actualPanelHeight <= viewportHeight - 20) {
              top = belowTop;
            }
          }
        }
        
        // For bottom alignment, check if we need to flip to top
        if (effectiveAlignment === 'bottom') {
          // Check if there's not enough space below
          if (top + actualPanelHeight > viewportHeight - 20) {
            // Try flipping to above
            const aboveTop = currentTriggerRect.top - actualPanelHeight - gap + this.offsetTop;
            // Flip to above if there's enough space above
            if (aboveTop >= 20) {
              top = aboveTop;
            }
          }
        }
        
        // Final boundary check for horizontal position - ensure panel stays within viewport
        // For right alignment, maintain right edge alignment with trigger when possible
        if (effectiveAlignment === 'right') {
          // The left position is already calculated to align right edges: left = trigger.right - panelWidth + offsetLeft
          // Panel's right edge = left + panelWidth = trigger.right + offsetLeft
          const panelRightEdge = left + actualPanelWidth;
          
          // Check if panel would go off the left edge
          if (left < 20) {
            // Panel would go off left edge - shift to minimum position
            // This breaks right edge alignment but keeps panel visible
            left = 20;
          } else if (panelRightEdge > viewportWidth - 20) {
            // Panel would go off right edge - shift left to keep within viewport
            // This maintains right edge alignment as much as possible
            const maxRightEdge = viewportWidth - 20;
            left = maxRightEdge - actualPanelWidth;
          }
          // If panel fits perfectly, left is already correct from switch statement
        } else {
          // For left alignment and other alignments, adjust normally
          if (left < 20) {
            left = 20;
          } else if (left + actualPanelWidth > viewportWidth - 20) {
            left = viewportWidth - actualPanelWidth - 20;
          }
        }
      }

      // Apply final position - use null for auto width, actual width for fixed width
      const finalWidth = (!this.width || this.width <= 0) ? null : this.width;
      this.applyPanelStyles(panelEl, left, top, finalWidth);
      
      // Show panel by adding positioned class (triggers CSS transition)
      this.renderer.addClass(panelEl, 'positioned');
      this.isPositioned = true;
    });
  }

  /** Open flyout relative to a container element */
  openRelativeTo(containerElement: HTMLElement) {
    // Clear any existing timeout
    if (this.positionTimeout) {
      clearTimeout(this.positionTimeout);
    }
    
    // Store container element and previous focus
    this.triggerElement = containerElement;
    this.previousActiveElement = document.activeElement as HTMLElement;
    
    this.isOpen = true;
    this.opened.emit();
    
    // Use requestAnimationFrame for better timing
    this.positionTimeout = window.setTimeout(() => {
      this.positionPanelRelative(containerElement);
      this.positionTimeout = undefined;
    });
    
    this.cdr.markForCheck();
  }

  toggle(triggerElement?: HTMLElement) {
    if (this.isOpen) {
      this.close();
    } else if (triggerElement) {
      this.open(triggerElement);
    }
    this.cdr.markForCheck();
  }

  close() {
    if (!this.isOpen) return;
    
    // Clear any pending timeouts
    if (this.positionTimeout) {
      clearTimeout(this.positionTimeout);
      this.positionTimeout = undefined;
    }
    
    // Reset panel position styles
    if (this.panelRef?.nativeElement) {
      this.renderer.removeStyle(this.panelRef.nativeElement, 'position');
      this.renderer.removeStyle(this.panelRef.nativeElement, 'top');
      this.renderer.removeStyle(this.panelRef.nativeElement, 'left');
      this.renderer.removeStyle(this.panelRef.nativeElement, 'width');
      this.renderer.removeStyle(this.panelRef.nativeElement, 'z-index');
      this.renderer.removeClass(this.panelRef.nativeElement, 'positioned');
    }
    
    this.isOpen = false;
    this.isPositioned = false;
    this.closed.emit();
    
    // Return focus to trigger element, but prevent scrolling if element is out of view
    // Use preventScroll option to avoid unwanted page scrolling when closing flyout
    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      // Check if element is in viewport before focusing to avoid scrolling
      const rect = this.previousActiveElement.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.left >= 0 && 
                          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                          rect.right <= (window.innerWidth || document.documentElement.clientWidth);
      
      // Only focus if element is in viewport, or use preventScroll option if supported
      if (isInViewport) {
        this.previousActiveElement.focus();
      } else {
        // Element is out of view - use preventScroll to avoid scrolling
        try {
          this.previousActiveElement.focus({ preventScroll: true });
        } catch (e) {
          // Fallback for browsers that don't support preventScroll option
          // Don't focus if it would cause scrolling
        }
      }
    }
    
    this.triggerElement = undefined;
    this.previousActiveElement = undefined;
    
    this.cdr.markForCheck();
  }
  
  ngOnDestroy() {
    // Cleanup timeouts
    if (this.positionTimeout) {
      clearTimeout(this.positionTimeout);
    }
    
    // Cleanup router subscription
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
    // Ensure panel is cleaned up if still open
    if (this.isOpen) {
      this.close();
    }
  }
  
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isOpen) {
      event.preventDefault();
      this.close();
    }
  }
  
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.isOpen || this.overlay || this.justOpened) {
      // Only handle outside clicks when overlay is false and not just opened
      return;
    }
    
    const target = event.target as HTMLElement;
    
    // Check if click is inside the panel
    if (this.panelRef?.nativeElement?.contains(target)) {
      return;
    }
    
    // Check if click is on the trigger element
    if (this.triggerElement && this.triggerElement.contains(target)) {
      return;
    }
    
    // Click is outside, close the flyout
    if (this.closeOnOverlayClick) {
      this.close();
    }
  }
  
  onOverlayClick() {
    if (this.closeOnOverlayClick) {
      this.close();
    }
  }

  private positionPanel(triggerElement: HTMLElement) {
    if (!this.panelRef?.nativeElement) return;

    const panelEl = this.panelRef.nativeElement;
    const triggerRect = triggerElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check if trigger is visible
    if (triggerRect.width === 0 || triggerRect.height === 0) {
      // Trigger is not visible, position at center
      const centerX = viewportWidth / 2;
      const centerY = viewportHeight / 2;
      const finalWidth = (!this.width || this.width <= 0) ? null : this.width;
      this.applyPanelStyles(panelEl, centerX, centerY, finalWidth);
      return;
    }

    // Get panel dimensions after it's rendered - use requestAnimationFrame to ensure rendering
    requestAnimationFrame(() => {
      if (!this.panelRef?.nativeElement) return;
      
      // Determine panel width - use auto if width is not set
      const useAutoWidth = !this.width || this.width <= 0;
      
      // Set width for measurement
      if (useAutoWidth) {
        this.renderer.setStyle(this.panelRef.nativeElement, 'width', 'auto');
      } else {
        this.renderer.setStyle(this.panelRef.nativeElement, 'width', `${this.width}px`);
      }
      
      // Wait one more frame to get accurate dimensions after width is set
      requestAnimationFrame(() => {
        if (!this.panelRef?.nativeElement) return;
        
        const panelRect = this.panelRef.nativeElement.getBoundingClientRect();
        const actualPanelWidth = panelRect.width || (this.width > 0 ? this.width : 200);
        const actualPanelHeight = panelRect.height || 100;
        
        let top = 0;
        let left = 0;
        const gap = 4; // 4px gap between trigger and panel

        // Calculate position based on alignment
        switch (this.alignment) {
          case 'right':
            // Flyout's right edge aligns with trigger's right edge
            left = triggerRect.right - actualPanelWidth;
            top = triggerRect.bottom + gap;
            break;
          
          case 'left':
            // Flyout's left edge aligns with trigger's left edge (default)
            left = triggerRect.left;
            top = triggerRect.bottom + gap;
            break;
          
          case 'top':
            // Flyout's top edge aligns with trigger's top edge
            top = triggerRect.top;
            left = triggerRect.left;
            break;
          
          case 'bottom':
            // Flyout's bottom edge aligns with trigger's bottom edge
            top = triggerRect.bottom - actualPanelHeight;
            left = triggerRect.left;
            break;
        }

        // Adjust for viewport boundaries
        // If panel goes beyond bottom, position above the trigger (for left/right alignments)
        if ((this.alignment === 'left' || this.alignment === 'right') && top + actualPanelHeight > viewportHeight - 20) {
          const aboveTop = triggerRect.top - actualPanelHeight - gap;
          // Only flip if there's room above
          if (aboveTop >= 20) {
            top = aboveTop;
          }
        }

        // For right alignment, ensure we don't go beyond left edge
        if (this.alignment === 'right' && left < 20) {
          left = 20;
        }

        // If panel goes beyond right edge (for left/top/bottom alignments), adjust left position
        if (this.alignment !== 'right' && left + actualPanelWidth > viewportWidth - 20) {
          left = Math.max(20, viewportWidth - actualPanelWidth - 20);
        }

        // Adjust for top/bottom alignments - handle horizontal overflow
        if (this.alignment === 'top' || this.alignment === 'bottom') {
          if (left + actualPanelWidth > viewportWidth - 20) {
            left = Math.max(20, viewportWidth - actualPanelWidth - 20);
          }
          if (left < 20) {
            left = 20;
          }
        }

        // Apply offsets
        if (this.alignment === 'right') {
          // For right alignment, offsetLeft shifts while maintaining right edge alignment
          left = triggerRect.right - actualPanelWidth + this.offsetLeft;
        } else {
          left = Math.max(20, left + this.offsetLeft);
        }
        
        top = Math.max(20, Math.min(top + this.offsetTop, viewportHeight - actualPanelHeight - 20));

        // Use null for auto width, actual width for fixed width
        const finalWidth = (!this.width || this.width <= 0) ? null : this.width;
        this.applyPanelStyles(panelEl, left, top, finalWidth);
      });
    });
  }
  
  private applyPanelStyles(panelEl: HTMLElement, left: number, top: number, width: number | null) {
    // Convert viewport coordinates (from getBoundingClientRect) to coordinates relative to flyout-container
    // The flyout-container has position: relative, so absolute positioning is relative to it
    // Use stored container reference to avoid DOM queries and ensure we use the correct container
    const containerElement = this.ensureContainerElement(panelEl);
    
    if (containerElement) {
      // Store current scroll position before any DOM manipulation to prevent unwanted scrolling
      const scrollX = window.scrollX ?? window.pageXOffset ?? document.documentElement.scrollLeft ?? 0;
      const scrollY = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
      
      const containerRect = containerElement.getBoundingClientRect();
      // Calculate position relative to the container
      const relativeTop = top - containerRect.top;
      const relativeLeft = left - containerRect.left;
      
      this.renderer.setStyle(panelEl, 'position', 'absolute');
      this.renderer.setStyle(panelEl, 'top', `${relativeTop}px`);
      this.renderer.setStyle(panelEl, 'left', `${relativeLeft}px`);
      
      // Restore scroll position if browser scrolled (prevents jumping to first flyout)
      // Use setTimeout with 0 delay to ensure it runs after any browser scroll behavior
      setTimeout(() => {
        const newScrollX = window.scrollX ?? window.pageXOffset ?? document.documentElement.scrollLeft ?? 0;
        const newScrollY = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
        if (Math.abs(newScrollX - scrollX) > 1 || Math.abs(newScrollY - scrollY) > 1) {
          window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
        }
      }, 0);
    } else {
      // Fallback: if container not found, use fixed positioning
      this.renderer.setStyle(panelEl, 'position', 'fixed');
      this.renderer.setStyle(panelEl, 'top', `${top}px`);
      this.renderer.setStyle(panelEl, 'left', `${left}px`);
    }
    
    // Set width - use 'auto' if null, otherwise use the specified pixel value
    if (width === null) {
      this.renderer.setStyle(panelEl, 'width', 'auto');
    } else {
    this.renderer.setStyle(panelEl, 'width', `${width}px`);
    }
    this.renderer.setStyle(panelEl, 'z-index', '1000');
  }

  private positionPanelRelative(containerElement: HTMLElement) {
    if (!this.panelRef?.nativeElement) return;

    const panelEl = this.panelRef.nativeElement;
    const containerRect = containerElement.getBoundingClientRect();

    // Check if container is visible
    if (containerRect.width === 0 || containerRect.height === 0) {
      return;
    }

    // Position the panel relative to the container
    // Convert viewport coordinates to coordinates relative to flyout-container
    const top = containerRect.bottom + 4; // 4px gap below container
    const left = containerRect.left;
    
    // Use stored container reference to avoid DOM queries and ensure we use the correct container
    const flyoutContainerElement = this.ensureContainerElement(panelEl);
    
    if (flyoutContainerElement) {
      // Store current scroll position before any DOM manipulation to prevent unwanted scrolling
      const scrollX = window.scrollX ?? window.pageXOffset ?? document.documentElement.scrollLeft ?? 0;
      const scrollY = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
      
      const flyoutContainerRect = flyoutContainerElement.getBoundingClientRect();
      const relativeTop = top - flyoutContainerRect.top;
      const relativeLeft = left - flyoutContainerRect.left;
      
      this.renderer.setStyle(panelEl, 'position', 'absolute');
      this.renderer.setStyle(panelEl, 'top', `${relativeTop}px`);
      this.renderer.setStyle(panelEl, 'left', `${relativeLeft}px`);
      
      // Restore scroll position if browser scrolled (prevents jumping to first flyout)
      // Use setTimeout with 0 delay to ensure it runs after any browser scroll behavior
      setTimeout(() => {
        const newScrollX = window.scrollX ?? window.pageXOffset ?? document.documentElement.scrollLeft ?? 0;
        const newScrollY = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
        if (Math.abs(newScrollX - scrollX) > 1 || Math.abs(newScrollY - scrollY) > 1) {
          window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
        }
      }, 0);
    } else {
      // Fallback: if container not found, use fixed positioning
      this.renderer.setStyle(panelEl, 'position', 'fixed');
      this.renderer.setStyle(panelEl, 'top', `${top}px`);
      this.renderer.setStyle(panelEl, 'left', `${left}px`);
    }
    
    // Set width - use 'auto' if width input is not set or 0, otherwise use specified width or container width
    if (!this.width || this.width <= 0) {
      this.renderer.setStyle(panelEl, 'width', 'auto');
    } else {
      this.renderer.setStyle(panelEl, 'width', `${this.width}px`);
    }
    this.renderer.setStyle(panelEl, 'z-index', '1000');
  }
}

