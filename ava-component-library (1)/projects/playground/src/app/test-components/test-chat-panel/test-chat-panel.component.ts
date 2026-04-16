import { Component } from '@angular/core';
import { AavaChatPanelComponent } from '@aava/play-core';


// Define the Message interface
interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// Define the configuration interface for type safety
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
  selector: 'app-test-chat-panel',
  imports: [AavaChatPanelComponent],
  templateUrl: './test-chat-panel.component.html',
  styleUrl: './test-chat-panel.component.scss'
})
export class TestChatPanelComponent {
  // Define the JSON configuration directly in the component
  private CHAT_CONFIG: ChatConfig = {
    colors: {
      user: {
        background: "#0084FF",
        text: "#FFFFFF",
      },
      ai: {
        background: "#E6F3FF",
        text: "#3B3F46",
      },
    },
    icon: {
      color: "#4285F4",
      size: 16,
      background: "#E6F3FF",
      iconName: "bot"
    },
    defaultAIResponses: {
      default: "Select an existing Prompt from the left. Need a new one? Click Create New Prompt to create and save it.",
    },
  };

  chatMessages: Message[] = [
    {
      sender: 'user',
      text: "I'm new here, what to do here",
    },
    {
      sender: 'ai',
      text: "Select an existing Prompt from the left. Need a new one? Click Create New Prompt to create and save it.",
    },
    {
      sender: 'user',
      text: "I'm new here, what to do here",
    },
    {
      sender: 'ai',
      text: this.CHAT_CONFIG.defaultAIResponses.default,
    },
  ];

  onMessagesChange(messages: Message[]): void {
    this.chatMessages = messages;
  }

  // Expose the config as a public getter for use in the template
  public get config(): ChatConfig {
    return this.CHAT_CONFIG;
  }
}
