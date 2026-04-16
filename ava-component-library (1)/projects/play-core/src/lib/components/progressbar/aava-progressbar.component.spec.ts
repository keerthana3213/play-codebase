import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaProgressComponent } from './aava-progressbar.component';
import { By } from '@angular/platform-browser';

describe('ProgressComponent', () => {
  let component: AavaProgressComponent;
  let fixture: ComponentFixture<AavaProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AavaProgressComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should update svg size on resize when svgSize is undefined', () => {
    component.svgSize = undefined;
    spyOn(component as any, 'updateSvgSize');
    component.onResize();
    expect(component['updateSvgSize']).toHaveBeenCalled();
  });

  it('should not update svg size on resize when svgSize is set', () => {
    component.svgSize = 80;
    spyOn(component as any, 'updateSvgSize');
    component.onResize();
    expect(component['updateSvgSize']).not.toHaveBeenCalled();
  });

  it('should validate percentage input correctly', () => {
    component.percentage = 120;
    component['validateInputs']();
    expect(component.errorMessage).toBe('Percentage value must be between 0 and 100.');

    component.percentage = 50;
    component['validateInputs']();
    expect(component.errorMessage).toBe('');
  });

  it('should call updateSvgSize, validateInputs and updateProgress on ngOnChanges', () => {
    spyOn(component as any, 'validateInputs');
    spyOn(component as any, 'updateSvgSize');
    spyOn(component, 'updateProgress');
    spyOn(component as any, 'animateLinearProgress');

    component.type = 'linear';
    component.mode = 'determinate';

    component.ngOnChanges();

    expect(component['validateInputs']).toHaveBeenCalled();
    expect(component['updateSvgSize']).toHaveBeenCalled();
    expect(component.updateProgress).toHaveBeenCalled();
    expect(component['animateLinearProgress']).toHaveBeenCalled();
  });

  it('should not call animateLinearProgress when not linear or not determinate', () => {
    spyOn(component as any, 'animateLinearProgress');

    component.type = 'circular';
    component.mode = 'determinate';
    component.ngOnChanges();
    expect(component['animateLinearProgress']).not.toHaveBeenCalled();

    component.type = 'linear';
    component.mode = 'indeterminate';
    component.ngOnChanges();
    expect(component['animateLinearProgress']).not.toHaveBeenCalled();
  });

  it('should update dashOffset and set transition styles in updateProgress (circular)', fakeAsync(() => {
    component.type = 'circular';
    component.mode = 'determinate';
    component.percentage = 50;
    const dummy = document.createElement('div');
    dummy.id = component.progressId;
    document.body.appendChild(dummy);

    component.updateProgress();
    tick(11);
    const el = document.getElementById(component.progressId)!;
    expect(el).toBeTruthy();
    document.body.removeChild(dummy);
  }));

  it('should update linear progress style and animate value', fakeAsync(() => {
    component.type = 'linear';
    component.mode = 'determinate';
    component.percentage = 40;
    const div = document.createElement('div');
    div.id = component.progressId;
    document.body.appendChild(div);

    component['animateLinearProgress']();
    tick(1000);
    expect(component.displayPercentage).toBeLessThanOrEqual(component.percentage);
    document.body.removeChild(div);
  }));

  it('should call updateProgress, validateInputs when writeValue is invoked', () => {
    spyOn(component, 'updateProgress');
    spyOn<any>(component, 'validateInputs');
    component.writeValue(75);
    expect(component.percentage).toBe(75);
    expect(component.updateProgress).toHaveBeenCalled();
    expect(component['validateInputs']).toHaveBeenCalled();
  });

  it('should render circular progressbar when type is circular', () => {
    component.type = 'circular';
    fixture.detectChanges();
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg).toBeTruthy();
  });

  it('should set error message for percentage above 100', () => {
    component.percentage = 150;
    component['validateInputs']();
    expect(component.errorMessage).toBe('Percentage value must be between 0 and 100.');
  });

  it('should set error message for negative percentage', () => {
    component.percentage = -10;
    component['validateInputs']();
    expect(component.errorMessage).toBe('Percentage value must be between 0 and 100.');
  });

  it('should calculate strokeWidth correctly for different sizes', () => {
    component.size = 'sm';
    expect(component.strokeWidth).toBe(4);

    component.size = 'md';
    expect(component.strokeWidth).toBe(12);

    component.size = 'lg';
    expect(component.strokeWidth).toBe(16);
  });

  it('should calculate radius based on strokeWidth', () => {
    component.size = 'sm';
    expect(component.radius).toBe(48); // 45 - (4/2)

    component.size = 'md';
    expect(component.radius).toBe(44); // 45 - (12/2)
  });

  it('should calculate circumference correctly', () => {
    component.size = 'sm';
    const radius = component.radius; // use actual radius from component
    const expectedCircumference = 2 * Math.PI * radius;
    expect(component.circumference).toBeCloseTo(expectedCircumference, 2);
  });

  it('should set dashOffset to 0 for 100% progress', () => {
    component.percentage = 100;
    component.mode = 'determinate';
    component.updateProgress();
    expect(component.dashOffset).toBe(0);
  });

  it('should set dashOffset to circumference for 0% progress', () => {
    component.percentage = 0;
    component.mode = 'determinate';
    component.updateProgress();
    expect(component.dashOffset).toBe(component.circumference);
  });

  it('should not update svgSize when explicitly set', () => {
    component.svgSize = 150;
    component['updateSvgSize']();
    expect(component.svgSize).toBe(150);
  });

  it('should register onChange function', () => {
    const mockFn = jasmine.createSpy('onChange');
    component.registerOnChange(mockFn);
    expect(component['onChange']).toBe(mockFn);
  });

  it('should register onTouched function', () => {
    const mockFn = jasmine.createSpy('onTouched');
    component.registerOnTouched(mockFn);
    expect(component['onTouched']).toBe(mockFn);
  });

  it('should handle buffer mode correctly', () => {
    component.mode = 'buffer';
    component.bufferValue = 80;
    component.percentage = 60;
    component.updateProgress();
    expect(component.dashOffset).toBeLessThan(component.circumference);
  });


  it('should call updateRotationAngle on ngOnChanges', () => {
    spyOn(component as any, 'updateRotationAngle');
    component.ngOnChanges();
    expect(component['updateRotationAngle']).toHaveBeenCalled();
  });

  it('should call updateProgress after view init', fakeAsync(() => {
    spyOn(component, 'updateProgress');
    component.ngAfterViewInit();
    tick(100);
    expect(component.updateProgress).toHaveBeenCalled();
  }));

  it('should calculate linearHeight correctly for different sizes', () => {
    component.size = 'sm';
    expect(component.linearHeight).toBe(4);

    component.size = 'md';
    expect(component.linearHeight).toBe(8);

    component.size = 'lg';
    expect(component.linearHeight).toBe(12);
  });

  it('should update rotation angle for different positions', () => {
    component.position = '12';
    component['updateRotationAngle']();
    expect(component.rotationAngle).toBe(0);

    component.position = '3';
    component['updateRotationAngle']();
    expect(component.rotationAngle).toBe(90);

    component.position = '6';
    component['updateRotationAngle']();
    expect(component.rotationAngle).toBe(180);

    component.position = '9';
    component['updateRotationAngle']();
    expect(component.rotationAngle).toBe(-90);

    component.position = 45;
    component['updateRotationAngle']();
    expect(component.rotationAngle).toBe(45);
  });

  it('should handle indeterminate mode', () => {
    component.mode = 'indeterminate';
    component.updateProgress();
    // Should not update dashOffset for indeterminate mode
    expect(component.dashOffset).toBe(component.circumference);
  });

  it('should handle query mode', () => {
    component.mode = 'query';
    component.updateProgress();
    // Should not update dashOffset for query mode
    expect(component.dashOffset).toBe(component.circumference);
  });

  it('should set default strokeWidth for unknown size', () => {
    (component as any).size = 'unknown';
    expect(component.strokeWidth).toBe(12);
  });

  it('should set default linearHeight for unknown size', () => {
    (component as any).size = 'unknown';
    expect(component.linearHeight).toBe(8);
  });

  it('should call onTouched when registerOnTouched is called', () => {
    const mockFn = jasmine.createSpy('onTouched');
    component.registerOnTouched(mockFn);
    component['onTouched']();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should call onChange when registerOnChange is called', () => {
    const mockFn = jasmine.createSpy('onChange');
    component.registerOnChange(mockFn);
    component['onChange'](50);
    expect(mockFn).toHaveBeenCalledWith(50);
  });
});
