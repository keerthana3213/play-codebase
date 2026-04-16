import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaPromptBarComponent, AavaFileUploadComponent } from '@aava/play-core'
import { PromptIcons, PromptBarTag } from '../../../../../play-core/src/public-api';

@Component({
  selector: 'app-test-prompt-bar',
  imports: [CommonModule, AavaPromptBarComponent, AavaFileUploadComponent],
  templateUrl: './test-prompt-bar.component.html',
  styleUrl: './test-prompt-bar.component.scss'
})
export class TestPromptBarComponent {
  @ViewChild(AavaPromptBarComponent) chatWindow!: AavaPromptBarComponent;
  @ViewChild(AavaFileUploadComponent) fileUpload!: AavaFileUploadComponent;

  placeholder = 'Type your message here...';
  disabled = false;
  rows = 3;
  size: 'lg' | 'md' | 'sm' | 'xs' = 'md';
  // Dynamic icons configuration
  chatIcons: PromptIcons[] = [
    {
      name: 'paperclip',
      slot: 'icon-start',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onFileAttach()
    },
    {
      name: 'code',
      slot: 'icon-start',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onMagicAction()
    },
    {
      name: 'code',
      slot: 'icon-start',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onMagicAction()
    },
    {
      name: 'undo2',
      slot: 'icon-end',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onUndoAction()
    },
    {
      name: 'loader-circle',
      slot: 'icon-end',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onLoadAction()
    },
    {
      name: 'wand-sparkles',
      slot: 'icon-end',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onMagicAction()
    },
    {
      name: 'send',
      slot: 'icon-end',
      size: this.size,
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onSendClick()
    }
  ];

  deviceOptions: any[] = [
    { label: 'Desktop', value: 'Desktop', icon: 'monitor-stop' },
    { label: 'Tablet', value: 'Tablet', icon: 'tablet' },
    { label: 'Mobile', value: 'Mobile', icon: 'tablet-smartphone' },
  ];

  // File upload configuration
  allowedFormats: string[] = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'gif', 'xlsx', 'xls', 'pptx', 'ppt'];
  maxFileSize = 5 * 1024 * 1024; // 5MB
  maxFiles = 10;

  // Dynamic tags for file attachments - starts empty, populated by file uploads
  tags: PromptBarTag[] = [];

  // Icon click handlers
  onFileAttach() {
    console.log('File attach clicked - use the file upload component above');
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
  onIconClick(event: { icon: PromptIcons, currentMessage: string }) {
    console.log('Icon clicked:', event.icon.name, 'Current message:', event.currentMessage);

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



  // File upload handlers
  onFilesSelected(files: File[]) {
    console.log('Files selected:', files);

    // Convert each file to a PromptBarTag
    const newTags: PromptBarTag[] = files.map(file => this.createTagFromFile(file));

    // Add new tags to existing tags array
    this.tags = [...this.tags, ...newTags];
  }

  // Utility method to create PromptBarTag from File object
  private createTagFromFile(file: File): PromptBarTag {
    const fileExtension = this.getFileExtension(file.name);
    const fileIcon = this.getFileIcon(fileExtension);
    const fileColor = this.getFileColor(fileExtension);

    return {
      id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      label: file.name,
      icon: fileIcon,
      iconPosition: 'start',
      removable: true,
      color: fileColor,
      customStyle: {
        'max-width': '200px'
      }
    };
  }

  // Utility methods for file type detection
  private getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  private getFileIcon(extension: string): string {
    const iconMap: { [key: string]: string } = {
      // Documents
      'pdf': 'file-text',
      'doc': 'file-text',
      'docx': 'file-text',
      'txt': 'file-text',

      // Spreadsheets
      'xlsx': 'file-spreadsheet',
      'xls': 'file-spreadsheet',
      'csv': 'file-spreadsheet',

      // Presentations
      'pptx': 'presentation',
      'ppt': 'presentation',

      // Images
      'jpg': 'image',
      'jpeg': 'image',
      'png': 'image',
      'gif': 'image',
      'svg': 'image',
      'webp': 'image',

      // Archives
      'zip': 'file-archive',
      'rar': 'file-archive',
      '7z': 'file-archive',

      // Code files
      'js': 'file-code',
      'ts': 'file-code',
      'html': 'file-code',
      'css': 'file-code',
      'json': 'file-code',

      // Default
      'default': 'paperclip'
    };

    return iconMap[extension] || iconMap['default'];
  }

  private getFileColor(extension: string): 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' {
    const colorMap: { [key: string]: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' } = {
      // Documents - blue
      'pdf': 'primary',
      'doc': 'primary',
      'docx': 'primary',
      'txt': 'default',

      // Spreadsheets - green
      'xlsx': 'success',
      'xls': 'success',
      'csv': 'success',

      // Presentations - orange
      'pptx': 'warning',
      'ppt': 'warning',

      // Images - info
      'jpg': 'info',
      'jpeg': 'info',
      'png': 'info',
      'gif': 'info',
      'svg': 'info',
      'webp': 'info',

      // Archives - error
      'zip': 'error',
      'rar': 'error',
      '7z': 'error',

      // Code files - success
      'js': 'success',
      'ts': 'success',
      'html': 'success',
      'css': 'success',
      'json': 'success'
    };

    return colorMap[extension] || 'default';
  }

}
