import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTextboxComponent } from './test-textbox.component';

describe('TestTextboxComponent', () => {
  let component: TestTextboxComponent;
  let fixture: ComponentFixture<TestTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTextboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
