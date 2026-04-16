import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { AavaPopOverComponent, PopOverConfig, PopOverData } from './aava-pop-over.component';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../icon/aava-icon.component'; // adjust path if needed

describe('PopOverComponent', () => {
  let component: AavaPopOverComponent;
  let fixture: ComponentFixture<AavaPopOverComponent>;

  const mockData: PopOverData[] = [
    { header: 'Header1', description: 'Desc1', learnMoreUrl: 'http://test.com' },
    { header: 'Header2', description: 'Desc2' }
  ];

  const mockConfig: PopOverConfig = {
    arrow: 'center',
    position: 'top',
    left: 10,
    top: 20,
    bottom: 30,
    width: 100,
    height: 50,
    showButtons: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AavaIconComponent, AavaPopOverComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaPopOverComponent);
    component = fixture.componentInstance;

    // Mock DOM elements
    const styleMock = {
      left: '',
      top: '',
      opacity: '',
      setProperty: jasmine.createSpy('setProperty') // <-- key change
    };

    const mockPopover = {
      nativeElement: {
        getBoundingClientRect: () => ({ width: 100, height: 50 }),
        style: styleMock
      }
    };

    const mockPopoverW = {
      nativeElement: {
        getBoundingClientRect: () => ({ width: 100, height: 50 }),
        style: styleMock
      }
    };

    component.popoverEl = mockPopover as unknown as ElementRef;
    component.popoverW = mockPopoverW as unknown as ElementRef;

    component.config = { ...mockConfig };
    component.data = [...mockData];

    fixture.detectChanges();
  });
  it('should initialize with visible true if data exists', () => {
    component.ngOnInit();
    expect(component.visible).toBeTrue();
    expect(component.currentIndex).toBe(0);
  });

  it('should keep currentIndex as 0 if no data', () => {
    component.data = [];
    component.ngOnInit();
    expect(component.currentIndex).toBe(0);
  });

  it('should return currentData correctly', () => {
    expect(component.currentData).toEqual(mockData[0]);
    component.data = [];
    expect(component.currentData).toBeNull();
  });

  it('should return currentPage correctly', () => {
    expect(component.currentPage).toBe('1/2');
    component.data = [];
    expect(component.currentPage).toBe('1/0');
  });

  it('should correctly identify hasPrevious and hasNext', () => {
    expect(component.hasPrevious).toBeFalse();
    expect(component.hasNext).toBeTrue();
    component.currentIndex = 1;
    expect(component.hasPrevious).toBeTrue();
    expect(component.hasNext).toBeFalse();
  });

  it('should go to previous page if available', () => {
    component.currentIndex = 1;
    const spy = spyOn(component['cdr'], 'markForCheck');
    component.previous();
    expect(component.currentIndex).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  it('should not go to previous if not available', () => {
    component.currentIndex = 0;
    component.previous();
    expect(component.currentIndex).toBe(0);
  });

  it('should go to next page if available', () => {
    const spy = spyOn(component['cdr'], 'markForCheck');
    component.next();
    expect(component.currentIndex).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should not go to next if not available', () => {
    component.currentIndex = 1;
    component.next();
    expect(component.currentIndex).toBe(1);
  });

  it('should skip and hide popover', () => {
    const spy = spyOn(component['cdr'], 'markForCheck');
    component.skip();
    expect(component.visible).toBeFalse();
    expect(spy).toHaveBeenCalled();
  });

  it('should open learnMore url if present', () => {
    const spy = spyOn(window, 'open');
    component.learnMore();
    expect(spy).toHaveBeenCalledWith('http://test.com', '_blank');
  });

  it('should not open learnMore if url not present', () => {
    component.currentIndex = 1;
    const spy = spyOn(window, 'open');
    component.learnMore();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update position for top-center', () => {
    component.updatePosition();
    expect(component.popoverW.nativeElement.style.opacity).toBe('1');
  });

  it('should update position for bottom-end', () => {
    component.config.position = 'bottom';
    component.config.arrow = 'end';
    component.updatePosition();
    expect(component.popoverW.nativeElement.style.opacity).toBe('1');
  });

  it('should update position for left', () => {
    component.config.position = 'left';
    component.updatePosition();
    expect(component.popoverW.nativeElement.style.opacity).toBe('1');
  });

  it('should update position for right', () => {
    component.config.position = 'right';
    component.updatePosition();
    expect(component.popoverW.nativeElement.style.opacity).toBe('1');
  });

  it('should handle setArrowPosition for top-start', () => {
    const styleObj = component.popoverW.nativeElement.style;
    spyOn(styleObj, 'setProperty'); // ✅ force spy on the actual live style object

    component.config.position = 'top';
    component.config.arrow = 'start';
    component.setArrowPosition();

    expect(styleObj.setProperty).toHaveBeenCalledWith('--arrow-left-position', '20px');
  });

  it('should handle setArrowPosition for bottom-center', () => {
    const styleObj = component.popoverW.nativeElement.style;
    spyOn(styleObj, 'setProperty'); // ✅ Make it a spy

    component.config.position = 'bottom';
    component.config.arrow = 'center';
    component.setArrowPosition();

    expect(styleObj.setProperty)
      .toHaveBeenCalledWith('--arrow-left-position', '50%');
  });

  it('should handle setArrowPosition for bottom-end', () => {
    const styleObj = component.popoverW.nativeElement.style;
    spyOn(styleObj, 'setProperty'); // ✅ make it a spy on the actual object

    component.config.position = 'bottom';
    component.config.arrow = 'end';
    component.setArrowPosition();

    expect(styleObj.setProperty)
      .toHaveBeenCalledWith('--arrow-left-position', 'calc(100% - 20px)');
  });


  it('should handle setArrowPosition for left-center', () => {
    const styleObj = component.popoverW.nativeElement.style;
    spyOn(styleObj, 'setProperty'); // ✅ make it a spy

    component.config.position = 'left';
    component.config.arrow = 'center';
    component.setArrowPosition();

    expect(styleObj.setProperty)
      .toHaveBeenCalledWith('--arrow-top-position', '50%');
  });


  it('should handle setArrowPosition for right-end', () => {
    const styleObj = component.popoverW.nativeElement.style;
    spyOn(styleObj, 'setProperty'); // ✅ Make it a spy

    component.config.position = 'right';
    component.config.arrow = 'end';
    component.setArrowPosition();

    expect(styleObj.setProperty)
      .toHaveBeenCalledWith('--arrow-top-position', 'calc(100% - 20px)');
  });


  it('should not update position if config is invalid', () => {
    component.config = {} as any;
    component.updatePosition();
    // no errors expected
  });

  it('should register and remove listeners in ngAfterViewInit and ngOnDestroy', fakeAsync(() => {
    const spyAdd = spyOn(window, 'addEventListener');
    const spyRemove = spyOn(window, 'removeEventListener');
    component.ngAfterViewInit();
    tick(100);
    expect(spyAdd).toHaveBeenCalled();
    component.ngOnDestroy();
    expect(spyRemove).toHaveBeenCalled();
  }));
});
