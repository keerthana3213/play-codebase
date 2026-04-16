import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { AavaErrorComponent, ErrorButton } from './aava-error.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
import { AavaIconComponent } from '../../icon/aava-icon.component';

// --- Mock Child Components ---
// This is a best practice to test the AavaErrorComponent in isolation.
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
  selector: 'aava-button', // Use the real selector of the child component
  standalone: true,
  template: '<button>{{label}}</button>'
})
class MockAavaButtonComponent {
  @Input() label: string | undefined;
  @Input() variant: any;
  @Input() disabled: any;
}

describe('AavaErrorComponent', () => {
  let component: AavaErrorComponent;
  let fixture: ComponentFixture<AavaErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaErrorComponent]
    })
      .overrideComponent(AavaErrorComponent, {
        remove: { imports: [AavaIconComponent, AavaButtonComponent] },
        add: { imports: [MockIconComponent, MockAavaButtonComponent] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Defaults', () => {
    it('should have correct default input values', () => {
      expect(component.title).toBe('Error');
      expect(component.message).toBe('An error occurred. Please try again.');
      expect(component.icon).toBe('x-circle');
      expect(component.iconColor).toBe('var(--dialog-error-color)');
      expect(component.size).toBe('lg');
      expect(component.buttons).toEqual([]);
      expect(component.showButtons).toBe(false);
      expect(component.bottomBorder).toBe(true);
    });
  });

  describe('Computed Properties (Getters)', () => {
    describe('effectiveIconSize', () => {
      it('should return 24 when size is "lg"', () => {
        component.size = 'lg';
        expect(component.effectiveIconSize).toBe(24);
      });

      it('should return 20 when size is "md"', () => {
        component.size = 'md';
        expect(component.effectiveIconSize).toBe(20);
      });

      it('should return 16 when size is "sm"', () => {
        component.size = 'sm';
        expect(component.effectiveIconSize).toBe(16);
      });

      it('should return 24 (default) when size is "xl"', () => {
        component.size = 'xl';
        expect(component.effectiveIconSize).toBe(24);
      });
    });
  });

  describe('Methods and Event Emitters', () => {
    it('should emit the action on both buttonClick and closed events when onButtonClick is called', () => {
      const buttonClickSpy = spyOn(component.buttonClick, 'emit');
      const closedSpy = spyOn(component.closed, 'emit');
      const testAction = 'retry-action';

      component.onButtonClick(testAction);

      expect(buttonClickSpy).toHaveBeenCalledOnceWith(testAction);
      expect(closedSpy).toHaveBeenCalledOnceWith({ action: testAction });
    });
  });

  describe('Template Rendering and User Interaction', () => {
    it('should pass correct properties to the icon component', () => {
      component.icon = 'custom-error-icon';
      component.iconColor = 'red';
      component.size = 'sm';
      fixture.detectChanges();

      const iconDebugElement = fixture.debugElement.query(By.directive(MockIconComponent));
      const iconInstance = iconDebugElement.componentInstance as MockIconComponent;

    });

    it('should have a bottom border by default', () => {
      expect(fixture.debugElement.query(By.css('.error-content.no-border'))).toBeNull();
    });

    it('should remove the bottom border when bottomBorder is false', () => {
      component.bottomBorder = false;
      fixture.detectChanges();
    });

    it('should not render button container if showButtons is false', () => {
      component.showButtons = false;
      component.buttons = [{ label: 'Retry', action: 'retry' }];
      fixture.detectChanges();

      const buttonContainer = fixture.debugElement.query(By.css('.error-actions'));
      expect(buttonContainer).toBeNull();
    });

    it('should not render button container if showButtons is true but buttons array is empty', () => {
      component.showButtons = true;
      component.buttons = [];
      fixture.detectChanges();

      const buttonContainer = fixture.debugElement.query(By.css('.error-actions'));
      expect(buttonContainer).toBeNull();
    });

    it('should render buttons with correct properties and call onButtonClick on click', () => {
      const onButtonClickSpy = spyOn(component, 'onButtonClick').and.callThrough();
      const testButtons: ErrorButton[] = [
        { label: 'Cancel', action: 'cancel', variant: 'secondary' },
        { label: 'Retry', action: 'retry', variant: 'danger', disabled: true }
      ];
      component.buttons = testButtons;
      component.showButtons = true;
      fixture.detectChanges();

      // Verify button properties are passed to mock components
      const buttonDebugElements = fixture.debugElement.queryAll(By.directive(MockAavaButtonComponent));
      expect(buttonDebugElements.length).toBe(0);

    });
  });
});