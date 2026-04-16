import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRatingComponent } from './test-rating.component';

describe('TestRatingComponent', () => {
  let component: TestRatingComponent;
  let fixture: ComponentFixture<TestRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
