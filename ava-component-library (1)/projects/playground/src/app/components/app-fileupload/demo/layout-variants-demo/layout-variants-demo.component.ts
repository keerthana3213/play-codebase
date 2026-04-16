import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AavaFileUploadComponent } from '@aava/play-core';
import { AavaFileUploadComponent, UploadFile } from '../../../../../../../play-core/src/public-api';

@Component({
  selector: 'ava-fileupload-layout-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaFileUploadComponent],
  templateUrl: './layout-variants-demo.component.html',
  styleUrl: './layout-variants-demo.component.scss',
})
export class LayoutVariantsDemoComponent {
   previewData = [
    {
      fileName: '1.png',
      fileSize: '5kb',
      fileType: 'png',
    },
  ];
    public maxFileSize = 3 * 1024 * 1024; //3MB
public allowedFormats: string[] = [
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

  onFileChange(files: File[]): void {
    console.log('Files changed:', files);
  }
    uploadedFiles: Record<string, File[]> = {};
      upDisabled = false;


    onFilesChanged(files: File[], uploaderId: string) {
      this.uploadedFiles[uploaderId] = [...files];
      this.upDisabled = true;
      
      console.log(
        `Files list changed for ${uploaderId}:`,
        files.map((f) => f.name)
      );
    }
  
    onDeletedFiles(files: UploadFile[]) {
      console.log('Deleted files:', files);
    }
}
