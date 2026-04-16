import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDividersComponent } from './test-dividers.component';

describe('TestDividersComponent', () => {
  let component: TestDividersComponent;
  let fixture: ComponentFixture<TestDividersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDividersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDividersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
