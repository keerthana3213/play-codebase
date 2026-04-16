import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface ApiEvent {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.scss']
})
export class ApiDemoComponent {
  componentProps: ApiProperty[] = [
    { name: 'messages', type: 'PromptMessage[]', default: '[]', description: 'Array of chat messages to display' },
    { name: 'placeholder', type: 'string', default: '"Type a message"', description: 'Placeholder text for the textarea' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the prompt bar is disabled' },
    { name: 'icons', type: 'PromptIcons[]', default: '[]', description: 'Array of icons to display in start/end slots' },
    { name: 'rows', type: 'number', default: '3', description: 'Number of rows for the textarea' },
    { name: 'deviceOptions', type: 'PromptBarOption[]', default: '[]', description: 'Array of device options for selection dropdown' },
    { name: 'showSelection', type: 'boolean', default: 'false', description: 'Whether to show the device selection dropdown' },
    { name: 'size', type: '"lg" | "md" | "sm" | "xs"', default: '"md"', description: 'Size variant of the prompt bar' },
    { name: 'tags', type: 'PromptBarTag[]', default: '[]', description: 'Array of tags to display (e.g., file attachments, labels)' },
    { name: 'width', type: 'number', default: '0', description: 'Custom width in pixels (0 = auto)' },
    { name: 'height', type: 'number', default: '0', description: 'Custom height in pixels (0 = auto)' },
    { name: 'textAreaMaxHeight', type: 'number', default: '0', description: 'Maximum height for auto-resize textarea' },
    { name: 'textAreaAutoResize', type: 'boolean', default: 'false', description: 'Enable auto-resize for textarea' }
  ];

  events: ApiEvent[] = [
    { name: 'messageSent', type: 'EventEmitter<string>', description: 'Emitted when a message is sent' },
    { name: 'iconClicked', type: 'EventEmitter<{icon: PromptIcons, currentMessage: string}>', description: 'Emitted when an icon is clicked' },
    { name: 'tagRemoved', type: 'EventEmitter<PromptBarTag>', description: 'Emitted when a tag is removed' },
    { name: 'tagClicked', type: 'EventEmitter<PromptBarTag>', description: 'Emitted when a tag is clicked' }
  ];

  interfaceProps: ApiProperty[] = [
    { name: 'PromptMessage.id', type: 'string', default: '-', description: 'Unique identifier for the message' },
    { name: 'PromptMessage.text', type: 'string', default: '-', description: 'Message text content' },
    { name: 'PromptMessage.timestamp', type: 'string', default: '-', description: 'Message timestamp' },
    { name: 'PromptMessage.isUser', type: 'boolean', default: '-', description: 'Whether message is from user or system' },
    { name: 'PromptMessage.avatar', type: 'string', default: 'undefined', description: 'Optional avatar URL for the message' },
    { name: 'PromptIcons.name', type: 'string', default: '-', description: 'Icon name (lucide icon)' },
    { name: 'PromptIcons.slot', type: '"icon-start" | "icon-end"', default: '-', description: 'Icon placement slot' },
    { name: 'PromptIcons.color', type: 'string', default: 'undefined', description: 'Icon color (CSS color value)' },
    { name: 'PromptIcons.visible', type: 'boolean', default: 'true', description: 'Whether icon is visible' },
    { name: 'PromptIcons.click', type: '() => void', default: 'undefined', description: 'Click handler function' }
  ];

  basicUsageExample = `<aava-prompt-bar
  placeholder="Type your message..."
  (messageSent)="onMessageSent($event)"
  (iconClicked)="onIconClick($event)">
</aava-prompt-bar>`;

  iconsExample = `<aava-prompt-bar
  placeholder="Prompt with icons"
  [icons]="icons"
  (messageSent)="onMessageSent($event)">
</aava-prompt-bar>

// Component
icons: PromptIcons[] = [
  {
    name: 'paperclip',
    slot: 'icon-start',
    visible: true,
    click: () => this.onAttachFile()
  },
  {
    name: 'send',
    slot: 'icon-end',
    visible: true,
    click: () => this.onSend()
  }
];`;

  messagesExample = `<aava-prompt-bar
  [messages]="messages"
  [height]="400"
  placeholder="Chat with messages"
  (messageSent)="onMessageSent($event)">
</aava-prompt-bar>

// Component
messages: PromptMessage[] = [
  {
    id: '1',
    text: 'Hello!',
    timestamp: '10:30 AM',
    isUser: false
  }
];`;

  fileUploadExample = `<aava-prompt-bar
  [tags]="fileTags"
  [deviceOptions]="deviceOptions"
  [showSelection]="true"
  placeholder="Upload files and select device"
  (messageSent)="onMessageSent($event)"
  (tagRemoved)="onTagRemoved($event)">
</aava-prompt-bar>

// Component
fileTags: PromptBarTag[] = [
  {
    id: 1,
    label: 'document.pdf',
    avatar: 'https://example.com/pdf-icon.png',
    removable: true,
    color: 'default'
  }
];`;
}
