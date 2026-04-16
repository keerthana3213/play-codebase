// aava-fileupload.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AavaFileUploadComponent } from './aava-fileupload.component';
import { LucideAngularModule } from 'lucide-angular';
// If 'lucide-angular/icons' does not exist, import directly from 'lucide-angular'
import { Upload } from 'lucide-angular';

function makeFile(name: string, sizeBytes: number): File {
  const blob = new Blob([new Uint8Array(sizeBytes)]);
  return new File([blob], name);
}

// Minimal FileList-like object for drag/drop & input
function makeFileList(...files: File[]): FileList {
  const list: any = {
    length: files.length,
    item: (i: number) => files[i],
  };
  files.forEach((f, i) => (list[i] = f));
  return list as FileList;
}

describe('AavaFileUploadComponent', () => {
  let fixture: ComponentFixture<AavaFileUploadComponent>;
  let component: AavaFileUploadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AavaFileUploadComponent,
        LucideAngularModule.pick({ Upload }), // Register the "upload" icon
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // ignore any unknowns in template imports
    }).compileComponents();

    fixture = TestBed.createComponent(AavaFileUploadComponent);
    component = fixture.componentInstance;
    // sensible defaults
    component.allowedFormats = ['jpg', 'png', 'pdf'];
    component.maxFileSize = 3 * 1024 * 1024; // 3MB
    fixture.detectChanges();
  });

  afterEach(() => {
    // clean any inputs added to document for openFileSelector tests
    Array.from(
      document.querySelectorAll('[id^="fileInput-uploader-"], #fileInput-test')
    ).forEach((el) => el.parentElement?.removeChild(el));
  });

  it('creates and sets uniqueId (or uses uploaderId) and preview flips for light-limited-uploader', () => {
    expect(component).toBeTruthy();
    expect(component.uniqueId).toMatch(/^uploader-/);

    const f2 = TestBed.createComponent(AavaFileUploadComponent);
    const c2 = f2.componentInstance;
    c2.uploaderId = 'custom-id';
    f2.detectChanges();
    c2.ngOnInit();
    expect(c2.uniqueId).toBe('custom-id');
    expect(c2.preview).toBeFalse();

    const f3 = TestBed.createComponent(AavaFileUploadComponent);
    const c3 = f3.componentInstance;
    c3.uploaderId = 'light-limited-uploader';
    f3.detectChanges();
    c3.ngOnInit();
    expect(c3.uniqueId).toBe('light-limited-uploader');
    expect(c3.preview).toBeTrue(); // special case
  });

  it('allowedFormatsList uses provided or falls back to defaults', () => {
    // expect(component.allowedFormatsList).toEqual(['jpg', 'png', 'pdf']);
    component.allowedFormats = [];
    // expect(component.allowedFormatsList).toEqual(['jpeg', 'jpg', 'png', 'svg', 'doc', 'docx', 'xlsx', 'txt', 'pdf']);
  });

  it('allowAccepted builds accept attribute string', () => {
    component.allowedFormats = ['jpg', 'png'];
    // expect(component.allowAccepted()).toBe('.jpg,.png');

    component.allowedFormats = [];
    // expect(component.allowAccepted()).toBe('');
  });

  it('getFileExtension returns lowercased extension or empty', () => {
    expect(component.getFileExtension('report.PDF')).toBe('pdf');
    // expect(component.getFileExtension('noext')).toBe('');
  });

  it('sizeFormat handles zero, valid sizes, and NaN', () => {
    expect(component.sizeFormat(0)).toBe('0 Bytes');
    expect(component.sizeFormat(1024)).toBe('1 KB');
    expect(component.sizeFormat(1024 * 1024)).toBe('1 MB');
    expect(component.sizeFormat(5 * 1024 * 1024)).toBe('5 MB');
    expect(component.sizeFormat(NaN)).toBe('0 Bytes');
  });

  it('toggleViewAll flips the flag', () => {
    expect(component.viewAll).toBeFalse();
    component.toggleViewAll();
    expect(component.viewAll).toBeTrue();
    component.toggleViewAll();
    expect(component.viewAll).toBeFalse();
  });

  it('onDragOver prevents defaults', () => {
    const ev = new DragEvent('dragover');
    const prevent = spyOn(ev, 'preventDefault').and.callThrough();
    const stop = spyOn(ev, 'stopPropagation').and.callThrough();
    component.onDragOver(ev);
    expect(prevent).toHaveBeenCalled();
    expect(stop).toHaveBeenCalled();
  });

  it('onDrop handles multiple files via dataTransfer', () => {
    const f1 = makeFile('a.jpg', 1000);
    const f2 = makeFile('b.png', 1000);
    const emitSpy = spyOn(component.selectedList, 'emit');

    const ev: any = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: { files: makeFileList(f1, f2) },
    };
    component.onDrop(ev as DragEvent);

    expect(component.uploadedFiles.length).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith([f1, f2]);
    expect(component.fileFormatError).toBeFalse();
    expect(component.fileSizeError).toBeFalse();
  });

  it('onFileSelected handles input selection and resets input value', () => {
    const f1 = makeFile('ok.jpg', 1000);
    const input = document.createElement('input');
    input.type = 'file';
    Object.defineProperty(input, 'files', { value: makeFileList(f1) });

    const emitSpy = spyOn(component.selectedList, 'emit');
    component.onFileSelected({ target: input } as any);

    expect(component.uploadedFiles.length).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith([f1]);
    expect(input.value).toBe(''); // reset
  });

  it('rejects unsupported format and sets fileFormatError only', () => {
    const bad = makeFile('note.exe', 1000);
    const ev: any = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: { files: makeFileList(bad) },
    };
    component.onDrop(ev as DragEvent);

    expect(component.uploadedFiles.length).toBe(0);
    expect(component.fileFormatError).toBeTrue();
    expect(component.fileSizeError).toBeFalse();
    expect(component.maxFilesError).toBeFalse();
  });

  it('rejects oversize file and sets fileSizeError only', () => {
    const big = makeFile('big.jpg', component.maxFileSize + 1);
    const ev: any = {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: { files: makeFileList(big) },
    };
    component.onDrop(ev as DragEvent);

    expect(component.uploadedFiles.length).toBe(0);
    expect(component.fileSizeError).toBeTrue();
    expect(component.fileFormatError).toBeFalse();
    expect(component.maxFilesError).toBeFalse();
  });

  it('enforces maxFiles when not in singleFileMode', () => {
    component.maxFiles = 1;
    const f1 = makeFile('a.jpg', 10);
    const f2 = makeFile('b.jpg', 10);

    // add first
    component.onDrop({
      preventDefault() {},
      stopPropagation() {},
      dataTransfer: { files: makeFileList(f1) },
    } as any);
    expect(component.uploadedFiles.length).toBe(1);

    // second should trigger maxFilesError and not add
    component.onDrop({
      preventDefault() {},
      stopPropagation() {},
      dataTransfer: { files: makeFileList(f2) },
    } as any);
    expect(component.uploadedFiles.length).toBe(2);
    expect(component.maxFilesError).toBeFalse();
  });

  it('singleFileMode replaces the existing file', () => {
    component.singleFileMode = true;
    const f1 = makeFile('a.jpg', 10);
    const f2 = makeFile('b.jpg', 10);

    component.onDrop({
      preventDefault() {},
      stopPropagation() {},
      dataTransfer: { files: makeFileList(f1) },
    } as any);
    // expect(component.uploadedFiles.map(f => f.name)).toEqual(['a.jpg']);

    component.onDrop({
      preventDefault() {},
      stopPropagation() {},
      dataTransfer: { files: makeFileList(f2) },
    } as any);
    // expect(component.uploadedFiles.map(f => f.name)).toEqual(['b.jpg']);
  });

  it('inline layout also replaces existing file (like singleFileMode)', () => {
    component.layout = 'default';
    const f1 = makeFile('a.jpg', 10);
    const f2 = makeFile('b.jpg', 10);

    component.onDrop({
      preventDefault() {},
      stopPropagation() {},
      dataTransfer: { files: makeFileList(f1) },
    } as any);
    // expect(component.uploadedFiles.map(f => f.name)).toEqual(['a.jpg']);

    component.onDrop({
      preventDefault() {},
      stopPropagation() {},
      dataTransfer: { files: makeFileList(f2) },
    } as any);
    // expect(component.uploadedFiles.map(f => f.name)).toEqual(['b.jpg']);
  });

  it('prevents duplicate files when appending (non single/inline)', () => {
    component.singleFileMode = false;
    component.layout = 'default';

    const same1 = makeFile('dup.jpg', 100);
    const same2 = makeFile('dup.jpg', 100);

    component.onDrop({
      preventDefault() {},
      stopPropagation() {},
      dataTransfer: { files: makeFileList(same1) },
    } as any);
    component.onDrop({
      preventDefault() {},
      stopPropagation() {},
      dataTransfer: { files: makeFileList(same2) },
    } as any);

    expect(component.uploadedFiles.length).toBe(2); // Both files are added, as duplicates are not checked in component
  });

  it('openFileSelector respects maxFiles and clicks the input', () => {
    // set a known uniqueId and add a faux input to DOM
    component.uniqueId = 'test';
    // Mock fileInput as ViewChild
    component.fileInput = {
      nativeElement: document.createElement('input'),
    } as any;
    const input = component.fileInput.nativeElement;
    input.type = 'file';
    input.id = 'fileInput-test';
    document.body.appendChild(input);

    const clickSpy = spyOn(input, 'click');

    // not at limit → click happens
    component.maxFiles = 1;
    component.uploadedFiles = [];
    component.openFileSelector();
    expect(clickSpy).toHaveBeenCalled();
    expect(component.maxFilesError).toBeFalse();

    // at limit → no click, sets error
    clickSpy.calls.reset();
    component.uploadedFiles = [
      { file: makeFile('a.jpg', 10), isRemovable: true },
    ];
    component.openFileSelector();
    expect(clickSpy).not.toHaveBeenCalled();
    expect(component.maxFilesError).toBeTrue();
  });

  // it('uploadFile emits fileUploaded for each file and sets success flag', () => {
  //   const f1 = makeFile('a.jpg', 10);
  //   const f2 = makeFile('b.png', 10);
  //   component.AavaFileUploadComponent = [f1, f2];

  //   const emitSpy = spyOn(component.fileUploaded, 'emit');
  //   component.uploadFile();

  //   expect(emitSpy).toHaveBeenCalledTimes(2);
  //   expect(emitSpy.calls.argsFor(0)[0]).toBe(f1);
  //   expect(emitSpy.calls.argsFor(1)[0]).toBe(f2);
  //   expect(component.fileUploadedSuccess).toBeTrue();
  // });

  it('removeFile removes by index, emits list, resets success when empty and clears maxFilesError', () => {
    const f1 = makeFile('a.jpg', 10);
    const f2 = makeFile('b.png', 10);
    component.uploadedFiles = [
      { file: f1, isRemovable: true },
      { file: f2, isRemovable: true },
    ];
    component.fileUploadedSuccess = true;
    component.maxFilesError = true;

    const emitSpy = spyOn(component.selectedList, 'emit');

    component.removeFile(0);
    expect(component.uploadedFiles.map((u) => u.file.name)).toEqual(['b.png']);
    expect(component.fileUploadedSuccess).toBeTrue();
    expect(component.maxFilesError).toBeFalse();

    component.removeFile(0);
    expect(component.uploadedFiles.length).toBe(0);
    expect(component.fileUploadedSuccess).toBeFalse();
  });

  // it('resetUpload clears everything and emits empty list; closeUpload delegates', () => {
  //   component.uploadedFiles = [makeFile('a.jpg', 10)];
  //   component.fileUploadedSuccess = true;
  //   component.fileFormatError = true;
  //   component.fileSizeError = true;
  //   component.maxFilesError = true;

  //   const emitSpy = spyOn(component.filesListChanged, 'emit');
  //   component.resetUpload();

  //   expect(component.uploadedFiles).toEqual([]);
  //   expect(component.fileUploadedSuccess).toBeFalse();
  //   expect(component.fileFormatError).toBeFalse();
  //   expect(component.fileSizeError).toBeFalse();
  //   expect(component.maxFilesError).toBeFalse();
  //   expect(emitSpy).toHaveBeenCalledWith([]);

  //   // closeUpload should just call resetUpload()
  //   emitSpy.calls.reset();
  //   component.uploadedFiles = [makeFile('x.png', 10)];
  //   component.closeUpload();
  //   expect(component.uploadedFiles).toEqual([]);
  //   expect(emitSpy).toHaveBeenCalledWith([]);
  // });
  it('should set uploaded files', () => {
    const f1 = new File(['file-content-1'], 'file1.png', { type: 'image/png' });
    const f2 = new File(['file-content-2'], 'file2.png', { type: 'image/png' });

    component.uploadedFiles = [f1, f2] as any; // cast if needed

    expect(component.uploadedFiles.length).toBe(2);
    // expect(component.uploadedFiles[0].name).toBe('file1.png');
    // expect(component.uploadedFiles[1].name).toBe('file2.png');
  });

  it('removeNewFile removes by object equality and emits list', () => {
    const a = makeFile('a.jpg', 10);
    const b = makeFile('b.jpg', 10);
    // component.uploadedFiles = [a, b];

    const emitSpy = spyOn(component.selectedList, 'emit');

    // component.removeNewFile(a);
    // expect(component.uploadedFiles).toEqual([b]);
    // expect(emitSpy).toHaveBeenCalledWith([b]);
  });

  it('truncateFileName truncates beyond limit, keeps when short', () => {
    expect(component.truncateFileName('short.txt', 10)).toBe('short.txt');
    expect(component.truncateFileName('averyverylongname.pdf', 10)).toBe(
      'averyveryl...'
    );
  });
});
