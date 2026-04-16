// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { FeedbackComponent } from './feedback.component';

// describe('FeedbackComponent', () => {
//   let component: FeedbackComponent;
//   let fixture: ComponentFixture<FeedbackComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [FeedbackComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(FeedbackComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AavaFeedbackComponent } from './aava-feedback.component';
import { AavaTextareaComponent } from '../../textarea/aava-textarea.component';

// Create a mock component for AavaTextareaComponent to control its behavior in tests.
// This is crucial for testing the @ViewChild interaction.
@Component({
  selector: 'ava-textarea',
  template: '',
  standalone: true,
})
class MockAavaTextareaComponent {
  value = '';
}

describe('FeedbackComponent', () => {
  let component: AavaFeedbackComponent;
  let fixture: ComponentFixture<AavaFeedbackComponent>;
  let mockTextarea: MockAavaTextareaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaFeedbackComponent], // Import the real component
    })
      // Override the component's imports to replace the real textarea with our mock
      .overrideComponent(AavaFeedbackComponent, {
        remove: { imports: [AavaTextareaComponent] },
        add: { imports: [MockAavaTextareaComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // This is crucial for @ViewChild to resolve

    // Get a reference to the instance of our mock textarea component from the @ViewChild
    mockTextarea = component.feedbackTextRef as any;
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
      expect(component.label).toBe('');
      expect(component.bottomBorder).toBe(false);
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
        component.icon = 'custom-icon';
        expect(component.effectiveIcon).toBe('custom-icon');
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

  describe('Methods and Event Emitters', () => {
    let closedSpy: jasmine.Spy;

    beforeEach(() => {
      closedSpy = spyOn(component.closed, 'emit');
    });

    describe('onConfirm', () => {
      it('should emit the feedback value from the textarea when confirmed', () => {
        // Arrange
        const feedbackMessage = 'This is my detailed feedback.';
        mockTextarea.value = feedbackMessage;

        // Act
        component.onConfirm();

        // Assert
        expect(closedSpy).toHaveBeenCalledOnceWith({
          action: 'feedback',
          confirmed: true,
          feedback: feedbackMessage
        });
      });

      it('should emit an empty feedback string if the textarea is empty', () => {
        // Arrange
        mockTextarea.value = '';

        // Act
        component.onConfirm();

        // Assert
        expect(closedSpy).toHaveBeenCalledOnceWith({
          action: 'feedback',
          confirmed: true,
          feedback: ''
        });
      });

      it('should handle the case where feedbackTextRef is not available (edge case)', () => {
        // Arrange: Manually set the ref to null to test the guard condition
        (component as any).feedbackTextRef = null;

        // Act
        component.onConfirm();

        // Assert: It should gracefully handle this and emit an empty string
        expect(closedSpy).toHaveBeenCalledOnceWith({
          action: 'feedback',
          confirmed: true,
          feedback: ''
        });
      });
    });

    describe('onCancel', () => {
      it('should emit a cancel action with confirmed set to false', () => {
        // Act
        component.onCancel();

        // Assert
        expect(closedSpy).toHaveBeenCalledOnceWith({ action: 'cancel', confirmed: false });
      });
    });
  });

  // describe('User Interaction', () => {
  //   it('should call onConfirm when the confirm button is clicked', () => {
  //     const onConfirmSpy = spyOn(component, 'onConfirm');
  //     const confirmButton = fixture.debugElement.query(By.css('ava-button[variant="primary"]')); // More specific selector

  //     confirmButton.triggerEventHandler('click', null);

  //     expect(onConfirmSpy).toHaveBeenCalledTimes(1);
  //   });

  //   it('should call onCancel when the cancel button is clicked', () => {
  //     const onCancelSpy = spyOn(component, 'onCancel');
  //     const cancelButton = fixture.debugElement.query(By.css('ava-button[variant="secondary"]')); // More specific selector

  //     cancelButton.triggerEventHandler('click', null);

  //     expect(onCancelSpy).toHaveBeenCalledTimes(1);
  //   });
  // });
});