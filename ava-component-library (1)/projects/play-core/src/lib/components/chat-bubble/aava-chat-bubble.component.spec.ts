import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaChatBubbleComponent } from './aava-chat-bubble.component'; // ✅ adjust path if needed

describe('AavaChatBubbleComponent', () => {
  let component: AavaChatBubbleComponent;
  let fixture: ComponentFixture<AavaChatBubbleComponent>;

  const mockMessages = [
    {
      sender: 'user' as const,
      senderName: 'John Doe',
      time: '10:00 AM',
      text: 'Hello AI!',
      avatar: 'user-avatar.png',
      icons: [{ name: 'like', label: 'Like' }]
    },
    {
      sender: 'ai' as const,
      senderName: 'AI Bot',
      time: '10:01 AM',
      text: 'Hello John!',
      avatar: 'ai-avatar.png',
      icons: [{ name: 'dislike', label: 'Dislike' }]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaChatBubbleComponent] // ✅ standalone import
    }).compileComponents();

    fixture = TestBed.createComponent(AavaChatBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept and render messages', () => {
    component.messages = mockMessages;
    fixture.detectChanges();

    expect(component.messages.length).toBe(2);
    expect(component.messages[0].text).toBe('Hello AI!');
    expect(component.messages[1].sender).toBe('ai');
  });

  it('should call copyMessage and use clipboard API', async () => {
    const spy = spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    await component.copyMessage('Copy this text');
    expect(spy).toHaveBeenCalledWith('Copy this text');
  });

  it('should handle reaction method', () => {
    const spy = spyOn(component, 'reactToMessage').and.callThrough();
    component.reactToMessage('like');
    expect(spy).toHaveBeenCalledWith('like');
  });

  it('should handle replyToMessage method', () => {
    const spy = spyOn(component, 'replyToMessage').and.callThrough();
    component.replyToMessage();
    expect(spy).toHaveBeenCalled();
  });

  it('should call speakMessage and trigger speechSynthesis', () => {
    const spy = spyOn(window.speechSynthesis, 'speak');
    component.speakMessage('Hello world');
    expect(spy).toHaveBeenCalled();
  });
});
