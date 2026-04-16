import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AavaResetPasswordComponent,
  PasswordRule,
} from './aava-reset-password.component';

describe('AavaResetPasswordComponent', () => {
  let component: AavaResetPasswordComponent;
  let fixture: ComponentFixture<AavaResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaResetPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaResetPasswordComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty password', () => {
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('should validate password rules', () => {
    const rules: PasswordRule[] = [
      { message: 'At least 8 characters', validator: (pwd) => pwd.length >= 8 },
      {
        message: 'One uppercase letter',
        validator: (pwd) => /[A-Z]/.test(pwd),
      },
    ];

    component.rules = rules;
    component.ngOnInit();

    component.password = 'Test1234';
    component.onPasswordInput();

    expect(component.rulesValidation[0].isValid).toBe(true); // Length rule
    expect(component.rulesValidation[1].isValid).toBe(true); // Uppercase rule
  });

  it('should check if passwords match', () => {
    component.showConfirmPassword = true;
    component.password = 'Test1234';
    component.confirmPassword = 'Test1234';

    expect(component.passwordsMatch).toBe(true);

    component.confirmPassword = 'Different';
    expect(component.passwordsMatch).toBe(false);
  });

  it('should emit password change event', () => {
    spyOn(component.passwordChange, 'emit');

    component.password = 'NewPassword123';
    component.onPasswordInput();

    expect(component.passwordChange.emit).toHaveBeenCalled();
  });

  it('should calculate password strength', () => {
    const rules: PasswordRule[] = [
      { message: 'At least 8 characters', validator: (pwd) => pwd.length >= 8 },
      { message: 'One uppercase', validator: (pwd) => /[A-Z]/.test(pwd) },
      { message: 'One number', validator: (pwd) => /\d/.test(pwd) },
    ];

    component.rules = rules;
    component.ngOnInit();

    component.password = '';
    expect(component.passwordStrength).toBe('weak');

    component.password = 'test';
    component.onPasswordInput();
    expect(component.passwordStrength).toBe('weak');

    component.password = 'Test1234';
    component.onPasswordInput();
    expect(component.passwordStrength).toBe('strong');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });
});
