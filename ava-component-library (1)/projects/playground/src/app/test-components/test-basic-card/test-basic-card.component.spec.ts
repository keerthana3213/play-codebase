import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBasicCardComponent } from './test-basic-card.component';

describe('TestBasicCardComponent', () => {
  let component: TestBasicCardComponent;
  let fixture: ComponentFixture<TestBasicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBasicCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
