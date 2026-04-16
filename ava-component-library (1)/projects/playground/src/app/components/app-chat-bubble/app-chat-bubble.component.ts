import { Component } from '@angular/core';
import { AavaChatBubbleComponent } from '@aava/play-core';

interface Message {
  sender: 'user' | 'ai';
  senderName: string;
  time: string;
  text: string;
  avatar: string;
  icons: { name: string; label: string }[];
}

@Component({
  selector: 'app-app-chat-bubble',
  imports: [AavaChatBubbleComponent],
  templateUrl: './app-chat-bubble.component.html',
  styleUrl: './app-chat-bubble.component.scss'
})
export class AppChatBubbleComponent {
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
}
