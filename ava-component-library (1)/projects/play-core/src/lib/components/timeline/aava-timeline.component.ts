import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  HostBinding,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { ViewEncapsulation } from '@angular/core';
import { AavaTooltipDirective } from '../../directives/aava-tooltip.directive';

export interface TimelineEvent {
  time?: string;
  text?: string;
  iconName?: string;
  iconColor?: string;
  iconSize?: string;
  iconStyle?: Record<string, any>;
  bodyStyle?:{
    year?: Record<string, any>,
    time?: Record<string, any>,
    text?: Record<string, any>,
    title?: Record<string, any>,
    description?: Record<string, any>,
  }
  imageUrl?: string;
  imageSize?: string;
  year?: string;
  title?: string;
  description?: string;
  status?: 'completed' | 'current' | 'pending' | 'unreached';
  customClass?: string;
  data?: any; // For any additional custom data
  tooltip?:{
    message?:string;
    messageIcon?:string;
    position?: 'left' | 'right' | 'top' | 'bottom';
    arrow?: 'start' | 'center' | 'end';
    iconSize?:number;
    iconColor?:string;

  }
  
}

@Component({
  selector: 'aava-timeline',
  standalone: true,
  imports: [CommonModule, AavaIconComponent, AavaTooltipDirective],
  templateUrl: './aava-timeline.component.html',
  styleUrl: './aava-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaTimelineComponent implements OnInit {
  @Input() contentTemplate?: any; // Template for custom content projection
  @Input() events: TimelineEvent[] = [];
  @Input() sortOrder: 'ascending' | 'descending' = 'ascending';
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() iconCircleBgColor = '#fff';
  @Input() iconCircleBorderColor = '#ccc';
  @Input() iconCircleSize = '40px';
  @Input() id='';
  @Input() alignment: 'left' | 'center' | 'right' = 'center';
  @Input() textAlign:
    | 'zig-zag'
    | 'zigzag-left'
    | 'zigzag-right'
    | 'zigzag-up'
    | 'zigzag-down' = 'zigzag-left';
  /**
   * Sets the overall size of the timeline component.
   * Options: 'xs', 'sm', 'md', 'lg'
   */
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

  /**
   * When true, the entire timeline will be displayed in light grey color
   */
  @Input() disabled = false;
  @Input() customStyles: Record<string, string> = {};

  // Host bindings for CSS custom properties
  @HostBinding('style.--timeline-icon-bg-color') get iconBgColor() {
    return this.iconCircleBgColor;
  }
  @HostBinding('style.--timeline-icon-border-color') get iconBorderColor() {
    return this.iconCircleBorderColor;
  }
  @HostBinding('style.--timeline-icon-size') get iconSize() {
    return this.iconCircleSize;
  }

  @ViewChild('timelineContainer', { static: false })
  timelineContainer?: ElementRef;

  sortedEvents: TimelineEvent[] = [];

  private _connectorSpacing = 60; // Default spacing between nodes
  private _nodeHeight = 40; // Default node height

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sortEvents();
    this.updateCSSVariables();
    this.calculateOptimalSpacing();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['events'] || changes['sortOrder']) {
      this.sortEvents();
      this.calculateOptimalSpacing();
    }
    if (changes['iconCircleBgColor'] || changes['iconCircleBorderColor']) {
      this.updateCSSVariables();
    }
  }

  private updateCSSVariables() {
    const element = this.elementRef.nativeElement;
    this.renderer.setStyle(
      element,
      '--icon-circle-bg-color',
      this.iconCircleBgColor
    );
    this.renderer.setStyle(
      element,
      '--icon-circle-border-color',
      this.iconCircleBorderColor
    );
  }

  @Input() customSort?: (a: TimelineEvent, b: TimelineEvent) => number;

  sortEvents() {
    this.sortedEvents = [...this.events].sort((a, b) => {
      // Use custom sort function if provided
      if (this.customSort) {
        return this.customSort(a, b);
      }

      // Default sorting logic
      if (a.year && b.year) {
        const yearComparison = a.year.localeCompare(b.year);
        if (yearComparison !== 0) {
          return this.sortOrder === 'ascending'
            ? yearComparison
            : -yearComparison;
        }
      }

      if (a.time && b.time) {
        const timeComparison = a.time.localeCompare(b.time);
        return this.sortOrder === 'ascending'
          ? timeComparison
          : -timeComparison;
      }

      return 0;
    });
  }

  private calculateOptimalSpacing(): void {
    const nodeCount = this.sortedEvents.length;
    if (nodeCount <= 1) return;

    // Adjust spacing based on number of nodes for better visual distribution
    if (nodeCount <= 3) {
      this._connectorSpacing = 80;
    } else if (nodeCount <= 6) {
      this._connectorSpacing = 60;
    } else {
      this._connectorSpacing = 40;
    }
  }

  getTimelineLineHeight(): number {
    if (this.orientation === 'horizontal') return 2;

    const nodeCount = this.sortedEvents.length;
    if (nodeCount <= 1) return 0;

    return (nodeCount - 1) * this._connectorSpacing + this._nodeHeight;
  }

  getTimelineLineWidth(): number {
    if (this.orientation === 'vertical') return 2;

    const nodeCount = this.sortedEvents.length;
    if (nodeCount <= 1) return 0;

    return (nodeCount - 1) * this._connectorSpacing + this._nodeHeight;
  }

  shouldShowConnector(
    index: number,
    event: TimelineEvent,
    isLast: boolean
  ): boolean {
    if (isLast) return false;

    // Only show connector if current node connects to next node
    const nextEvent = this.sortedEvents[index + 1];
    if (!nextEvent) return false;

    // Show connector based on status interconnection logic
    return this.areNodesConnected(event, nextEvent);
  }

  private areNodesConnected(
    currentEvent: TimelineEvent,
    nextEvent: TimelineEvent
  ): boolean {
    const currentStatus = currentEvent.status || 'default';
    const nextStatus = nextEvent.status || 'default';

    // Define connection rules based on status
    const statusOrder = ['completed', 'current', 'pending', 'unreached'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextIndex = statusOrder.indexOf(nextStatus);

    // Connect if statuses are sequential or both are the same
    return Math.abs(currentIndex - nextIndex) <= 1;
  }

  getConnectorStatus(index: number, event: TimelineEvent): string {
    if (this.disabled) {
      return 'disabled';
    }

    const nextEvent = this.sortedEvents[index + 1];
    if (!nextEvent) return event.status || 'default';

    const currentStatus = event.status || 'default';
    const nextStatus = nextEvent.status || 'default';

    // Use the "lower" status for the connector
    const statusPriority = {
      completed: 4,
      current: 3,
      pending: 2,
      unreached: 1,
      default: 0,
    };
    const currentPriority =
      statusPriority[currentStatus as keyof typeof statusPriority] || 0;
    const nextPriority =
      statusPriority[nextStatus as keyof typeof statusPriority] || 0;

    return currentPriority <= nextPriority ? currentStatus : nextStatus;
  }

  getConnectorHeight(index: number): number {
    if (this.orientation === 'horizontal') return 2;
    return this._connectorSpacing;
  }

  getConnectorWidth(index: number): number {
    if (this.orientation === 'vertical') return 2;
    return this._connectorSpacing;
  }

  trackByEvent(index: number, event: TimelineEvent): any {
    return event.title || event.text || event.time || index;
  }

  getEventAlignmentClass(index: number): string {
    if (this.textAlign === 'zig-zag') {
      if (this.orientation === 'vertical') {
        return index % 2 === 0 ? 'align-left' : 'align-right';
      } else {
        return index % 2 === 0 ? 'align-up' : 'align-down';
      }
    }

    if (this.textAlign === 'zigzag-left' || this.textAlign === 'zigzag-right') {
      const circlePosition = index % 2 === 0 ? 'align-left' : 'align-right';
      const textPosition =
        this.textAlign === 'zigzag-left' ? 'text-left' : 'text-right';
      return `${circlePosition} ${textPosition}`;
    }

    if (this.textAlign === 'zigzag-up' || this.textAlign === 'zigzag-down') {
      const circlePosition = index % 2 === 0 ? 'align-up' : 'align-down';
      const textPosition =
        this.textAlign === 'zigzag-up' ? 'text-up' : 'text-down';
      return `${circlePosition} ${textPosition}`;
    }

    return `align-${this.textAlign}`;
  }

  getTimelineClasses(): string {
    const classes = [
      `timeline`,
      this.orientation,
      `text-align-${this.textAlign}`,
      `size-${this.size}`,
      this.alignment
    ];
    if (this.disabled) {
      classes.push('timeline-disabled');
    }
    return classes.join(' ');
  }

  getEventClasses(
    index: number,
    event: TimelineEvent,
    isLast: boolean
  ): string {
    const classes = [
      this.getEventAlignmentClass(index),
      this.disabled ? 'disabled' : event.status || 'default',
    ];

    if (event.customClass) {
      classes.push(event.customClass);
    }

    if (isLast) {
      classes.push('last-event');
    }

    // Explicit unreached handling (optional, just for styling separation)
    if (!this.disabled && event.status === 'unreached') {
      classes.push('timeline-unreached');
    }

    return classes.filter((c) => c).join(' ');
  }

  getSafeHtml(html: string | undefined): SafeHtml {
    return html ? this.sanitizer.bypassSecurityTrustHtml(html) : '';
  }
}
