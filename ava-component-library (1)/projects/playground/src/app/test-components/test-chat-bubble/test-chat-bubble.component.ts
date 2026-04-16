import { Component, EventEmitter, Output } from '@angular/core';
import { AavaButtonComponent,AavaChatBubbleComponent } from '@aava/play-core';



interface Message {
  sender: 'user' | 'ai';
  senderName: string;
  time: string;
  text: string;
  avatar: string;
  icons: { name: string; label: string }[];
}

@Component({
  selector: 'app-test-chat-bubble',
  imports: [AavaChatBubbleComponent, AavaButtonComponent],
  templateUrl: './test-chat-bubble.component.html',
  styleUrl: './test-chat-bubble.component.scss'
})
export class TestChatBubbleComponent {
  @Output() testButtonClick = new EventEmitter<void>();

  messages: Message[] = [
    {
      sender: "user",
      senderName: "Matthew Anderson",
      time: "05:00 pm",
      text: "Hey there! I'm new here and I'm really interested in the concept of tokenized real estate. Can anyone explain how it works?",
      avatar: 'assets/1.svg',
      icons: []
    },
    {
      sender: "ai",
      senderName: "Matthew Anderson",
      time: "05:01 pm",
      text: "Hey Matthew, welcome! Tokenized real estate is a way to represent ownership in real estate properties using blockchain technology. Each property is divided into tokens, and each token represents a certain fraction of ownership in that property.",
      avatar: 'assets/1.svg',
      icons: [
        { name: "thumbs-up", label: "Like" },
        { name: "thumbs-down", label: "Dislike" }
      ]
    }
  ];

  onTestButtonClick() {
    const userPrompt = prompt("Enter your message:");
    if (userPrompt) {
      const newUserMessage: Message = {
        sender: 'user',
        senderName: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: userPrompt,
        avatar: 'assets/1.svg',
        icons: []
      };
      this.messages = [...this.messages, newUserMessage];

      const aiResponse: Message = {
        sender: 'ai',
        senderName: 'AI',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: this.generateAIResponse(userPrompt),
        avatar: 'assets/1.svg',
        icons: [
          { name: "thumbs-up", label: "Like" },
          { name: "thumbs-down", label: "Dislike" }
        ]
      };

      setTimeout(() => {
        this.messages = [...this.messages, aiResponse];
      }, 500);
    }
  }

  generateAIResponse(userInput: string): string {
    return `
      Tokenized real estate is a way to digitally represent ownership of physical property using blockchain technology.
      It enables fractional ownership, increased liquidity, and transparent transactions through blockchain.
      Investors can buy, sell, or trade property tokens on digital platforms, making real estate investment more accessible.
    `;
  }
}
