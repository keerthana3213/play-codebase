// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CustomComponent } from './custom.component';

// describe('CustomComponent', () => {
//   let component: CustomComponent;
//   let fixture: ComponentFixture<CustomComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CustomComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(CustomComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should display default dialog title', () => {
//     expect(component.title).toBe('Dialog');
//   });

//   it('should return correct variant icon', () => {
//     component.variant = 'success';
//     expect(component.variantIcon).toBe('circle-check');

//     component.variant = 'error';
//     expect(component.variantIcon).toBe('alert-circle');

//     component.variant = 'warning';
//     expect(component.variantIcon).toBe('alert-triangle');

//     component.variant = 'info';
//     expect(component.variantIcon).toBe('info');
//   });

//   it('should use custom icon when provided', () => {
//     component.icon = 'custom-icon';
//     expect(component.variantIcon).toBe('custom-icon');
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaCustomComponent } from './aava-custom.component';
import { DialogButton } from '../aava-dialog-service';

describe('CustomComponent', () => {
  let component: AavaCustomComponent;
  let fixture: ComponentFixture<AavaCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCustomComponent] // The component is standalone
    }).compileComponents();

    fixture = TestBed.createComponent(AavaCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Defaults', () => {
    it('should have correct default input values', () => {
      expect(component.title).toBe('Dialog');
      expect(component.message).toBe('');
      expect(component.icon).toBeUndefined();
      expect(component.iconColor).toBe('var(--dialog-text-color)');
      expect(component.iconSize).toBe(50);
      expect(component.showIcon).toBe(true);
      expect(component.buttons).toEqual([]);
      expect(component.variant).toBe('default');
      expect(component.customContent).toBeUndefined();
      expect(component.showTitle).toBe(true);
      expect(component.showMessage).toBe(true);
      expect(component.bottomBorder).toBe(false);
      expect(component.size).toBe('lg');
    });
  });

  describe('Computed Properties (Getters)', () => {

    describe('variantIcon', () => {
      it('should prioritize the custom icon input over the variant icon', () => {
        component.icon = 'my-custom-icon';
        component.variant = 'success'; // This should be ignored
        expect(component.variantIcon).toBe('my-custom-icon');
      });

      it('should return "circle-check" for success variant', () => {
        component.variant = 'success';
        expect(component.variantIcon).toBe('circle-check');
      });

      it('should return "alert-circle" for error variant', () => {
        component.variant = 'error';
        expect(component.variantIcon).toBe('alert-circle');
      });

      it('should return "alert-triangle" for warning variant', () => {
        component.variant = 'warning';
        expect(component.variantIcon).toBe('alert-triangle');
      });

      it('should return "info" for info variant', () => {
        component.variant = 'info';
        expect(component.variantIcon).toBe('info');
      });

      it('should return "help-circle" for default variant', () => {
        component.variant = 'default';
        expect(component.variantIcon).toBe('help-circle');
      });
    });

    describe('variantIconColor', () => {
      it('should return success color for success variant', () => {
        component.variant = 'success';
        expect(component.variantIconColor).toBe('var(--dialog-success-color)');
      });

      it('should return error color for error variant', () => {
        component.variant = 'error';
        expect(component.variantIconColor).toBe('var(--dialog-error-color)');
      });

      it('should return warning color for warning variant', () => {
        component.variant = 'warning';
        expect(component.variantIconColor).toBe('var(--dialog-warning-color)');
      });

      it('should return info color for info variant', () => {
        component.variant = 'info';
        expect(component.variantIconColor).toBe('var(--dialog-info-color)');
      });

      it('should return the default iconColor for the default variant', () => {
        component.variant = 'default';
        component.iconColor = 'custom-blue'; // Set a custom default color
        expect(component.variantIconColor).toBe('custom-blue');
      });
    });

    describe('titleClass', () => {
      it('should return the correct class based on the variant', () => {
        component.variant = 'error';
        expect(component.titleClass).toBe('popup-title error');

        component.variant = 'default';
        expect(component.titleClass).toBe('popup-title default');
      });
    });
  });

  describe('Output Events and Methods', () => {

    describe('onButtonClick', () => {
      let buttonClickSpy: jasmine.Spy;

      beforeEach(() => {
        buttonClickSpy = spyOn(component.buttonClick, 'emit');
      });

      it('should emit the button action when it exists and the button is not disabled', () => {
        const button: DialogButton = { label: 'Save', action: 'confirmSave' };
        component.onButtonClick(button);
        expect(buttonClickSpy).toHaveBeenCalledWith('confirmSave');
      });

      it('should emit the button label when action is not provided and the button is not disabled', () => {
        const button: DialogButton = { label: 'Cancel' };
        component.onButtonClick(button);
        expect(buttonClickSpy).toHaveBeenCalledWith('Cancel');
      });

      it('should NOT emit an event if the button is disabled', () => {
        const button: DialogButton = { label: 'Submit', action: 'submitForm', disabled: true };
        component.onButtonClick(button);
        expect(buttonClickSpy).not.toHaveBeenCalled();
      });
    });

    describe('trackByButton', () => {
      it('should return a unique identifier for the button', () => {
        const button: DialogButton = { label: 'Delete', action: 'delete' };
        const index = 1;
        expect(component.trackByButton(index, button)).toBe('Delete1');
      });
    });
  });

  // describe('User Interaction', () => {
  //   it('should call onButtonClick with the correct button object when a button is clicked', () => {
  //     const onButtonClickSpy = spyOn(component, 'onButtonClick');
  //     const testButtons: DialogButton[] = [
  //       { label: 'OK', action: 'ok' },
  //       { label: 'Cancel', action: 'cancel' }
  //     ];
  //     component.buttons = testButtons;
  //     fixture.detectChanges(); // Render the buttons

  //     const buttonElements = fixture.debugElement.queryAll(By.css('ava-button'));
  //     expect(buttonElements.length).toBe(2);

  //     // Click the second button ('Cancel')
  //     buttonElements[1].triggerEventHandler('click', null);

  //     expect(onButtonClickSpy).toHaveBeenCalledOnceWith(testButtons[1]);
  //   });
  // });
});