import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileUploadComponent } from '@aava/play-core';

@Component({
  selector: 'ava-fileupload-inline-layout-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './inline-layout-demo.component.html',
  styleUrl: './inline-layout-demo.component.scss',
})
export class InlineLayoutDemoComponent {
  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
  }
}
