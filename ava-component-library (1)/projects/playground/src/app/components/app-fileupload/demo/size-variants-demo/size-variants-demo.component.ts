import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-size-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './size-variants-demo.component.html',
  styleUrl: './size-variants-demo.component.scss',
})
export class SizeVariantsDemoComponent {
  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
  }
}
