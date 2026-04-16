import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTextareaComponent } from './test-textarea.component';

describe('TestTextareaComponent', () => {
  let component: TestTextareaComponent;
  let fixture: ComponentFixture<TestTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
