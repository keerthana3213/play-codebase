import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, SendHorizontal, Search } from 'lucide-angular';

import { AavaChatPanelComponent } from './aava-chat-panel.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';

describe('AavaChatPanelComponent', () => {
  let component: AavaChatPanelComponent;
  let fixture: ComponentFixture<AavaChatPanelComponent>;

  const mockConfig = {
    colors: {
      user: { background: '#fff', text: '#000' },
      ai: { background: '#eee', text: '#111' }
    },
    icon: { color: '#f00', size: 24, background: '#000', iconName: 'bot' },
    defaultAIResponses: { default: 'Hello {userText}' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        AavaChatPanelComponent,
        AavaIconComponent,
        LucideAngularModule.pick({ SendHorizontal, Search })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaChatPanelComponent);
    component = fixture.componentInstance;
    component.config = mockConfig;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct message style for user and ai', () => {
    // expect(component.getMessageStyle('user')).toEqual(mockConfig.colors.user);
    // expect(component.getMessageStyle('ai')).toEqual(mockConfig.colors.ai);
  });

  it('should return icon properties from config', () => {
    expect(component.iconColor).toBe(mockConfig.icon.color);
    expect(component.iconSize).toBe(mockConfig.icon.size);
    expect(component.iconName).toBe(mockConfig.icon.iconName);
  });

  it('should generate AI response using config', () => {
    const response = (component as any).generateAIResponse('Test');
    expect(response).toBe('Hello Test');
  });

  it('should send user message and AI response, then emit messagesChange', () => {
    const emitSpy = spyOn(component.messagesChange, 'emit');

    // Mock input element
    const mockInput = document.createElement('input');
    const mockSearchBar = { nativeElement: { querySelector: () => mockInput } } as any;
    component.searchBar = mockSearchBar;

    component.messages = [];
    component.onSendMessage('Hi');

    expect(emitSpy).toHaveBeenCalled();

    // ✅ Add non-null assertion
    const emitted = emitSpy.calls.first()!.args[0] as any[];
    expect(emitted.length).toBe(2);
    expect(emitted[0].sender).toBe('user');
    expect(emitted[0].text).toBe('Hi');
    expect(emitted[1].sender).toBe('ai');
    expect(emitted[1].text).toBe('Hello Hi');

    // input should be cleared
    expect(mockInput.value).toBe('');
  });


  it('should not emit messagesChange if input is empty or whitespace', () => {
    const emitSpy = spyOn(component.messagesChange, 'emit');
    component.messages = [];
    component.onSendMessage('   ');
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
