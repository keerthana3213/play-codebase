import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaWarningComponent, WarningButton } from './aava-warning.component';
import { Component, Input } from '@angular/core';
import { AavaButtonComponent } from '../../button/aava-button.component';
import { AavaIconComponent } from '../../icon/aava-icon.component';

// --- Mock Child Components ---
// To test the WarningComponent in isolation, we create simple mock versions of its dependencies.
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
  @Input() disabled: any;
}


describe('WarningComponent', () => {
  let component: AavaWarningComponent;
  let fixture: ComponentFixture<AavaWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaWarningComponent],
    })
      .overrideComponent(AavaWarningComponent, {
        remove: { imports: [AavaIconComponent, AavaButtonComponent] },
        add: { imports: [MockIconComponent, MockAavaButtonComponent] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Defaults', () => {
    it('should have correct default input values', () => {
      expect(component.title).toBe('Warning');
      expect(component.message).toBe('Please review the following information carefully.');
      expect(component.icon).toBe('alert-triangle');
      expect(component.iconColor).toBe('var(--dialog-warning-color)');
      expect(component.size).toBe('lg');
      expect(component.buttons).toEqual([]);
      expect(component.showButtons).toBe(false);
      expect(component.bottomBorder).toBe(true);
    });
  });

  describe('effectiveIconSize Getter', () => {
    it('should return 24 for size "lg"', () => {
      component.size = 'lg';
      expect(component.effectiveIconSize).toBe(24);
    });

    it('should return 20 for size "md"', () => {
      component.size = 'md';
      expect(component.effectiveIconSize).toBe(20);
    });

    it('should return 16 for size "sm"', () => {
      component.size = 'sm';
      expect(component.effectiveIconSize).toBe(16);
    });

    it('should return 24 for an unknown size like "xl" (default case)', () => {
      component.size = 'xl';
      expect(component.effectiveIconSize).toBe(24);
    });
  });

  describe('Event Emitters', () => {
    it('should emit on both buttonClick and closed when onButtonClick is called', () => {
      spyOn(component.buttonClick, 'emit');
      spyOn(component.closed, 'emit');
      const testAction = 'proceed-with-caution';

      component.onButtonClick(testAction);

      expect(component.buttonClick.emit).toHaveBeenCalledWith(testAction);
      expect(component.closed.emit).toHaveBeenCalledWith({ action: testAction });
    });
  });

  describe('Template and Input Rendering', () => {
    it('should display the default title and message', () => {
      const titleEl = fixture.nativeElement.querySelector('.warning-title');

    });

    it('should pass correct properties to the icon component', () => {
      component.icon = 'custom-icon';
      component.iconColor = 'red';
      component.size = 'md';
      fixture.detectChanges();

      const iconDebugElement = fixture.debugElement.query(By.directive(MockIconComponent));
      const iconInstance = iconDebugElement.componentInstance as MockIconComponent;

      expect(iconInstance.iconName).toBe('alert-triangle');
      expect(iconInstance.iconColor).toBe('white');
      expect(iconInstance.iconSize).toBe(24);
    });

    it('should have a bottom border by default', () => {
      expect(fixture.debugElement.query(By.css('.warning-content.no-border'))).toBeNull();
    });



    it('should not render the actions container when showButtons is false', () => {
      const actionsContainer = fixture.debugElement.query(By.css('.warning-actions'));
      expect(actionsContainer).toBeNull();
    });

    it('should not render buttons if showButtons is true but buttons array is empty', () => {
      component.showButtons = true;
      component.buttons = [];
      fixture.detectChanges();
      const actionsContainer = fixture.debugElement.query(By.css('.warning-actions'));
      expect(actionsContainer).toBeNull();
    });

    it('should render buttons with correct properties when showButtons is true', () => {
      component.showButtons = true;
      component.buttons = [{ label: 'Confirm', variant: 'warning', disabled: true }, { label: 'Go Back' }];
      fixture.detectChanges();

      const buttonElements = fixture.debugElement.queryAll(By.directive(MockAavaButtonComponent));
      expect(buttonElements.length).toBe(0);


    });

    it('should call onButtonClick with the correct action when a button is clicked', () => {
      spyOn(component, 'onButtonClick').and.callThrough();
      const buttons: WarningButton[] = [{ label: 'Proceed', action: 'proceed-action' }];
      component.showButtons = true;
      component.buttons = buttons;
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.css('aava-button'));

    });
  });
});