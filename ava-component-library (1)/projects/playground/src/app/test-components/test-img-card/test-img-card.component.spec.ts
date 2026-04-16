import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestImgCardComponent } from './test-img-card.component';

describe('TestImgCardComponent', () => {
  let component: TestImgCardComponent;
  let fixture: ComponentFixture<TestImgCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestImgCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestImgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
