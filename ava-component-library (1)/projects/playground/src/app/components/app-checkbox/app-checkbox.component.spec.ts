import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCheckboxComponent } from './app-checkbox.component';

describe('AppCheckboxComponent', () => {
  let component: AppCheckboxComponent;
  let fixture: ComponentFixture<AppCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
