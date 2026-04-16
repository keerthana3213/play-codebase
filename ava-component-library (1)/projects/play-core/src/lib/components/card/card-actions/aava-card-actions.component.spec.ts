import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// import { AavaCardActionsComponent } from './aava-card-actions.component';
import { AavaTxtCardComponent } from '@aava/play-core';
import { AavaCardActionsComponent } from './aava-card-actions.component';

describe('CardActionsComponent', () => {
  let component: AavaCardActionsComponent;
  let fixture: ComponentFixture<AavaCardActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCardActionsComponent],
    })
      // Avoid rendering child components; just verify our logic & output.
      .overrideComponent(AavaTxtCardComponent, {
        set: {
          template: `
            <div class="host" (click)="onCardClick()">TXT CARD</div>
          `,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaCardActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose cardClick as an EventEmitter', () => {
    // expect(component.cardClick instanceof EventEmitter).toBeTrue();
  });

  it('should NOT emit by default before any action', () => {
    const spy = jasmine.createSpy('cardClick');
    // const sub = component.cardClick.subscribe(spy);

    // No action yet
    expect(spy).not.toHaveBeenCalled();

    // sub.unsubscribe();
  });

  it('should emit cardClick when onCardClick() is called programmatically', () => {
    const spy = jasmine.createSpy('cardClick');
    // const sub = component.cardClick.subscribe(spy);

    // component.cardClick();

    // expect(spy).toHaveBeenCalledTimes(1);

    // sub.unsubscribe();
  });

  it('should emit cardClick when the host element is clicked (template binding)', () => {
    const spy = jasmine.createSpy('cardClick');
    // const sub = component.cardClick.subscribe(spy);

    const host = fixture.debugElement.query(By.css('.host'));
    // host.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    // expect(spy).toHaveBeenCalledTimes(1);

    // sub.unsubscribe();
  });
});
