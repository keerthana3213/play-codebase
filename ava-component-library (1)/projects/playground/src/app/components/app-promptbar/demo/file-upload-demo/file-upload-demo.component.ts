import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaPromptBarComponent, PromptBarOption, PromptIcons, PromptBarTag, AavaFileUploadComponent } from '../../../../../../../play-core/src/public-api';

@Component({
  selector: 'ava-file-upload-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaPromptBarComponent, AavaFileUploadComponent],
  templateUrl: './file-upload-demo.component.html',
  styleUrls: ['./file-upload-demo.component.scss']
})
export class FileUploadDemoComponent {
  @ViewChild('fileUpload') fileUpload!: AavaFileUploadComponent;
  @ViewChild('fileUploadImages') fileUploadImages!: AavaFileUploadComponent;
  tags: PromptBarTag[] = [];
  tagsWithImages: PromptBarTag[] = [];

  deviceOptions: PromptBarOption[] = [
    { label: 'Desktop', value: 'desktop', icon: 'monitor' },
    { label: 'Tablet', value: 'tablet', icon: 'tablet' },
    { label: 'Mobile', value: 'mobile', icon: 'smartphone' }
  ];

  icons: PromptIcons[] = [
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

  imageIcons: PromptIcons[] = [
    {
      name: 'image',
      slot: 'icon-start',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onAttachImage()
    },
    {
      name: 'send',
      slot: 'icon-end',
      color: 'var(--color-text-primary)',
      visible: true,
      click: () => this.onSend()
    }
  ];

  onAttachFile() {
    this.fileUpload.openFileSelector();
  }

  onAttachImage() {
    this.fileUploadImages.openFileSelector();
  }

  onSend() {
    console.log('Send clicked');
  }

  onTagRemoved(tag: PromptBarTag) {
    this.tags = this.tags.filter(t => t.id !== tag.id);
  }

  onTagRemovedWithImages(tag: PromptBarTag) {
    this.tagsWithImages = this.tagsWithImages.filter(t => t.id !== tag.id);
  }

  onFileSelected(files: File[]) {
    // Convert files to simple tags
    const newTags: PromptBarTag[] = files.map(file => ({
      id: Date.now() + Math.random(),
      label: file.name,
      icon: 'file',
      iconPosition: 'start' as const,
      removable: true,
      color: 'primary' as const
    }));
    this.tags = [...this.tags, ...newTags];
  }

  onImageFileSelected(files: File[]) {
    // Convert files to tags with file reference for image preview
    const newTags: PromptBarTag[] = files.map(file => ({
      id: Date.now() + Math.random(),
      label: file.name,
      icon: this.getFileIcon(file),
      iconPosition: 'start' as const,
      removable: true,
      color: 'primary' as const,
      file: file // Include the file for image preview
    }));
    this.tagsWithImages = [...this.tagsWithImages, ...newTags];
  }

  private getFileIcon(file: File): string {
    const type = file.type.toLowerCase();
    if (type.startsWith('image/')) return 'image';
    return 'file';
  }

}
