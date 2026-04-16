import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { AavaSearchBarComponent } from '../search-bar/aava-search-bar.component';
import { AavaIconComponent } from '../../../public-api';
import { CommonModule } from '@angular/common';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatConfig {
  colors: {
    user: { background: string; text: string };
    ai: { background: string; text: string };
  };
  icon: {
    color: string;
    size: number;
    background: string;
    iconName: string;
  };
  defaultAIResponses: {
    default: string;
  };
}

@Component({
  selector: 'aava-chat-panel',
  imports: [AavaSearchBarComponent, AavaIconComponent, CommonModule],
  templateUrl: './aava-chat-panel.component.html',
  styleUrl: './aava-chat-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaChatPanelComponent {
  @Input() messages: Message[] = [];
  @Input() config?: ChatConfig;
  @Output() messagesChange = new EventEmitter<Message[]>();
  
  @ViewChild('searchBar', { static: false, read: ElementRef }) searchBar!: ElementRef;

  onSendMessage(text: string): void {
    if (text.trim()) {
      const userMessage: Message = { sender: 'user', text };
      const updatedMessages = [...this.messages, userMessage];
      const aiResponse: Message = { sender: 'ai', text: this.generateAIResponse(text) };
      const finalMessages = [...updatedMessages, aiResponse];
      this.messagesChange.emit(finalMessages);
      
      // Clear the search bar input after sending
      const inputElement = this.searchBar?.nativeElement?.querySelector('input');
      if (inputElement) {
        inputElement.value = '';
        // Trigger input event to update any bound models
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  }

  private generateAIResponse(userText: string): string {
    if (this.config?.defaultAIResponses?.default) {
      return this.config.defaultAIResponses.default.replace('{userText}', userText);
    }
    return `Select an existing Prompt from the left. Need a new one? Click Create New Prompt to create and save it.`;
  }

  getMessageStyle(sender: 'user' | 'ai'): Record<string, string> {
    if (!this.config) return {};
    return {
      'background-color': this.config.colors[sender].background,
      'color': this.config.colors[sender].text,
    };
  }

  get iconColor(): string {
    return this.config?.icon?.color || '#4285F4';
  }

  get iconSize(): number {
    return this.config?.icon?.size || 16;
  }

  get iconName(): string {
    return this.config?.icon?.iconName || 'bot';
  }
}