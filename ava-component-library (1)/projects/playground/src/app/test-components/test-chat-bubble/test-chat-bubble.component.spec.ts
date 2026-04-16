import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChatBubbleComponent } from './test-chat-bubble.component';

describe('TestChatBubbleComponent', () => {
  let component: TestChatBubbleComponent;
  let fixture: ComponentFixture<TestChatBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestChatBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChatBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
