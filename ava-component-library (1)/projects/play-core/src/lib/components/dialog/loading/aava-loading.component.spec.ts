// loading.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaLoadingComponent } from './aava-loading.component';

describe('LoadingComponent', () => {
  let component: AavaLoadingComponent;
  let fixture: ComponentFixture<AavaLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaLoadingComponent] // The component is standalone
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default @Input values', () => {
    it('should have default title', () => {
      expect(component.title).toBe('Loading...');
    });

    it('should have default message', () => {
      expect(component.message).toBe('Please wait while we process your request.');
    });

    it('should have default flags and values', () => {
      expect(component.showProgress).toBeFalse();
      expect(component.progress).toBe(0);
      expect(component.showCancelButton).toBeFalse();
      expect(component.cancelButtonText).toBe('Cancel');
      expect(component.spinnerColor).toBe('var(--dialog-primary-color)');
      expect(component.indeterminate).toBeTrue();
      expect(component.bottomBorder).toBeFalse();
    });
  });

  describe('progressPercentage getter', () => {
    it('should return "0%" by default', () => {
      expect(component.progressPercentage).toBe('0%');
    });

    it('should clamp to "100%" when progress > 100', () => {
      component.progress = 150;
      expect(component.progressPercentage).toBe('100%');
    });

    it('should clamp to "0%" when progress < 0', () => {
      component.progress = -10;
      expect(component.progressPercentage).toBe('0%');
    });

    it('should reflect valid progress as percentage string', () => {
      component.progress = 75;
      expect(component.progressPercentage).toBe('75%');
    });
  });

  describe('progressText getter', () => {
    it('should be empty when indeterminate is true', () => {
      component.indeterminate = true;
      component.progress = 42;
      expect(component.progressText).toBe('');
    });

    it('should round the progress when indeterminate is false', () => {
      component.indeterminate = false;
      component.progress = 33.7;
      expect(component.progressText).toBe('34%');
    });

    it('should NOT clamp progressText (matches current implementation)', () => {
      component.indeterminate = false;
      component.progress = 150;
      expect(component.progressText).toBe('150%');
      component.progress = -5;
      expect(component.progressText).toBe('-5%');
    });
  });

  describe('onCancel', () => {
    it('should emit closed event with action "cancel"', () => {
      const spy = jasmine.createSpy('closedSpy');
      component.closed.subscribe(spy);

      component.onCancel();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ action: 'cancel' });
    });
  });

  describe('input updates', () => {
    it('should allow overriding of title and message', () => {
      component.title = 'Uploading';
      component.message = 'Hold tight while we upload your files.';
      fixture.detectChanges();

      expect(component.title).toBe('Uploading');
      expect(component.message).toBe('Hold tight while we upload your files.');
    });

    it('should allow toggling showProgress and showCancelButton', () => {
      component.showProgress = true;
      component.showCancelButton = true;
      fixture.detectChanges();

      expect(component.showProgress).toBeTrue();
      expect(component.showCancelButton).toBeTrue();
    });

    it('should allow changing visual inputs', () => {
      component.spinnerColor = '#123456';
      component.bottomBorder = true;
      fixture.detectChanges();

      expect(component.spinnerColor).toBe('#123456');
      expect(component.bottomBorder).toBeTrue();
    });

    it('should allow changing cancelButtonText', () => {
      component.cancelButtonText = 'Stop';
      fixture.detectChanges();

      expect(component.cancelButtonText).toBe('Stop');
    });
  });
});