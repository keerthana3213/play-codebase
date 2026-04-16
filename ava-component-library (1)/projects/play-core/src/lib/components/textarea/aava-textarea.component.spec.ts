import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaTextareaComponent } from './aava-textarea.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component';

describe('AvaTextareaComponent', () => {
  let component: AavaTextareaComponent;
  let fixture: ComponentFixture<AavaTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AavaIconComponent, AavaTextareaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTextareaComponent);
    component = fixture.componentInstance;

    // Mock ViewChild
    component.textareaElement = {
      nativeElement: document.createElement('textarea')
    } as any;
    document.body.appendChild(component.textareaElement.nativeElement);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('writeValue should update value and mark for check', () => {
    const markSpy = spyOn(component['cdr'], 'markForCheck');
    component.writeValue('test value');
    expect(component.value).toBe('test value');
    expect(markSpy).toHaveBeenCalled();
  });

  it('registerOnChange and registerOnTouched should set functions', () => {
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);
    component.onChange('abc');
    expect(fn).toHaveBeenCalledWith('abc');

    const fn2 = jasmine.createSpy('onTouched');
    component.registerOnTouched(fn2);
    component.onTouched();
    expect(fn2).toHaveBeenCalled();
  });

  it('setDisabledState should update disabled and markForCheck', () => {
    const markSpy = spyOn(component['cdr'], 'markForCheck');
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
    expect(markSpy).toHaveBeenCalled();
  });

  it('onInput should update value, emit event and auto-resize if enabled', () => {
    const emitSpy = spyOn(component.textareaInput, 'emit');
    const onChangeSpy = spyOn(component, 'onChange');

    component.autoResize = true;
    const ta = document.createElement('textarea');
    ta.value = 'new text';
    spyOn<any>(component, 'adjustTextareaHeight');

    component.onInput({ target: ta } as any);
    expect(component.value).toBe('new text');
    expect(onChangeSpy).toHaveBeenCalledWith('new text');
    expect(component['adjustTextareaHeight']).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('onFocus should set isFocused true and emit', () => {
    const emitSpy = spyOn(component.textareaFocus, 'emit');
    component.onFocus(new Event('focus'));
    expect(component.isFocused).toBeTrue();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('onBlur should set isFocused false, call onTouched, and emit', () => {
    const emitSpy = spyOn(component.textareaBlur, 'emit');
    const touchSpy = spyOn(component, 'onTouched');
    component.onBlur(new Event('blur'));
    expect(component.isFocused).toBeFalse();
    expect(touchSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('onChange_ should emit', () => {
    const emitSpy = spyOn(component.textareaChange, 'emit');
    component.onChange_(new Event('change'));
    expect(emitSpy).toHaveBeenCalled();
  });

  it('adjustTextareaHeight should set height based on scrollHeight', () => {
    const ta = document.createElement('textarea');
    ta.style.height = '100px';
    Object.defineProperty(ta, 'scrollHeight', { value: 150 });
    (component as any).adjustTextareaHeight(ta);
    expect(ta.style.height).toBe('150px');
  });

  it('onIconStartClick should emit unless disabled or readonly', () => {
    const emitSpy = spyOn(component.iconStartClick, 'emit');
    const evt = new Event('click');
    spyOn(evt, 'stopPropagation');

    component.disabled = false;
    component.readonly = false;
    component.onIconStartClick(evt);
    expect(evt.stopPropagation).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();

    emitSpy.calls.reset();
    component.disabled = true;
    component.onIconStartClick(evt);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('onIconEndClick should emit unless disabled or readonly', () => {
    const emitSpy = spyOn(component.iconEndClick, 'emit');
    const evt = new Event('click');
    spyOn(evt, 'stopPropagation');

    component.disabled = false;
    component.readonly = false;
    component.onIconEndClick(evt);
    expect(evt.stopPropagation).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();

    emitSpy.calls.reset();
    component.readonly = true;
    component.onIconEndClick(evt);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('onIconKeydown should trigger click handlers for Enter/Space', () => {
    const startSpy = spyOn(component, 'onIconStartClick');
    const endSpy = spyOn(component, 'onIconEndClick');

    const evtEnter = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(evtEnter, 'preventDefault');
    component.onIconKeydown(evtEnter, 'start');
    expect(startSpy).toHaveBeenCalled();

    const evtSpace = new KeyboardEvent('keydown', { key: ' ' });
    spyOn(evtSpace, 'preventDefault');
    component.onIconKeydown(evtSpace, 'end');
    expect(endSpy).toHaveBeenCalled();
  });

  it('computed properties should work as expected', () => {
    component.error = 'err';
    component.helper = 'help';
    component.size = 'lg';
    component.variant = 'success';
    component.disabled = true;
    component.readonly = true;
    component.isFocused = true;
    component.fullWidth = true;
    component.autoResize = true;
    component.processing = true;
    component.processingGradientBorder = true;

    const id = component.inputId;
    expect(component.hasError).toBeTrue();
    expect(component.hasHelper).toBeTrue();
    // expect(component.errorId).toContain(id);
    // expect(component.helperId).toContain(id);
    // expect(component.ariaDescribedBy).toContain(component.errorId);
    expect(component.inputClasses).toContain('ava-textarea__input--lg');
    expect(component.wrapperClasses).toContain('ava-textarea--processing');
    expect(component.computedStyles['--processing-gradient-colors']).toBeTruthy();
  });

  it('ngAfterViewInit should auto-resize if enabled', fakeAsync(() => {
    component.autoResize = true;
    spyOn<any>(component, 'adjustTextareaHeight');
    component.ngAfterViewInit();
    tick();
    expect(component['adjustTextareaHeight']).toHaveBeenCalled();
  }));
});
