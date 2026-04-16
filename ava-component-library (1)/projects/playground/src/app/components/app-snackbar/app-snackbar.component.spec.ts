import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSnackbarComponent } from './app-snackbar.component';

describe('AppSnackbarComponent', () => {
  let component: AppSnackbarComponent;
  let fixture: ComponentFixture<AppSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
