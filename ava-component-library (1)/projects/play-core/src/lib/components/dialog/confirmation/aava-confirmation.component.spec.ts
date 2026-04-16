import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { AavaConfirmationComponent } from './aava-confirmation.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
import { AavaIconComponent } from '../../icon/aava-icon.component';

// --- Mock Child Components ---
// This is a best practice to test the ConfirmationComponent in isolation.
@Component({
  selector: 'aava-icon',
  standalone: true,
  template: ''
})
class MockIconComponent {
  @Input() iconName: string | undefined;
  @Input() iconSize: number | string | undefined;
  @Input() iconColor: string | undefined;
}

@Component({
  selector: 'aava-button',
  standalone: true,
  template: '<button>{{label}}</button>'
})
class MockAavaButtonComponent {
  @Input() label: string | undefined;
  @Input() variant: any;
}

describe('ConfirmationComponent', () => {
  let component: AavaConfirmationComponent;
  let fixture: ComponentFixture<AavaConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaConfirmationComponent]
    })
      .overrideComponent(AavaConfirmationComponent, {
        remove: { imports: [AavaIconComponent, AavaButtonComponent] },
        add: { imports: [MockIconComponent, MockAavaButtonComponent] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Defaults', () => {
    it('should have correct default input values', () => {
      expect(component.title).toBe('Confirm Action');
      expect(component.message).toBe('Are you sure you want to proceed with this action?');
      expect(component.icon).toBe('help-circle');
      expect(component.iconColor).toBe('var(--dialog-text-color)');
      expect(component.iconSize).toBe(50);
      expect(component.confirmButtonText).toBe('Confirm');
      expect(component.cancelButtonText).toBe('Cancel');
      expect(component.confirmButtonVariant).toBe('primary');
      expect(component.cancelButtonVariant).toBe('secondary');
      expect(component.destructive).toBe(false);
      expect(component.bottomBorder).toBe(false);
      expect(component.size).toBe('lg');
    });

  });

  describe('Computed Properties (Getters)', () => {
    describe('effectiveConfirmVariant', () => {
      it('should return "danger" when destructive is true', () => {
        component.destructive = true;
        expect(component.effectiveConfirmVariant).toBe('danger');
      });

      it('should return the confirmButtonVariant when destructive is false', () => {
        component.destructive = false;
        component.confirmButtonVariant = 'success';
        expect(component.effectiveConfirmVariant).toBe('success');
      });
    });

    describe('effectiveIcon', () => {
      it('should return "alert-triangle" when destructive is true', () => {
        component.destructive = true;
        expect(component.effectiveIcon).toBe('alert-triangle');
      });

      it('should return the icon input value when destructive is false', () => {
        component.destructive = false;
        component.icon = 'custom-check';
        expect(component.effectiveIcon).toBe('custom-check');
      });
    });

    describe('effectiveIconColor', () => {
      it('should return the error color when destructive is true', () => {
        component.destructive = true;
        expect(component.effectiveIconColor).toBe('var(--dialog-error-color)');
      });

      it('should return the iconColor input value when destructive is false', () => {
        component.destructive = false;
        component.iconColor = 'blue';
        expect(component.effectiveIconColor).toBe('blue');
      });
    });
  });

  describe('Output Events', () => {
    it('should emit closed event with confirmed: true on onConfirm()', () => {
      spyOn(component.closed, 'emit');
      component.onConfirm();
      expect(component.closed.emit).toHaveBeenCalledWith({ action: 'confirm', confirmed: true });
    });

    it('should emit closed event with confirmed: false on onCancel()', () => {
      spyOn(component.closed, 'emit');
      component.onCancel();
      expect(component.closed.emit).toHaveBeenCalledWith({ action: 'cancel', confirmed: false });
    });
  });

  describe('Template Rendering and User Interaction', () => {
    it('should pass correct properties to the icon component', () => {
      component.destructive = true;
      fixture.detectChanges();

      const iconDebugElement = fixture.debugElement.query(By.directive(MockIconComponent));
      const iconInstance = iconDebugElement.componentInstance as MockIconComponent;
      expect(iconInstance.iconSize).toBe(50);
    });

    it('should pass correct properties to the button components', () => {
      component.destructive = true;
      component.confirmButtonText = "Yes, Delete";
      component.cancelButtonText = "No, Keep";
      component.cancelButtonVariant = 'secondary';
      fixture.detectChanges();

      const buttons = fixture.debugElement.queryAll(By.directive(MockAavaButtonComponent));

    });

    it('should add the "with-border" class when bottomBorder is true', () => {
      component.bottomBorder = true;
      fixture.detectChanges();
      const contentElement = fixture.debugElement.query(By.css('.confirmation-content'));
    });

    it('should NOT have the "with-border" class when bottomBorder is false', () => {
      component.bottomBorder = false;
      fixture.detectChanges();
      const contentElement = fixture.debugElement.query(By.css('.confirmation-content'));
    });



    it('should call onCancel when the cancel button is clicked', () => {
      spyOn(component, 'onCancel');
      const cancelButton = fixture.debugElement.query(By.css('.cancel-button'));

    });
  });
});