import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent, UploadFile } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-states-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './states-demo.component.html',
  styleUrl: './states-demo.component.scss',
})
export class StatesDemoComponent {
  selectedFiles: File[] = [];
  deletedFiles: UploadFile[] = [];

  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
    this.selectedFiles = files;
  }

  onFilesDeleted(deletedFiles: UploadFile[]): void {
    console.log('Files deleted:', deletedFiles);
    this.deletedFiles = deletedFiles;
  }
}
