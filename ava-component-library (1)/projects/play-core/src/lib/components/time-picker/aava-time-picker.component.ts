import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';

export type TimePickerSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'aava-time-picker',
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-time-picker.component.html',
  styleUrl: './aava-time-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaTimePickerComponent implements OnInit, AfterViewInit, OnDestroy {
  // Constants
  private readonly ITEM_HEIGHT = 32;
  private readonly SCROLL_SETTLE_DELAY = 150;
  private readonly SCROLL_TIMEOUT_DELAY = 0;
  private readonly STICKY_TOLERANCE_MULTIPLIER = 0.3;
  private readonly _uniqueId = `aava-time-picker-${Math.random().toString(36).slice(2, 11)}`;

  @Input() customStyles: Record<string, string> = {};
  
  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;
  @Input() id = '';

  @ViewChild('hoursScroll') hoursScroll?: ElementRef<HTMLElement>;
  @ViewChild('minutesScroll') minutesScroll?: ElementRef<HTMLElement>;
  @ViewChild('periodScroll') periodScroll?: ElementRef<HTMLElement>;

  @Output() timeSelected = new EventEmitter<string>();
  @Input() size: TimePickerSize = 'md';

  isFocused = false;
  hours = '';
  minutes = '';
  period = '';
  displayTime = '';

  // New properties for inline input in scroll mode
  showInlineInput = false;
  inlineInputType: 'hours' | 'minutes' | 'period' | null = null;
  inlineInputValue = '';
  inlineInputPosition = { top: 0, left: 0, width: 0 };
  clickedItemValue = ''; // To track which item should be hidden

  // Properties to track which items are currently centered (for visual selection)
  centeredHour = '';
  centeredMinute = '';
  centeredPeriod = '';

  // Original lists without padding
  private readonly originalHoursList: string[] = Array.from(
    { length: 12 },
    (_, i) => (i + 1).toString().padStart(2, '0')
  );
  private readonly originalMinutesList: string[] = Array.from(
    { length: 60 },
    (_, i) => i.toString().padStart(2, '0')
  );
  private readonly originalPeriodList: string[] = ['AM', 'PM'];

  // Number of padding items to add above and below for centering
  private readonly paddingCount = 2;

  // Generate arrays for scrolling with padding for centering
  readonly hoursList: string[];
  readonly minutesList: string[];
  readonly periodList: string[];

  private scrollTimeouts: Record<string, ReturnType<typeof setTimeout> | undefined> = {};
  private timeouts: ReturnType<typeof setTimeout>[] = [];
  private wheelEventHandlers: { element: HTMLElement; handler: (e: WheelEvent) => void; type: 'hours' | 'minutes' | 'period' }[] = [];

  private generatePaddedList(originalList: string[]): string[] {
    const paddingItems = Array(this.paddingCount).fill('');
    return [...paddingItems, ...originalList, ...paddingItems];
  }
  private readonly iconSizeMap: Record<TimePickerSize, number> = {
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  };
  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    // Initialize padded lists in constructor
    this.hoursList = this.generatePaddedList(this.originalHoursList);
    this.minutesList = this.generatePaddedList(this.originalMinutesList);
    this.periodList = this.generatePaddedList(this.originalPeriodList);
  }

  /**
   * Initializes the component.
   * Sets up display time and centered values.
   */
  ngOnInit(): void {
    this.validateInputs();
    this.updateDisplayTime();
    // Initialize centered values to match current values
    this.centeredHour = this.hours;
    this.centeredMinute = this.minutes;
    this.centeredPeriod = this.period;
    // Don't emit initial time since we start with empty values
  }

  readonly getIconColor = 'var(--timepicker-icon-border-color,#000)';

  /**
   * Gets the computed icon size based on component size.
   * @returns The icon size in pixels
   */
  get computedIconSize(): number {
    return this.iconSizeMap[this.size] || this.iconSizeMap.md;
  }

  /**
   * Gets the unique ID for this time picker component.
   * @returns The unique ID
   */
  get timePickerId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Initializes the component after view initialization.
   * Adds wheel event listeners to enforce scroll boundaries.
   */
  ngAfterViewInit(): void {
    try {
      // Add wheel event listeners to enforce scroll boundaries
      this.addWheelEventListeners();
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in ngAfterViewInit', error);
    }
  }

  /**
   * Adds wheel event listeners to scroll containers.
   */
  private addWheelEventListeners(): void {
    const containers: { element: ElementRef<HTMLElement> | undefined; type: 'hours' | 'minutes' | 'period' }[] = [
      { element: this.hoursScroll, type: 'hours' },
      { element: this.minutesScroll, type: 'minutes' },
      { element: this.periodScroll, type: 'period' },
    ];

    containers.forEach(({ element, type }) => {
      if (element?.nativeElement) {
        const handler = (e: WheelEvent) => {
          this.handleWheelEvent(e, type);
        };
        element.nativeElement.addEventListener('wheel', handler);
        this.wheelEventHandlers.push({ element: element.nativeElement, handler, type });
      }
    });
  }

  /**
   * Cleans up resources on component destruction.
   * Removes event listeners, clears timeouts, and prevents memory leaks.
   */
  ngOnDestroy(): void {
    // Remove wheel event listeners
    this.wheelEventHandlers.forEach(({ element, handler }) => {
      if (element && element.removeEventListener) {
        element.removeEventListener('wheel', handler);
      }
    });
    this.wheelEventHandlers = [];

    // Clean up scroll timeouts
    Object.values(this.scrollTimeouts).forEach((timeout) => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
    Object.keys(this.scrollTimeouts).forEach(key => delete this.scrollTimeouts[key]);

    // Clean up all tracked timeouts
    this.timeouts.forEach((timeout) => {
      if (timeout) {
        clearTimeout(timeout);
      }
    });
    this.timeouts = [];
  }

  /**
   * Handles click on time display.
   * Shows scroll mode and centers current values.
   * @param event - The click event
   */
  onDisplayClick(event: Event): void {
    try {
      event.stopPropagation(); // Prevent any parent click handlers

      // When clicking on time display, show scroll mode
      this.isFocused = true;

      // Set default values if empty
      if (!this.hours) this.hours = '01';
      if (!this.minutes) this.minutes = '00';
      if (!this.period) this.period = 'AM';

      // Center the current values in the scroll containers
      const timeoutId = setTimeout(() => {
        this.centerScrollToValue('hours', this.hours);
        this.centerScrollToValue('minutes', this.minutes);
        this.centerScrollToValue('period', this.period);
        // Update display and emit after setting defaults
        this.updateDisplayTime();
        this.emitTimeSelected();
        this.cdr.markForCheck();
      }, this.SCROLL_TIMEOUT_DELAY);
      
      this.timeouts.push(timeoutId);
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in onDisplayClick', error);
    }
  }

  /**
   * Handles icon click.
   * Shows scroll mode and centers current values.
   * @param event - The click event
   */
  onIconClick(event: Event): void {
    try {
      event.stopPropagation(); // Prevent field click

      this.isFocused = true;

      // Set default values if empty
      if (!this.hours) this.hours = '01';
      if (!this.minutes) this.minutes = '00';
      if (!this.period) this.period = 'AM';

      // Center the current values in the scroll containers
      const timeoutId = setTimeout(() => {
        this.centerScrollToValue('hours', this.hours);
        this.centerScrollToValue('minutes', this.minutes);
        this.centerScrollToValue('period', this.period);
        // Update display and emit after setting defaults
        this.updateDisplayTime();
        this.emitTimeSelected();
        this.cdr.markForCheck();
      }, this.SCROLL_TIMEOUT_DELAY);
      
      this.timeouts.push(timeoutId);
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in onIconClick', error);
    }
  }

  /**
   * Auto-selects current scroll values for all columns.
   * Force update all scroll columns to select the currently visible values.
   */
  autoSelectCurrentScrollValues(): void {
    if (this.hoursScroll?.nativeElement) {
      this.updateSelectionForColumn('hours');
    }
    if (this.minutesScroll?.nativeElement) {
      this.updateSelectionForColumn('minutes');
    }
    if (this.periodScroll?.nativeElement) {
      this.updateSelectionForColumn('period');
    }
    this.cdr.markForCheck();
  }

  /**
   * Handles click on a time item in the scroll list.
   * @param event - The click event
   * @param type - The type of time item (hours, minutes, period)
   * @param value - The value of the clicked item
   */
  onTimeItemClick(
    event: Event,
    type: 'hours' | 'minutes' | 'period',
    value: string
  ): void {
    try {
      event.stopPropagation(); // Prevent event bubbling

      // Get the position of the clicked element
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement) return;

      const rect = clickedElement.getBoundingClientRect();
      const container = this.elementRef.nativeElement.querySelector('.time-scroll-container') as HTMLElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      // Calculate position relative to the scroll container
      this.inlineInputPosition = {
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left,
        width: rect.width,
      };

      // Validate and set values properly
      if (type === 'hours') {
        this.hours = value.padStart(2, '0');
        this.centeredHour = value.padStart(2, '0');
      } else if (type === 'minutes') {
        this.minutes = value.padStart(2, '0');
        this.centeredMinute = value.padStart(2, '0');
      } else if (type === 'period') {
        this.period = value.toUpperCase() === 'AM' ? 'AM' : 'PM';
        this.centeredPeriod = value.toUpperCase() === 'AM' ? 'AM' : 'PM';
      }

      this.updateDisplayTime();
      this.emitTimeSelected();

      // NEW BEHAVIOR: Show inline input in scroll mode at clicked position
      this.showInlineInput = true;
      this.inlineInputType = type;
      this.inlineInputValue = value;
      this.clickedItemValue = value; // Track which item to hide

      const timeoutId = setTimeout(() => {
        const inlineInput = document.querySelector(
          '.inline-scroll-input'
        ) as HTMLInputElement;
        if (inlineInput) {
          inlineInput.focus();
          inlineInput.select();
        }
      }, this.SCROLL_TIMEOUT_DELAY);
      
      this.timeouts.push(timeoutId);
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in onTimeItemClick', error);
    }
  }

  /**
   * Handles scroll events with proper debouncing and isolation.
   * @param event - The scroll event
   * @param type - The type of scroll column (hours, minutes, period)
   */
  onScrollEvent(event: Event, type: 'hours' | 'minutes' | 'period'): void {
    event.stopPropagation();

    // Enforce scroll boundaries immediately
    this.enforceScrollBoundaries(type);

    // Clear any existing timeout for this specific column
    if (this.scrollTimeouts[type]) {
      clearTimeout(this.scrollTimeouts[type]);
    }

    // Set a new timeout for this specific column only
    this.scrollTimeouts[type] = setTimeout(() => {
      this.updateSelectionForColumn(type);
    }, this.SCROLL_SETTLE_DELAY); // Wait for scroll to settle
  }

  /**
   * Enforces scroll boundaries to prevent scrolling beyond valid items.
   * @param type - The type of scroll column (hours, minutes, period)
   */
  private enforceScrollBoundaries(type: 'hours' | 'minutes' | 'period'): void {
    try {
      let scrollContainer: ElementRef<HTMLElement> | undefined;
      let originalListLength: number;

      if (type === 'hours') {
        scrollContainer = this.hoursScroll;
        originalListLength = this.originalHoursList.length;
      } else if (type === 'minutes') {
        scrollContainer = this.minutesScroll;
        originalListLength = this.originalMinutesList.length;
      } else {
        scrollContainer = this.periodScroll;
        originalListLength = this.originalPeriodList.length;
      }

      if (!scrollContainer?.nativeElement) return;

      const itemHeight = this.ITEM_HEIGHT;
    const containerHeight = scrollContainer.nativeElement.clientHeight;
    const currentScrollTop = scrollContainer.nativeElement.scrollTop;

    // Calculate boundaries to center first and last actual items
    // Minimum: scroll position to center the first actual item (index = paddingCount)
    const minScrollTop =
      this.paddingCount * itemHeight - containerHeight / 2 + itemHeight / 2;
    // Maximum: scroll position to center the last actual item (index = paddingCount + originalListLength - 1)
    const maxScrollTop =
      (this.paddingCount + originalListLength - 1) * itemHeight -
      containerHeight / 2 +
      itemHeight / 2;

      // Enforce minimum boundary (cannot scroll above first item centered)
      if (currentScrollTop < minScrollTop) {
        scrollContainer.nativeElement.scrollTop = minScrollTop;
        return;
      }

      // Enforce maximum boundary (cannot scroll below last item centered)
      if (currentScrollTop > maxScrollTop) {
        scrollContainer.nativeElement.scrollTop = maxScrollTop;
        return;
      }
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in enforceScrollBoundaries', error);
    }
  }

  /**
   * Handles wheel events to enforce scroll boundaries.
   * @param event - The wheel event
   * @param type - The type of scroll column (hours, minutes, period)
   */
  private handleWheelEvent(
    event: WheelEvent,
    type: 'hours' | 'minutes' | 'period'
  ): void {
    try {
      let scrollContainer: ElementRef<HTMLElement> | undefined;
      let originalListLength: number;

      if (type === 'hours') {
        scrollContainer = this.hoursScroll;
        originalListLength = this.originalHoursList.length;
      } else if (type === 'minutes') {
        scrollContainer = this.minutesScroll;
        originalListLength = this.originalMinutesList.length;
      } else {
        scrollContainer = this.periodScroll;
        originalListLength = this.originalPeriodList.length;
      }

      if (!scrollContainer?.nativeElement) return;

    const itemHeight = this.ITEM_HEIGHT;
    const containerHeight = scrollContainer.nativeElement.clientHeight;
    const currentScrollTop = scrollContainer.nativeElement.scrollTop;
    const deltaY = event.deltaY;
    const newScrollTop = currentScrollTop + deltaY;

    // Calculate boundaries to center first and last actual items
    const minScrollTop =
      this.paddingCount * itemHeight - containerHeight / 2 + itemHeight / 2;
    const maxScrollTop =
      (this.paddingCount + originalListLength - 1) * itemHeight -
      containerHeight / 2 +
      itemHeight / 2;

      // Check if the new scroll position would exceed boundaries
      if (newScrollTop < minScrollTop || newScrollTop > maxScrollTop) {
        event.preventDefault(); // Prevent the scroll if it would exceed boundaries

        // Set to boundary value
        if (newScrollTop < minScrollTop) {
          scrollContainer.nativeElement.scrollTop = minScrollTop;
        } else {
          scrollContainer.nativeElement.scrollTop = maxScrollTop;
        }
      }
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in handleWheelEvent', error);
    }
  }

  /**
   * Updates the selected value for a scroll column based on scroll position.
   * @param type - The type of scroll column (hours, minutes, period)
   */
  private updateSelectionForColumn(type: 'hours' | 'minutes' | 'period'): void {
    try {
      let scrollContainer: ElementRef<HTMLElement> | undefined;
      let list: string[];

    if (type === 'hours') {
      scrollContainer = this.hoursScroll;
      list = this.hoursList;
    } else if (type === 'minutes') {
      scrollContainer = this.minutesScroll;
      list = this.minutesList;
    } else {
      scrollContainer = this.periodScroll;
      list = this.periodList;
    }

    if (!scrollContainer?.nativeElement) return;

    const itemHeight = this.ITEM_HEIGHT;
    const containerHeight = scrollContainer.nativeElement.clientHeight;
    const scrollTop = scrollContainer.nativeElement.scrollTop;
    const containerCenterY = containerHeight / 2;
    const scrollCenterPosition = scrollTop + containerCenterY;
    // Calculate which item is at the center with sticky selection
    // Find the item whose center is closest to the container center
    let bestIndex = 0;
    let minDistance = Infinity;

    // Add tolerance for sticky selection - once selected, need significant movement to change
    const tolerance = itemHeight * this.STICKY_TOLERANCE_MULTIPLIER;

    // First, check if current centered value is still reasonably centered
    let currentCenteredIndex = -1;
    if (type === 'hours' && this.centeredHour) {
      currentCenteredIndex = list.indexOf(this.centeredHour);
    } else if (type === 'minutes' && this.centeredMinute) {
      currentCenteredIndex = list.indexOf(this.centeredMinute);
    } else if (type === 'period' && this.centeredPeriod) {
      currentCenteredIndex = list.indexOf(this.centeredPeriod);
    }

    // If we have a current selection, check if it's still within tolerance
    if (currentCenteredIndex >= 0) {
      const currentItemCenterY =
        currentCenteredIndex * itemHeight + itemHeight / 2;
      const currentDistance = Math.abs(
        currentItemCenterY - scrollCenterPosition
      );

      // If current item is still within tolerance, keep it selected
      if (currentDistance <= tolerance) {
        bestIndex = currentCenteredIndex;
      } else {
        // Current item is too far, find the new best one
        for (let i = 0; i < list.length; i++) {
          const itemCenterY = i * itemHeight + itemHeight / 2;
          const distance = Math.abs(itemCenterY - scrollCenterPosition);

          if (distance < minDistance) {
            minDistance = distance;
            bestIndex = i;
          }
        }
      }
    } else {
      // No current selection, find the best one
      for (let i = 0; i < list.length; i++) {
        const itemCenterY = i * itemHeight + itemHeight / 2;
        const distance = Math.abs(itemCenterY - scrollCenterPosition);

        if (distance < minDistance) {
          minDistance = distance;
          bestIndex = i;
        }
      }
    }

    const centeredValue = list[bestIndex];

    // Update the centered item for visual feedback (this determines which item gets black color)
    if (centeredValue && centeredValue.trim() !== '') {
      if (type === 'hours') {
        this.centeredHour = centeredValue;
        // Only update the actual selected value if it's perfectly centered
        this.hours = centeredValue;
      } else if (type === 'minutes') {
        this.centeredMinute = centeredValue;
        // Only update the actual selected value if it's perfectly centered
        this.minutes = centeredValue;
      } else if (type === 'period') {
        if (centeredValue === 'AM' || centeredValue === 'PM') {
          this.centeredPeriod = centeredValue;
          this.period = centeredValue;
        }
      }

      this.updateDisplayTime();
      this.emitTimeSelected();
      this.cdr.markForCheck();
    } else {
      if (type === 'hours') {
        this.centeredHour = '';
      } else if (type === 'minutes') {
        this.centeredMinute = '';
      } else       if (type === 'period') {
        this.centeredPeriod = '';
      }
    }
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in updateSelectionForColumn', error);
    }
  }

  /**
   * Centers the scroll container to show the specified value.
   * @param type - The type of scroll column (hours, minutes, period)
   * @param value - The value to center on
   */
  centerScrollToValue(type: 'hours' | 'minutes' | 'period', value: string): void {
    try {
      let scrollContainer: ElementRef<HTMLElement> | undefined;
      let itemIndex: number;
      let defaultValue: string;
      let originalList: string[];

      if (type === 'hours') {
        scrollContainer = this.hoursScroll;
      originalList = this.originalHoursList;
      defaultValue = value || '01';
      const originalIndex = originalList.indexOf(defaultValue);
      itemIndex =
        originalIndex >= 0
          ? originalIndex + this.paddingCount
          : this.paddingCount;
      if (!value) {
        this.hours = defaultValue;
      }
    } else if (type === 'minutes') {
      scrollContainer = this.minutesScroll;
      originalList = this.originalMinutesList;
      defaultValue = value || '00';
      const originalIndex = originalList.indexOf(defaultValue);
      itemIndex =
        originalIndex >= 0
          ? originalIndex + this.paddingCount
          : this.paddingCount;
      if (!value) {
        this.minutes = defaultValue;
      }
    } else {
      scrollContainer = this.periodScroll;
      originalList = this.originalPeriodList;
      defaultValue = value || 'AM';
      const originalIndex = originalList.indexOf(defaultValue);
      itemIndex =
        originalIndex >= 0
          ? originalIndex + this.paddingCount
          : this.paddingCount;
      if (!value) {
        this.period = defaultValue;
      }
    }

    if (scrollContainer?.nativeElement && itemIndex >= 0) {
      const itemHeight = this.ITEM_HEIGHT;
      const containerHeight = scrollContainer.nativeElement.clientHeight;
      const scrollTop =
        itemIndex * itemHeight - containerHeight / 2 + itemHeight / 2;
      const originalListLength = originalList.length;
      const minScrollTop =
        this.paddingCount * itemHeight - containerHeight / 2 + itemHeight / 2;
      const maxScrollTop =
        (this.paddingCount + originalListLength - 1) * itemHeight -
        containerHeight / 2 +
        itemHeight / 2;
      const boundedScrollTop = Math.max(
        minScrollTop,
        Math.min(scrollTop, maxScrollTop)
      );
      scrollContainer.nativeElement.scrollTop = boundedScrollTop;
    }
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in centerScrollToValue', error);
    }
  }

  /**
   * Updates the display time string.
   */
  updateDisplayTime(): void {
    const { formattedTime } = this.getFormattedTime();
    this.displayTime = formattedTime;
  }

  /**
   * Emits the selected time.
   */
  emitTimeSelected(): void {
    const { formattedTime } = this.getFormattedTime();
    this.timeSelected.emit(formattedTime);
  }

  /**
   * Gets the formatted time string.
   * @returns Object containing formatted time and components
   */
  private getFormattedTime(): { formattedTime: string; hours: string; minutes: string; period: string } {
    if (this.hours && this.minutes && this.period) {
      const hours = this.hours.padStart(2, '0');
      const minutes = this.minutes.padStart(2, '0');
      const period = this.period.toUpperCase();
      return {
        formattedTime: `${hours}:${minutes} ${period}`,
        hours,
        minutes,
        period,
      };
    }
    return {
      formattedTime: 'HH:MM AM',
      hours: '',
      minutes: '',
      period: '',
    };
  }

  /**
   * Handles document click to close the time picker when clicking outside.
   * @param event - The mouse event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const clickedInside =
      this.elementRef.nativeElement.contains(clickedElement);

    if (!clickedInside && this.isFocused) {
      this.autoSelectCurrentScrollValues();
      this.isFocused = false;
      this.closeInlineInput(); // Close inline input when clicking outside
      this.cdr.markForCheck();
    }
  }

  /**
   * Handles inline input change event.
   * Validates and updates the inline input value.
   * @param event - The input event
   */
  onInlineInputChange(event: Event): void {
    try {
      const target = event.target as HTMLInputElement;
      if (!target) return;

      let value = target.value;

      // Validate input based on type
      if (this.inlineInputType === 'hours') {
        // Only allow numbers, limit to 2 digits, and validate range
        value = value.replace(/[^0-9]/g, '').substring(0, 2);
        const numValue = parseInt(value, 10);

        // If it's a complete 2-digit number, validate range
        if (value.length === 2 && (numValue < 1 || numValue > 12)) {
          value = this.inlineInputValue; // Revert to previous valid value
        }
        // If it's a single digit, allow 1-9
        else if (value.length === 1 && (numValue < 1 || numValue > 9)) {
          value = this.inlineInputValue; // Revert to previous valid value
        }
      } else if (this.inlineInputType === 'minutes') {
        // Only allow numbers, limit to 2 digits, and validate range
        value = value.replace(/[^0-9]/g, '').substring(0, 2);
        const numValue = parseInt(value, 10);

        // If it's a complete 2-digit number, validate range
        if (value.length === 2 && numValue > 59) {
          value = this.inlineInputValue; // Revert to previous valid value
        }
      } else if (this.inlineInputType === 'period') {
        // Only allow A, P, M letters, case insensitive
        value = value
          .replace(/[^apmAPM]/g, '')
          .substring(0, 2)
          .toUpperCase();
      }

      this.inlineInputValue = value;
      target.value = value;
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in onInlineInputChange', error);
    }
  }

  /**
   * Handles keyboard events for inline input.
   * @param event - The keyboard event
   */
  onInlineInputKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.applyInlineInput();
    } else if (event.key === 'Escape') {
      this.closeInlineInput();
    }
  }

  /**
   * Handles blur event for inline input.
   */
  onInlineInputBlur(): void {
    this.applyInlineInput();
  }

  /**
   * Applies the inline input value after validation.
   */
  private applyInlineInput(): void {
    try {
    if (!this.inlineInputType || !this.inlineInputValue) {
      this.closeInlineInput();
      return;
    }

    let validatedValue = '';

    if (this.inlineInputType === 'hours') {
      validatedValue = this.validateInlineHours(this.inlineInputValue);
      if (validatedValue) {
        this.hours = validatedValue;
        this.centeredHour = validatedValue;
        this.centerScrollToValue('hours', validatedValue);
      }
    } else if (this.inlineInputType === 'minutes') {
      validatedValue = this.validateInlineMinutes(this.inlineInputValue);
      if (validatedValue) {
        this.minutes = validatedValue;
        this.centeredMinute = validatedValue;
        this.centerScrollToValue('minutes', validatedValue);
      }
    } else if (this.inlineInputType === 'period') {
      const periodValue = this.validateInlinePeriod(this.inlineInputValue);
      if (periodValue) {
        this.period = periodValue;
        this.centeredPeriod = periodValue;
        this.centerScrollToValue('period', periodValue);
      }
    }

      if (validatedValue || this.inlineInputType === 'period') {
        this.updateDisplayTime();
        this.emitTimeSelected();
        this.cdr.markForCheck();
      }

      this.closeInlineInput();
    } catch (error) {
      console.error('AavaTimePickerComponent: Error in applyInlineInput', error);
    }
  }

  /**
   * Validates inline hours input.
   * @param value - The hours value to validate
   * @returns The validated and formatted hours value
   */
  private validateInlineHours(value: string): string {
    if (!value) return '';

    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return '';

    // Handle single digit (1-9) - pad with zero
    if (value.length === 1) {
      if (numValue >= 1 && numValue <= 9) {
        return value.padStart(2, '0');
      }
      return '';
    }

    // Handle two digits (01-12)
    if (value.length === 2) {
      if (numValue >= 1 && numValue <= 12) {
        return value.padStart(2, '0');
      }
      return '';
    }

    return '';
  }

  /**
   * Validates inline minutes input.
   * @param value - The minutes value to validate
   * @returns The validated and formatted minutes value
   */
  private validateInlineMinutes(value: string): string {
    if (!value) return '';

    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return '';

    // Handle single digit (0-9) - pad with zero
    if (value.length === 1) {
      if (numValue >= 0 && numValue <= 9) {
        return value.padStart(2, '0');
      }
      return '';
    }

    // Handle two digits (00-59)
    if (value.length === 2) {
      if (numValue >= 0 && numValue <= 59) {
        return value.padStart(2, '0');
      }
      return '';
    }

    return '';
  }

  /**
   * Validates inline period input.
   * @param value - The period value to validate
   * @returns The validated period value (AM or PM)
   */
  private validateInlinePeriod(value: string): string {
    if (!value) return '';

    const upperValue = value.toUpperCase();

    // Handle single letter
    if (upperValue.length === 1) {
      if (upperValue === 'A') return 'AM';
      if (upperValue === 'P') return 'PM';
      return '';
    }

    // Handle two letters
    if (upperValue === 'AM' || upperValue === 'PM') {
      return upperValue;
    }

    return '';
  }

  /**
   * Closes the inline input overlay.
   */
  private closeInlineInput(): void {
    this.showInlineInput = false;
    this.inlineInputType = null;
    this.inlineInputValue = '';
    this.inlineInputPosition = { top: 0, left: 0, width: 0 };
    this.clickedItemValue = '';
    this.cdr.markForCheck();
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    const validSizes: TimePickerSize[] = ['sm', 'md', 'lg', 'xl'];
    if (!validSizes.includes(this.size)) {
      console.warn(`AavaTimePickerComponent: Invalid size '${this.size}'. Defaulting to 'md'.`);
      this.size = 'md';
    }
  }
}