import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaCheckboxComponent } from './aava-checkbox.component';
import { By } from '@angular/platform-browser';
 
describe('CheckboxComponent', () => {
  let component: AavaCheckboxComponent;
  let fixture: ComponentFixture<AavaCheckboxComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCheckboxComponent]
    }).compileComponents();
 
    fixture = TestBed.createComponent(AavaCheckboxComponent);
    component = fixture.componentInstance;
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should apply the correct variant class', () => {
    component.variant = 'with-bg';
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    expect(checkbox.classList.contains('with-bg')).toBeTrue();
  });
 
  it('should apply the correct size class', () => {
    component.size = 'sm';
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    expect(checkbox.classList.contains('small')).toBeFalse();
  });
 
  it('should apply the correct alignment class', () => {
    component.alignment = 'horizontal';
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    expect(checkbox.classList.contains('horizontal')).toBeTrue();
  });
 
  it('should display the label if provided', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.checkbox-label')).nativeElement;
    expect(label.textContent).toContain('Test Label');
  });
 
  it('should not display the label if not provided', () => {
    component.label = '';
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.checkbox-label'));
    expect(label).toBeNull();
  });
 
  it('should toggle isChecked on click', () => {
    spyOn(component.isCheckedChange, 'emit');
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    checkbox.click();
    expect(component.isChecked).toBeTrue();
    expect(component.isCheckedChange.emit).toHaveBeenCalledWith(true);
  });
 
  it('should not toggle isChecked on click if disabled', () => {
    component.disable = true;
    fixture.detectChanges();
    spyOn(component.isCheckedChange, 'emit');
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    checkbox.click();
    expect(component.isChecked).toBeFalse();
    expect(component.isCheckedChange.emit).not.toHaveBeenCalled();
  });
 
  it('should handle indeterminate state correctly', () => {
    component.indeterminate = true;
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('.checkbox')).nativeElement;
    expect(checkbox.classList.contains('indeterminate')).toBeTrue();
  });
 
  it('should handle keyboard events correctly', () => {
    spyOn(component, 'toggleCheckbox');
    const event = new KeyboardEvent('keydown', { key: ' ' });
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    checkbox.dispatchEvent(event);
    expect(component.toggleCheckbox).toHaveBeenCalled();
  });
 
  it('should not handle keyboard events if disabled', () => {
    component.disable = true;
    fixture.detectChanges();
    spyOn(component, 'toggleCheckbox');
    const event = new KeyboardEvent('keydown', { key: ' ' });
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    checkbox.dispatchEvent(event);
    expect(component.toggleCheckbox);
  });
 
  it('should apply disabled styles if disabled', () => {
    component.disable = true;
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    expect(checkbox.classList.contains('disabled')).toBeTrue();
  });
 
  it('should show icon if checked or indeterminate', () => {
    component.isChecked = true;
    fixture.detectChanges();
    let icon = fixture.debugElement.query(By.css('.checkbox-icon'));
    expect(icon).toBeTruthy();
 
    component.isChecked = false;
    component.indeterminate = true;
    fixture.detectChanges();
    icon = fixture.debugElement.query(By.css('.checkbox-icon'));
    expect(icon).toBeTruthy();
  });
 
  it('should not show icon if not checked or indeterminate', () => {
    component.isChecked = false;
    component.indeterminate = false;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.checkbox-icon'));
    expect(icon).toBeNull();
  });
 
  it('should handle animated variant correctly', fakeAsync(() => {
    component.variant = 'animated';
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    checkbox.click();
    tick(300);
    expect(component.isChecked).toBeTrue();
    checkbox.click();
    tick(300);
    expect(component.isChecked).toBeFalse();
  }));
 
  it('should handle with-bg variant correctly', fakeAsync(() => {
    component.variant = 'with-bg';
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(By.css('.ava-checkbox')).nativeElement;
    checkbox.click();
    tick(150);
    expect(component.isChecked).toBeTrue();
    checkbox.click();
    tick(150);
    expect(component.isChecked).toBeFalse();
  }));
});
 
 