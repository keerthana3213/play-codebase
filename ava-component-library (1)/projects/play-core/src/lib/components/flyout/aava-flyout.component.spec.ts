import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaFlyoutComponent } from './aava-flyout.component';

describe('AavaFlyoutComponent', () => {
  let component: AavaFlyoutComponent;
  let fixture: ComponentFixture<AavaFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaFlyoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Mock panelRef
    component.panelRef = {
      nativeElement: document.createElement('div'),
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the flyout relative to trigger element', fakeAsync(() => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    spyOn<any>(component, 'positionPanel');

    component.open(trigger);
    tick(); // flush setTimeout

    expect(component.isOpen).toBeTrue();
    expect(component['positionPanel']).toHaveBeenCalledWith(trigger);

    trigger.remove();
  }));

  it('should open the flyout relative to container element', fakeAsync(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    spyOn<any>(component, 'positionPanelRelative');

    component.openRelativeTo(container);
    tick();

    expect(component.isOpen).toBeTrue();
    expect(component['positionPanelRelative']).toHaveBeenCalledWith(container);

    container.remove();
  }));

  it('should toggle open and close', fakeAsync(() => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    spyOn(component, 'open').and.callThrough();

    component.toggle(trigger);
    tick();

    expect(component.isOpen).toBeTrue();
    expect(component.open).toHaveBeenCalledWith(trigger);

    component.toggle();
    expect(component.isOpen).toBeFalse();

    trigger.remove();
  }));

  it('should close the flyout', () => {
    component.isOpen = true;
    component.close();
    expect(component.isOpen).toBeFalse();
  });

  it('should apply positioning styles in positionPanel', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    spyOn(component['renderer'], 'setStyle');

    Object.defineProperty(trigger, 'getBoundingClientRect', {
      value: () => ({ top: 10, bottom: 20, left: 30, width: 50, height: 20 }),
    });

    Object.defineProperty(component.panelRef.nativeElement, 'getBoundingClientRect', {
      value: () => ({ width: 100, height: 50 }),
    });

    (component as any).positionPanel(trigger);

    expect(component['renderer'].setStyle).toHaveBeenCalled();

    trigger.remove();
  });

  it('should apply positioning styles in positionPanelRelative', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    spyOn(component['renderer'], 'setStyle');

    Object.defineProperty(container, 'getBoundingClientRect', {
      value: () => ({ top: 5, bottom: 15, left: 25, width: 60, height: 30 }),
    });

    (component as any).positionPanelRelative(container);

    expect(component['renderer'].setStyle).toHaveBeenCalled();

    container.remove();
  });
});
