import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSnackbarComponent } from './test-snackbar.component';

describe('TestSnackbarComponent', () => {
  let component: TestSnackbarComponent;
  let fixture: ComponentFixture<TestSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSnackbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
