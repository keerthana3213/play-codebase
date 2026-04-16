import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPromptBarComponent } from './test-prompt-bar.component';

describe('TestPromptBarComponent', () => {
  let component: TestPromptBarComponent;
  let fixture: ComponentFixture<TestPromptBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPromptBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPromptBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
