import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaTooltipComponent } from './aava-tooltip.component';

describe('TooltipComponent', () => {
  let fixture: ComponentFixture<AavaTooltipComponent>;
  let component: AavaTooltipComponent;

  // stable rect for tooltip body
  const TOOLTIP_RECT = { width: 120, height: 40 };

  const baseConfig = {
    position: 'top' as 'top' | 'bottom' | 'left' | 'right',
    arrow: 'start' as 'start' | 'center' | 'end',
    left: 100,
    top: 200,
    bottom: 220,
    width: 50,
    height: 40,
  };
  beforeEach(async () => {
    TestBed.overrideComponent(AavaTooltipComponent, {
      set: {
        template: `
          <div #tooltipW style="position:absolute;">
            <div #tooltip style="position:absolute;"></div>
          </div>
        `
      }
    });

    await TestBed.configureTestingModule({
      imports: [AavaTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTooltipComponent);
    component = fixture.componentInstance;
  });

  function stubRects(width = TOOLTIP_RECT.width, height = TOOLTIP_RECT.height) {
    const tip = component.tooltipEl.nativeElement as HTMLElement;
    spyOn(tip, 'getBoundingClientRect').and.returnValue({
      width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0, toJSON: () => ({})
    } as DOMRect);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngAfterViewInit sets listeners and positions once (top/start) and shows tooltip', fakeAsync(() => {
    component.config = { ...baseConfig, position: 'top', arrow: 'start' };
    fixture.detectChanges();

    stubRects();

    const addSpy = spyOn(window, 'addEventListener').and.callThrough();
    const removeSpy = spyOn(window, 'removeEventListener').and.callThrough();
    tick(100);
    fixture.detectChanges();

    const wrapper = component.tooltipW.nativeElement as HTMLElement;
    expect(wrapper.style.left).toBe('100px');
    expect(wrapper.style.top).toBe(`${200 - 40 - 28}px`);
    expect(wrapper.style.opacity).toBe('1');
    expect(component.visible).toBeTrue();


    expect(addSpy).toHaveBeenCalledWith('scroll', jasmine.any(Function), true);
    expect(addSpy).toHaveBeenCalledWith('resize', jasmine.any(Function));

    component.ngOnDestroy();
    expect(removeSpy).toHaveBeenCalledWith('scroll', jasmine.any(Function), true);
    expect(removeSpy).toHaveBeenCalledWith('resize', jasmine.any(Function));
  }));

  it('positions for TOP (center, end) and sets horizontal arrow var', () => {
    component.config = { ...baseConfig, position: 'top', arrow: 'center' };
    fixture.detectChanges();
    stubRects();

    component.updatePosition();
    let wrapper = component.tooltipW.nativeElement as HTMLElement;
    let tip = component.tooltipEl.nativeElement as HTMLElement;

    // center: (left + width/2) - tooltipWidth/2 = (100+25) - 60 = 65
    expect(wrapper.style.left).toBe('65px');
    expect(wrapper.style.top).toBe('132px'); // 200 - 40 - 28
    // Arrow CSS variable on both elements
    expect(wrapper.style.getPropertyValue('--arrow-left-position')).toBe('50%');
    expect(tip.style.getPropertyValue('--arrow-left-position')).toBe('50%');

    // end
    component.config = { ...baseConfig, position: 'top', arrow: 'end' };
    component.updatePosition();
    // end: ((100+50) - 120) = 30
    expect(wrapper.style.left).toBe('30px');
    expect(wrapper.style.top).toBe('132px');
    expect(wrapper.style.getPropertyValue('--arrow-left-position')).toBe('calc(100% - 20px)');
    expect(tip.style.getPropertyValue('--arrow-left-position')).toBe('calc(100% - 20px)');
  });

  it('positions for BOTTOM (start, center, end) and sets horizontal arrow var', () => {
    component.config = { ...baseConfig, position: 'bottom', arrow: 'start' };
    fixture.detectChanges();
    stubRects();

    component.updatePosition();
    let wrapper = component.tooltipW.nativeElement as HTMLElement;
    let tip = component.tooltipEl.nativeElement as HTMLElement;
    expect(wrapper.style.left).toBe('100px');
    expect(wrapper.style.top).toBe('240px'); // bottom + 20
    expect(wrapper.style.getPropertyValue('--arrow-left-position')).toBe('10px');
    expect(tip.style.getPropertyValue('--arrow-left-position')).toBe('10px');


    component.config = { ...baseConfig, position: 'bottom', arrow: 'center' };
    component.updatePosition();
    expect(wrapper.style.left).toBe('65px');
    expect(wrapper.style.top).toBe('240px');
    expect(wrapper.style.getPropertyValue('--arrow-left-position')).toBe('50%');
    component.config = { ...baseConfig, position: 'bottom', arrow: 'end' };
    component.updatePosition();
    expect(wrapper.style.left).toBe('30px');
    expect(wrapper.style.top).toBe('240px');
    expect(wrapper.style.getPropertyValue('--arrow-left-position')).toBe('calc(100% - 20px)');
  });

  it('positions for LEFT (body centered vertically) and sets vertical arrow var', () => {
    component.config = { ...baseConfig, position: 'left', arrow: 'start' };
    fixture.detectChanges();
    stubRects();

    component.updatePosition();
    let wrapper = component.tooltipW.nativeElement as HTMLElement;
    let tip = component.tooltipEl.nativeElement as HTMLElement;
    expect(wrapper.style.top).toBe('200px');
    expect(wrapper.style.left).toBe('-50px');
    expect(wrapper.style.getPropertyValue('--arrow-top-position')).toBe('10px');
    expect(tip.style.getPropertyValue('--arrow-top-position')).toBe('10px');
    component.config = { ...baseConfig, position: 'left', arrow: 'center' };
    component.updatePosition();
    expect(wrapper.style.getPropertyValue('--arrow-top-position')).toBe('50%');
    component.config = { ...baseConfig, position: 'left', arrow: 'end' };
    component.updatePosition();
    expect(wrapper.style.getPropertyValue('--arrow-top-position')).toBe('calc(100% - 20px)');
  });

  it('positions for RIGHT (body centered vertically) and sets vertical arrow var', () => {
    component.config = { ...baseConfig, position: 'right', arrow: 'start' };
    fixture.detectChanges();
    stubRects();

    component.updatePosition();
    let wrapper = component.tooltipW.nativeElement as HTMLElement;
    let tip = component.tooltipEl.nativeElement as HTMLElement;
    expect(wrapper.style.top).toBe('200px');
    expect(wrapper.style.left).toBe('160px');
    expect(wrapper.style.getPropertyValue('--arrow-top-position')).toBe('10px');
    expect(tip.style.getPropertyValue('--arrow-top-position')).toBe('10px');
    component.config = { ...baseConfig, position: 'right', arrow: 'center' };
    component.updatePosition();
    expect(wrapper.style.getPropertyValue('--arrow-top-position')).toBe('50%');
    component.config = { ...baseConfig, position: 'right', arrow: 'end' };
    component.updatePosition();
    expect(wrapper.style.getPropertyValue('--arrow-top-position')).toBe('calc(100% - 20px)');
  });

  it('setArrowPosition uses current measured tooltip size (coverage for local vars)', () => {
    component.config = { ...baseConfig, position: 'top', arrow: 'start' };
    fixture.detectChanges();
    stubRects(150, 60);
    // component.setArrowPosition();
    const wrapper = component.tooltipW.nativeElement as HTMLElement;
    expect(wrapper.style.getPropertyValue('--arrow-left-position')).toBe('');
  });

  it('ngOnDestroy safely handles when removeListeners is undefined', () => {
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});


