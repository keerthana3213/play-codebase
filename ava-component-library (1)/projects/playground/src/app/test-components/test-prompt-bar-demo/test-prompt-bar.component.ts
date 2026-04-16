import { Component, ViewChild } from '@angular/core';
import {
  PromptIcons,
  AavaPromptBarComponent,
  PromptBarTag,
} from '@aava/play-core';

@Component({
  selector: 'app-test-prompt-bar-demo',
  imports: [AavaPromptBarComponent],
  templateUrl: './test-prompt-bar.component.html',
  styleUrl: './test-prompt-bar.component.scss',
})
export class TestPromptBarDemoComponent {
  @ViewChild(AavaPromptBarComponent) chatWindow!: AavaPromptBarComponent;

  placeholder = 'Type your message here...';
  disabled = false;
  rows = 2;
  size: 'lg' | 'md' | 'sm' | 'xs' = 'md';
  // Dynamic icons configuration
  chatIcons: PromptIcons[] = [
    {
      name: 'paperclip',
      slot: 'icon-start',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onFileAttach(),
    },
    {
      name: 'code',
      slot: 'icon-start',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onMagicAction(),
    },
    {
      name: 'code',
      slot: 'icon-start',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onMagicAction(),
    },
    {
      name: 'undo2',
      slot: 'icon-end',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onUndoAction(),
    },
    {
      name: 'loader-circle',
      slot: 'icon-end',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onLoadAction(),
    },
    {
      name: 'wand-sparkles',
      slot: 'icon-end',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onMagicAction(),
    },
    {
      name: 'send',
      slot: 'icon-end',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onSendClick(),
    },
  ];

  deviceOptions: any[] = [
    { label: 'Desktop', value: 'Desktop', icon: 'monitor-stop' },
    { label: 'Tablet', value: 'Tablet', icon: 'tablet' },
    { label: 'Mobile', value: 'Mobile', icon: 'tablet-smartphone' },
  ];

  // Dynamic tags for file attachments and other use cases
  tags: PromptBarTag[] = [
    {
      id: 1,
      label: 'report.pdf',
      avatar: 'https://i.pravatar.cc/30?img=1',
      removable: true,
      color: 'default',
    },
    {
      id: 2,
      label: 'photo.jpg',
      avatar: 'https://i.pravatar.cc/30?img=2',
      removable: true,
      color: 'primary',
    },
    {
      id: 3,
      label: 'data.csv',
      icon: 'file-spreadsheet',
      iconPosition: 'start',
      removable: true,
      color: 'success',
    },
    {
      id: 4,
      label: 'slides.pptx',
      avatar: 'https://i.pravatar.cc/30?img=4',
      removable: true,
      color: 'info',
    },
  ];

 
  // Icon click handlers
  onFileAttach() {
    console.log('File attach clicked');
    // Simulate adding a new file tag
    const newTag: PromptBarTag = {
      id: Date.now(),
      label: `attachment_${this.tags.length + 1}.txt`,
      icon: 'paperclip',
      iconPosition: 'start',
      removable: true,
      color: 'warning'
    };
    this.tags = [...this.tags, newTag];
  }

  onUndoAction() {
    console.log('Undo action clicked');
  }

  onLoadAction() {
    console.log('Circle action clicked');
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
  onIconClick(event: { icon: PromptIcons; currentMessage: string }) {
    console.log(
      'Icon clicked:',
      event.icon.name,
      'Current message:',
      event.currentMessage
    );

    // Handle send icon specifically
    if (event.icon.name === 'send') {
      // User can add custom logic here before sending
      console.log('Send icon clicked, message:', event.currentMessage);
      // The send will be handled by the icon's click handler or manually trigger
    }
  }

  // Handle tag removal
  onTagRemoved(tag: PromptBarTag) {
    console.log('Tag removed:', tag);
    this.tags = this.tags.filter(t => t.id !== tag.id);
  }


}
