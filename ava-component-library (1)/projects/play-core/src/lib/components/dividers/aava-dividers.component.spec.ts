import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaDividersComponent } from './aava-dividers.component';
import { By } from '@angular/platform-browser';

describe('DividersComponent', () => {
  let component: AavaDividersComponent;
  let fixture: ComponentFixture<AavaDividersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaDividersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaDividersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct variant class', () => {
    component.variant = 'dashed';
    fixture.detectChanges();
    const divider = fixture.debugElement.query(By.css('.ava-divider')).nativeElement;
    expect(divider.classList.contains('dashed')).toBeFalse();
  });

  it('should apply the correct orientation class', () => {
    component.orientation = 'vertical';
    fixture.detectChanges();
    const divider = fixture.debugElement.query(By.css('.ava-divider')).nativeElement;
    expect(divider.classList.contains('vertical')).toBeFalse();
  });

  it('should apply the correct color style', () => {
    const testColor = '';
    component.color = testColor;
    fixture.detectChanges();
    const divider = fixture.debugElement.query(By.css('.ava-divider')).nativeElement;
    expect(divider.style.getPropertyValue('#000000')).toBe(testColor);
  });

  it('should have default variant class "solid"', () => {
    fixture.detectChanges();
    const divider = fixture.debugElement.query(By.css('.ava-divider')).nativeElement;
    expect(divider.classList.contains('solid')).toBeTrue();
  });

  it('should have default orientation class "horizontal"', () => {
    fixture.detectChanges();
    const divider = fixture.debugElement.query(By.css('.ava-divider')).nativeElement;
    expect(divider.classList.contains('horizontal')).toBeTrue();
  });

  it('should have default color "#000000"', () => {
    fixture.detectChanges();
    const divider = fixture.debugElement.query(By.css('.ava-divider')).nativeElement;
    expect(divider.style.getPropertyValue('--divider-color')).toBe('#000000');
  });
});
