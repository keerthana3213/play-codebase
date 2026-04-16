import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { AavaInfoComponent, InfoButton } from './aava-info.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { CommonModule } from '@angular/common'; // <-- IMPORT CommonModule

// --- Mock Child Components (with corrected inputs) ---
@Component({
  selector: 'aava-icon',
  standalone: true,
  template: ''
})
class MockIconComponent {
  // **FIX**: Inputs must match the bindings in the parent template
  @Input() icon: string | undefined;
  @Input() size: number | string | undefined;
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
  @Input() disabled: any;
  @Input() size: any; // Add any other inputs the template might use
}

describe('AavaInfoComponent', () => {
  let component: AavaInfoComponent;
  let fixture: ComponentFixture<AavaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaInfoComponent]
    })
      .overrideComponent(AavaInfoComponent, {
        remove: { imports: [AavaIconComponent, AavaButtonComponent] },
        add: {
          imports: [
            CommonModule, // <-- THE PRIMARY FIX
            MockIconComponent,
            MockAavaButtonComponent
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Defaults', () => {
    it('should have correct default input values', () => {
      expect(component.title).toBe('Information');
      expect(component.message).toBe('Here is some important information.');
      expect(component.icon).toBe('info');
      expect(component.iconColor).toBe('var(--dialog-info-color)');
      expect(component.size).toBe('lg');
      expect(component.buttons).toEqual([]);
      expect(component.showButtons).toBe(false);
      expect(component.bottomBorder).toBe(true);
    });
  });

  describe('Computed Properties (Getters)', () => {
    it('effectiveIconSize should return correct values', () => {
      component.size = 'lg';
      expect(component.effectiveIconSize).toBe(24);
      component.size = 'md';
      expect(component.effectiveIconSize).toBe(20);
      component.size = 'sm';
      expect(component.effectiveIconSize).toBe(16);
      component.size = 'xl';
      expect(component.effectiveIconSize).toBe(24);
    });
  });

  describe('Methods and Event Emitters', () => {
    it('should emit on both buttonClick and closed events when onButtonClick is called', () => {
      const buttonClickSpy = spyOn(component.buttonClick, 'emit');
      const closedSpy = spyOn(component.closed, 'emit');
      component.onButtonClick('confirm-action');
      expect(buttonClickSpy).toHaveBeenCalledOnceWith('confirm-action');
      expect(closedSpy).toHaveBeenCalledOnceWith({ action: 'confirm-action' });
    });
  });


  describe('Template Rendering and User Interaction', () => {

    it('should render buttons with correct properties and call onButtonClick on click', () => {
      const onButtonClickSpy = spyOn(component, 'onButtonClick').and.callThrough();
      const testButtons: InfoButton[] = [
        { label: 'Cancel', action: 'cancel', variant: 'secondary' },
        { label: 'Confirm', action: 'confirm', variant: 'primary', disabled: true }
      ];
      component.buttons = testButtons;
      component.showButtons = true;
      fixture.detectChanges(); // This will now render the buttons because CommonModule is present

      const buttonDebugElements = fixture.debugElement.queryAll(By.directive(MockAavaButtonComponent));
    });
  });
});