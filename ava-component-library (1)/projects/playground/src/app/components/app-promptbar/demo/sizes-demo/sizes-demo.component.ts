import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaPromptBarComponent } from '@aava/play-core';
import { PromptIcons, PromptBarTag, PromptBarOption } from '../../../../../../../play-core/src/public-api';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaPromptBarComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrls: ['./sizes-demo.component.scss']
})
export class SizesDemoComponent {
  allIcons: PromptIcons[] = [
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

  deviceOptions: PromptBarOption[] = [
    { label: 'Desktop', value: 'desktop', icon: 'monitor' },
    { label: 'Tablet', value: 'tablet', icon: 'tablet' },
    { label: 'Mobile', value: 'mobile', icon: 'smartphone' }
  ];

  // Sample tags to demonstrate tag sizing
  sampleTags: PromptBarTag[] = [
    {
      id: 1,
      label: 'Document.pdf',
      icon: 'file-text',
      iconPosition: 'start',
      removable: true,
      color: 'primary'
    },
    {
      id: 2,
      label: 'Image.jpg',
      icon: 'image',
      iconPosition: 'start',
      removable: true,
      color: 'info'
    }
  ];

  // State for toggling tags
  showTags = false;

  onAttachFile() {
    console.log('Attach file clicked');
  }

  onSend() {
    console.log('Send clicked');
  }

  onMessageSent(message: string) {
    console.log('Message sent:', message);
  }

  onIconClick(event: any) {
    console.log('Icon clicked:', event);
  }

  onTagRemoved(tag: PromptBarTag) {
    console.log('Tag removed:', tag);
  }



  toggleTags() {
    this.showTags = !this.showTags;
  }

  getCurrentTags(): PromptBarTag[] {
    return this.showTags ? this.sampleTags : [];
  }
}
