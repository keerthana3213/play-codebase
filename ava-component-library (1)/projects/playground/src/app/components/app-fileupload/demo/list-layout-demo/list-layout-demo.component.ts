import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-list-layout-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './list-layout-demo.component.html',
  styleUrl: './list-layout-demo.component.scss',
})
export class ListLayoutDemoComponent {
  uploadedFiles: File[] = [];
  uploadSuccess = false;
  allowedFormats: string[] = [
    'jpeg',
    'jpg',
    'png',
    'svg',
    'doc',
    'docx',
    'xlsx',
    'txt',
    'pdf',
  ];

  onSelectedList(files: File[]): void {
    console.log('List layout files list changed:', files);
    this.uploadedFiles = files;
    this.uploadSuccess = files.length > 0;
  }

  getFileSize(file: File): string {
    return this.formatFileSize(file.size);
  }

  getFileIcon(file: File): string {
    const type = file.type.toLowerCase();
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('zip') || type.includes('archive')) return '📦';
    return '📁';
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
