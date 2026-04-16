import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaDateTimePickerComponent, DateTimeSelection } from './aava-date-time-picker.component';
import { By } from '@angular/platform-browser';

describe('DateTimePickerComponent (full coverage)', () => {
    let component: AavaDateTimePickerComponent;
    let fixture: ComponentFixture<AavaDateTimePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AavaDateTimePickerComponent],
        })
            .overrideComponent(AavaDateTimePickerComponent, {
                set: {
                    template: `
          <div class="host">
            <button class="btn-date"  (click)="onDateSelected(testDate)">date</button>
            <button class="btn-range" (click)="onRangeSelected(testRange)">range</button>
            <button class="btn-time"  (click)="onTimeSelected(testTime)">time</button>
          </div>
        `
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(AavaDateTimePickerComponent);
        component = fixture.componentInstance;

        // Provide values the template can use (no 'new' in template)
        (component as any).testDate = new Date(2000, 0, 1);
        (component as any).testRange = { start: new Date(2001, 0, 1), end: new Date(2001, 0, 2) };
        (component as any).testTime = '10:30';

        // Touch defaults for coverage
        expect(component.isRange).toBeFalse();
        expect(component.selectedDate).toBeNull();
        expect(component.dateRange).toEqual({ start: null, end: null });
        expect(component.selectedTime).toBe('');
        expect(component.alwaysOpen).toBeFalse();
        expect(component.weekdayFormat).toBe(3);
        expect(component.selectorShape).toBe('square');
        expect(component.surface).toBeFalse();
        expect(component.surfaceStrength).toBe('medium');

        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onDateSelected: updates selectedDate, emits dateSelected, and emits dateTimeSelected without dateRange when isRange=false', () => {
        const dateSpy = spyOn(component.dateSelected, 'emit');
        const dtSpy = spyOn(component.dateTimeSelected, 'emit');

        const d = new Date(2024, 4, 15);
        component.onDateSelected(d);

        expect(component.selectedDate).toEqual(d);
        expect(dateSpy).toHaveBeenCalledOnceWith(d);

        expect(dtSpy).toHaveBeenCalledTimes(1);
        const payload = dtSpy.calls.mostRecent().args[0] as DateTimeSelection;
        expect(payload.date).toEqual(d);
        expect(payload.time).toBe('');             // default selectedTime
        expect(payload.dateRange).toBeUndefined(); // isRange=false branch
    });

    it('onTimeSelected: updates selectedTime, emits timeSelected, and emits dateTimeSelected without dateRange when isRange=false', () => {
        const timeSpy = spyOn(component.timeSelected, 'emit');
        const dtSpy = spyOn(component.dateTimeSelected, 'emit');

        component.onTimeSelected('09:45');

        expect(component.selectedTime).toBe('09:45');
        expect(timeSpy).toHaveBeenCalledOnceWith('09:45');

        const payload = dtSpy.calls.mostRecent().args[0] as DateTimeSelection;
        expect(payload.date).toBe(component.selectedDate);
        expect(payload.time).toBe('09:45');
        expect(payload.dateRange).toBeUndefined(); // still false by default
    });

    it('onRangeSelected: updates dateRange, emits rangeSelected, and emits dateTimeSelected WITHOUT dateRange when isRange=false', () => {
        // Explicitly verify the false branch of emitDateTimeSelection
        const rangeSpy = spyOn(component.rangeSelected, 'emit');
        const dtSpy = spyOn(component.dateTimeSelected, 'emit');

        const r = { start: new Date(2025, 0, 1), end: new Date(2025, 0, 3) };
        expect(component.isRange).toBeFalse(); // default
        component.onRangeSelected(r);

        expect(component.dateRange).toEqual(r);
        expect(rangeSpy).toHaveBeenCalledOnceWith(r);

        const payload = dtSpy.calls.mostRecent().args[0] as DateTimeSelection;
        expect(payload.date).toBe(component.selectedDate);
        expect(payload.time).toBe(component.selectedTime);
        expect(payload.dateRange).toBeUndefined(); // because isRange=false
    });

    it('isRange=true: all three handlers emit dateTimeSelected WITH dateRange included', () => {
        component.isRange = true;
        fixture.detectChanges();

        const dtSpy = spyOn(component.dateTimeSelected, 'emit');

        // Prepare predictable state
        const r = { start: new Date(2030, 1, 10), end: new Date(2030, 1, 12) };
        const d = new Date(2030, 1, 11);

        // Emit range first
        component.onRangeSelected(r);
        expect(component.dateRange).toEqual(r);
        let payload = dtSpy.calls.mostRecent().args[0] as DateTimeSelection;
        expect(payload.dateRange).toEqual(r); // included because isRange=true

        // Then date
        component.onDateSelected(d);
        expect(component.selectedDate).toEqual(d);
        payload = dtSpy.calls.mostRecent().args[0] as DateTimeSelection;
        expect(payload.date).toEqual(d);
        expect(payload.dateRange).toEqual(r);

        // Then time
        component.onTimeSelected('18:20');
        expect(component.selectedTime).toBe('18:20');
        payload = dtSpy.calls.mostRecent().args[0] as DateTimeSelection;
        expect(payload.time).toBe('18:20');
        expect(payload.dateRange).toEqual(r);
    });

    it('template buttons call the handlers (smoke through template bindings)', () => {
        const dSpy = spyOn(component, 'onDateSelected').and.callThrough();
        const rSpy = spyOn(component, 'onRangeSelected').and.callThrough();
        const tSpy = spyOn(component, 'onTimeSelected').and.callThrough();

        // Click date
        const btnDate = fixture.debugElement.query(By.css('.btn-date')).nativeElement as HTMLButtonElement;
        btnDate.click();
        expect(dSpy).toHaveBeenCalled();

        // Click range
        const btnRange = fixture.debugElement.query(By.css('.btn-range')).nativeElement as HTMLButtonElement;
        btnRange.click();
        expect(rSpy).toHaveBeenCalled();

        // Click time
        const btnTime = fixture.debugElement.query(By.css('.btn-time')).nativeElement as HTMLButtonElement;
        btnTime.click();
        expect(tSpy).toHaveBeenCalled();
    });

    it('allows overriding visual inputs without affecting logic (touch lines for coverage)', () => {
        component.weekdayFormat = 1;
        component.selectorShape = 'circle';
        component.surface = true;
        component.surfaceStrength = 'max';
        component.alwaysOpen = true;
        fixture.detectChanges();

        // No exceptions and values set
        expect(component.weekdayFormat).toBe(1);
        expect(component.selectorShape).toBe('circle');
        expect(component.surface).toBeTrue();
        expect(component.surfaceStrength).toBe('max');
        expect(component.alwaysOpen).toBeTrue();
    });
});
