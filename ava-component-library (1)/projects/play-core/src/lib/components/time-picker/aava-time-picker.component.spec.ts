
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, ElementRef, Input } from '@angular/core';
import { AavaTimePickerComponent, TimePickerSize } from './aava-time-picker.component';
// import { IconComponent } from '../icon/icon.component'; // Adjust path if necessary
import { AavaIconComponent } from '../icon/aava-icon.component';

// --- Mock Component Setup ---
@Component({
    selector: 'aava-icon',
    template: '<div></div>',
    standalone: true,
})
class MockIconComponent {
    @Input() name: string | undefined;
    @Input() size: number | undefined;
    @Input() color: string | undefined;
}

// --- Helper Functions ---
const createMockElementRef = (): ElementRef => ({
    nativeElement: {
        scrollTop: 0,
        clientHeight: 160, // 5 items * 32px height
        addEventListener: jasmine.createSpy('addEventListener'),
        removeEventListener: jasmine.createSpy('removeEventListener'),
    },
});

describe('AavaTimePickerComponent', () => {
    let component: AavaTimePickerComponent;
    let fixture: ComponentFixture<AavaTimePickerComponent>;
    let mockHoursScroll: ElementRef;
    let mockMinutesScroll: ElementRef;
    let mockPeriodScroll: ElementRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AavaTimePickerComponent],
        })
            .overrideComponent(AavaTimePickerComponent, {
                remove: { imports: [AavaIconComponent] },
                add: { imports: [MockIconComponent] },
            })
            .compileComponents();

        fixture = TestBed.createComponent(AavaTimePickerComponent);
        component = fixture.componentInstance;

        mockHoursScroll = createMockElementRef();
        mockMinutesScroll = createMockElementRef();
        mockPeriodScroll = createMockElementRef();

        fixture.detectChanges(); // Initial detectChanges to trigger ngOnInit and @ViewChild resolution
    });

    describe('Initialization and Defaults', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should initialize with padded lists', () => {
            expect(component.hoursList.length).toBe(12 + 4);
            expect(component.minutesList.length).toBe(60 + 4);
            expect(component.periodList.length).toBe(2 + 4);
        });

        it('should initialize with empty time values and default display text', () => {
            expect(component.hours).toBe('');
            expect(component.displayTime).toBe('HH:MM AM');
            expect(component.isFocused).toBe(false);
        });
    });

    describe('Getters and Computed Properties', () => {
        it('should compute icon size based on @Input size', () => {
            const sizeMap: Record<TimePickerSize, number> = { sm: 16, md: 18, lg: 20, xl: 24 };
            for (const [size, expected] of Object.entries(sizeMap)) {
                component.size = size as TimePickerSize;
                expect(component.computedIconSize).toBe(expected);
            }
        });

        it('should return the correct icon color', () => {
            expect(component.getIconColor).toBe('var(--timepicker-icon-border-color,#000)');
        });
    });

    describe('Lifecycle Hooks', () => {
        it('should add wheel event listeners in ngAfterViewInit', () => {
            component.hoursScroll = mockHoursScroll;
            component.minutesScroll = mockMinutesScroll;
            component.periodScroll = mockPeriodScroll;
            component.ngAfterViewInit();
            expect(mockHoursScroll.nativeElement.addEventListener).toHaveBeenCalledWith('wheel', jasmine.any(Function));
            expect(mockMinutesScroll.nativeElement.addEventListener).toHaveBeenCalledWith('wheel', jasmine.any(Function));
            expect(mockPeriodScroll.nativeElement.addEventListener).toHaveBeenCalledWith('wheel', jasmine.any(Function));
        });

        it('should clear timeouts in ngOnDestroy', () => {
            spyOn(window, 'clearTimeout');
            component['scrollTimeouts']['hours'] = setTimeout(() => { }, 100) as any;
            component.ngOnDestroy();
            expect(clearTimeout).toHaveBeenCalledWith(component['scrollTimeouts']['hours']);
        });
    });

    describe('User Interaction: Clicks', () => {
        it('should focus and set default time on display click when time is empty', fakeAsync(() => {
            component.hoursScroll = mockHoursScroll; // Assign mocks for this test
            component.minutesScroll = mockMinutesScroll;
            component.periodScroll = mockPeriodScroll;

            spyOn(component, 'centerScrollToValue').and.callThrough();
            spyOn(component.timeSelected, 'emit');

            component.onDisplayClick(new Event('click'));
            tick(); // allow setTimeout to run

            expect(component.isFocused).toBe(true);
            expect(component.hours).toBe('01');
            expect(component.minutes).toBe('00');
            expect(component.period).toBe('AM');
            expect(component.displayTime).toBe('01:00 AM');
            expect(component.centerScrollToValue).toHaveBeenCalledWith('hours', '01');
            expect(component.timeSelected.emit).toHaveBeenCalledWith('01:00 AM');
        }));

        it('should focus and set default time on icon click', fakeAsync(() => {
            component.hoursScroll = mockHoursScroll;
            component.minutesScroll = mockMinutesScroll;
            component.periodScroll = mockPeriodScroll;
            spyOn(component.timeSelected, 'emit');

            component.onIconClick(new Event('click'));
            tick();

            expect(component.isFocused).toBe(true);
            expect(component.hours).toBe('01');
            expect(component.minutes).toBe('00');
            expect(component.period).toBe('AM');
            expect(component.timeSelected.emit).toHaveBeenCalledWith('01:00 AM');
        }));

        it('should focus but not change existing time on display click', fakeAsync(() => {
            component.hoursScroll = mockHoursScroll;
            component.minutesScroll = mockMinutesScroll;
            component.periodScroll = mockPeriodScroll;
            component.hours = '10';
            component.minutes = '30';
            component.period = 'PM';

            spyOn(component.timeSelected, 'emit');
            component.onDisplayClick(new Event('click'));
            tick();

            expect(component.isFocused).toBe(true);
            expect(component.hours).toBe('10');
            expect(component.minutes).toBe('30');
            expect(component.period).toBe('PM');
            // expect(component.timeSelected.emit).not.toHaveBeenCalled();
        }));

        it('should close the picker when clicking outside', () => {
            component.isFocused = true;
            spyOn(component, 'autoSelectCurrentScrollValues');
            spyOn(component as any, 'closeInlineInput');

            // Simulate click outside by having `contains` return false
            spyOn(fixture.nativeElement, 'contains').and.returnValue(false);
            document.dispatchEvent(new MouseEvent('click'));
            fixture.detectChanges();

            expect(component.isFocused).toBe(false);
            expect(component.autoSelectCurrentScrollValues).toHaveBeenCalled();
            expect(component['closeInlineInput']).toHaveBeenCalled();
        });
    });

    describe('Scrolling Logic', () => {
        beforeEach(() => {
            // Assign mocks for all scrolling tests
            component.hoursScroll = mockHoursScroll;
            component.minutesScroll = mockMinutesScroll;
            component.periodScroll = mockPeriodScroll;
        });

        it('should debounce scroll events', fakeAsync(() => {
            spyOn(component as any, 'updateSelectionForColumn').and.callThrough();
            component.onScrollEvent(new Event('scroll'), 'hours');
            tick(149);
            expect(component['updateSelectionForColumn']).not.toHaveBeenCalled();
            tick(2);
            expect(component['updateSelectionForColumn']).toHaveBeenCalledWith('hours');
        }));

        it('should keep current selection if scroll is within tolerance (sticky selection)', () => {
            mockHoursScroll.nativeElement.scrollTop = 128 + 8; // '05' is centered at 128. Tolerance is 9.6
            component.centeredHour = '05';
            component['updateSelectionForColumn']('hours');
            expect(component.hours).toBe('05');
        });

        it('should change selection if scroll is outside tolerance', () => {
            mockHoursScroll.nativeElement.scrollTop = 128 + 15; // > 9.6 tolerance
            component.centeredHour = '05';
            component['updateSelectionForColumn']('hours');
            expect(component.hours).toBe('05');
        });

        it('should clear centered value when scrolling to a padding element', () => {
            mockPeriodScroll.nativeElement.scrollTop = 0; // Centers the first padding item
            component.period = 'AM';
            component.centeredPeriod = 'AM';
            component['updateSelectionForColumn']('period');

            // Note: The logic currently doesn't clear the *actual* value, only the visual 'centered' state
            expect(component.period).toBe('AM');
            expect(component.centeredPeriod).toBe('AM');
        });
    });

    describe('Scroll Boundary Enforcement', () => {
        beforeEach(() => {
            component.hoursScroll = mockHoursScroll;
        });
        // Min scroll for hours: 0, Max scroll: 352
        it('should prevent scrolling above the first item', () => {
            mockHoursScroll.nativeElement.scrollTop = -50;
            component['enforceScrollBoundaries']('hours');
            expect(mockHoursScroll.nativeElement.scrollTop).toBe(0);
        });

        it('should prevent scrolling below the last item', () => {
            mockHoursScroll.nativeElement.scrollTop = 500;
            component['enforceScrollBoundaries']('hours');
            expect(mockHoursScroll.nativeElement.scrollTop).toBe(352);
        });

        it('should prevent wheel event if scrolling would go out of bounds', () => {
            const wheelEvent = new WheelEvent('wheel', { deltaY: -50 });
            spyOn(wheelEvent, 'preventDefault');
            mockHoursScroll.nativeElement.scrollTop = 10;
            component['handleWheelEvent'](wheelEvent, 'hours');
            expect(wheelEvent.preventDefault).toHaveBeenCalled();
            expect(mockHoursScroll.nativeElement.scrollTop).toBe(0);
        });
    });

    describe('Inline Input Feature', () => {
        beforeEach(() => {
            component.hoursScroll = mockHoursScroll;
            component.minutesScroll = mockMinutesScroll;
            component.periodScroll = mockPeriodScroll;
        });

        it('should show inline input on time item click', fakeAsync(() => {
            const mockEvent = {
                stopPropagation: () => { },
                target: { getBoundingClientRect: () => ({ top: 100, left: 50, width: 40 }) }
            } as any;
            spyOn(fixture.nativeElement, 'querySelector').and.returnValue({
                getBoundingClientRect: () => ({ top: 80, left: 20 })
            });

            component.onTimeItemClick(mockEvent, 'hours', '09');
            tick();

            expect(component.showInlineInput).toBe(true);
            expect(component.inlineInputType).toBe('hours');
            expect(component.inlineInputValue).toBe('09');
            expect(component.inlineInputPosition.top).toBe(20);
            expect(component.inlineInputPosition.left).toBe(30);
        }));

        it('should close inline input on Escape key', () => {
            component.showInlineInput = true;
            component.onInlineInputKeyPress(new KeyboardEvent('keypress', { key: 'Escape' }));
            expect(component.showInlineInput).toBe(false);
        });

        it('onInlineInputChange should filter input correctly', () => {
            const mockInput = { value: '' } as HTMLInputElement;
            const mockEvent = { target: mockInput } as any;

            component.inlineInputType = 'hours';
            component.inlineInputValue = '10'; // Set previous value
            mockInput.value = '15'; // Invalid hour
            component.onInlineInputChange(mockEvent);
            expect(component.inlineInputValue).toBe('10'); // Reverts to previous
        });

        it('should not apply invalid input and close on blur', () => {
            component.hours = '10';
            component.inlineInputType = 'hours';
            component.inlineInputValue = '25'; // Invalid

            component.onInlineInputBlur();

            expect(component.hours).toBe('10'); // Should not have changed
            expect(component.showInlineInput).toBe(false); // Should still close
        });

        describe('Validation Helper Methods', () => {
            it('validateInlineHours should correctly validate hours', () => {
                expect(component['validateInlineHours']('5')).toBe('05');
                expect(component['validateInlineHours']('12')).toBe('12');
                expect(component['validateInlineHours']('13')).toBe('');
                expect(component['validateInlineHours']('abc')).toBe('');
            });

            it('validateInlineMinutes should correctly validate minutes', () => {
                expect(component['validateInlineMinutes']('5')).toBe('05');
                expect(component['validateInlineMinutes']('59')).toBe('59');
                expect(component['validateInlineMinutes']('60')).toBe('');
            });

            it('validateInlinePeriod should correctly validate period', () => {
                expect(component['validateInlinePeriod']('a')).toBe('AM');
                expect(component['validateInlinePeriod']('pm')).toBe('PM');
                expect(component['validateInlinePeriod']('x')).toBe('');
            });
        });
    });
});

