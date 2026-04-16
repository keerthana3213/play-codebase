import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SnackbarService, SnackbarAction, SnackbarIcon } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit snackbar data on show with defaults', () => {
    service.show('Test message', 'top-left', 5000, 'red', 'yellow');
    const result = service.snackbar$();
    expect(result).toEqual({
      title: undefined,
      message: 'Test message',
      duration: 5000,
      position: 'top-left',
      color: 'red',
      backgroundColor: 'yellow',
      action: undefined,
      icon: undefined,
      dismissible: false,
      persistent: false,
      variant: undefined,
      type: undefined,
      buttonLabel: undefined,
      onButtonClick: undefined,
      size: undefined,
      buttonSize: undefined,
      styleType: undefined,
    });
  });

  it('should clear snackbar after duration when not persistent', fakeAsync(() => {
    service.show('Temp message', 'bottom-right', 1000);
    expect(service.snackbar$()?.message).toBe('Temp message');
    tick(1001); // allow timer to flush
    expect(service.snackbar$()).toBeNull();
  }));

  it('should not auto-dismiss when persistent = true', fakeAsync(() => {
    service.show('Persistent message', 'top-center', 1000, '#fff', '#000', {
      persistent: true,
    });
    tick(5000);
    expect(service.snackbar$()?.message).toBe('Persistent message');
  }));

  it('should dismiss manually', () => {
    service.show('Dismiss me');
    expect(service.snackbar$()?.message).toBe('Dismiss me');
    service.dismiss();
    expect(service.snackbar$()).toBeNull();
  });

  it('should support action and callback', () => {
    let called = false;
    const action: SnackbarAction = {
      text: 'Undo',
      color: 'primary',
      callback: () => (called = true),
    };
    service.show('With action', 'bottom-left', 2000, '#fff', '#333', { action });
    const snackbar = service.snackbar$();
    expect(snackbar?.action?.text).toBe('Undo');

    snackbar?.action?.callback?.();
    expect(called).toBeTrue();
  });

  it('should support icon config', () => {
    const icon: SnackbarIcon = { name: 'check', color: 'green', size: 20 };
    service.show('With icon', 'top-right', 2000, '#000', '#eee', { icon });
    const snackbar = service.snackbar$();
    expect(snackbar?.icon?.name).toBe('check');
    expect(snackbar?.icon?.color).toBe('green');
    expect(snackbar?.icon?.size).toBe(20);
  });

  it('should pass through buttonLabel and onButtonClick', () => {
    let clicked = false;
    service.show('Button test', 'center', 3000, '#fff', '#222', {
      buttonLabel: 'Retry',
      onButtonClick: () => (clicked = true),
    });
    const snackbar = service.snackbar$();
    expect(snackbar?.buttonLabel).toBe('Retry');

    snackbar?.onButtonClick?.(new Event('click'));
    expect(clicked).toBeTrue();
  });
});
