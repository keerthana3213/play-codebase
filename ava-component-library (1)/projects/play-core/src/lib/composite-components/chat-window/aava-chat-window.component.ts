import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaDefaultCardComponent } from '../../components/card/default-card/aava-default-card.component';
import { AavaTextareaComponent } from '../../components/textarea/aava-textarea.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  avatar?: string;
}

export interface ChatWindowIcon {
  name: string;
  click?: () => void;
  size?: number;
  color?: string;
  slot: 'icon-start' | 'icon-end';
}

@Component({
  selector: 'aava-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaDefaultCardComponent, AavaTextareaComponent, AavaIconComponent],
  templateUrl: './aava-chat-window.component.html',
  styleUrl: './aava-chat-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaChatWindowComponent implements AfterViewChecked, AfterViewInit, OnChanges {
  @Input() messages: ChatMessage[] = [];
  @Input() placeholder = 'Type a message';
  @Input() disabled = false;
  @Input() icons: ChatWindowIcon[] = [];
  @Input() rows = 3;

  @Output() messageSent = new EventEmitter<string>();
  @Output() iconClicked = new EventEmitter<{ icon: ChatWindowIcon, currentMessage: string }>();

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  currentMessage = '';
  private shouldScrollToBottom = false;

  ngOnChanges(changes: SimpleChanges) {
    // Scroll to bottom when messages array changes
    if (changes['messages'] && changes['messages'].currentValue) {
      this.shouldScrollToBottom = true;
    }
  }

  ngAfterViewInit() {
    // Scroll to bottom when component loads
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  sendMessage() {
    const messageText = this.currentMessage.trim();
    if (!messageText || this.disabled) return;

    this.messageSent.emit(messageText);
    this.currentMessage = '';
    this.shouldScrollToBottom = true;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.currentMessage = target.value;
  }

  focusInput(event: Event) {
    const target = event.target as HTMLInputElement;
    target.focus();
  }

  onIconClick(icon: ChatWindowIcon) {
    // Emit icon click event with current message so user can handle it
    this.iconClicked.emit({ icon, currentMessage: this.currentMessage });

    // Also call the icon's custom click handler if provided
    if (icon.click) {
      icon.click();
    }
  }

  getIconsBySlot(slot: 'icon-start' | 'icon-end'): ChatWindowIcon[] {
    return this.icons.filter(icon => icon.slot === slot);
  }

  // Public method to trigger send from outside
  public triggerSend() {
    this.sendMessage();
  }

  // Public method to get current message
  public getCurrentMessage(): string {
    return this.currentMessage;
  }

  private scrollToBottom() {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        element.scrollTop = element.scrollHeight;
      });
    }
  }
}
