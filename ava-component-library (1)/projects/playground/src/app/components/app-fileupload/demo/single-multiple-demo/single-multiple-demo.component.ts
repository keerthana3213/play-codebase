import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-single-multiple-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './single-multiple-demo.component.html',
  styleUrl: './single-multiple-demo.component.scss',
})
export class SingleMultipleDemoComponent {
  singleFile: File[] = [];
  multipleFiles: File[] = [];

  onSingleFileChange(files: File[]): void {
    console.log('Single file changed:', files);
    this.singleFile = files;
  }

  onMultipleFileChange(files: File[]): void {
    console.log('Multiple files changed:', files);
    this.multipleFiles = files;
  }
}
