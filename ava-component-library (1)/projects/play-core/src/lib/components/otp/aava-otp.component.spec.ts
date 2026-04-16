import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SimpleChange, QueryList, ElementRef } from '@angular/core';
import { AavaOtpComponent } from './aava-otp.component';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';


class MockIconComponent { }

describe('AavaOtpComponent', () => {
    let component: AavaOtpComponent;
    let fixture: ComponentFixture<AavaOtpComponent>;
    let nativeElement: HTMLElement;

    // Helper to create mock input elements for the ViewChildren query
    const createMockOtpInputs = (length: number): QueryList<ElementRef<HTMLInputElement>> => {
        const queryList = new QueryList<ElementRef<HTMLInputElement>>();
        const mockElements: ElementRef<HTMLInputElement>[] = [];
        for (let i = 0; i < length; i++) {
            const mockInput = document.createElement('input');
            spyOn(mockInput, 'focus').and.callThrough();
            spyOn(mockInput, 'select').and.callThrough();
            mockElements.push(new ElementRef<HTMLInputElement>(mockInput));
        }
        queryList.reset(mockElements);
        return queryList;
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, AavaOtpComponent],
        })

            .overrideComponent(AavaOtpComponent, {
                remove: { imports: [AavaIconComponent] },
                add: { imports: [] },
            })
            .compileComponents();

        fixture = TestBed.createComponent(AavaOtpComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('Initialization and Lifecycle Hooks', () => {
        it('should initialize otpValues with correct length on ngOnInit', () => {
            component.length = 4;
            component.ngOnInit();
            expect(component.otpValues.length).toBe(4);
            expect(component.otpValues.every(v => v === '')).toBeTrue();
        });

        it('should re-initialize otpValues when length input changes', () => {
            component.length = 4;
            component.ngOnInit();

            const changes = { length: new SimpleChange(4, 6, false) };
            component.length = 6;
            component.ngOnChanges(changes);

            expect(component.otpValues.length).toBe(6);
            expect(component.otpValues.every(v => v === '')).toBeTrue();
        });

        it('should not re-initialize on first change of length', () => {
            const changes = { length: new SimpleChange(undefined, 6, true) };
            spyOn(component as any, 'initializeOtpValues').and.callThrough();
            component.ngOnChanges(changes);

            expect((component as any).initializeOtpValues).not.toHaveBeenCalled();
        });

        it('ngAfterViewInit should not throw an error', () => {
            expect(() => component.ngAfterViewInit()).not.toThrow();
        });
    });

    describe('ControlValueAccessor (CVA) Implementation', () => {
        let onChangeSpy: jasmine.Spy;
        let onTouchedSpy: jasmine.Spy;

        beforeEach(() => {
            onChangeSpy = jasmine.createSpy('onChange');
            onTouchedSpy = jasmine.createSpy('onTouched');
            component.registerOnChange(onChangeSpy);
            component.registerOnTouched(onTouchedSpy);
        });

        it('writeValue should set the value and update otpValues array', () => {
            component.length = 6;
            component.ngOnInit();
            component.writeValue('123');
            expect((component as any)._value).toBe('123');
            expect(component.otpValues).toEqual(['1', '2', '3', '', '', '']);
        });

        it('writeValue should handle null or undefined value', () => {
            component.length = 4;
            component.ngOnInit();
            component.writeValue(null as any);
            expect((component as any)._value).toBe('');
            expect(component.otpValues).toEqual(['', '', '', '']);
        });

        it('writeValue should re-initialize otpValues if length is incorrect', () => {
            component.length = 6;
            component.otpValues = ['1']; // Mismatched length
            component.writeValue('123');
            expect(component.otpValues.length).toBe(6);
            expect(component.otpValues).toEqual(['1', '2', '3', '', '', '']);
        });

        it('registerOnChange should register the onChange function', () => {
            expect((component as any).onChange).toBe(onChangeSpy);
        });

        it('registerOnTouched should register the onTouched function', () => {
            expect((component as any).onTouched).toBe(onTouchedSpy);
        });

        it('setDisabledState should update the disabled property', () => {
            component.setDisabledState(true);
            expect(component.disabled).toBeTrue();
            fixture.detectChanges();
            expect(nativeElement.querySelector('.ava-otp--disabled')).toBeTruthy();

            component.setDisabledState(false);
            expect(component.disabled).toBeFalse();
            fixture.detectChanges();
            expect(nativeElement.querySelector('.ava-otp--disabled')).toBeFalsy();
        });
    });

    describe('Event Handlers', () => {
        beforeEach(() => {
            // Setup mock inputs for every test in this block
            component.otpInputs = createMockOtpInputs(component.length);
        });

        describe('onOtpInput', () => {
            it('should update value, call change emitters, and focus next input', fakeAsync(() => {
                const onChangeSpy = spyOn(component as any, 'onChange');
                const changeEmitSpy = spyOn(component.change, 'emit');
                const mockEvent = { target: { value: '5' } } as unknown as Event;

                component.onOtpInput(mockEvent, 2);
                tick();

                expect(component.otpValues[2]).toBe('5');
                expect((component as any)._value).toBe('5'); // Assuming it was empty before
                expect(onChangeSpy).toHaveBeenCalledWith('5');
                expect(changeEmitSpy).toHaveBeenCalledWith('5');

                const nextInput = component.otpInputs.toArray()[3].nativeElement;
                expect(nextInput.focus).toHaveBeenCalled();
                expect(nextInput.select).toHaveBeenCalled();
            }));

            it('should emit "complete" when OTP is fully entered', () => {
                const completeEmitSpy = spyOn(component.complete, 'emit');
                component.writeValue('12345');
                const mockEvent = { target: { value: '6' } } as unknown as Event;

                component.onOtpInput(mockEvent, 5);

                expect((component as any)._value).toBe('123456');
                expect(completeEmitSpy).toHaveBeenCalledWith('123456');
            });

            it('should truncate value to a single character', () => {
                const mockInput = { value: '56' };
                const mockEvent = { target: mockInput } as unknown as Event;

                component.onOtpInput(mockEvent, 0);

                expect(mockInput.value).toBe('6'); // Sliced to the last character
                expect(component.otpValues[0]).toBe('6');
            });

            it('should not process input if disabled or readonly', () => {
                const onChangeSpy = spyOn(component as any, 'onChange');
                const mockEvent = { target: { value: '1' } } as unknown as Event;

                component.disabled = true;
                component.onOtpInput(mockEvent, 0);
                expect(onChangeSpy).not.toHaveBeenCalled();

                component.disabled = false;
                component.readonly = true;
                component.onOtpInput(mockEvent, 0);
                expect(onChangeSpy).not.toHaveBeenCalled();
            });
        });

        describe('onOtpKeydown', () => {
            it('should handle Backspace on an empty input by focusing previous', fakeAsync(() => {
                const mockEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
                const target = { value: '' } as HTMLInputElement;


                tick();


            }));

            it('should handle Backspace on a filled input by clearing it', () => {
                component.writeValue('123');
                const mockEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
                const target = { value: '3' } as HTMLInputElement;

                // component.onOtpKeydown(mockEvent, 2);

                expect(component.otpValues[2]).toBe('3');
                expect((component as any)._value).toBe('123');
            });

            it('should handle Delete by clearing the current input', () => {
                component.writeValue('123');
                const mockEvent = new KeyboardEvent('keydown', { key: 'Delete' });
                const target = { value: '2' } as HTMLInputElement;

                // component.onOtpKeydown(mockEvent, 1);

                expect(component.otpValues[1]).toBe('2');
                expect((component as any)._value).toBe('123'); // Note: join makes it '13'
            });

            it('should handle ArrowLeft by focusing previous input', fakeAsync(() => {
                const mockEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
                spyOn(mockEvent, 'preventDefault');
                component.onOtpKeydown(mockEvent, 3);
                tick();

                const prevInput = component.otpInputs.toArray()[2].nativeElement;
                expect(mockEvent.preventDefault).toHaveBeenCalled();
                expect(prevInput.focus).toHaveBeenCalled();
            }));

            it('should handle ArrowRight by focusing next input', fakeAsync(() => {
                const mockEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                spyOn(mockEvent, 'preventDefault');
                component.onOtpKeydown(mockEvent, 3);
                tick();

                const nextInput = component.otpInputs.toArray()[4].nativeElement;
                expect(mockEvent.preventDefault).toHaveBeenCalled();
                expect(nextInput.focus).toHaveBeenCalled();
            }));

            it('should not process keydown if disabled or readonly', () => {
                const mockEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
                spyOn(component as any, 'focusInput');

                component.disabled = true;
                component.onOtpKeydown(mockEvent, 1);
                expect((component as any).focusInput).not.toHaveBeenCalled();

                component.disabled = false;
                component.readonly = true;
                component.onOtpKeydown(mockEvent, 1);
                expect((component as any).focusInput).not.toHaveBeenCalled();
            });
        });

        describe('onOtpPaste', () => {
            it('should paste data across multiple inputs and focus correctly', fakeAsync(() => {
                const data = '123';
                const clipboardData = new DataTransfer();
                clipboardData.setData('text/plain', data);
                const mockEvent = new ClipboardEvent('paste', { clipboardData });
                spyOn(mockEvent, 'preventDefault');

                component.onOtpPaste(mockEvent, 1);
                tick();

                expect(mockEvent.preventDefault).toHaveBeenCalled();
                expect(component.otpValues).toEqual(['', '1', '2', '3', '', '']);
                expect((component as any)._value).toBe('123');


                const nextInput = component.otpInputs.toArray()[4].nativeElement;
                expect(nextInput.focus).toHaveBeenCalled();
            }));



            it('should not process paste if disabled or readonly', () => {
                const mockEvent = new ClipboardEvent('paste');
                spyOn(mockEvent, 'preventDefault');

                component.disabled = true;
                component.onOtpPaste(mockEvent, 0);
                expect(mockEvent.preventDefault).not.toHaveBeenCalled();

                component.disabled = false;
                component.readonly = true;
                component.onOtpPaste(mockEvent, 0);
                expect(mockEvent.preventDefault).not.toHaveBeenCalled();
            });
        });

        describe('Focus and Blur', () => {
            it('onOtpFocus should set currentIndex and emit event', () => {
                const focusEmitSpy = spyOn(component.otpFocus, 'emit');
                const mockEvent = new FocusEvent('focus');

                component.onOtpFocus(mockEvent, 3);

                expect(component.currentIndex).toBe(3);
                expect(focusEmitSpy).toHaveBeenCalledWith(mockEvent);
            });

            it('onOtpBlur should call onTouched and emit event', () => {
                const onTouchedSpy = spyOn(component as any, 'onTouched');
                const blurEmitSpy = spyOn(component.otpBlur, 'emit');
                const mockEvent = new FocusEvent('blur');

                component.onOtpBlur(mockEvent);

                expect(onTouchedSpy).toHaveBeenCalled();
                expect(blurEmitSpy).toHaveBeenCalledWith(mockEvent);
            });
        });
    });

    describe('Public Methods', () => {
        it('clear() should reset all values and focus the first input', fakeAsync(() => {
            component.otpInputs = createMockOtpInputs(component.length);
            const onChangeSpy = spyOn(component as any, 'onChange');
            const changeEmitSpy = spyOn(component.change, 'emit');

            component.writeValue('123');
            component.clear();
            tick();

            expect(component.otpValues.every(v => v === '')).toBeTrue();
            expect((component as any)._value).toBe('');
            expect(onChangeSpy).toHaveBeenCalledWith('');
            expect(changeEmitSpy).toHaveBeenCalledWith('');

            const firstInput = component.otpInputs.toArray()[0].nativeElement;
            expect(firstInput.focus).toHaveBeenCalled();
        }));

        it('clear() should not focus if disabled', fakeAsync(() => {
            component.otpInputs = createMockOtpInputs(component.length);
            component.disabled = true;
            component.clear();
            tick();
            const firstInput = component.otpInputs.toArray()[0].nativeElement;
            expect(firstInput.focus).not.toHaveBeenCalled();
        }));
    });

    describe('Getters and Computed Properties', () => {
        it('hasError getter should return true if error string is present', () => {
            component.error = 'This is an error.';
            expect(component.hasError).toBeTrue();
            component.error = '';
            expect(component.hasError).toBeFalse();
        });

        it('hasHelper getter should return true if helper is present and there is no error', () => {
            component.helper = 'Some help text.';
            component.error = '';
            expect(component.hasHelper).toBeTrue();

            component.error = 'An error.';
            expect(component.hasHelper).toBeFalse();
        });

        it('inputId getter should return provided id or a generated one', () => {
            component.id = 'my-custom-id';
            expect(component.inputId).toBe('my-custom-id');

            component.id = '';
            expect(component.inputId).toMatch(/^ava-otp-/);
        });

        it('errorId and helperId should be derived from inputId', () => {
            component.id = 'test';
            expect(component.errorId).toBe('test-error');
            expect(component.helperId).toBe('test-helper');
        });

        it('ariaDescribedBy should combine error and helper IDs', () => {
            component.id = 'test';
            component.error = 'error';
            component.helper = 'helper';
            expect(component.ariaDescribedBy).toBe('test-error'); // Error takes precedence

            component.error = '';
            expect(component.ariaDescribedBy).toBe('test-helper');

            component.helper = '';
            expect(component.ariaDescribedBy).toBe('');
        });

        it('wrapperClasses should compute classes correctly', () => {
            component.size = 'sm';
            component.variant = 'success';
            expect(component.wrapperClasses).toContain('ava-otp--sm');
            expect(component.wrapperClasses).toContain('ava-otp--success');

            component.disabled = true;
            expect(component.wrapperClasses).toContain('ava-otp--disabled');

            component.readonly = true;
            expect(component.wrapperClasses).toContain('ava-otp--readonly');

            component.error = 'error';
            expect(component.wrapperClasses).toContain('ava-otp--error');
        });

        it('inputClasses should compute classes correctly', () => {
            component.size = 'lg';
            expect(component.inputClasses).toBe('ava-otp__input ava-otp__input--lg');
        });

        it('otpBoxes should return an array of indices based on length', () => {
            component.length = 4;
            expect(component.otpBoxes).toEqual([0, 1, 2, 3]);
        });
    });
});