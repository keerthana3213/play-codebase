import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppChatPanelComponent } from './app-chat-panel.component';

// Lightweight mock of the library child component
@Component({
  selector: 'aava-chat-panel',
  standalone: true,
  template: `
    <!-- Expose minimal DOM to query if needed -->
    <div class="mock-chat-panel">
      <div class="messages-count">{{ messages?.length || 0 }}</div>
      <div class="icon-name">{{ config?.icon?.iconName }}</div>
    </div>
  `,
})
class MockAavaChatPanelComponent {
  @Input() messages: Array<{ sender: 'user' | 'ai'; text: string }> = [];
  @Input() config: any;
  @Output() messagesChange = new EventEmitter<Array<{ sender: 'user' | 'ai'; text: string }>>();
}

describe('AppChatPanelComponent', () => {
  let fixture: ComponentFixture<AppChatPanelComponent>;
  let component: AppChatPanelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChatPanelComponent, MockAavaChatPanelComponent],
    })
      // override the component's real imports to use our mock child
      .overrideComponent(AppChatPanelComponent, {
        set: { imports: [MockAavaChatPanelComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppChatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes default config via getter', () => {
    const cfg = component.config;
    expect(cfg).toBeTruthy();
    expect(cfg.icon.iconName).toBe('bot');
    expect(cfg.icon.size).toBe(16);
    expect(cfg.colors.user.background).toBe('#0084FF');
    expect(cfg.defaultAIResponses.default)
      .toContain('Select an existing Prompt from the left');
  });

  it('initializes chatMessages with default seed', () => {
    expect(component.chatMessages.length).toBe(4);
    // last AI message uses the config default
    const last = component.chatMessages[component.chatMessages.length - 1];
    expect(last.sender).toBe('ai');
    expect(last.text).toBe(component.config.defaultAIResponses.default);
  });

  it('passes messages and config to the child component', () => {
    const de = fixture.debugElement.query(By.css('aava-chat-panel'));
    expect(de).toBeTruthy();
    const child = de.componentInstance as MockAavaChatPanelComponent;

    expect(child.messages).toBe(component.chatMessages);
    expect(child.config).toEqual(component.config);

    // also verify via rendered DOM in the mock
    const countEl = fixture.debugElement.query(By.css('.messages-count')).nativeElement as HTMLElement;
    expect(countEl.textContent?.trim()).toBe(String(component.chatMessages.length));

    const iconEl = fixture.debugElement.query(By.css('.icon-name')).nativeElement as HTMLElement;
    expect(iconEl.textContent?.trim()).toBe('bot');
  });

  it('updates parent chatMessages when child emits messagesChange', () => {
    const de = fixture.debugElement.query(By.css('aava-chat-panel'));
    const child = de.componentInstance as MockAavaChatPanelComponent;

    const next = [
      { sender: 'user' as const, text: 'Hi' },
      { sender: 'ai' as const, text: 'Hello!' },
    ];
    child.messagesChange.emit(next);
    fixture.detectChanges();

    expect(component.chatMessages).toEqual(next);

    // Ensure new inputs propagate down to child after update
    const countEl = fixture.debugElement.query(By.css('.messages-count')).nativeElement as HTMLElement;
    expect(countEl.textContent?.trim()).toBe('2');
  });

  it('onMessagesChange replaces the list (not mutating existing array)', () => {
    const prevRef = component.chatMessages;
    const next = [{ sender: 'user' as const, text: 'Ping' }];
    component.onMessagesChange(next);
    expect(component.chatMessages).toBe(next);
    expect(component.chatMessages).not.toBe(prevRef);
  });
});
