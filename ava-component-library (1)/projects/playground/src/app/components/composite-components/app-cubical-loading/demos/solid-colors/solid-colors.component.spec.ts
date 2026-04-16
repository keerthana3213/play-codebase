import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidColorsComponent } from './solid-colors.component';

describe('SolidColorsComponent', () => {
  let component: SolidColorsComponent;
  let fixture: ComponentFixture<SolidColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolidColorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolidColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
