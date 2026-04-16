import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaPromptBarComponent, PromptIcons } from '@aava/play-core';
import { FormsModule } from '@angular/forms';

interface PromptBarDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'awe-app-promptbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AavaPromptBarComponent],
  templateUrl: './app-promptbar.component.html',
  styleUrls: [
    './app-promptbar.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppPromptbarComponent {
  // Documentation sections
  sections: PromptBarDocSection[] = [
    {
      title: 'Basic Usage',
      description:
        'Simple prompt bar component with message input and basic functionality.',
      showCode: false,
    },
    {
      title: 'Size Variants',
      description:
        'Different size options (xs, sm, md, lg) for various use cases.',
      showCode: false,
    },
    {
      title: 'Icons & Actions',
      description:
        'Customizable icons in start and end slots with click handlers.',
      showCode: false,
    },
    {
      title: 'File Upload',
      description:
        'File attachment functionality with removable tags and device selection.',
      showCode: false,
    },
    {
      title: 'States & Configuration',
      description:
        'Disabled state, custom placeholders, and textarea auto-resize.',
      showCode: false,
    },
    {
      title: 'API Reference',
      description:
        'Complete API documentation with properties, events, and examples.',
      showCode: false,
    },
  ];

  // API documentation
  inputProperties: ApiProperty[] = [
    { name: 'messages', type: 'PromptMessage[]', default: '[]', description: 'Array of chat messages to display' },
    { name: 'placeholder', type: 'string', default: '"Type a message"', description: 'Placeholder text for the textarea' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the prompt bar is disabled' },
    { name: 'icons', type: 'PromptIcons[]', default: '[]', description: 'Array of icons to display in start/end slots' },
    { name: 'size', type: '"lg" | "md" | "sm" | "xs"', default: '"md"', description: 'Size variant of the prompt bar' },
    { name: 'tags', type: 'PromptBarTag[]', default: '[]', description: 'Array of tags to display (e.g., file attachments, labels)' },
    { name: 'width', type: 'number', default: '0', description: 'Custom width in pixels (0 = auto)' },
    { name: 'height', type: 'number', default: '0', description: 'Custom height in pixels (0 = auto)' },
    { name: 'selectWidth', type: 'string', default: '"144px"', description: 'Custom width for the select component' },
  ];

  outputProperties: ApiProperty[] = [
    { name: 'messageSent', type: 'EventEmitter<string>', default: '-', description: 'Emitted when a message is sent' },
    { name: 'iconClicked', type: 'EventEmitter<object>', default: '-', description: 'Emitted when an icon is clicked' }
  ];

  // Sample data for quick demos
  sampleIcons: PromptIcons[] = [
    {
      name: 'paperclip',
      slot: 'icon-start',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onAttachFile()
    },
    {
      name: 'send',
      slot: 'icon-end',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onSend()
    }
  ];

  // Simple example handlers
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  onMessageSent(event: any) {
    console.log('Message sent:', event);
  }

  onIconClick(event: any) {
    console.log('Icon clicked:', event);
  }

  onAttachFile() {
    console.log('Attach file clicked');
  }

  onSend() {
    console.log('Send clicked');
  }

  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }

  // Example code snippets
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
import { Component } from '@angular/core';
import { AavaPromptBarComponent } from '@aava/play-core';

@Component({
  selector: 'app-basic-prompt',
  standalone: true,
  imports: [AavaPromptBarComponent],
  template: \`
    <aava-prompt-bar
      placeholder="Type your message..."
      (messageSent)="onMessageSent($event)">
    </aava-prompt-bar>
  \`
})
export class BasicPromptComponent {
  onMessageSent(message: string) {
    console.log('Message sent:', message);
  }
}`,
      'icons & actions': `
import { Component } from '@angular/core';
import { AavaPromptBarComponent, PromptIcons } from '@aava/play-core';

@Component({
  selector: 'app-icons-prompt',
  standalone: true,
  imports: [AavaPromptBarComponent],
  template: \`
    <aava-prompt-bar
      [icons]="icons"
      placeholder="Prompt with icons"
      (messageSent)="onMessageSent($event)"
      (iconClicked)="onIconClick($event)">
    </aava-prompt-bar>
  \`
})
export class IconsPromptComponent {
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
  ];
}`,
    };

    return examples[section.toLowerCase()] || '';
  }

  getRouteForSection(title: string): string {
    const routeMap: Record<string, string> = {
      'Basic Usage': 'basic-usage',
      'Size Variants': 'sizes',
      'Icons & Actions': 'icons',
      'File Upload': 'file-upload',
      'States & Configuration': 'states',
      'API Reference': 'api'
    };
    return routeMap[title] || '';
  }
}
