import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-validation-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './validation-demo.component.html',
  styleUrl: './validation-demo.component.scss',
})
export class ValidationDemoComponent {
  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
  }
}
