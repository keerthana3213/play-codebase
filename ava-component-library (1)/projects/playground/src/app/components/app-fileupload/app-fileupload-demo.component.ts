import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaFileUploadComponent } from '@aava/play-core';

interface FileUploadDocSection {
  title: string;
  description: string;
  showCode: boolean;
}



@Component({
  selector: 'ava-fileupload-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaFileUploadComponent],
  templateUrl: './app-fileupload-demo.component.html',
  styleUrl: './app-fileupload-demo.component.scss',
})
export class AppFileUploadDemoComponent {
  // Documentation sections
  sections: FileUploadDocSection[] = [
    {
      title: 'Basic Usage',
      description: 'Simple file upload with default layout and basic functionality.',
      showCode: false,
    },
    {
      title: 'Layout Variants',
      description: 'Different layout options: default, list, tags, and icon layouts.',
      showCode: false,
    },
    {
      title: 'Size Variants',
      description: 'Different button sizes and component scaling options.',
      showCode: false,
    },
    {
      title: 'File Validation',
      description: 'Format validation, size limits, and maximum file restrictions.',
      showCode: false,
    },
    {
      title: 'Single vs Multiple',
      description: 'Single file mode versus multiple file upload configurations.',
      showCode: false,
    },
    {
      title: 'States & Customization',
      description: 'Disabled states, custom styling, and visual customization options.',
      showCode: false,
    },
  ];

  // Sample data for quick demos
  showcaseFiles: File[] = [];
  allowedFormats = ['jpeg', 'jpg', 'png', 'svg', 'doc', 'docx', 'xlsx', 'txt', 'pdf'];

  // Consolidated event handler
  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
    this.showcaseFiles = files;
  }
}
