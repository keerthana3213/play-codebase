import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UploadFile,
} from '@aava/play-core';
import { AavaFileUploadComponent } from '../../../../../play-core/src/public-api';

@Component({
  selector: 'app-test-fileupload',
  imports: [AavaFileUploadComponent, CommonModule],
  templateUrl: './test-fileupload.component.html',
  styleUrl: './test-fileupload.component.scss',
})
export class TestFileuploadComponent {
  @ViewChild('codeBlock') codeBlock!: ElementRef;
  upDisabled = false;
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

  // Store uploaded files separately for each uploader
  uploadedFiles: Record<string, File[]> = {};

  sections = [
    {
      title: 'Default Upload',
      description: 'Default Upload',
      showCode: false,
    },
    {
      title: 'Featured List',
      description: 'Featured List',
      showCode: false,
    },
    {
      title: 'Featured Tags',
      description: 'Featured Tags',
      showCode: false,
    },
    {
      title: 'Advanced',
      description: 'Advanced',
      showCode: false,
    },
  ];

  previewData = [
    {
      fileName: '1.png',
      fileSize: '5kb',
      fileType: 'png',
      canDelete: true,
    },
    {
      fileName: '2.png',
      fileSize: '5kb',
      fileType: 'png',
      canDelete: false,
    },
  ];

  customColumns = [
    { key: 'fileName', label: 'File Name', visible: true },
    { key: 'fileSize', label: 'File Size', visible: true },
    { key: 'fileType', label: 'File Type', visible: true },
    { key: 'retrieveType', label: 'Retrieve Type', visible: true },
    { key: 'uploadDate', label: 'Upload Date', visible: true },
    { key: 'actions', label: '', visible: true },
  ];

  toggleSection(index: number): void {
    this.sections.forEach((section, i) => {
      section.showCode = i === index ? !section.showCode : false;
    });
  }

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (
      this.codeBlock &&
      !this.codeBlock.nativeElement.contains(event.target)
    ) {
      this.sections.forEach((section) => (section.showCode = false));
    }
  }

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
