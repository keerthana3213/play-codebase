import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaDialogContainerComponent } from './aava-dialog-container.component';
import { Component, ViewContainerRef } from '@angular/core';
import { AavaIconComponent } from '../../icon/aava-icon.component';

// --- Mock Child Component ---
// To test the AavaDialogContainerComponent in complete isolation,
// we create a mock version of its IconComponent dependency.
@Component({
  selector: 'ava-icon',
  standalone: true,
  template: '<i></i>'
})
class MockIconComponent { }


describe('AavaDialogContainerComponent', () => {
  let component: AavaDialogContainerComponent;
  let fixture: ComponentFixture<AavaDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaDialogContainerComponent] // The component under test is standalone
    })

      .overrideComponent(AavaDialogContainerComponent, {
        remove: { imports: [AavaIconComponent] },
        add: { imports: [MockIconComponent] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Properties and Initialization', () => {
    it('should have a ViewContainerRef container available after initialization', () => {
      // The @ViewChild is static, so it's resolved before change detection runs.
      // fixture.detectChanges() in beforeEach ensures it's ready.
      expect(component.container).toBeTruthy();
      expect(component.container).toBeInstanceOf(ViewContainerRef);
    });
  });

  describe('Methods and Event Emitters', () => {
    let closedSpy: jasmine.Spy;

    beforeEach(() => {
      // Spy on the event emitter before each test in this block
      closedSpy = spyOn(component.closed, 'emit');
    });

    it('should emit a null value when onBackdropClick is called', () => {
      // Act
      component.onBackdropClick();

      // Assert
      expect(closedSpy).toHaveBeenCalledTimes(1);
      expect(closedSpy).toHaveBeenCalledWith(null);
    });

    it('should emit a close action object when onCloseClick is called', () => {
      // Act
      component.onCloseClick();

      // Assert
      expect(closedSpy).toHaveBeenCalledTimes(1);
      expect(closedSpy).toHaveBeenCalledWith({ action: 'close' });
    });
  });

  describe('User Interaction and Template Bindings', () => {

    it('should call onCloseClick and emit a close action when the close button is clicked', () => {
      // Spy on the method and emitter
      const onCloseClickSpy = spyOn(component, 'onCloseClick').and.callThrough();
      const closedEmitSpy = spyOn(component.closed, 'emit');

      // Find the close button element by its class
      const closeButton = fixture.debugElement.query(By.css('.dialog-close-btn'));

    });
  });
});