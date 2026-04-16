import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { APP_CONSTANTS } from '../../constants/app.constants';
import {
  AavaButtonComponent,
  ButtonVariant,
} from '../button/aava-button.component';
import { AavaTagComponent } from '../tags/aava-tags.component';
import { AavaDividersComponent } from '../dividers/aava-dividers.component';

export interface UploadFile {
  id?: string | null;
  file: File;
  canDelete: boolean;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  retrieveType?: string;
  uploadDate?: Date;
}

export interface customColumns {
  key: string;
  label: string;
  visible?: boolean;
}

export interface previewData {
  fileName: string;
  fileSize?: number | string;
  fileType?: string;
  canDelete?: boolean;
  disabled?: boolean;
  retrieveType?: string;
  uploadDate?: string;
}

@Component({
  selector: 'aava-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    AavaIconComponent,
    AavaButtonComponent,
    AavaTagComponent,
    AavaDividersComponent,
  ],
  templateUrl: './aava-fileupload.component.html',
  styleUrls: ['./aava-fileupload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaFileUploadComponent implements OnInit {
  @Output() public selectedList = new EventEmitter<File[]>();
  @Output() public deletedList = new EventEmitter<any[]>();

  // Inputs
  @Input() uploaderId: string = '';
  @Input() enableAnimation: boolean = false;
  @Input() allowedFormats: string[] = [];
  @Input() singleFileMode: boolean = false;
  @Input() maxFiles: number | null = null;
  @Input() componentTitle: string = 'Upload files to view preview';
  @Input() supportedFormatLabel = 'Supported file formats';
  @Input() maxFileSize = 3 * 1024 * 1024; //3MB default
  @Input() showUploadButton: boolean = true;
  @Input() layout: 'default' | 'list' | 'tags' | 'icon' = 'default';
  @Input() previewLayout: 'default' | 'table' = 'default';
  @Input() previewLayoutHeight = 0;
  @Input() singleFileSelectionPosition: 'right' | 'left' = 'right'

  //upload button
  @Input() uploadButtonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() uploadButtonLabel = 'Upload';
  @Input() uploadButtonVariant: ButtonVariant = 'primary';
  @Input() uploadIconPosition: 'left' | 'right' | 'only' = 'left';
  @Input() uploadIconName = 'upload';
  @Input() id = '';

  //delete button
  @Input() deleteButtonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() deleteButtonLabel = 'Remove All';
  @Input() deleteButtonVariant: ButtonVariant = 'secondary';
  @Input() deleteIconPosition: 'left' | 'right' | 'only' = 'left';
  @Input() deleteIconName = 'circle-x';

  // Size for file-name-display (default layout)
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input() disabled = false;
  @Input() previewData: previewData[] = [];
  @Input() customStyles: Record<string, string> = {};
  @Input() borderColor = '#9ca1aa';
  @Input() ellipses: 'start' | 'end' | 'middle' = 'end';
  @Input() dividerColor: string = '#9ca1aa';
  @Input() tagIcon = 'x';
  @Input() showDuplicateError = false;
  @Input() duplicateErrorText = 'File already exists';

  public error: string | null = null;


  // New: configurable columns
  @Input() tableColumns: customColumns[] = [
    { key: 'fileName', label: 'File Name', visible: true },
    { key: 'fileSize', label: 'File Size', visible: true },
    { key: 'fileType', label: 'File Type', visible: true },
    { key: 'retrieveType', label: 'Retrieve Type', visible: true },
    { key: 'uploadDate', label: 'Upload Date', visible: true },
    { key: 'actions', label: '', visible: true },
  ];

  //  Dynamic colors for file types
  @Input() fileTypeColors?: { [key: string]: string };
  @Input() border: string = 'var(--fileupload-upload-area-default-border)';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private readonly defaultFileTypeColors: { [key: string]: string } = {
    pdf: 'var(--fileupload-color-pdf)',
    doc: 'var(--fileupload-color-doc)',
    docx: 'var(--fileupload-color-docx)',
    xls: 'var(--fileupload-color-xls)',
    xlsx: 'var(--fileupload-color-xlsx)',
    txt: 'var(--fileupload-color-txt)',
    html: 'var(--fileupload-color-html)',
    ppt: 'var(--fileupload-color-ppt)',
    pptx: 'var(--fileupload-color-pptx)',
    png: 'var(--fileupload-color-png)',
    svg: 'var(--fileupload-color-svg)',
    jpeg: 'var(--fileupload-color-jpeg)',
    jpg: 'var(--fileupload-color-jpg)',
  };

  public get mergedColors(): { [key: string]: string } {
    return { ...this.defaultFileTypeColors, ...(this.fileTypeColors ?? {}) };
  }

  appConstants = APP_CONSTANTS;
  public uploadedFiles: UploadFile[] = [];
  public fileUploadedSuccess = false;
  public isUploadActive = false;
  public viewAll: boolean = false;
  public files: File[] = []; // For 'new' variant
  public uniqueId: string = '';
  public deletedFiles: UploadFile[] = [];

  ngOnInit(): void {
    this.uniqueId =
      this.uploaderId ||
      'uploader-' + Math.random().toString(36).substring(2, 9);
  }

  get allowedFormatsList(): string[] {
    const defaultFormats = [
      'pdf',
      'txt',
      'doc',
      'docx',
      'pptx',
      'ppt',
      'html',
      'xls',
      'xlsx',
    ];
    const formats =
      this.allowedFormats.length > 0 ? this.allowedFormats : [];
    return formats.map((ext) => (ext.startsWith('.') ? ext : '.' + ext));
  }

  toggleViewAll() {
    this.viewAll = !this.viewAll;
  }

  public resetErrors(): void {
    this.error = null;
  }

  sizeFormat(bytes: number, decimals: number = 2): string {
    if (isNaN(bytes) || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const value = bytes / Math.pow(k, i);
    return `${parseFloat(value.toFixed(decimals))} ${sizes[i]}`;
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.resetErrors();
      for (let i = 0; i < input.files.length; i++) {
        this.handleFile(input.files[i]);
      }
      input.value = '';
    }
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.resetErrors();
      for (let i = 0; i < files.length; i++) {
        this.handleFile(files[i]);
      }
    }
  }

  private handleFile(file: File): void {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (
      !fileExtension ||
     (this.allowedFormatsList.length > 0 && !this.allowedFormatsList.includes(`.${fileExtension}`))
    ) {
      this.error = `Invalid file type. Allowed formats: ${this.allowedFormatsList.join(', ')}.`;
      return;
    }

    if (file.size === 0) {
      this.error = 'File size must be more than 0KB';
      return;
    }

    if (file.size > this.maxFileSize) {
      this.error = `File is too large. Maximum size allowed is ${this.sizeFormat(this.maxFileSize)}`;
      return;
    }

    if (this.singleFileMode || this.layout === 'default') {
      this.uploadedFiles = [];
    }
    if (this.isDuplicateFile(file)) {
      if (this.showDuplicateError) {
        this.error = this.duplicateErrorText;
      }
    } else {
      this.uploadedFiles.push({
        id: null,
        file,
        canDelete: true,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadDate: new Date(),
      });

      this.selectedList.emit(this.uploadedFiles.map((f) => f.file));
    }


  }

  private isDuplicateFile(file: File): boolean {
    return this.uploadedFiles.some(
      f => f.file.name === file.name &&
        f.file.size === file.size &&
        f.file.type === file.type
    );
  }

  public openFileSelector(): void {
    if (this.disabled) {
      return;
    }
    if (
      this.maxFiles !== null &&
      !this.singleFileMode &&
      this.uploadedFiles.length >= this.maxFiles
    ) {
      this.error = `Maximum of ${this.maxFiles} files allowed.`;
      return;
    }
    this.fileInput.nativeElement.click();
  }



  public removeFile(index: number): void {
    if (!this.disabled) {
      if (index >= 0 && index < this.uploadedFiles.length) {
        this.uploadedFiles.splice(index, 1);
        this.selectedList.emit(this.uploadedFiles.map((f) => f.file));

        if (this.uploadedFiles.length === 0) {
          this.fileUploadedSuccess = false;
        }
        this.resetErrors();
      } else{
        if(this.layout === 'default' && index === 0 && this.uploadedFiles.length === 0 ){
          this.removePreviewFile(0);
        }
      }
    }


  }
  removePreviewFile(index: number): void {
    const deletedItem = this.previewData.splice(index, 1);
    this.deletedList.emit(deletedItem);
  }

  public resetUpload(): void {
    this.uploadedFiles = [];
    this.fileUploadedSuccess = false;
    this.resetErrors();
    this.selectedList.emit([]);
  }

  public closeUpload(): void {
    this.resetUpload();
  }

  public removeNewFile(item: UploadFile): void {
    if (!this.disabled) {
      this.uploadedFiles = this.uploadedFiles.filter((f) => f !== item);
      const deletedWithId = {
        ...item,
        id: item['id'] ?? null,
        deletedAt: new Date(),
      };
      this.selectedList.emit(this.uploadedFiles.map((f) => f.file));
      if (this.uploadedFiles.length === 0) {
        this.fileUploadedSuccess = false;
      }
      this.resetErrors();
    }

  }

  public getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  allowAccepted(): string {
    return this.allowedFormatsList?.length
      ? this.allowedFormatsList.join(',')
      : '';
  }

  public truncateFileName(
    fileName: string | undefined,
    limit: number = 10,
    ellipses: 'start' | 'end' | 'middle' = this.ellipses
  ): string {
    if (!fileName) return '';

    const parts = fileName.split('.');
    const extension = parts.length > 1 ? parts.pop() : '';
    const nameWithoutExt = parts.join('.');

    const fullName = extension
      ? `${nameWithoutExt}.${extension}`
      : nameWithoutExt;

    // If shorter than limit, return as is
    if (fullName.length <= limit) return fullName;

    switch (ellipses) {
      case 'start':
        return '...' + fullName.slice(-limit);

      case 'middle': {
        const half = Math.floor(limit / 2);
        const start = fullName.slice(0, half);
        const end = fullName.slice(-half);
        return `${start}...${end}`;
      }

      case 'end':
      default:
        return fullName.substring(0, limit) + '...';
    }
  }

  // public truncateFileName(
  //   fileName: string | undefined,
  //   limit: number = 10,
  //   ellipses: 'start' | 'end' | 'middle' = this.ellipses
  // ): string {
  //   if (!fileName) return '';

  //   const parts = fileName.split('.');
  //   if (parts.length === 1) {
  //     if (ellipses === 'start') {
  //       return fileName.length > limit
  //         ? '...' + fileName.slice(-limit)
  //         : fileName;
  //     } else {
  //       return fileName.length > limit
  //         ? fileName.substring(0, limit) + '...'
  //         : fileName;
  //     }
  //   }

  //   const extension = parts.pop(); // last part
  //   const nameWithoutExt = parts.join('.');

  //   if (ellipses === 'start') {
  //     return nameWithoutExt.length > limit
  //       ? '...' + nameWithoutExt.slice(-limit) + '.' + extension
  //       : nameWithoutExt + '.' + extension;
  //   } else {
  //     return nameWithoutExt.length > limit
  //       ? nameWithoutExt.substring(0, limit) + '...' + '.' + extension
  //       : nameWithoutExt + '.' + extension;
  //   }
  // }

  //  Helper to get file color dynamically
  public getFileColor(extension: string): string {
    return this.mergedColors[extension] ?? '#999';
  }
}
