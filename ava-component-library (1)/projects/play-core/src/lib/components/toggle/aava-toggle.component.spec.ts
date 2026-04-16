// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AavaToggleComponent } from './aava-toggle.component';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

// describe('ToggleComponent', () => {
//   let component: AavaToggleComponent;
//   let fixture: ComponentFixture<AavaToggleComponent>;
//   let toggleEl: DebugElement;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AavaToggleComponent]
//     }).compileComponents();

//     fixture = TestBed.createComponent(AavaToggleComponent);
//     component = fixture.componentInstance;
//     toggleEl = fixture.debugElement.query(By.css('.toggle-wrapper'));
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should apply the correct size class', () => {
//     component.size = 'small';
//     fixture.detectChanges();
//     const toggleWrapper = fixture.debugElement.query(By.css('.toggle-wrapper')).nativeElement;
//     expect(toggleWrapper.classList.contains('toggle-small')).toBeTrue();
//   });

//   it('should apply the correct position class', () => {
//     component.position = 'right';
//     fixture.detectChanges();
//     const toggleContainer = fixture.debugElement.query(By.css('.ava-toggle-container')).nativeElement;
//     expect(toggleContainer.classList.contains('toggle-right')).toBeTrue();
//   });

//   it('should display the title when provided', () => {
//     component.title = 'Test Title';
//     fixture.detectChanges();
//     const titleLabel = fixture.debugElement.query(By.css('.toggle-title')).nativeElement;
//     expect(titleLabel.textContent).toContain('Test Title');
//   });

//   it('should not display the title when not provided', () => {
//     component.title = '';
//     fixture.detectChanges();
//     const titleLabel = fixture.debugElement.query(By.css('.toggle-title'));
//     expect(titleLabel).toBeNull();
//   });

//   it('should apply disabled class when disabled', () => {
//     component.disabled = true;
//     fixture.detectChanges();
//     const toggleContainer = fixture.debugElement.query(By.css('.ava-toggle-container')).nativeElement;
//     expect(toggleContainer.classList.contains('disabled')).toBeTrue();
//   });

//   it('should toggle checked state on click', () => {
//     spyOn(component.checkedChange, 'emit');
//     const toggleWrapper = fixture.debugElement.query(By.css('.toggle-wrapper')).nativeElement;
//     toggleWrapper.click();
//     expect(component.checked).toBeTrue();
//     expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
//   });

//   it('should not toggle checked state when disabled', () => {
//     component.disabled = true;
//     fixture.detectChanges();
//     spyOn(component.checkedChange, 'emit');
//     const toggleWrapper = fixture.debugElement.query(By.css('.toggle-wrapper')).nativeElement;
//     toggleWrapper.click();
//     expect(component.checked).toBeFalse();
//     expect(component.checkedChange.emit).not.toHaveBeenCalled();
//   });

//   it('should toggle checked state on label click', () => {
//     component.title = 'Test Title';
//     fixture.detectChanges();
//     spyOn(component.checkedChange, 'emit');
//     const titleLabel = fixture.debugElement.query(By.css('.toggle-title')).nativeElement;
//     titleLabel.click();
//     expect(component.checked).toBeTrue();
//     expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
//   });

//   it('should toggle checked state on Enter key press', () => {
//     spyOn(component.checkedChange, 'emit');
//     const event = new KeyboardEvent('keydown', { key: 'Enter' });
//     const toggleWrapper = fixture.debugElement.query(By.css('.toggle-wrapper')).nativeElement;
//     toggleWrapper.dispatchEvent(event);
//     expect(component.checked).toBeTrue();
//     expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
//   });

//   it('should toggle checked state on Space key press', () => {
//     spyOn(component.checkedChange, 'emit');
//     const event = new KeyboardEvent('keydown', { key: ' ' });
//     const toggleWrapper = fixture.debugElement.query(By.css('.toggle-wrapper')).nativeElement;
//     toggleWrapper.dispatchEvent(event);
//     expect(component.checked).toBeTrue();
//     expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
//   });

//   it('should generate a unique ID for the toggle input', () => {
//     const toggleId = component.toggleId;
//     expect(toggleId).toMatch(/^aava-toggle-[a-z0-9]{9}$/);
//   });

//   it('should generate the correct title name', () => {
//     component.title = 'Test Title';
//     const titleName = component.titleName;
//     expect(titleName).toBe('toggle-title-test-title');
//   });

//   it('should return the correct icon size based on toggle size', () => {
//     component.size = 'small';
//     expect(component.getIconSize()).toBe(10);
//     component.size = 'medium';
//     expect(component.getIconSize()).toBe(12);
//     component.size = 'large';
//     expect(component.getIconSize()).toBe(14);
//   });

//   it('should return the correct checked icon color', () => {
//     const checkedIconColor = component.getCheckedIconColor();
//     expect(checkedIconColor).toBe('rgba(var(--rgb-brand-primary))');
//   });

//   it('should return the correct unchecked icon color', () => {
//     const uncheckedIconColor = component.getUncheckedIconColor();
//     expect(uncheckedIconColor).toBe(
//       'color-mix(in srgb, rgba(var(--rgb-brand-primary)) 60%, var(--text-color-secondary, #666666))'
//     );
//   });

//   it('should apply the correct classes when checked', () => {
//     component.checked = true;
//     fixture.detectChanges();
//     const toggleWrapper = fixture.debugElement.query(By.css('.toggle-wrapper')).nativeElement;
//     expect(toggleWrapper.classList.contains('checked')).toBeTrue();
//   });

//   it('should apply the correct classes when animation is enabled', () => {
//     component.animation = true;
//     fixture.detectChanges();
//     const toggleWrapper = fixture.debugElement.query(By.css('.toggle-wrapper')).nativeElement;
//     expect(toggleWrapper.classList.contains('animated')).toBeTrue();
//   });
// });
