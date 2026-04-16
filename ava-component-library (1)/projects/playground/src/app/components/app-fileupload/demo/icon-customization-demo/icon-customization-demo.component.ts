import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-icon-customization-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './icon-customization-demo.component.html',
  styleUrl: './icon-customization-demo.component.scss',
})
export class IconCustomizationDemoComponent {
  selectedFiles: File[] = [];

  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
    this.selectedFiles = files;
  }
}
