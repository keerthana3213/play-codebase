import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-preview-layout-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './preview-layout-demo.component.html',
  styleUrl: './preview-layout-demo.component.scss',
})
export class PreviewLayoutDemoComponent {
  selectedFiles: File[] = [];

  customColumns = [
    { key: 'fileName', label: 'File Name', visible: true },
    { key: 'fileSize', label: 'Size', visible: true },
    { key: 'fileType', label: 'Type', visible: false }, // Hidden column
    { key: 'uploadDate', label: 'Date', visible: true },
    { key: 'actions', label: 'Actions', visible: true },
  ];

  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
    this.selectedFiles = files;
  }
}
