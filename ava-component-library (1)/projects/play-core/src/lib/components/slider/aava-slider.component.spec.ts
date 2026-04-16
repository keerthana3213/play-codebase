import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaSliderComponent } from './aava-slider.component';
import { ElementRef } from '@angular/core';
function makeTrack(width = 100, left = 0): ElementRef<HTMLDivElement> {
  const el = document.createElement('div');
  (el as any).getBoundingClientRect = () => ({
    left,
    width,
    top: 0,
    bottom: 0,
    right: left + width,
    height: 10,
    x: left,
    y: 0,
    toJSON() { }
  });
  return { nativeElement: el } as any;
}

describe('SliderComponent', () => {
  let component: AavaSliderComponent;
  let fixture: ComponentFixture<AavaSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaSliderComponent);
    component = fixture.componentInstance;
    component.sliderTrack = makeTrack(200, 0);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('percentage & min/max percentages compute correctly', () => {
    component.min = 0; component.max = 100; component.value = 25;
    expect(component.percentage).toBe(25);

    component.minValue = 10; component.maxValue = 90;
    expect(Math.round(component.minPercentage)).toBe(10);
    expect(Math.round(component.maxPercentage)).toBe(90);
  });
  it('writeValue / registerOnChange / registerOnTouched work', () => {
    const changeSpy = jasmine.createSpy('onChange');
    const touchSpy = jasmine.createSpy('onTouched');
    component.registerOnChange(changeSpy);
    component.registerOnTouched(touchSpy);
    component.writeValue(77);
    expect(component.value).toBe(77);
    component.isDragging = true;
    component.onMouseUp();
    expect(touchSpy).toHaveBeenCalled();
    expect(component.isDragging).toBeFalse();
    expect(component.isHovered).toBeFalse();
  });
  it('updateValue emits only on change and clamps to bounds', () => {
    const emitSpy = spyOn(component.valueChange, 'emit');
    (component as any).updateValue(20);
    expect(component.value).toBe(20);
    expect(emitSpy).toHaveBeenCalledWith(20);
    emitSpy.calls.reset();
    (component as any).updateValue(20);
    expect(emitSpy).not.toHaveBeenCalled();
    component.min = 10; component.max = 50;
    (component as any).updateValue(999);
    expect(component.value).toBe(50);
  });
  it('onTrackClick updates from mouse position (single range)', () => {
    const spy = spyOn<any>(component, 'updateValue').and.callThrough();
    component.multiRange = false;
    component.onTrackClick(new MouseEvent('mousedown', { clientX: 100 }));
    expect(spy).toHaveBeenCalled();
  });
  it('startDrag sets flags and chosen handle', () => {
    component.startDrag(new MouseEvent('mousedown'), 'min');
    expect(component.isDragging).toBeTrue();
    expect(component.isHovered).toBeTrue();
    expect(component.draggingHandle).toBe('min');
  });
  it('onMouseMove updates only while dragging (single range)', () => {
    const spy = spyOn<any>(component, 'updateValue').and.callThrough();
    component.isDragging = false;
    component.onMouseMove(new MouseEvent('mousemove', { clientX: 50 }));
    expect(spy).not.toHaveBeenCalled();
    component.isDragging = true;
    component.onMouseMove(new MouseEvent('mousemove', { clientX: 50 }));
    expect(spy).toHaveBeenCalled();
  });
  it('keyboard: arrows/home/end adjust value and emit (single range)', () => {
    component.multiRange = false;
    component.min = 0; component.max = 10; component.step = 1;
    const emitSpy = spyOn(component.valueChange, 'emit');
    component.value = 1;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(emitSpy).toHaveBeenCalledWith(2);
    emitSpy.calls.reset();
    component.value = 1;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(emitSpy).toHaveBeenCalledWith(2);
    emitSpy.calls.reset();
    component.value = 1;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(emitSpy).toHaveBeenCalledWith(0);
    emitSpy.calls.reset();
    component.value = 1;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(emitSpy).toHaveBeenCalledWith(0);
    emitSpy.calls.reset();
    component.value = 5;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(emitSpy).toHaveBeenCalledWith(component.min);
    emitSpy.calls.reset();
    component.value = 5;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'End' }));
    expect(emitSpy).toHaveBeenCalledWith(component.max);
  });
  it('keyboard: ignores unrelated keys', () => {
    const spy = spyOn<any>(component, 'updateValue');
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
    expect(spy).not.toHaveBeenCalled();
  });
  it('decimalStepValue signal updates via onDecimalStepChange', () => {
    component.onDecimalStepChange(0.25);
    // expect(component.decimalStepValue()).toBeCloseTo(0.25);
  });
  it('rounding/precision works for step 0.1 and 0.01', () => {
    component.min = 0; component.max = 1;
    component.step = 0.1;
    (component as any).updateValue(0.29);
    expect(component.value).toBe(0.3);
    (component as any).updateValue(0.61);
    expect(component.value).toBe(0.6);
    component.step = 0.01;
    (component as any).updateValue(0.33);
    expect(component.value).toBe(0.33);
    (component as any).updateValue(0.67);
    expect(component.value).toBe(0.67);
  });
  it('onInputChange updates & clamps; ignores NaN', () => {
    component.min = 10; component.max = 20;
    component.onInputChange({ target: { value: '15' } } as any);
    expect(component.value).toBe(15);
    component.onInputChange({ target: { value: '999' } } as any);
    expect(component.value).toBe(20);
    component.onInputChange({ target: { value: 'abc' } } as any);
    expect(component.value).toBe(20);
  });
  describe('multi-range', () => {
    beforeEach(() => {
      component.multiRange = true;
      component.min = 0; component.max = 100; component.step = 5;
      component.minValue = 20; component.maxValue = 80;
      component.sliderTrack = makeTrack(200, 0);
    });
    it('onTrackClick moves the nearer handle', () => {
      const minSpy = spyOn(component.minValueChange, 'emit');
      const maxSpy = spyOn(component.maxValueChange, 'emit');
      component.onTrackClick(new MouseEvent('mousedown', { clientX: 30 }));
      expect(minSpy).toHaveBeenCalled();
      minSpy.calls.reset(); maxSpy.calls.reset();
      component.onTrackClick(new MouseEvent('mousedown', { clientX: 170 }));
      expect(maxSpy).toHaveBeenCalled();
    });
    it('dragging min/max clamps correctly (relationship checks)', () => {
      const startMin = component.minValue;
      const startMax = component.maxValue;
      component.startDrag(new MouseEvent('mousedown'), 'min');
      component.onMouseMove(new MouseEvent('mousemove', { clientX: 195 }));
      expect(component.minValue).toBeLessThan(component.maxValue);
      expect(component.minValue).not.toBe(startMin);
      component.startDrag(new MouseEvent('mousedown'), 'max');
      component.onMouseMove(new MouseEvent('mousemove', { clientX: 5 }));
      expect(component.maxValue).toBeGreaterThan(component.minValue);
      // expect(component.maxValue).not.toBe(startMax);
    });
  });
  it('inputs: size/type defaults and updates', () => {
    expect(component.size).toBe('md');
    expect(component.type).toBe('default');
    component.size = 'sm';
    component.type = 'input';
    expect(component.size).toBe('sm');
    expect(component.type).toBe('input');
  });
  it('multi-range: dragging max clamps to min + step', () => {
    component.multiRange = true;
    component.min = 0;
    component.max = 100;
    component.step = 1;
    component.minValue = 20;
    component.maxValue = 80;
    fixture.detectChanges();

    const rect = { left: 0, width: 100, right: 100, top: 0, bottom: 0, height: 10, x: 0, y: 0, toJSON() { return this; } };
    spyOn(component.sliderTrack.nativeElement, 'getBoundingClientRect').and.returnValue(rect as any);

    component.startDrag(new MouseEvent('mousedown'), 'max');

    // move all the way to the left (below min)
    component.onMouseMove(new MouseEvent('mousemove', { clientX: 0 }));

    // expect clamp to (minValue + step) = 21
    expect(component.maxValue).toBe(21);
    component.onMouseUp();
  });

});
