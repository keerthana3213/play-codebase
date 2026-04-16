import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaPromptBarComponent, PromptIcons, PromptBarOption } from '../../../../../../../play-core/src/public-api';

@Component({
  selector: 'ava-icons-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaPromptBarComponent],
  templateUrl: './icons-demo.component.html',
  styleUrls: ['./icons-demo.component.scss']
})
export class IconsDemoComponent {
  startIcons: PromptIcons[] = [
    {
      name: 'paperclip',
      slot: 'icon-start',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onAttachFile()
    },
    {
      name: 'image',
      slot: 'icon-start',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onAddImage()
    }
  ];

  endIcons: PromptIcons[] = [
    {
      name: 'mic',
      slot: 'icon-end',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onVoiceRecord()
    },
    {
      name: 'send',
      slot: 'icon-end',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onSend()
    }
  ];

  allIcons: PromptIcons[] = [
    ...this.startIcons,
    ...this.endIcons
  ];

  deviceOptions: PromptBarOption[] = [
    { label: 'Desktop', value: 'desktop', icon: 'monitor' },
    { label: 'Tablet', value: 'tablet', icon: 'tablet' },
    { label: 'Mobile', value: 'mobile', icon: 'smartphone' }
  ];

  onMessageSent(message: string) {
    console.log('Message sent:', message);
  }

  onIconClick(event: any) {
    console.log('Icon clicked:', event);
  }

  onAttachFile() {
    console.log('Attach file clicked');
  }

  onAddImage() {
    console.log('Add image clicked');
  }

  onVoiceRecord() {
    console.log('Voice record clicked');
  }

  onSend() {
    console.log('Send clicked');
  }

  onCustomAction() {
    console.log('Custom action clicked');
  }

  onSaveDraft() {
    console.log('Save draft clicked');
  }

  onClear() {
    console.log('Clear clicked');
  }

  onSendMessage() {
    console.log('Send message clicked');
  }
}
