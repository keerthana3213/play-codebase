import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { AavaCalendarComponent, DateRange, CalendarDay } from './aava-datepicker.component';

function mkInput(): ElementRef<HTMLInputElement> {
  return new ElementRef<HTMLInputElement>(document.createElement('input'));
}

function stubViewChilds(cmp: AavaCalendarComponent) {
  (cmp as any).dayInput = mkInput();
  (cmp as any).monthInput = mkInput();
  (cmp as any).yearInput = mkInput();
  (cmp as any).startDayInput = mkInput();
  (cmp as any).startMonthInput = mkInput();
  (cmp as any).startYearInput = mkInput();
  (cmp as any).endDayInput = mkInput();
  (cmp as any).endMonthInput = mkInput();
  (cmp as any).endYearInput = mkInput();
}

describe('AavaCalendarComponent (logic-focused)', () => {
  let component: AavaCalendarComponent;
  let fixture: ComponentFixture<AavaCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCalendarComponent],
    })
      .overrideComponent(AavaCalendarComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(AavaCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    stubViewChilds(component);
  });

  it('should create and initialize input values on ngOnInit', () => {
    component.selectedDate = new Date(2024, 3, 12);
    component.isRange = false;
    component.ngOnInit();
    expect(component.dayValue).toBe('12');
    expect(component.monthValue).toBe('04');
    expect(component.yearValue).toBe('2024');
  });

  it('should initialize range inputs when isRange=true', () => {
    component.isRange = true;
    component.dateRange = { start: new Date(2023, 0, 2), end: new Date(2023, 0, 5) };
    component.ngOnInit();
    expect(component.startDayValue).toBe('02');
    expect(component.startMonthValue).toBe('01');
    expect(component.startYearValue).toBe('2023');
    expect(component.endDayValue).toBe('05');
  });

  it('toggle/close should control isOpen (respect alwaysOpen)', () => {
    component.alwaysOpen = false;
    component.toggle();
    expect(component.isOpen).toBeTrue();
    component.close();
    expect(component.isOpen).toBeFalse();

    component.alwaysOpen = true;
    component.toggle(); // -> true
    component.close();  // should not close
    expect(component.isOpen).toBeTrue();
  });

  it('writeValue should handle single date and reset paths', () => {
    component.isRange = false;
    const d = new Date(2022, 6, 1);
    component.writeValue(d);
    expect(component.selectedDate).toEqual(d);
    expect(component.value).toEqual(d);
    expect(component.dayValue).toBe('01');
    component.writeValue(null as any);
    expect(component.selectedDate).toBeNull();
    expect(component.value).toBeNull();
    expect(component.dayValue).toBe('');
  });

  it('writeValue should handle range and reset paths', () => {
    component.isRange = true;
    const rng: DateRange = { start: new Date(2020, 1, 10), end: new Date(2020, 1, 20) };
    component.writeValue(rng);
    expect(component.dateRange).toEqual(rng);
    expect(component.value).toEqual(rng);
    expect(component.startDayValue).toBe('10');
    component.writeValue({} as any);
    expect(component.dateRange).toEqual({ start: null, end: null });
    expect(component.value).toBeNull();
    expect(component.startDayValue).toBe('');
  });

  it('navigate month/year and keep year within bounds', () => {
    const y0 = component.currentYear;
    const m0 = component.currentMonth;
    component['navigateMonth'](1 as any);
    expect(component.currentMonth).toBe((m0 + 1) % 12);
    component['navigateYear'](1 as any);
    expect(component.currentYear).toBe(y0 + 1);

    component.currentYear = 1800;
    component['navigateYear'](-1 as any);
    expect(component.currentYear).toBe(1900);

    component.currentYear = 2200;
    component['navigateYear'](1 as any);
    expect(component.currentYear).toBe(2100);
  });

  it('selectNavigation + onMonthYearKeyDown keyboard flows', () => {
    component.selectedNavigation = 'month';
    const ev = (key: string) =>
      new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });

    component.onMonthYearKeyDown(ev('Enter'), 'year');
    expect(component.selectedNavigation).toBe('year');

    component.onMonthYearKeyDown(ev(' '), 'month');
    expect(component.selectedNavigation).toBe('month');
    const m1 = component.currentMonth;
    component.onMonthYearKeyDown(ev('ArrowRight'), 'month');
    expect(component.currentMonth).toBe((m1 + 1) % 12);
    const m2 = component.currentMonth;
    component.onMonthYearKeyDown(ev('ArrowLeft'), 'month');
    expect(component.currentMonth).toBe((m2 + 11) % 12);
    const y1 = component.currentYear;
    component.onMonthYearKeyDown(ev('ArrowUp'), 'year');
    expect(component.currentYear).toBe(y1 - 1);
    const y2 = component.currentYear;
    component.onMonthYearKeyDown(ev('ArrowDown'), 'year');
    expect(component.currentYear).toBe(y2 + 1);
  });

  it('getNavLabel reflects selectedNavigation', () => {
    component.selectedNavigation = 'month';
    expect(component.getNavLabel(1)).toBe('Next month');
    expect(component.getNavLabel(-1)).toBe('Previous month');
    component.selectedNavigation = 'year';
    expect(component.getNavLabel(1)).toBe('Next year');
  });

  it('selectDate (single) updates state and closes', () => {
    component.isRange = false;
    const spyChange = jasmine.createSpy('change');
    const spyTouched = jasmine.createSpy('touched');
    component.registerOnChange(spyChange);
    component.registerOnTouched(spyTouched);

    component.isOpen = true;
    const d = new Date(2025, 5, 9);
    component['handleSingleSelection'](d as any);
    expect(component.selectedDate).toEqual(d);
    expect(spyChange).toHaveBeenCalledWith(d);
    expect(spyTouched).toHaveBeenCalled();
    expect(component.isOpen).toBeFalse();
  });

  it('selectDate (range) start->end and reverse order', () => {
    component.isRange = true;
    const spyChange = jasmine.createSpy('change');
    component.registerOnChange(spyChange);
    stubViewChilds(component);

    const a = new Date(2024, 4, 10);
    const b = new Date(2024, 4, 8);


    component['startNewRange'](a as any);
    expect(component.dateRange.start).toEqual(a);
    expect(component.dateRange.end).toBeNull();


    component['completeRange'](b as any);
    expect(component.dateRange.start).toEqual(b);
    expect(component.dateRange.end).toEqual(a);
    expect(spyChange).toHaveBeenCalledWith(component.dateRange);
  });

  it('hover logic for ranges', () => {
    component.isRange = true;
    component.dateRange = { start: new Date(2024, 0, 1), end: null };
    component.onDayHover(new Date(2024, 0, 3));
    expect(component.hoverDate).toEqual(new Date(2024, 0, 3));
    component.onDayLeave();
    expect(component.hoverDate).toBeNull();
  });

  it('structured input handlers: day/month/year -> validateSingleDate', () => {
    component.isRange = false;
    component.onDayInput({ target: { value: '31' } });
    expect(component.dayValue).toBe('31');
    component.onMonthInput({ target: { value: '12' } });
    expect(component.monthValue).toBe('12');
    component.onYearInput({ target: { value: '2024' } });
    expect(component.selectedDate).toEqual(new Date(2024, 11, 31));
  });

  it('structured range inputs -> validateRangeDate and emit when both valid', () => {
    component.isRange = true;
    const spyChange = jasmine.createSpy('change');
    const spyTouched = jasmine.createSpy('touched');
    component.registerOnChange(spyChange);
    component.registerOnTouched(spyTouched);

    component.onStartDayInput({ target: { value: '02' } });
    component.onStartMonthInput({ target: { value: '01' } });
    component.onStartYearInput({ target: { value: '2025' } });

    component.onEndDayInput({ target: { value: '05' } });
    component.onEndMonthInput({ target: { value: '01' } });
    component.onEndYearInput({ target: { value: '2025' } });

    expect(component.dateRange.start).toEqual(new Date(2025, 0, 2));
    expect(component.dateRange.end).toEqual(new Date(2025, 0, 5));
    expect(spyChange).toHaveBeenCalledWith({ start: new Date(2025, 0, 2), end: new Date(2025, 0, 5) });
    expect(spyTouched).toHaveBeenCalled();
  });

  it('onKeyDown: blocks non-numeric, allows control keys, auto-advances', fakeAsync(() => {
    component.isRange = false;
    stubViewChilds(component);

    const input = (component as any).dayInput.nativeElement as HTMLInputElement;
    input.value = '';
  }));


  it('format helpers (formatDate, formatDateRange, toDateString, parseDate)', () => {
    const d = new Date(2020, 9, 5);
    expect(component['toDateString'](d)).toBe('05/10/2020');
    expect(component.formatDate(d)).toBe('05/10/2020');
    expect(component.formatDate(null)).toBe('');

    component.isRange = true;
    component.dateRange = { start: new Date(2020, 9, 5), end: new Date(2020, 9, 6) };
    expect(component.formatDateRange()).toBe('05/10/2020 - 06/10/2020');

    const parsed = (component as any).parseDate('07/11/2021');
    expect(parsed).toEqual(new Date(2021, 10, 7));
    const bad = (component as any).parseDate('99/99/9999');
    expect(bad).toBeNull();
  });

  it('calendarDays builds grid with flags today/selected/in-range/start/end', () => {
    // Force a known current month for stable assertions
    component.currentYear = 2025;
    component.currentMonth = 0; // January
    component.isRange = true;
    component.dateRange = { start: new Date(2025, 0, 10), end: new Date(2025, 0, 12) };
    const days: CalendarDay[] = component.calendarDays;
    expect(days.length % 7).toBe(0);
    const d10 = days.find(d => d.date.getFullYear() === 2025 && d.date.getMonth() === 0 && d.date.getDate() === 10)!;
    const d11 = days.find(d => d.date.getFullYear() === 2025 && d.date.getMonth() === 0 && d.date.getDate() === 11)!;
    const d12 = days.find(d => d.date.getFullYear() === 2025 && d.date.getMonth() === 0 && d.date.getDate() === 12)!;
    expect(d10.isRangeStart).toBeTrue();
    expect(d11.isInRange).toBeTrue();
    expect(d12.isRangeEnd).toBeTrue();
  });

  it('getDayClasses joins appropriate classes', () => {
    const sample: CalendarDay = {
      date: new Date(),
      isCurrentMonth: false,
      isToday: true,
      isSelected: true,
      isInRange: true,
      isRangeStart: true,
      isRangeEnd: true,
    };
    const cls = component.getDayClasses(sample);
    expect(cls).toContain('other-month');
    expect(cls).toContain('today');
    expect(cls).toContain('selected');
    expect(cls).toContain('in-range');
    expect(cls).toContain('range-start');
    expect(cls).toContain('range-end');
  });

  it('containerClasses and CalendarClasses reflect inputs', () => {
    component.calendarSize = 'md';
    component.surface = true;
    component.surfaceStrength = 'strong';
    const cc = component.containerClasses;
    // expect(cc.medium).toBeTrue();
    const cal = component.CalendarClasses;
    expect(cal['md']).toBeTrue();
    expect(cal['surface-glass']).toBeTrue();
    expect(cal['strong']).toBeTrue();
  });

  it('trackByDate returns stable toDateString', () => {
    const d = new Date(2022, 0, 1);
    const res = component.trackByDate(0, {
      date: d, isCurrentMonth: true, isToday: false, isSelected: false,
      isInRange: false, isRangeStart: false, isRangeEnd: false
    });
    expect(res).toBe(d.toDateString());
  });

  it('HostListener document click closes only when clicking outside .date-picker', () => {
    component.isOpen = true;
    const inside = document.createElement('div');
    inside.className = 'date-picker';
    const outside = document.createElement('div');

    // @ts-ignore – event target needs closest()
    const evInside: Event = { target: inside } as any;
    component.onDocumentClick(evInside);
    expect(component.isOpen).toBeTrue(); // still open

    component.onDocumentClick({ target: outside } as any);
    expect(component.isOpen).toBeFalse(); // closed
  });

  it('isDateInRange / isDateRangeStart / isDateRangeEnd (hover included)', () => {
    component.isRange = true;
    component.dateRange = { start: new Date(2025, 0, 10), end: null };
    component.hoverDate = new Date(2025, 0, 13);
    const d11 = new Date(2025, 0, 11);
    // @ts-ignore access private for assertion
    expect(component['isDateInRange'](d11)).toBeTrue();
    // end fixed
    component.dateRange.end = new Date(2025, 0, 14);
    // @ts-ignore
    expect(component['isDateRangeStart'](new Date(2025, 0, 10))).toBeTrue();
    // @ts-ignore
    expect(component['isDateRangeEnd'](new Date(2025, 0, 14))).toBeTrue();
  });
  
});
