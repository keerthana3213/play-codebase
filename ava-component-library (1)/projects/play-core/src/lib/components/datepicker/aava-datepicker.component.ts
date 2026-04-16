import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, forwardRef, ChangeDetectorRef, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaTextboxComponent } from '../textbox/aava-textbox.component';
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
}

// calendar sizes
export type calendarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SupportedDateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';

@Component({
  selector: 'aava-datepicker',
  imports: [CommonModule, AavaTextboxComponent, FormsModule, AavaIconComponent,],
  templateUrl: './aava-datepicker.component.html',
  styleUrl: './aava-datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NgxMaskPipe,

    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AavaCalendarComponent),
      multi: true
    }
  ]
})
export class AavaCalendarComponent implements OnInit, OnChanges, OnDestroy {
  // Static registry to track all open date pickers
  private static openDatePickers: AavaCalendarComponent[] = [];

  @Input() isRange = false;
  @Input() selectedDate: Date | null = null;
  @Input() dateRange: DateRange = { start: null, end: null };
  @Input() weekdayFormat: 1 | 2 | 3 = 3;
  @Input() alwaysOpen = false;
  @Input() hideInput = false;
  @Input() selectorShape: 'square' | 'circle' = 'square';
  @Input() surface = false;
  @Input() surfaceStrength: 'medium' | 'strong' | 'max' | undefined = 'medium';
  @Input() calendarSize: calendarSize = 'md';
  @Input() customStyles: Record<string, string> = {};
  @Input() disabled = false;
  @Input() label = '';
  @Input() required = false;
  maskDate = '';
  @Input() placeholder = ""
  @Input() error = '';
  @Input() minDate: string | Date | (() => string | Date) = '1/1/1970';
  @Input() maxDate: string | Date | (() => string | Date) | null = null;
  @Input() disabledDate: (string | Date)[] = [];
  @Input() dateFormat: SupportedDateFormat = 'DD/MM/YYYY';
  @Input() id = '';
  @Input() allowClose = false;
  @Input() verticalPosition: 'auto' | 'top' | 'bottom' = 'auto';
  @Input() horizontalPosition: 'left' | 'right' = 'left';
  @Input() invalidDateLabel = 'Enter a valid date';
  @Input() closeOthersOnOpen = true; // Close other open date pickers when this one opens (default: true for standard behavior)

  @Output() dateSelected = new EventEmitter<Date>();
  @Output() rangeSelected = new EventEmitter<DateRange>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('datePicker', { read: ElementRef }) datePickerElement?: ElementRef;
  @ViewChild('toggleButton', { read: ElementRef }) toggleButtonElement?: ElementRef<HTMLButtonElement>;

  // State
  isOpen = false;
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  hoverDate: Date | null = null;
  isSelectingRangeEnd = false;
  selectedNavigation: 'month' | 'year' = 'month';
  actualVerticalPosition: 'top' | 'bottom' = 'bottom';
  actualHorizontalPosition: 'left' | 'right' = 'left';
  focusedDayIndex: number | null = null;
  /**
   * Unique ID for this component instance.
   * Used to generate unique IDs for all interactive elements to ensure proper ARIA relationships
   * and prevent ID collisions when multiple datepicker instances are present on the same page.
   */
  readonly _uniqueId = `aava-datepicker-${Math.random().toString(36).slice(2, 11)}`;
  /**
   * Unique ID for the calendar popup dialog element.
   * Used by aria-controls to link the toggle button to the popup.
   */
  calendarPopupId = `${this._uniqueId}-popup`;
  /**
   * Unique ID for the month/year display label.
   * Used by aria-labelledby to link the calendar grid to its label.
   */
  monthYearLabelId = `${this._uniqueId}-month-year`;

  date = '';

  errorTimeout: ReturnType<typeof setTimeout> | null = null;
  private popupPositionTimeout: ReturnType<typeof setTimeout> | null = null;
  private focusReturnTimeout: ReturnType<typeof setTimeout> | null = null;
  private focusFirstDayTimeout: ReturnType<typeof setTimeout> | null = null;

  // Constants
  readonly monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  popupActive: 'day' | 'month' | 'year' = 'day';
  years: number[] = [];

  constructor(private maskPipe: NgxMaskPipe, private cdr: ChangeDetectorRef) { }

  private readonly weekDaysBase = [
    { full: 'Monday', three: 'Mon', two: 'Mo', one: 'M' },
    { full: 'Tuesday', three: 'Tue', two: 'Tu', one: 'T' },
    { full: 'Wednesday', three: 'Wed', two: 'We', one: 'W' },
    { full: 'Thursday', three: 'Thu', two: 'Th', one: 'T' },
    { full: 'Friday', three: 'Fri', two: 'Fr', one: 'F' },
    { full: 'Saturday', three: 'Sat', two: 'Sa', one: 'S' },
    { full: 'Sunday', three: 'Sun', two: 'Su', one: 'S' }
  ];

  private readonly today = new Date();

  // ControlValueAccessor properties
  value: Date | DateRange | null = null;
  private onChange: (value: Date | DateRange | null) => void = () => {
    // Empty default implementation - will be set by registerOnChange
  };
  private onTouched: () => void = () => {
    // Empty default implementation - will be set by registerOnTouched
  };

  // Computed properties
  // Computed properties
  private get internalErrorMsg(): string {
    return this.invalidDateLabel;
  }

  get weekDays(): string[] {
    const formatKey = this.weekdayFormat === 1 ? 'one' :
      this.weekdayFormat === 2 ? 'two' : 'three';
    return this.weekDaysBase.map(day => day[formatKey as keyof typeof day]);
  }

  get resolvedMinDate(): Date | null {
    const raw = typeof this.minDate === 'function' ? this.minDate() : this.minDate;
    if (!raw) return null;
    if (raw instanceof Date) return raw;
    return this.parseDateFromString(String(raw));
  }

  get resolvedMaxDate(): Date | null {
    if (this.maxDate === null) return null;
    const raw = typeof this.maxDate === 'function' ? this.maxDate() : this.maxDate;
    if (!raw) return null;
    if (raw instanceof Date) return raw;
    return this.parseDateFromString(String(raw));
  }

  get canNavigateLeft(): boolean {
    const minDate = this.resolvedMinDate;
    if (!minDate) return true;

    if (this.selectedNavigation === 'month') {
      const currentFirstDay = new Date(this.currentYear, this.currentMonth, 1);
      const minFirstDay = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      return currentFirstDay > minFirstDay;
    } else {
      return this.currentYear > minDate.getFullYear();
    }
  }

  get canNavigateRight(): boolean {
    const maxDate = this.resolvedMaxDate;
    if (!maxDate) return true;

    if (this.selectedNavigation === 'month') {
      const currentFirstDay = new Date(this.currentYear, this.currentMonth, 1);
      const maxFirstDay = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
      return currentFirstDay < maxFirstDay;
    } else {
      return this.currentYear < maxDate.getFullYear();
    }
  }



  get calendarDays(): CalendarDay[] {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Calculate start date (Monday of the week containing the 1st)
    const startDate = new Date(firstDay);
    const dayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0, Sunday = 6
    startDate.setDate(firstDay.getDate() - dayOfWeek);

    // Calculate how many weeks we need
    const weeksNeeded = Math.ceil((daysInMonth + dayOfWeek) / 7);
    const totalCells = weeksNeeded * 7;

    const days: CalendarDay[] = [];

    // Generate all days for the calendar grid
    for (let i = 0; i < totalCells; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === this.currentMonth && date.getFullYear() === this.currentYear;

      days.push({
        date,
        isCurrentMonth,
        isToday: this.isSameDay(date, this.today),
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date),
        isRangeStart: this.isDateRangeStart(date),
        isRangeEnd: this.isDateRangeEnd(date),
        isDisabled: this.isDateDisabled(date)
      });
    }

    return days;
  }



  get CalendarClasses() {
    return {
      [this.calendarSize]: true,
      'surface-glass': this.surface,
      'medium': this.surface && this.surfaceStrength === 'medium',
      'strong': this.surface && this.surfaceStrength === 'strong',
      'max': this.surface && this.surfaceStrength === 'max'
    };
  }

  public calendarIconHover = false;
  public navBtnLeftHover = false;
  public navBtnRightHover = false;
  public navIconColor = getComputedStyle(document.documentElement).getPropertyValue('--color-brand-primary') || '#e91e63';
  public navIconHoverColor = 'white';

  ngOnInit(): void {
    this.maskDate = this.maskFromDateFormat(this.dateFormat);
    if (this.isRange) {
      this.maskDate = `${this.maskDate} - ${this.maskDate}`;
    }
    this.updateInputValues();
    // Initialize structured input values if dates are provided
    if (this.isRange) {
      this.updateStructuredRangeInputFromDates(this.dateRange.start, this.dateRange.end);
    } else if (this.selectedDate) {
      this.updateStructuredInputFromDate(this.selectedDate);
    }

    // Set calendar to always open if alwaysOpen or hideInput is true
    // (hideInput needs auto-open because there's no input to click)
    if (this.alwaysOpen || this.hideInput) {
      this.isOpen = true;
      if (this.isOpen) {
        this.registerAsOpen();
      }
    }
    this.populateYears();
  }

  // Register this date picker as open
  private registerAsOpen(): void {
    if (!AavaCalendarComponent.openDatePickers.includes(this)) {
      AavaCalendarComponent.openDatePickers.push(this);
    }
  }

  // Unregister this date picker as open
  private unregisterAsOpen(): void {
    const index = AavaCalendarComponent.openDatePickers.indexOf(this);
    if (index > -1) {
      AavaCalendarComponent.openDatePickers.splice(index, 1);
    }
  }

  // Close all other open date pickers except this one
  private closeOtherDatePickers(): void {
    AavaCalendarComponent.openDatePickers.forEach((datePicker) => {
      if (datePicker !== this && datePicker.isOpen) {
        if (!datePicker.alwaysOpen || (datePicker.alwaysOpen && datePicker.allowClose)) {
          datePicker.close();
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Unregister this date picker from the registry
    this.unregisterAsOpen();

    // Clear error timeout
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
      this.errorTimeout = null;
    }

    // Clear popup position timeout
    if (this.popupPositionTimeout) {
      clearTimeout(this.popupPositionTimeout);
      this.popupPositionTimeout = null;
    }

    // Clear focus return timeout
    if (this.focusReturnTimeout !== null) {
      clearTimeout(this.focusReturnTimeout);
      this.focusReturnTimeout = null;
    }

    // Clear focus first day timeout
    if (this.focusFirstDayTimeout !== null) {
      clearTimeout(this.focusFirstDayTimeout);
      this.focusFirstDayTimeout = null;
    }
  }

  // ControlValueAccessor implementation
  writeValue(obj: Date | DateRange | null): void {
    if (this.isRange) {
      if (obj && typeof obj === 'object' && obj !== null && 'start' in obj && 'end' in obj) {
        const rangeObj = obj as DateRange;
        this.dateRange = rangeObj;
        this.value = rangeObj;
        this.updateStructuredRangeInputFromDates(rangeObj.start, rangeObj.end);
      } else {
        this.dateRange = { start: null, end: null };
        this.value = null;
        this.updateStructuredRangeInputFromDates(null, null);
      }
    } else {
      if (obj instanceof Date) {
        this.selectedDate = obj;
        this.value = obj;
        this.updateStructuredInputFromDate(obj);
      } else {
        this.selectedDate = null;
        this.value = null;
        this.updateStructuredInputFromDate(null);
      }
    }
    // Trigger change detection for OnPush strategy
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: Date | DateRange | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    // Trigger change detection for OnPush strategy
    this.cdr.markForCheck();
  }

  // Public methods
  toggle(): void {
    if (this.errorTimeout !== null) {
      clearTimeout(this.errorTimeout);
      this.errorTimeout = null;
    }
    const isInternal = this.error === this.invalidDateLabel;
    if (isInternal) {
      this.error = '';
    }

    const wasOpen = this.isOpen;
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      // If closeOthersOnOpen is enabled, close other open date pickers
      if (this.closeOthersOnOpen) {
        this.closeOtherDatePickers();
      }

      // Register this date picker as open
      this.registerAsOpen();
      // Reset view to day picker when opening
      this.popupActive = 'day';
      this.selectedNavigation = 'month';

      // Reset calendar view to selected date's month/year when opening
      if (this.isRange) {
        // For range mode, use the start date if available
        if (this.dateRange.start) {
          this.currentMonth = this.dateRange.start.getMonth();
          this.currentYear = this.dateRange.start.getFullYear();
        } else {
          // No date selected, reset to current month/year
          const today = new Date();
          this.currentMonth = today.getMonth();
          this.currentYear = today.getFullYear();
        }
      } else {
        // For single date mode, use the selected date if available
        if (this.selectedDate) {
          this.currentMonth = this.selectedDate.getMonth();
          this.currentYear = this.selectedDate.getFullYear();
        } else {
          // No date selected, reset to current month/year
          const today = new Date();
          this.currentMonth = today.getMonth();
          this.currentYear = today.getFullYear();
        }
      }
      // Calculate popup position when opening
      // Clear any existing timeout first
      if (this.popupPositionTimeout !== null) {
        clearTimeout(this.popupPositionTimeout);
        this.popupPositionTimeout = null;
      }
      this.popupPositionTimeout = setTimeout(() => {
        this.calculatePopupPosition();
        this.popupPositionTimeout = null;
      }, 0);
      // Focus first enabled day when opening for keyboard navigation
      // This ensures users can immediately navigate with arrow keys after opening
      // Clear any existing focus timeout first
      if (this.focusFirstDayTimeout !== null) {
        clearTimeout(this.focusFirstDayTimeout);
        this.focusFirstDayTimeout = null;
      }
      this.focusFirstDayTimeout = setTimeout(() => {
        const days = this.calendarDays;
        const firstEnabled = days.find(d => !d.isDisabled);
        if (firstEnabled) {
          this.focusedDayIndex = days.findIndex(d => d.date.toDateString() === firstEnabled.date.toDateString());
          this.cdr.markForCheck();
        }
        this.focusFirstDayTimeout = null;
      }, 0);
    } else {
      // Unregister this date picker when closing
      this.unregisterAsOpen();

      // Clear focus timeout when closing
      if (this.focusFirstDayTimeout !== null) {
        clearTimeout(this.focusFirstDayTimeout);
        this.focusFirstDayTimeout = null;
      }
      this.focusedDayIndex = null;
    }
  }

  onCalendarKeyDown(event: KeyboardEvent): void {
    // Handle Escape key to close popup
    if (event.key === 'Escape') {
      if (!this.alwaysOpen || (this.alwaysOpen && this.allowClose)) {
        event.preventDefault();
        this.close();
      }
    }
  }

  // Calculate popup position based on available space Only calculates if popupPosition is set to 'auto'

  private calculatePopupPosition(): void {
    if (this.verticalPosition !== 'auto') {
      this.actualVerticalPosition = this.verticalPosition;
    } else if (this.alwaysOpen) {
      // For alwaysOpen mode, always position at bottom (embedded)
      this.actualVerticalPosition = 'bottom';
    } else if (!this.datePickerElement) {
      this.actualVerticalPosition = 'bottom';
    } else {
      const element = this.datePickerElement.nativeElement as HTMLElement;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Estimate popup height based on calendar size
      const popupHeightEstimates: Record<calendarSize, number> = {
        'xs': 280,
        'sm': 290,
        'md': 332,
        'lg': 372,
        'xl': 412
      };
      const estimatedPopupHeight = popupHeightEstimates[this.calendarSize];

      // Calculate available space
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Decision logic: prefer bottom, but switch to top if insufficient space below
      if (spaceBelow < estimatedPopupHeight && spaceAbove > estimatedPopupHeight) {
        this.actualVerticalPosition = 'top';
      } else {
        this.actualVerticalPosition = 'bottom';
      }
    }
    this.actualHorizontalPosition = this.horizontalPosition;

    this.cdr.markForCheck();
  }

  close(): void {
    // Clear any existing focus return timeout
    if (this.focusReturnTimeout !== null) {
      clearTimeout(this.focusReturnTimeout);
      this.focusReturnTimeout = null;
    }

    if (!this.alwaysOpen || (this.alwaysOpen && this.allowClose)) {
      this.isOpen = false;
      // Unregister this date picker when closing
      this.unregisterAsOpen();
      this.closed.emit();
      this.focusedDayIndex = null;
      this.checkAndSetdate(this.date, false, true);
      // Return focus to toggle button for proper keyboard navigation flow
      // This ensures focus order is maintained and users know where they are
      this.focusReturnTimeout = setTimeout(() => {
        if (this.toggleButtonElement?.nativeElement) {
          this.toggleButtonElement.nativeElement.focus();
        }
        this.focusReturnTimeout = null;
      }, 0);
    }
  }

  navigate(direction: number): void {
    // Check if navigation is allowed
    if (direction < 0 && !this.canNavigateLeft) return;
    if (direction > 0 && !this.canNavigateRight) return;

    if (this.selectedNavigation === 'month') {
      this.navigateMonth(direction);
    } else if (this.selectedNavigation === 'year') {
      this.navigateYear(direction);
    }
  }

  selectNavigation(type: 'month' | 'year'): void {
    this.selectedNavigation = type;
    this.popupActive = type;
    if (type === 'year') {
      this.scrollToSelectedYear();
    }
  }

  private scrollToSelectedYear(): void {
    setTimeout(() => {
      const activeYearElement = document.querySelector('.year-wrapper .m-active');
      if (activeYearElement) {
        activeYearElement.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }, 0);
  }

  onMonthYearKeyDown(event: KeyboardEvent, type: 'month' | 'year'): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectNavigation(type);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.selectNavigation(type);
        this.navigate(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.selectNavigation(type);
        this.navigate(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (type === 'month') {
          this.selectNavigation('month');
          this.navigate(-1);
        } else {
          this.selectNavigation('year');
          this.navigate(-1);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (type === 'month') {
          this.selectNavigation('month');
          this.navigate(1);
        } else {
          this.selectNavigation('year');
          this.navigate(1);
        }
        break;
      case 'Tab':
        // Allow default tab behavior to move between month and year
        break;
      default:
        // Ignore other keys
        break;
    }
  }

  getNavLabel(direction: number): string {
    const action = direction > 0 ? 'Next' : 'Previous';
    if (this.selectedNavigation === 'month') {
      return `${action} month`;
    } else {
      return `${action} year`;
    }
  }

  selectDate(date: Date): void {
    // Prevent selection of disabled dates
    if (this.isDateDisabled(date)) return;

    if (this.isRange) {
      this.handleRangeSelection(date);
    } else {
      this.handleSingleSelection(date);
    }
  }

  onDayKeyDown(event: KeyboardEvent, day: CalendarDay, index: number): void {
    const days = this.calendarDays;
    const enabledDays = days.filter(d => !d.isDisabled);
    const currentEnabledIndex = enabledDays.findIndex(d => d.date.toDateString() === day.date.toDateString());

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectDate(day.date);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.focusNextDay(days, enabledDays, currentEnabledIndex);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.focusPreviousDay(days, enabledDays, currentEnabledIndex);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusDayBelow(days, index);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusDayAbove(days, index);
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstDayOfMonth(days, enabledDays);
        break;
      case 'End':
        event.preventDefault();
        this.focusLastDayOfMonth(days, enabledDays);
        break;
      case 'PageUp':
        event.preventDefault();
        this.navigate(-1);
        this.focusDayAfterNavigation(day.date);
        break;
      case 'PageDown':
        event.preventDefault();
        this.navigate(1);
        this.focusDayAfterNavigation(day.date);
        break;
      case 'Escape':
        event.preventDefault();
        if (!this.alwaysOpen || (this.alwaysOpen && this.allowClose)) {
          this.close();
        }
        break;
      default:
        // Allow other keys to propagate
        break;
    }
  }

  private focusNextDay(days: CalendarDay[], enabledDays: CalendarDay[], currentEnabledIndex: number): void {
    if (currentEnabledIndex < enabledDays.length - 1) {
      const nextDay = enabledDays[currentEnabledIndex + 1];
      this.focusedDayIndex = days.findIndex(d => d.date.toDateString() === nextDay.date.toDateString());
      this.cdr.markForCheck();
    }
  }

  private focusPreviousDay(days: CalendarDay[], enabledDays: CalendarDay[], currentEnabledIndex: number): void {
    if (currentEnabledIndex > 0) {
      const prevDay = enabledDays[currentEnabledIndex - 1];
      this.focusedDayIndex = days.findIndex(d => d.date.toDateString() === prevDay.date.toDateString());
      this.cdr.markForCheck();
    }
  }

  private focusDayBelow(days: CalendarDay[], currentIndex: number): void {
    const targetIndex = currentIndex + 7;
    if (targetIndex < days.length) {
      const targetDay = days[targetIndex];
      if (!targetDay.isDisabled) {
        this.focusedDayIndex = targetIndex;
        this.cdr.markForCheck();
      } else {
        // Find next enabled day in same column
        let nextIndex = targetIndex;
        while (nextIndex < days.length && days[nextIndex].isDisabled) {
          nextIndex += 7;
        }
        if (nextIndex < days.length) {
          this.focusedDayIndex = nextIndex;
          this.cdr.markForCheck();
        }
      }
    }
  }

  private focusDayAbove(days: CalendarDay[], currentIndex: number): void {
    const targetIndex = currentIndex - 7;
    if (targetIndex >= 0) {
      const targetDay = days[targetIndex];
      if (!targetDay.isDisabled) {
        this.focusedDayIndex = targetIndex;
        this.cdr.markForCheck();
      } else {
        // Find previous enabled day in same column
        let prevIndex = targetIndex;
        while (prevIndex >= 0 && days[prevIndex].isDisabled) {
          prevIndex -= 7;
        }
        if (prevIndex >= 0) {
          this.focusedDayIndex = prevIndex;
          this.cdr.markForCheck();
        }
      }
    }
  }

  private focusFirstDayOfMonth(days: CalendarDay[], enabledDays: CalendarDay[]): void {
    const firstEnabledDay = enabledDays.find(d => d.isCurrentMonth);
    if (firstEnabledDay) {
      this.focusedDayIndex = days.findIndex(d => d.date.toDateString() === firstEnabledDay.date.toDateString());
      this.cdr.markForCheck();
    }
  }

  private focusLastDayOfMonth(days: CalendarDay[], enabledDays: CalendarDay[]): void {
    const lastEnabledDay = [...enabledDays].reverse().find(d => d.isCurrentMonth);
    if (lastEnabledDay) {
      this.focusedDayIndex = days.findIndex(d => d.date.toDateString() === lastEnabledDay.date.toDateString());
      this.cdr.markForCheck();
    }
  }

  private focusDayAfterNavigation(originalDate: Date): void {
    // Try to focus the same day in the new month, or closest enabled day
    const days = this.calendarDays;
    const dayOfMonth = originalDate.getDate();
    const targetDay = days.find(d => d.isCurrentMonth && d.date.getDate() === dayOfMonth && !d.isDisabled);
    if (targetDay) {
      this.focusedDayIndex = days.findIndex(d => d.date.toDateString() === targetDay.date.toDateString());
    } else {
      // Find first enabled day in current month
      const firstEnabled = days.find(d => d.isCurrentMonth && !d.isDisabled);
      if (firstEnabled) {
        this.focusedDayIndex = days.findIndex(d => d.date.toDateString() === firstEnabled.date.toDateString());
      }
    }
    this.cdr.markForCheck();
  }

  onDayHover(date: Date): void {
    if (this.isRange && this.dateRange.start && !this.dateRange.end) {
      this.hoverDate = date;
    }
  }

  onDayLeave(): void {
    this.hoverDate = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isOpen && !this.isClickInside(event)) {
      this.close();
    }
  }

  // Template methods
  trackByDate(_index: number, day: CalendarDay): string {
    return day.date.toDateString();
  }

  getDayClasses(day: CalendarDay): string {
    const classes = [];
    if (!day.isCurrentMonth) classes.push('other-month');
    if (day.isToday) classes.push('today');
    if (day.isSelected) classes.push('selected');
    if (day.isInRange) classes.push('in-range');
    if (day.isRangeStart) classes.push('range-start');
    if (day.isRangeEnd) classes.push('range-end');
    if (day.isDisabled) classes.push('disabled');
    return classes.join(' ');
  }

  getDayAriaLabel(day: CalendarDay): string {
    const date = day.date;
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const parts: string[] = [dateStr];

    if (day.isToday) {
      parts.push('Today');
    }
    if (day.isSelected) {
      parts.push('Selected');
    }
    if (day.isDisabled) {
      parts.push('Not available');
    }
    if (!day.isCurrentMonth) {
      parts.push('Other month');
    }
    if (day.isRangeStart) {
      parts.push('Range start');
    }
    if (day.isRangeEnd) {
      parts.push('Range end');
    }
    if (day.isInRange) {
      parts.push('In range');
    }

    return parts.join(', ');
  }

  // Private methods
  private navigateMonth(direction: number): void {
    const newDate = new Date(this.currentYear, this.currentMonth + direction, 1);
    this.currentMonth = newDate.getMonth();
    this.currentYear = newDate.getFullYear();
    this.cdr.markForCheck();
  }

  private navigateYear(direction: number): void {
    this.currentYear += direction;
    // Ensure year stays within extreme safety bounds if no min/max is provided
    // Normal bounds are already enforced by canNavigateLeft/Right
    if (this.currentYear < 0) this.currentYear = 0;
    if (this.currentYear > 9999) this.currentYear = 9999;

    if (this.popupActive === 'year') {
      this.scrollToSelectedYear();
    }
    this.cdr.markForCheck();
  }

  private handleSingleSelection(date: Date): void {
    // Clear only internal validation errors (invalid date format)
    // Preserve external errors from form control validation
    // External errors will be re-applied by the parent form control
    const wasInternalError = this.error && this.error === this.invalidDateLabel;
    if (wasInternalError) {
      this.error = '';
    }

    this.selectedDate = date;
    this.value = date;
    this.updateStructuredInputFromDate(date);
    this.dateSelected.emit(date);
    this.onChange(date);
    this.onTouched();

    // Trigger change detection to ensure error state updates
    this.cdr.markForCheck();

    if (!this.alwaysOpen || (this.alwaysOpen && this.allowClose)) {
      this.isOpen = false;
    }
  }

  private handleRangeSelection(date: Date): void {
    if (!this.dateRange.start || this.dateRange.end) {
      this.startNewRange(date);
    } else {
      this.completeRange(date);
    }
  }

  private startNewRange(date: Date): void {
    this.dateRange = { start: date, end: null };
    this.updateStructuredRangeInputFromDates(date, null);
    this.isSelectingRangeEnd = true;
  }

  private completeRange(date: Date): void {
    // Clear only internal validation errors (invalid date format)
    const wasInternalError = this.error && this.error === this.invalidDateLabel;
    if (wasInternalError) {
      this.error = '';
    }

    const start = this.dateRange.start!;
    if (date < start) {
      this.dateRange = { start: date, end: start };
    } else {
      this.dateRange.end = date;
    }
    this.value = this.dateRange;
    this.updateStructuredRangeInputFromDates(this.dateRange.start, this.dateRange.end);
    this.rangeSelected.emit(this.dateRange);
    this.onChange(this.dateRange);
    this.onTouched();
    this.isSelectingRangeEnd = false;

    // Trigger change detection to ensure error state updates
    this.cdr.markForCheck();

    if (!this.alwaysOpen || (this.alwaysOpen && this.allowClose)) {
      this.isOpen = false;
    }
  }

  private updateStructuredInputFromDate(date: Date | null): void {
    if (date) {
      const dayValue = date.getDate().toString().padStart(2, '0');
      const monthValue = (date.getMonth() + 1).toString().padStart(2, '0');
      const yearValue = date.getFullYear().toString();

      // Format the date string according to the dateFormat
      let dateString = '';
      switch (this.dateFormat) {
        case 'DD/MM/YYYY':
          dateString = `${dayValue}${monthValue}${yearValue}`;
          break;
        case 'MM/DD/YYYY':
          dateString = `${monthValue}${dayValue}${yearValue}`;
          break;
        case 'YYYY/MM/DD':
          dateString = `${yearValue}${monthValue}${dayValue}`;
          break;
        default:
          dateString = `${dayValue}${monthValue}${yearValue}`;
      }

      this.date = this.maskPipe.transform(dateString, this.maskDate);
    } else {
      this.date = '';
    }
  }

  private updateStructuredRangeInputFromDates(startDate: Date | null, endDate: Date | null): void {
    if (startDate && endDate) {
      const startDayValue = startDate.getDate().toString().padStart(2, '0');
      const startMonthValue = (startDate.getMonth() + 1).toString().padStart(2, '0');
      const startYearValue = startDate.getFullYear().toString();

      const endDayValue = endDate.getDate().toString().padStart(2, '0');
      const endMonthValue = (endDate.getMonth() + 1).toString().padStart(2, '0');
      const endYearValue = endDate.getFullYear().toString();

      // Format start and end dates according to the dateFormat
      let startDateString = '';
      let endDateString = '';

      switch (this.dateFormat) {
        case 'DD/MM/YYYY':
          startDateString = `${startDayValue}${startMonthValue}${startYearValue}`;
          endDateString = `${endDayValue}${endMonthValue}${endYearValue}`;
          break;
        case 'MM/DD/YYYY':
          startDateString = `${startMonthValue}${startDayValue}${startYearValue}`;
          endDateString = `${endMonthValue}${endDayValue}${endYearValue}`;
          break;
        case 'YYYY/MM/DD':
          startDateString = `${startYearValue}${startMonthValue}${startDayValue}`;
          endDateString = `${endYearValue}${endMonthValue}${endDayValue}`;
          break;
        default:
          startDateString = `${startDayValue}${startMonthValue}${startYearValue}`;
          endDateString = `${endDayValue}${endMonthValue}${endYearValue}`;
      }

      this.date = `${this.maskPipe.transform(startDateString, this.maskDate)} - ${this.maskPipe.transform(endDateString, this.maskDate)}`;
    } else {
      this.date = '';
    }
  }

  private updateInputValues(): void {
    if (this.isRange) {
      this.updateStructuredRangeInputFromDates(this.dateRange.start, this.dateRange.end);
    } else {
      this.updateStructuredInputFromDate(this.selectedDate);
    }
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  private isDateSelected(date: Date): boolean {
    return !this.isRange && this.selectedDate ?
      this.isSameDay(date, this.selectedDate) : false;
  }

  private isDateInRange(date: Date): boolean {
    if (!this.isRange || !this.dateRange.start) return false;

    const end = this.dateRange.end || this.hoverDate;
    if (!end) return false;

    const [rangeStart, rangeEnd] = this.dateRange.start < end ?
      [this.dateRange.start, end] :
      [end, this.dateRange.start];

    return date > rangeStart && date < rangeEnd;
  }

  private isDateRangeStart(date: Date): boolean {
    return this.isRange && this.dateRange.start ?
      this.isSameDay(date, this.dateRange.start) : false;
  }

  private isDateRangeEnd(date: Date): boolean {
    return this.isRange && this.dateRange.end ?
      this.isSameDay(date, this.dateRange.end) : false;
  }

  private isDateDisabled(date: Date): boolean {
    const minDate = this.resolvedMinDate;
    const maxDate = this.resolvedMaxDate;

    // Check if date is before min date
    if (minDate && date < minDate) return true;

    // Check if date is after max date
    if (maxDate && date > maxDate) return true;

    // Check if date is in disabled dates array (parse strings using current dateFormat)
    if (this.disabledDate.some(disabledVal => {
      const parsed = disabledVal instanceof Date ? disabledVal : this.parseDateFromString(disabledVal);
      return parsed ? this.isSameDay(date, parsed) : false;
    })) return true;

    return false;
  }

  private isClickInside(event: Event): boolean {
    const target = event.target as Element;
    return target.closest('.date-picker') !== null;
  }

  dateBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    // Mark as touched when user leaves the input
    this.onTouched();

    // Validate and set date
    this.checkAndSetdate(value, true);
  }

  checkAndSetdate(value: string, timeout = false, fromClose = false) {
    if (value) {
      const isValid = this.isRange ? this.validateRangeDate(value) : this.validateMaskedDate(value, this.dateFormat);
      if (!isValid) {
        // Only set internal validation error if there isn't already an external error
        const internalError = this.internalErrorMsg;
        if (timeout) {
          this.errorTimeout = setTimeout(() => {
            // Only override if current error is internal or empty
            if (!this.error || this.error === internalError || this.error === this.invalidDateLabel) {
              this.error = internalError;
            }
            this.cdr.markForCheck();
          }, 100);
        } else {
          // Only override if current error is internal or empty
          if (!this.error || this.error === internalError || this.error === this.invalidDateLabel) {
            this.error = internalError;
          }
          this.cdr.markForCheck();
        }
        this.date = value;
      } else {
        // Valid date - clear only internal validation errors
        const wasInternalError = this.error && this.error === this.invalidDateLabel;
        if (wasInternalError) {
          this.error = '';
        }

        if (!fromClose) {
          this.date = this.maskPipe.transform(value, this.maskDate);
          this.updateCalendarFromInput(value);
          // Mark as touched when valid date is entered
          this.onTouched();
        }
        this.cdr.markForCheck();
      }
    } else {
      // Empty value - clear the selected date/range and notify parent
      if (this.isRange) {
        this.dateRange = { start: null, end: null };
        this.value = null;
        this.onChange(null);
      } else {
        this.selectedDate = null;
        this.value = null;
        this.onChange(null);
      }
      this.date = '';
      // Mark as touched when field is cleared
      this.onTouched();
      this.cdr.markForCheck();
    }
  }


  validateMaskedDate(dateStr: string, dateFormat: string): boolean {
    if (!dateStr || !dateFormat) return false;
    const normalized = dateStr.replace(/-/g, '/').trim();
    const formatNormalized = dateFormat.replace(/-/g, '/').trim();
    const regexParts = formatNormalized.split('/');
    let regexPattern = '^';
    const dateParts: string[] = [];

    for (const part of regexParts) {
      if (/^d+$/i.test(part)) {
        regexPattern += '(\\d{1,2})';
        dateParts.push('day');
      } else if (/^m+$/i.test(part)) {
        regexPattern += '(\\d{1,2})';
        dateParts.push('month');
      } else if (/^y+$/i.test(part)) {
        regexPattern += '(\\d{4})';
        dateParts.push('year');
      } else {
        return false;
      }
      regexPattern += '/';
    }

    regexPattern = regexPattern.replace(/\/$/, '') + '$';
    const pattern = new RegExp(regexPattern);
    const match = normalized.match(pattern);

    if (!match) return false;

    // Extract values based on order in format
    let day = 0, month = 0, year = 0;
    dateParts.forEach((type, i) => {
      const val = +match[i + 1];
      if (type === 'day') day = val;
      else if (type === 'month') month = val;
      else if (type === 'year') year = val;
    });

    // Validate ranges
    if (month < 1 || month > 12 || day < 1 || year < 1) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    return day <= daysInMonth;
  }

  validateRangeDate(rangeStr: string): boolean {
    if (!rangeStr) return false;

    // Split the range string by " - "
    const parts = rangeStr.split(' - ');

    if (parts.length !== 2) return false;

    const [startDateStr, endDateStr] = parts;

    // Validate both dates
    const isStartValid = this.validateMaskedDate(startDateStr.trim(), this.dateFormat);
    const isEndValid = this.validateMaskedDate(endDateStr.trim(), this.dateFormat);

    if (!isStartValid || !isEndValid) return false;

    // Parse dates to ensure start is before or equal to end
    const startDate = this.parseDateFromString(startDateStr.trim());
    const endDate = this.parseDateFromString(endDateStr.trim());

    if (!startDate || !endDate) return false;

    return startDate <= endDate;
  }

  updateCalendarFromInput(value: string): void {
    if (this.isRange) {
      const parts = value.split(' - ');
      if (parts.length === 2) {
        const startDate = this.parseDateFromString(parts[0].trim());
        const endDate = this.parseDateFromString(parts[1].trim());

        if (startDate && endDate) {
          this.dateRange = { start: startDate, end: endDate };
          this.value = this.dateRange;

          // Update calendar view to show the start date's month/year
          this.currentMonth = startDate.getMonth();
          this.currentYear = startDate.getFullYear();

          this.rangeSelected.emit(this.dateRange);
          this.onChange(this.dateRange);
          this.onTouched();
        }
      }
    } else {
      const date = this.parseDateFromString(value);
      if (date) {
        this.selectedDate = date;
        this.value = date;

        // Update calendar view to show the date's month/year
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();

        this.dateSelected.emit(date);
        this.onChange(date);
        this.onTouched();
      }
    }
    this.cdr.markForCheck();
  }

  parseDateFromString(dateStr: string): Date | null {
    if (!dateStr || !this.validateMaskedDate(dateStr, this.dateFormat)) return null;

    const normalized = dateStr.replace(/-/g, '/').trim();
    const formatNormalized = this.dateFormat.replace(/-/g, '/').trim();
    const regexParts = formatNormalized.split('/');
    let regexPattern = '^';
    const dateParts: string[] = [];

    for (const part of regexParts) {
      if (/^d+$/i.test(part)) {
        regexPattern += '(\\d{1,2})';
        dateParts.push('day');
      } else if (/^m+$/i.test(part)) {
        regexPattern += '(\\d{1,2})';
        dateParts.push('month');
      } else if (/^y+$/i.test(part)) {
        regexPattern += '(\\d{4})';
        dateParts.push('year');
      }
      regexPattern += '/';
    }

    regexPattern = regexPattern.replace(/\/$/, '') + '$';
    const pattern = new RegExp(regexPattern);
    const match = normalized.match(pattern);

    if (!match) return null;

    // Extract values based on order in format
    let day = 0, month = 0, year = 0;
    dateParts.forEach((type, i) => {
      const val = +match[i + 1];
      if (type === 'day') day = val;
      else if (type === 'month') month = val;
      else if (type === 'year') year = val;
    });

    return new Date(year, month - 1, day);
  }

  maskFromDateFormat(dateFormat: string): string {
    return dateFormat
      .replace(/[dD]+/g, (match) => '0'.repeat(match.length)) // day → 00
      .replace(/[mM]+/g, (match) => '0'.repeat(match.length)) // month → 00
      .replace(/[yY]+/g, (match) => '0'.repeat(match.length)); // year → 0000
  }

  get dynamicPlaceholder(): string {
    if (this.placeholder) return this.placeholder;

    if (this.isRange) {
      return `${this.dateFormat} - ${this.dateFormat}`;
    }
    return this.dateFormat;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Handle changes to error input from parent form control
    // This ensures external validation errors are preserved
    if (changes['error']) {
      // External error from form control - preserve it
      // Only clear if it was an internal error that's being overridden
      this.cdr.markForCheck();
    }

    // Handle changes to selectedDate input
    if (changes['selectedDate']) {
      if (this.isRange) {
        // For range mode, handle dateRange changes
        if (changes['dateRange']) {
          this.updateStructuredRangeInputFromDates(this.dateRange.start, this.dateRange.end);
        }
      } else {
        // For single date mode, update the input field
        this.updateStructuredInputFromDate(this.selectedDate);
      }
      this.cdr.markForCheck();
    }

    // Handle changes to dateRange input
    if (changes['dateRange'] && this.isRange) {
      this.updateStructuredRangeInputFromDates(this.dateRange.start, this.dateRange.end);
      this.cdr.markForCheck();
    }

    // Handle changes to dateFormat - update mask and placeholder
    if (changes['dateFormat']) {
      this.maskDate = this.maskFromDateFormat(this.dateFormat);
      if (this.isRange) {
        this.maskDate = `${this.maskDate} - ${this.maskDate}`;
      }
      // Re-format current values with new format
      if (this.isRange) {
        this.updateStructuredRangeInputFromDates(this.dateRange.start, this.dateRange.end);
      } else {
        this.updateStructuredInputFromDate(this.selectedDate);
      }
      this.cdr.markForCheck();
    }

    // Handle changes to minDate or maxDate - repopulate years array
    if (changes['minDate'] || changes['maxDate']) {
      this.populateYears();
    }
  }


  selectMonth(month: string): void {
    const monthIndex = this.monthNames.indexOf(month);
    if (monthIndex === -1) {
      console.warn(`Invalid month: ${month}`);
      return;
    }
    this.currentMonth = monthIndex;
    this.popupActive = 'day';
    this.cdr.markForCheck();
  }


  selectYear(year: number) {
    this.currentYear = year;
    this.popupActive = 'day';
    this.cdr.markForCheck();
  }

  /**
   * Keyboard handler for month/year listbox selection.
   * Provides keyboard navigation support for selecting months and years.
   * @param event - Keyboard event
   * @param type - 'month' or 'year'
   * @param value - The month name or year number as string
   */
  onMonthYearSelectKeyDown(event: KeyboardEvent, type: 'month' | 'year', value: string): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (type === 'month') {
          this.selectMonth(value);
        } else {
          this.selectYear(Number(value));
        }
        break;
      case 'Escape':
        event.preventDefault();
        // Return to day view when Escape is pressed in month/year selection
        this.popupActive = 'day';
        this.cdr.markForCheck();
        break;
      default:
        // Allow other keys to propagate
        break;
    }
  }

  getYear(value: string | Date | (() => string | Date) | null): number | null {
    let dateValue = value;

    if (typeof dateValue === 'function') {
      dateValue = dateValue();
    }

    if (typeof dateValue === 'string') {
      const parsed = this.parseDateFromString(dateValue);
      if (parsed) {
        return parsed.getFullYear();
      }

      const nativeDate = new Date(dateValue);
      return isNaN(nativeDate.getTime()) ? null : nativeDate.getFullYear();
    }

    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      return dateValue.getFullYear();
    }

    return null;
  }

  /**
   * Populates the years array based on minDate and maxDate constraints.
   * Should be called when minDate or maxDate changes, or on component initialization.
   */
  populateYears(): void {
    this.years = []; // Clear existing years first

    const todayYear = new Date().getFullYear();

    let startYear = this.getYear(this.minDate) ?? (todayYear - 100);
    let endYear = this.getYear(this.maxDate) ?? (todayYear + 100);

    const rangeStart = Math.min(startYear, endYear);
    const rangeEnd = Math.max(startYear, endYear);

    for (let y = rangeStart; y <= rangeEnd; y++) {
      this.years.push(y);
    }

    this.cdr.markForCheck();
  }
}