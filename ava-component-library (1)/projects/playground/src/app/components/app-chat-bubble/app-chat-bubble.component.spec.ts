import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChatBubbleComponent } from './app-chat-bubble.component';

describe('AppChatBubbleComponent', () => {
  let component: AppChatBubbleComponent;
  let fixture: ComponentFixture<AppChatBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChatBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppChatBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
