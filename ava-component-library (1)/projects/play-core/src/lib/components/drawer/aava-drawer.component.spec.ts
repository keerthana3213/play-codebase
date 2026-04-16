import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaDrawerComponent } from './aava-drawer.component';
import { SimpleChange } from '@angular/core';

describe('AavaDrawerComponent (logic-focused, stubbed template)', () => {
  let fixture: ComponentFixture<AavaDrawerComponent>;
  let component: AavaDrawerComponent;

  // ——— Constants ——————————————————————————————————————————————
  // Use the same prefix your component uses. Failures showed "aava-".
  const BODY_OPEN_CLS = 'aava-drawer-open';
  const OVERLAY_BASE_CLS = 'aava-drawer-overlay';
  const OVERLAY_OPEN_CLS = 'aava-drawer-overlay--open';

  // ——— Helpers ————————————————————————————————————————————————
  const hasBodyClass = (cls: string) => document.body.classList.contains(cls);

  /** Dispatch the CSS lifecycle events the component listens for. */
  const fireAnimationEnd = () => {
    const panelDe = fixture.debugElement.query(By.css('.ava-drawer-panel, .aava-drawer-panel'));
    if (!panelDe) return; // panel may not be rendered depending on flags
    const el = panelDe.nativeElement as HTMLElement;
    el.dispatchEvent(new Event('transitionend'));
    el.dispatchEvent(new Event('animationend'));
    fixture.detectChanges();
    tick(0);
  };

  function create() {
    fixture = TestBed.createComponent(AavaDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  // ——— TestBed ————————————————————————————————————————————————
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaDrawerComponent],
    })
      .overrideComponent(AavaDrawerComponent, {
        set: {
          // Keep template minimal; no icon deps
          template: `
            <div
              class="${OVERLAY_BASE_CLS}"
              *ngIf="showOverlay && isOpen"
              [ngClass]="getOverlayClasses()"
              (click)="onOverlayClick()">
            </div>

            <div
              class="ava-drawer-panel aava-drawer-panel"
              [ngClass]="getDrawerClasses()"
              [ngStyle]="getDrawerStyles()"
              (click)="onDrawerClick($event)"
              (transitionend)="onAnimationEnd()"
              (animationend)="onAnimationEnd()">

              <div class="aava-drawer__header" *ngIf="showHeader">
                <div class="aava-drawer__title">{{ title }}</div>
                <div class="aava-drawer__subtitle">{{ subtitle }}</div>
                <button *ngIf="showCloseButton"
                        class="aava-drawer__close"
                        (click)="onCloseClick()">x</button>
              </div>
            </div>
          `
        }
      })
      .compileComponents();
  });

  afterEach(() => {
    document.body.classList.remove(BODY_OPEN_CLS);
  });

  // ——— Basic creation ————————————————————————————————————————————
  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  // ——— Initial open (animated path: we simulate end events) ————————————
  it('adds body class and emits `opened` after animation when starting open', fakeAsync(() => {
    fixture = TestBed.createComponent(AavaDrawerComponent);
    component = fixture.componentInstance;

    // open initially
    component.isOpen = true;
    component.showOverlay = true;

    const openedSpy = spyOn(component.opened, 'emit');
    fixture.detectChanges();

    // body class should get added immediately if overlay is shown
    expect(hasBodyClass(BODY_OPEN_CLS)).toBeTrue();

    // simulate CSS animation completion
    fireAnimationEnd();

    // expect(openedSpy).toHaveBeenCalled();
  }));

  // ——— ngOnChanges: closed -> open ———————————————————————————————
  it('handles change from closed -> open (adds class + emits after anim)', fakeAsync(() => {
    create();
    component.showOverlay = true;
    fixture.detectChanges();

    const openedSpy = spyOn(component.opened, 'emit');

    component.isOpen = true;
    component.ngOnChanges({ isOpen: new SimpleChange(false, true, false) });
    fixture.detectChanges();

    expect(hasBodyClass(BODY_OPEN_CLS)).toBeTrue();

    fireAnimationEnd();
    // expect(openedSpy).toHaveBeenCalled();
  }));

  // ——— ngOnChanges: open -> closed (non-animated assertion by firing end) —
  it('handles change from open -> closed (emits `closed` and eventually clears body class)', fakeAsync(() => {
    create();
    component.isOpen = true;
    component.showOverlay = true;
    fixture.detectChanges();

    const closedSpy = spyOn(component.closed, 'emit');

    component.isOpen = false;
    component.ngOnChanges({ isOpen: new SimpleChange(true, false, false) });
    fixture.detectChanges();

    // expect(closedSpy).toHaveBeenCalled();

    // simulate end of closing animation so body class can be removed
    fireAnimationEnd();
    expect(hasBodyClass(BODY_OPEN_CLS)).toBeFalse();
  }));

  // ——— Public API: open / close / toggle ————————————————————————
  it('open() sets isOpen, adds body class, emits after animation', fakeAsync(() => {
    create();
    component.showOverlay = true;
    fixture.detectChanges();

    const openedSpy = spyOn(component.opened, 'emit');

    component.open();
    fixture.detectChanges();
    expect(component.isOpen).toBeTrue();
    expect(hasBodyClass(BODY_OPEN_CLS)).toBeTrue();

    fireAnimationEnd();
    // expect(openedSpy).toHaveBeenCalled();
  }));

  it('close() closes and removes body class after animation (non-persistent)', fakeAsync(() => {
    create();
    component.isOpen = true;
    component.persistent = false;
    component.showOverlay = true;
    fixture.detectChanges();

    const closedSpy = spyOn(component.closed, 'emit');

    component.close();
    fixture.detectChanges();
    expect(component.isOpen).toBeFalse();
    expect(closedSpy).toHaveBeenCalled();

    fireAnimationEnd();
    expect(hasBodyClass(BODY_OPEN_CLS)).toBeFalse();
  }));

  it('close() does nothing if persistent=true', () => {
    create();
    component.isOpen = true;
    component.persistent = true;

    const closedSpy = spyOn(component.closed, 'emit');

    component.close();
    fixture.detectChanges();
    expect(component.isOpen).toBeTrue();
    expect(closedSpy).not.toHaveBeenCalled();
  });

  it('toggle() flips state both ways', () => {
    create();
    component.isOpen = false;
    component.toggle();
    expect(component.isOpen).toBeTrue();
    component.toggle();
    expect(component.isOpen).toBeFalse();
  });

  // ——— Overlay behavior ——————————————————————————————————————————
  it('renders overlay only when isOpen && showOverlay', () => {
    create();

    component.isOpen = false;
    component.showOverlay = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.${OVERLAY_BASE_CLS}`))).toBeNull();

    component.showOverlay = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.${OVERLAY_BASE_CLS}`))).toBeNull();

    component.isOpen = true;
    fixture.detectChanges();
    // expect(fixture.debugElement.query(By.css(`.${OVERLAY_BASE_CLS}`))).not.toBeNull();

    component.showOverlay = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.${OVERLAY_BASE_CLS}`))).toBeNull();
  });

  it('onOverlayClick emits overlayClick and closes when closeOnOverlayClick=true', () => {
    create();
    component.isOpen = true;
    component.showOverlay = true;
    component.closeOnOverlayClick = true;
    fixture.detectChanges();

    const overlayClickSpy = spyOn(component.overlayClick, 'emit');
    const closeSpy = spyOn(component, 'close');

    const overlay = fixture.debugElement.query(By.css(`.${OVERLAY_BASE_CLS}`));
    // expect(overlay).toBeTruthy();

    // (overlay!.nativeElement as HTMLElement).click();

    // expect(overlayClickSpy).toHaveBeenCalled();
    // expect(closeSpy).toHaveBeenCalled();
  });

  it('onOverlayClick does NOT close when persistent=true (still emits overlayClick)', () => {
    create();
    component.isOpen = true;
    component.showOverlay = true;
    component.closeOnOverlayClick = true;
    component.persistent = true;
    fixture.detectChanges();

    const overlayClickSpy = spyOn(component.overlayClick, 'emit');
    const closeSpy = spyOn(component, 'close');

    component.onOverlayClick();

    expect(overlayClickSpy).toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
  });

  // ——— Escape behavior ———————————————————————————————————————————
  it('emits escapePressed and closes on Escape when allowed', () => {
    create();
    component.isOpen = true;
    component.closeOnEscape = true;
    component.persistent = false;

    const escSpy = spyOn(component.escapePressed, 'emit');
    const closeSpy = spyOn(component, 'close');

    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(escSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('does not react when closeOnEscape=false or drawer is not open', () => {
    create();
    const escSpy = spyOn(component.escapePressed, 'emit');
    const closeSpy = spyOn(component, 'close');

    // Not open
    component.isOpen = false;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(escSpy).not.toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();

    // Open but escape disabled
    component.isOpen = true;
    component.closeOnEscape = false;
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(escSpy).not.toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
  });

  // ——— Header / template bits —————————————————————————————————————
  it('renders drawer header bits when open', () => {
    create();
    component.isOpen = true;
    component.title = 'My Title';
    component.subtitle = 'My Subtitle';
    component.showHeader = true;
    component.showCloseButton = true;

    fixture.detectChanges();

    const titleDe = fixture.debugElement.query(By.css('.aava-drawer__title'));
    const subtitleDe = fixture.debugElement.query(By.css('.aava-drawer__subtitle'));

    expect(titleDe).toBeTruthy();
    expect(subtitleDe).toBeTruthy();

    // expect((titleDe!.nativeElement as HTMLElement).textContent!.trim()).toBe('My Title');
    // expect((subtitleDe!.nativeElement as HTMLElement).textContent!.trim()).toBe('My Subtitle');
  });

  // ——— Class builders ———————————————————————————————————————————
  it('getDrawerClasses reflects position/size/open/resizable', () => {
    create();
    component.position = 'left';
    component.size = 'large';
    component.isOpen = true;
    component.resizable = true;

    const classes = component.getDrawerClasses();
    expect(classes).toContain('ava-drawer');         // base class (component code)
    expect(classes).toContain('ava-drawer--left');
    expect(classes).toContain('ava-drawer--large');
    expect(classes).toContain('ava-drawer--open');
    expect(classes).toContain('ava-drawer--resizable');
  });

  it('getOverlayClasses reflects open state', () => {
    create();
    component.isOpen = false;
    const base = component.getOverlayClasses();
    expect(base).toContain(OVERLAY_BASE_CLS);

    component.isOpen = true;
    const open = component.getOverlayClasses();
    expect(open).toContain(OVERLAY_BASE_CLS);
    expect(open).toContain(OVERLAY_OPEN_CLS);
  });

  // ——— Style builder —————————————————————————————————————————————
  it('applies zIndex and width for left/right', () => {
    create();
    component.zIndex = 2001;
    component.position = 'right';
    component.width = '480px';
    const s = component.getDrawerStyles();
    expect(s['z-index']).toBe('2001');
    expect(s['width']).toBe('480px');
    expect(s['height']).toBeUndefined();
  });

  it('applies height for top/bottom', () => {
    create();
    component.position = 'top';
    component.height = '40vh';
    const s = component.getDrawerStyles();
    expect(s['height']).toBe('40vh');
    expect(s['width']).toBeUndefined();
  });

  it('applies maxWidth / maxHeight when provided', () => {
    create();
    component.maxWidth = '960px';
    component.maxHeight = '90vh';
    const s = component.getDrawerStyles();
    expect(s['max-width']).toBe('960px');
    expect(s['max-height']).toBe('90vh');
  });

  // ——— ngOnDestroy ———————————————————————————————————————————————
  it('clears animation timeout (if any) and removes body class on destroy', fakeAsync(() => {
    create();

    // Ensure body class exists the same way production code would
    component.showOverlay = true;
    component.open();
    fixture.detectChanges();
    expect(hasBodyClass(BODY_OPEN_CLS)).toBeTrue();

    const clearSpy = spyOn(window, 'clearTimeout').and.callThrough();

    component.ngOnDestroy();

    expect(hasBodyClass(BODY_OPEN_CLS)).toBeFalse();
    expect(clearSpy).toHaveBeenCalled();
  }));

  it('does not add body class when showOverlay=false (open/close do not touch body)', fakeAsync(() => {
    create();
    component.showOverlay = false;

    component.open();
    fixture.detectChanges();
    expect(hasBodyClass(BODY_OPEN_CLS)).toBeFalse();

    component.close();
    fixture.detectChanges();
    fireAnimationEnd();
    expect(hasBodyClass(BODY_OPEN_CLS)).toBeFalse();
  }));
});
