import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSliderComponent } from './app-slider.component';

describe('AppSliderComponent', () => {
  let component: AppSliderComponent;
  let fixture: ComponentFixture<AppSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
