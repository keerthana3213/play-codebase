import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaCarouselComponent, CarouselItem } from './aava-carousel.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';

describe('AavaCarouselComponent', () => {
  let component: AavaCarouselComponent;
  let fixture: ComponentFixture<AavaCarouselComponent>;
  let router: Router;

  const items: CarouselItem[] = [
    { id: '1', title: 'One', imageUrl: '1.png', routeUrl: '/one' },
    { id: '2', title: 'Two', imageUrl: '2.png' },
    { id: '3', title: 'Three', imageUrl: '3.png' },
    { id: '4', title: 'Four', imageUrl: '4.png' },
    { id: '5', title: 'Five', imageUrl: '5.png' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCarouselComponent, RouterTestingModule.withRoutes([]),
        LucideAngularModule.pick({ ChevronLeft, ChevronRight })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaCarouselComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.items = [...items];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize active index from input or default to 0', () => {
    component.activeIndex = 2;
    const spyUpdate = spyOn<any>(component as any, 'updateCarouselPosition');
    component.ngOnInit();
    expect(component.currentActiveIndex).toBe(2);
    expect(spyUpdate).toHaveBeenCalled();

    // Reset and test default
    const cmp = TestBed.createComponent(AavaCarouselComponent).componentInstance;
    cmp.items = [...items];
    spyOn<any>(cmp as any, 'updateCarouselPosition');
    cmp.ngOnInit();
    expect(cmp.currentActiveIndex).toBe(0);
  });

  it('computedStyles should merge custom styles and include transition-duration', () => {
    component.customStyles = { background: 'red' } as any;
    const styles = component.computedStyles;
    expect(styles['background']).toBe('red');
    expect(styles['transition-duration']).toBe(`${component.transitionDuration}ms`);
  });

  it('getCarouselSizeClass should return correct class', () => {
    component.size = 'lg';
    expect(component.getCarouselSizeClass()).toBe('ava-carousel--lg');
  });

  it('getCardPositionClass should handle offsets and wrapping', () => {
    component.activeIndex = 0;
    component.ngOnInit();
    component.size = 'md';

    expect(component.getCardPositionClass(0)).toContain('ava-carousel__item--center');
    expect(component.getCardPositionClass(1)).toContain('ava-carousel__item--right-1');
    expect(component.getCardPositionClass(2)).toContain('ava-carousel__item--right-2');
    expect(component.getCardPositionClass(4)).toContain('ava-carousel__item--left-1');
  });

  it('getVisibleCards should return 5 items with wrapped indices', () => {
    component.activeIndex = 4;
    component.ngOnInit();
    const visible = component.getVisibleCards();
    expect(visible.length).toBe(5);
    const indices = visible.map(v => v.index);
    expect(indices).toEqual([2, 3, 4, 0, 1]);
  });

  it('goToNext should advance index and emit itemChange', () => {
    component.activeIndex = 0;
    component.ngOnInit();
    const spyEmit = spyOn(component['itemChange'], 'emit');
    const spyUpdate = spyOn<any>(component as any, 'updateCarouselPosition');
    component.goToNext();
    expect(component.currentActiveIndex).toBe(1);
    expect(spyUpdate).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith({ item: items[1], index: 1 });
  });

  it('goToPrevious should wrap around and emit itemChange', () => {
    component.activeIndex = 0;
    component.ngOnInit();
    const spyEmit = spyOn(component['itemChange'], 'emit');
    component.goToPrevious();
    expect(component.currentActiveIndex).toBe(items.length - 1);
    expect(spyEmit).toHaveBeenCalledWith({ item: items[items.length - 1], index: items.length - 1 });
  });

  it('goToSlide should change index when valid and emit', () => {
    component.activeIndex = 0;
    component.ngOnInit();
    const spyEmit = spyOn(component['itemChange'], 'emit');
    component.goToSlide(3);
    expect(component.currentActiveIndex).toBe(3);
    expect(spyEmit).toHaveBeenCalledWith({ item: items[3], index: 3 });

    spyEmit.calls.reset();
    component.goToSlide(3);
    expect(spyEmit).not.toHaveBeenCalled();

    component.goToSlide(-1);
    component.goToSlide(999);
    expect(component.currentActiveIndex).toBe(3);
  });

  it('onIndicatorClick should navigate to slide', () => {
    const spy = spyOn(component, 'goToSlide');
    component.onIndicatorClick(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('isIndicatorActive should reflect current index', () => {
    component.activeIndex = 1;
    component.ngOnInit();
    expect(component.isIndicatorActive(1)).toBeTrue();
    expect(component.isIndicatorActive(0)).toBeFalse();
  });

  it('onCardClick should navigate router when clicking active card with routeUrl', () => {
    component.activeIndex = 0;
    component.ngOnInit();
    const spyNav = spyOn(router, 'navigate');
    component.onCardClick(0);
    expect(spyNav).toHaveBeenCalledWith(['/one']);
  });

  it('onCardClick should goToSlide when clicking non-active card', () => {
    component.activeIndex = 0;
    component.ngOnInit();
    const spySlide = spyOn(component, 'goToSlide');
    component.onCardClick(2);
    expect(spySlide).toHaveBeenCalledWith(2);
  });

  it('startAutoplay and stopAutoplay should control interval', fakeAsync(() => {
    component.autoplayInterval = 100;
    const spyNext = spyOn(component, 'goToNext');
    component.startAutoplay();
    tick(101);
    expect(spyNext).toHaveBeenCalledTimes(1);
    tick(100);
    expect(spyNext).toHaveBeenCalledTimes(2);
    component.stopAutoplay();
    tick(300);
    expect(spyNext.calls.count()).toBe(2);
  }));

  it('toggleAutoplay should flip flag and start/stop accordingly', fakeAsync(() => {
    component.autoplayInterval = 50;
    const spyNext = spyOn(component, 'goToNext');
    component.autoplay = false;
    component.toggleAutoplay();
    expect(component.autoplay).toBeTrue();
    tick(60);
    expect(spyNext).toHaveBeenCalled();

    component.toggleAutoplay();
    expect(component.autoplay).toBeFalse();
    const before = spyNext.calls.count();
    tick(200);
    expect(spyNext.calls.count()).toBe(before);
  }));

  it('ngOnChanges should respond to autoplay and interval changes', fakeAsync(() => {
    const spyStart = spyOn(component, 'startAutoplay');
    const spyStop = spyOn(component, 'stopAutoplay');

    component.autoplay = true;
    component.ngOnChanges({ autoplay: { firstChange: false } as any });
    expect(spyStart).toHaveBeenCalled();

    spyStart.calls.reset();
    component.autoplay = false;
    component.ngOnChanges({ autoplay: { firstChange: false } as any });
    expect(spyStop).toHaveBeenCalled();

    component.autoplay = true;
    component.ngOnChanges({ autoplayInterval: { firstChange: false } as any });
    expect(spyStart).toHaveBeenCalled();
  }));

  it('ngOnChanges should update activeIndex and clamp on items change', () => {
    const spyUpdate = spyOn<any>(component as any, 'updateCarouselPosition');
    component.activeIndex = 3;
    component.ngOnChanges({ activeIndex: { firstChange: false } as any });
    expect(component.currentActiveIndex).toBe(3);
    expect(spyUpdate).toHaveBeenCalled();

    spyUpdate.calls.reset();
    component.items = items.slice(0, 2);
    (component as any)._activeIndex = 5;
    component.ngOnChanges({ items: { firstChange: false } as any });
    expect(component.currentActiveIndex).toBe(1);
    expect(spyUpdate).toHaveBeenCalled();
  });

  it('onWheel should debounce and go next/prev', fakeAsync(() => {
    const spyNext = spyOn(component, 'goToNext');
    const spyPrev = spyOn(component, 'goToPrevious');
    component.onWheel({ deltaX: 50 } as WheelEvent);
    tick(60);
    expect(spyNext).toHaveBeenCalled();

    component.onWheel({ deltaX: -50 } as WheelEvent);
    tick(60);
    expect(spyPrev).toHaveBeenCalled();
  }));

  it('trackBy functions should return stable keys', () => {
    const cardInfo = { index: 7, positionClass: 'x' };
    expect(component.trackByCardIndex(0, cardInfo)).toBe(7);
    expect(component.trackByItemId(0, { id: 'abc' } as CarouselItem)).toBe('abc');
    expect(component.trackByItemId(3, { id: '' } as any)).toBe('3');
  });

  it('ngOnDestroy should remove listeners and stop timers', () => {
    // Ensure stopAutoplay is called
    const spyStop = spyOn(component, 'stopAutoplay');
    // Simulate container with spy for removeEventListener
    const fakeEl = document.createElement('div');
    spyOn(fakeEl, 'removeEventListener');
    (component as any).carouselContainer = { nativeElement: fakeEl } as any;
    component.ngOnDestroy();
    expect(spyStop).toHaveBeenCalled();
    expect(fakeEl.removeEventListener).toHaveBeenCalled();
  });
});


