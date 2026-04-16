import {
  Directive,
  Input,
  HostListener,
  ViewContainerRef,
  ComponentRef,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { PopOverData, PopOverConfig, AavaPopOverComponent } from '../components/pop-over/aava-pop-over.component';

@Directive({
  selector: '[aavaPopover]',
  standalone: true,
})
export class AavaPopoverDirective implements OnDestroy {

  @Input() aavaPopoverData: PopOverData[] = [];
  @Input() aavaPopoverArrow: 'start' | 'center' | 'end' | null = null;
  @Input() aavaPopoverPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() aavaPopoverTrigger: 'click' = 'click';
  @Input() aavaPopoverShowButtons: boolean = false;
  @Input() aavaPopoverShowPagination: boolean = false;
  @Input() aavaPopoverShowIcon: boolean = false;
  @Input() aavaPopoverShowSkip: boolean = false;
  @Input() aavaPopoverShowLearnMore: boolean = false;

  private popoverRef: ComponentRef<AavaPopOverComponent> | null = null;

  constructor(
    private vcRef: ViewContainerRef,
    private el: ElementRef
  ) { }

  @HostListener('click') onClick() {
    this.popoverRef ? this.hide() : this.show();
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    if (this.popoverRef && this.aavaPopoverTrigger === 'click') {
      const target = event.target as HTMLElement;
      const popoverElement = this.popoverRef.location.nativeElement;
      const triggerElement = this.el.nativeElement;

      // Close if clicked outside both trigger and popover
      if (!triggerElement.contains(target) && !popoverElement.contains(target)) {
        this.hide();
      }
    }
  }

  show() {
    if (this.popoverRef || !this.aavaPopoverData || this.aavaPopoverData.length === 0) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    this.popoverRef = this.vcRef.createComponent(AavaPopOverComponent);

    // Calculate absolute positions (viewport position + scroll offset)
    const absoluteLeft = rect.left + scrollX;
    const absoluteTop = rect.top + scrollY;
    const absoluteBottom = rect.bottom + scrollY;

    // Create popover configuration
    this.popoverRef.instance.config = {
      arrow: this.aavaPopoverArrow,
      position: this.aavaPopoverPosition,
      left: absoluteLeft,
      top: absoluteTop,
      bottom: absoluteBottom,
      width: rect.width,
      height: rect.height,
      showButtons: this.aavaPopoverShowButtons,
      showPagination: this.aavaPopoverShowPagination,
      showIcon: this.aavaPopoverShowIcon,
      showSkip: this.aavaPopoverShowSkip,
      showLearnMore: this.aavaPopoverShowLearnMore,
    };

    // Set the data
    this.popoverRef.instance.data = this.aavaPopoverData;

    // Append to body for proper positioning
    document.body.appendChild(this.popoverRef.location.nativeElement);

    // Trigger change detection
    this.popoverRef.changeDetectorRef.detectChanges();
  }

  hide() {
    if (this.popoverRef) {
      this.popoverRef.destroy();
      this.popoverRef = null;
    }
  }

  ngOnDestroy() {
    this.hide();
  }
}
