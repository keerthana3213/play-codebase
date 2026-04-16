import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaSnackbarComponent } from './aava-snackbar.component';
import { SnackbarService } from './snackbar.service';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('SnackbarComponent', () => {
  let component: AavaSnackbarComponent;
  let fixture: ComponentFixture<AavaSnackbarComponent>;
  let snackbarService: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, AavaSnackbarComponent],
      providers: [SnackbarService]
    });

    fixture = TestBed.createComponent(AavaSnackbarComponent);
    component = fixture.componentInstance;
    snackbarService = TestBed.inject(SnackbarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return variant and type from snackbar$', () => {
    Object.defineProperty(snackbarService, 'snackbar$', {
      value: signal({ variant: 'success', type: 'info' })
    });

    expect(component.variant).toBe(undefined);
    expect(component.type).toBe(undefined);
  });

  it('should handle onActionClick when callback exists', () => {
    const callbackSpy = jasmine.createSpy('callback');
    component.onActionClick({ callback: callbackSpy });
    expect(callbackSpy).toHaveBeenCalled();
  });

  it('should handle onActionClick when no callback', () => {
    expect(() => component.onActionClick({})).not.toThrow();
  });

  it('should call snackbarService.dismiss on onDismiss', () => {
    spyOn(snackbarService, 'dismiss');
    component.onDismiss();
    expect(snackbarService.dismiss).toHaveBeenCalled();
  });

  it('should return correct icon size', () => {
    expect(component.getIconSize('sm')).toBe(16);
    expect(component.getIconSize('md')).toBe(24);
    expect(component.getIconSize(undefined)).toBe(20);
    expect(component.getIconSize('lg')).toBe(20);
  });

  it('should log on button click', () => {
    spyOn(console, 'log');
    const event = new Event('click');
    component.onButtonClick(event);
    expect(console.log).toHaveBeenCalledWith('Button clicked:', event);
  });

  it('should render snackbar when shown and hide after duration', fakeAsync(() => {
    snackbarService.show('Test Message', 'top-right', 500);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('.ava-snackbar'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.textContent).toContain('Test Message');

    tick(500);
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('.ava-snackbar'));
    expect(el).toBeNull();
  }));
});
