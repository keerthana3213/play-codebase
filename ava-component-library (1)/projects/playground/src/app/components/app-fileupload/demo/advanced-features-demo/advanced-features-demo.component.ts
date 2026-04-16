import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent, UploadFile } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-advanced-features-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './advanced-features-demo.component.html',
  styleUrl: './advanced-features-demo.component.scss',
})
export class AdvancedFeaturesDemoComponent {
  selectedFiles: File[] = [];
  deletedFiles: UploadFile[] = [];

  customFileColors = {
    pdf: '#e74c3c',
    doc: '#3498db',
    docx: '#3498db',
    jpg: '#f39c12',
    png: '#f39c12',
    txt: '#2ecc71'
  };

  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
    this.selectedFiles = files;
  }

  onFilesDeleted(deletedFiles: UploadFile[]): void {
    console.log('Files deleted:', deletedFiles);
    this.deletedFiles = deletedFiles;
  }
}
