import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextboxComponent } from './app-textbox.component';

describe('AppTextboxComponent', () => {
  let component: AppTextboxComponent;
  let fixture: ComponentFixture<AppTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTextboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
