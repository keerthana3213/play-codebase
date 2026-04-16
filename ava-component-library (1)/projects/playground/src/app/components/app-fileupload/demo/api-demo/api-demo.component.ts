import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-fileupload-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.scss']
})
export class ApiDemoComponent {
  componentProps = [
    {
      name: 'uploaderId',
      type: 'string',
      default: '',
      description: 'Unique identifier for the uploader instance.'
    },
    {
      name: 'enableAnimation',
      type: 'boolean',
      default: 'false',
      description: 'Enable animations for file upload interactions.'
    },
    {
      name: 'allowedFormats',
      type: 'string[]',
      default: '[]',
      description: 'Array of allowed file extensions (e.g., ["pdf", "doc", "jpg"]).'
    },
    {
      name: 'singleFileMode',
      type: 'boolean',
      default: 'false',
      description: 'Whether to allow only one file to be selected at a time.'
    },
    {
      name: 'maxFiles',
      type: 'number | null',
      default: 'null',
      description: 'Maximum number of files that can be uploaded.'
    },
    {
      name: 'componentTitle',
      type: 'string',
      default: 'Upload files to view preview',
      description: 'Title text displayed in the upload area.'
    },
    {
      name: 'supportedFormatLabel',
      type: 'string',
      default: 'Supported file formats',
      description: 'Label text for supported formats display.'
    },
    {
      name: 'maxFileSize',
      type: 'number',
      default: '3145728',
      description: 'Maximum file size in bytes (default: 3MB).'
    },
    {
      name: 'showDialogCloseIcon',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show close icon in dialog mode.'
    },
    {
      name: 'showUploadButton',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the upload button.'
    },
    {
      name: 'layout',
      type: "'default' | 'list' | 'tags' | 'icon'",
      default: 'default',
      description: 'Layout variant for the file upload component.'
    },
    {
      name: 'previewLayout',
      type: "'default' | 'table'",
      default: 'default',
      description: 'Layout for file preview display.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: 'md',
      description: 'Size of the file-name-display element in default layout. Controls height: xs=28px, sm=36px, md=44px, lg=48px, xl=52px.'
    },
    {
      name: 'uploadButtonSize',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: 'md',
      description: 'Size of the upload button.'
    },
    {
      name: 'uploadButtonLabel',
      type: 'string',
      default: 'Upload',
      description: 'Label text for the upload button.'
    },
    {
      name: 'uploadButtonVariant',
      type: 'ButtonVariant',
      default: 'primary',
      description: 'Visual variant of the upload button.'
    },
    {
      name: 'deleteButtonSize',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: 'md',
      description: 'Size of the delete button.'
    },
    {
      name: 'deleteButtonLabel',
      type: 'string',
      default: 'Remove All',
      description: 'Label text for the delete button.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the file upload component is disabled.'
    },
    {
      name: 'customStyles',
      type: 'Record<string, string>',
      default: '{}',
      description: 'CSS custom properties for style overrides.'
    },
    {
      name: 'borderColor',
      type: 'string',
      default: '#9ca1aa',
      description: 'Border color for the upload area.'
    },
    {
      name: 'ellipses',
      type: "'start' | 'end' | 'middle'",
      default: 'end',
      description: 'Position of ellipsis for truncated file names. "start" shows ...filename, "middle" shows file...name, "end" shows filename...'
    },
    {
      name: 'showDuplicateError',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show error for duplicate files.'
    },
    {
      name: 'duplicateErrorText',
      type: 'string',
      default: 'File already exists',
      description: 'Error message text for duplicate files.'
    }
  ];

  events = [
    {
      name: 'selectedList',
      type: 'EventEmitter<File[]>',
      description: 'Emitted when the list of selected files changes. Returns array of File objects.'
    },
    {
      name: 'deletedList',
      type: 'EventEmitter<UploadFile[]>',
      description: 'Emitted when files are deleted. Returns array of deleted UploadFile objects.'
    }
  ];

  interfaces = [
    {
      name: 'UploadFile',
      properties: [
        { name: 'id', type: 'string | null', description: 'Unique identifier for the uploaded file' },
        { name: 'file', type: 'File', description: 'The actual File object' },
        { name: 'canDelete', type: 'boolean', description: 'Whether the file can be deleted' },
        { name: 'fileName', type: 'string', description: 'Name of the file' },
        { name: 'fileSize', type: 'number', description: 'Size of the file in bytes' },
        { name: 'fileType', type: 'string', description: 'MIME type of the file' },
        { name: 'uploadDate', type: 'Date', description: 'Date when the file was uploaded' }
      ]
    },
    {
      name: 'customColumns',
      properties: [
        { name: 'key', type: 'string', description: 'Property key for the column' },
        { name: 'label', type: 'string', description: 'Display label for the column' },
        { name: 'visible', type: 'boolean', description: 'Whether the column is visible' }
      ]
    }
  ];

  basicUsageExample = `<aava-file-upload
  componentTitle="Upload Files"
  [allowedFormats]="['pdf', 'doc', 'jpg', 'png']"
  [maxFiles]="5"
  [maxFileSize]="5242880"
  (selectedList)="onFileChange($event)">
</aava-file-upload>`;

  layoutVariantsExample = `<aava-file-upload
  layout="icon"
  componentTitle="Drag & Drop Files"
  [allowedFormats]="['pdf', 'doc', 'jpg']"
  [maxFiles]="3">
</aava-file-upload>`;

  validationExample = `<aava-file-upload
  componentTitle="PDF Only"
  [allowedFormats]="['pdf']"
  [maxFileSize]="1048576"
  [maxFiles]="2"
  [showDuplicateError]="true"
  duplicateErrorText="This file already exists!">
</aava-file-upload>`;

  constructor() {
    console.log('File Upload API Demo Component loaded!');
  }
}
