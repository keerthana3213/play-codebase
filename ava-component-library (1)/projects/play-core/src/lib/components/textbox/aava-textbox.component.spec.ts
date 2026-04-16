import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaTextboxComponent } from './aava-textbox.component';
// import { IconComponent } from '../icon/icon.component';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AavaTextboxComponent', () => {
  let component: AavaTextboxComponent;
  let fixture: ComponentFixture<AavaTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaTextboxComponent, AavaIconComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ---------- Value + ControlValueAccessor ----------
  it('should write value', () => {
    component.writeValue('Hello');
    expect(component.value).toBe('Hello');
  });

  it('should register onChange and trigger it on input', () => {
    const spy = jasmine.createSpy('onChange');
    component.registerOnChange(spy);
    const input = { target: { value: 'NewVal' } } as any as Event;
    component.onInput(input);
    expect(spy).toHaveBeenCalledWith('NewVal');
  });

  it('should register onTouched and trigger it on blur', () => {
    const spy = jasmine.createSpy('onTouched');
    component.registerOnTouched(spy);
    component.onBlur(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });

  it('should disable via setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
  });

  // ---------- Event Emitters ----------
  it('should emit input, focus, blur and change events', () => {
    spyOn(component.input, 'emit');
    spyOn(component.focus, 'emit');
    spyOn(component.blur, 'emit');
    spyOn(component.textboxChange, 'emit');

    // FIX: provide a proper event with target.value
    const fakeInputEvent = { target: { value: 'test' } } as any as Event;
    component.onInput(fakeInputEvent);
    expect(component.input.emit).toHaveBeenCalled();

    component.onFocus(new Event('focus'));
    expect(component.focus.emit).toHaveBeenCalled();

    component.onBlur(new Event('blur'));
    expect(component.blur.emit).toHaveBeenCalled();

    component.onChange_(new Event('change'));
    expect(component.textboxChange.emit).toHaveBeenCalled();
  });

  it('should emit icon clicks if enabled', () => {
    spyOn(component.iconStartClick, 'emit');
    spyOn(component.iconEndClick, 'emit');

    component.onIconStartClick(new Event('click'));
    component.onIconEndClick(new Event('click'));

    expect(component.iconStartClick.emit).toHaveBeenCalled();
    expect(component.iconEndClick.emit).toHaveBeenCalled();
  });

  it('should not emit icon clicks when disabled or readonly', () => {
    component.disabled = true;
    spyOn(component.iconStartClick, 'emit');
    component.onIconStartClick(new Event('click'));
    expect(component.iconStartClick.emit).not.toHaveBeenCalled();

    component.disabled = false;
    component.readonly = true;
    spyOn(component.iconEndClick, 'emit');
    component.onIconEndClick(new Event('click'));
    expect(component.iconEndClick.emit).not.toHaveBeenCalled();
  });

  it('should handle keyboard icon clicks', () => {
    spyOn(component, 'onIconStartClick');
    spyOn(component, 'onIconEndClick');
    component.onIconKeydown(new KeyboardEvent('keydown', { key: 'Enter' }), 'start');
    component.onIconKeydown(new KeyboardEvent('keydown', { key: ' ' }), 'end');
    expect(component.onIconStartClick).toHaveBeenCalled();
    expect(component.onIconEndClick).toHaveBeenCalled();
  });

  // ---------- Computed Getters ----------
  it('should compute error/helper states correctly', () => {
    component.error = 'Some error';
    expect(component.hasError).toBeTrue();
    component.error = '';
    component.helper = 'help';
    expect(component.hasHelper).toBeTrue();
  });

  it('should compute hasIcon correctly', () => {
    component.icon = 'icon';
    expect(component.hasIcon).toBeTrue();
  });

  it('should compute inputKinds correctly', () => {
    component.inputKind = 'phone';
    expect(component.isPhone).toBeTrue();
    component.inputKind = 'currency';
    expect(component.isCurrency).toBeTrue();
    component.inputKind = 'email';
    expect(component.isEmail).toBeTrue();
    component.inputKind = 'password';
    expect(component.isPassword).toBeTrue();
  });

  it('should generate inputId, errorId, helperId, ariaDescribedBy', () => {
    const id = component.inputId;
    expect(id).toContain('ava-textbox-');

    // Case 1: only helper
    component.error = '';
    component.helper = 'help';
    expect(component.ariaDescribedBy).toContain('-helper');

    // Case 2: only error
    component.helper = '';
    component.error = 'err';
    expect(component.ariaDescribedBy).toContain('-error');
  });

  it('should compute effective hover/pressed/processing effects', () => {
    component.processing = true;
    expect(component.effectiveHoverEffect).toBe('tint');
    expect(component.effectivePressedEffect).toBe('solid');
    expect(component.effectiveProcessingEffect).toBe('border-pulse');
  });

  it('should compute effect classes and legacy classes', () => {
    component.processing = true;
    component.personality = 'modern';
    component.glassIntensity = 10;
    component.lightIntensity = 25;
    component.liquidIntensity = 50;
    component.gradientIntensity = 75;
    component.metaphor = ['glow', 'wave'];

    const effectClasses = component.effectClasses;
    const legacyClasses = component.legacyMetaphorClasses;

    expect(effectClasses.length).toBeGreaterThan(0);
    expect(legacyClasses).toContain('ava-textbox--personality-modern');
  });

  it('should compute computedStyles correctly', () => {
    component.customStyles = { color: 'red' };
    component.style = { background: 'blue' };
    component.processingGradientColors = ['#111', '#222'];
    const styles = component.computedStyles;
    expect(styles['color']).toBe('red');
    expect(styles['background']).toBe('blue');
    expect(styles['--processing-gradient-colors']).toContain('#111');
  });

  it('should compute inputClasses and wrapperClasses', () => {
    // component._value = 'someVal';
    component.size = 'lg';
    component.variant = 'success';
    component.error = 'err';
    component.disabled = true;
    component.isFocused = true;
    component.fullWidth = true;
    component.iconSeparator = true;
    component.iconSpacing = 'compact';
    component.labelPosition = 'end';
    component.inputKind = 'phone';

    const inputClasses = component.inputClasses;
    const wrapperClasses = component.wrapperClasses;

    expect(inputClasses).toContain('ava-textbox__input--lg');
    expect(wrapperClasses).toContain('ava-textbox--lg');
    expect(wrapperClasses).toContain('ava-textbox--icon-separator');
    expect(wrapperClasses).toContain('ava-textbox--label-end');
  });

  it('should compute labelIconSize correctly', () => {
    component.size = 'xl';
    expect(component.labelIconSize).toBe(24);
    component.size = 'xs';
    expect(component.labelIconSize).toBe(16);
  });

  // ---------- Password toggle ----------
  it('should toggle password visibility', () => {
    component.type = 'password';
    component.showPassword = false;
    component.togglePasswordVisibility();
    expect(component.type).toBe('text');
    component.togglePasswordVisibility();
    expect(component.type).toBe('password');
  });

  // ---------- Lifecycle ----------
  it('should set type=password in ngAfterViewInit if inputKind=password', () => {
    component.inputKind = 'password';
    component.type = 'text';
    component.ngAfterViewInit();
    expect(component.type).toBe('password');
  });

  it('should check projected content in checkProjectedContent', (done) => {
    const prefixEl = document.createElement('div');
    prefixEl.innerHTML = '<span>prefix</span>';
    component.prefixContainer = { nativeElement: prefixEl } as any;
    component.suffixContainer = { nativeElement: prefixEl } as any;
    component.iconStartContainer = { nativeElement: prefixEl } as any;
    component.iconEndContainer = { nativeElement: prefixEl } as any;

    (component as any).checkProjectedContent();

    setTimeout(() => {
      expect(component.hasProjectedPrefix).toBeTrue();
      expect(component.hasProjectedSuffix).toBeTrue();
      expect(component.hasProjectedStartIcon).toBeTrue();
      expect(component.hasProjectedEndIcon).toBeTrue();
      done();
    });
  });
});
