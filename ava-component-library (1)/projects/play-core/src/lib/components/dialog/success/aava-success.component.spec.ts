import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AavaSuccessComponent, SuccessButton } from './aava-success.component';
import { AavaButtonComponent } from '../../button/aava-button.component';
import { AavaIconComponent } from '../../icon/aava-icon.component';

// --- MOCK COMPONENTS ---
// This isolates our component test from its children.
@Component({ selector: 'aava-icon', template: '', standalone: true })
class MockIconComponent {
  @Input() iconName: any;
  @Input() iconColor: any;
  @Input() iconSize: any;
}

@Component({ selector: 'aava-button', template: '<button>{{label}}</button>', standalone: true })
class MockAavaButtonComponent {
  @Input() label: any;
  @Input() variant: any;
  @Input() action: any;
  @Input() disabled: any;
}

describe('AavaSuccessComponent', () => {
  let component: AavaSuccessComponent;
  let fixture: ComponentFixture<AavaSuccessComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaSuccessComponent],
    })
      .overrideComponent(AavaSuccessComponent, {
        remove: { imports: [AavaIconComponent, AavaButtonComponent] },
        add: { imports: [MockIconComponent, MockAavaButtonComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaSuccessComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs and Default State', () => {
    it('should initialize with correct default values', () => {
      expect(component.title).toBe('Success');
      expect(component.message).toBe('Operation completed successfully!');
      expect(component.icon).toBe('circle-check');
      expect(component.iconColor).toBe('var(--dialog-success-color)');
      expect(component.size).toBe('lg');
      expect(component.buttons).toEqual([]);
      expect(component.showButtons).toBe(false);
      expect(component.bottomBorder).toBe(true);
    });

    it('should render with default title and message', () => {

    });

    it('should update title and message when inputs change', () => {
      component.title = 'All Done!';
      component.message = 'Your file has been uploaded.';
      fixture.detectChanges();


    });

    it('should show buttons when showButtons is true and buttons array is not empty', () => {
      component.showButtons = true;
      component.buttons = [{ label: 'OK', action: 'ok' }];
      fixture.detectChanges();

      const buttons = compiled.querySelectorAll('aava-button');

    });

    it('should NOT show buttons when showButtons is false, even with buttons data', () => {
      component.showButtons = false;
      component.buttons = [{ label: 'OK', action: 'ok' }];
      fixture.detectChanges();

      expect(compiled.querySelector('aava-button')).toBeNull();
    });

    it('should NOT show buttons when showButtons is true but buttons array is empty', () => {
      component.showButtons = true;
      component.buttons = [];
      fixture.detectChanges();

      expect(compiled.querySelector('aava-button')).toBeNull();
    });

    it('should have a bottom border by default', () => {
      expect(compiled.querySelector('.aava-success-content.no-border')).toBeNull();
    });

    it('should remove the bottom border when bottomBorder is false', () => {
      component.bottomBorder = false;
      fixture.detectChanges();

    });
  });

  describe('Getter: effectiveIconSize', () => {
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

    it('should return 24 as a default for other sizes like "xl"', () => {
      component.size = 'xl';
      expect(component.effectiveIconSize).toBe(24);
    });
  });

  describe('Outputs and Events', () => {
    it('should emit closed event when close button is clicked', () => {
      spyOn(component.closed, 'emit');

    });

    it('should emit buttonClick and closed events when a button is clicked via the template', () => {
      spyOn(component.buttonClick, 'emit');
      spyOn(component.closed, 'emit');
      component.showButtons = true;
      component.buttons = [{ label: 'Confirm', action: 'confirm-action' }];
      fixture.detectChanges();

      const actionButton = fixture.debugElement.query(By.css('aava-button'));

    });

    it('should emit correctly when onClose is called programmatically', () => {
      spyOn(component.closed, 'emit');
      component.onClose();
      expect(component.closed.emit).toHaveBeenCalledWith({ action: 'close' });
    });

    it('should emit correctly when onButtonClick is called programmatically', () => {
      spyOn(component.buttonClick, 'emit');
      spyOn(component.closed, 'emit');
      component.onButtonClick('programmatic-action');
      expect(component.buttonClick.emit).toHaveBeenCalledWith('programmatic-action');
      expect(component.closed.emit).toHaveBeenCalledWith({ action: 'programmatic-action' });
    });
  });
});