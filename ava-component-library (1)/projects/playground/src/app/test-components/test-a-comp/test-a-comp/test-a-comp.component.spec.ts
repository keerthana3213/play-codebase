import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestACompComponent } from './test-a-comp.component';

describe('TestACompComponent', () => {
  let component: TestACompComponent;
  let fixture: ComponentFixture<TestACompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestACompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestACompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
