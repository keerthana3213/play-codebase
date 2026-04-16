import { Component, signal, ViewChild } from '@angular/core';
import { AavaChatWindowComponent, ChatMessage, ChatWindowIcon } from '@aava/play-core';
@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [AavaChatWindowComponent],
  templateUrl: './app-chat-window.component.html',
  styleUrls: ['./app-chat-window.component.scss']
})
export class AppChatWindowComponent {
  @ViewChild(AavaChatWindowComponent) chatWindow!: AavaChatWindowComponent;

  messages = signal<ChatMessage[]>([]);
  placeholder = 'Type your message here...';
  disabled = false;
  rows = 3;

  // Dynamic icons configuration
  chatIcons: ChatWindowIcon[] = [
    {
      name: 'paperclip',
      slot: 'icon-start',
      size: 16,
      color: '#2563eb',
      click: () => this.onFileAttach()
    },
    {
      name: 'wand-sparkles',
      slot: 'icon-end',
      size: 16,
      color: '#2563eb',
      click: () => this.onMagicAction()
    },
    {
      name: 'send',
      slot: 'icon-end',
      size: 16,
      color: '#2563eb',
      click: () => this.onSendClick()
    }
  ];

  onMessageSent(messageText: string) {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }) + ' | Today',
      isUser: true
    };

    this.messages.update(messages => [...messages, userMessage]);

    // Add bot response after delay
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: this.generateBotResponse(messageText),
        timestamp: new Date().toLocaleString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }) + ' | Today',
        isUser: false,
        avatar: '🤖'
      };

      this.messages.update(messages => [...messages, botMessage]);
    }, 1000);
  }

  // Icon click handlers
  onFileAttach() {
    console.log('File attach clicked');
    // Add file attachment logic here
  }

  onMagicAction() {
    console.log('Magic action clicked');
    // Add magic/AI action logic here
  }

  onSendClick() {
    console.log('Send icon clicked');
    // User handles send functionality - trigger send from chat window
    this.chatWindow.triggerSend();
  }

  // Handle icon clicks from chat window
  onIconClick(event: { icon: ChatWindowIcon, currentMessage: string }) {
    console.log('Icon clicked:', event.icon.name, 'Current message:', event.currentMessage);

    // Handle send icon specifically
    if (event.icon.name === 'send') {
      // User can add custom logic here before sending
      console.log('Send icon clicked, message:', event.currentMessage);
      // The send will be handled by the icon's click handler or manually trigger
    }
  }

  private generateBotResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase().trim();

    if (lowerMessage === 'hi' || lowerMessage === 'hello' || lowerMessage === 'hey') {
      return 'Hi! How can I help you today?';
    }

    if (lowerMessage.includes('help')) {
      return 'I\'m here to help! What do you need assistance with?';
    }

    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }

    return 'Thanks for your message! How can I assist you?';
  }
}
