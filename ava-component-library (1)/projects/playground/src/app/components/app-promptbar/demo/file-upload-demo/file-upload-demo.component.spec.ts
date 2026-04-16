import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDemoComponent } from './file-upload-demo.component';

describe('FileUploadDemoComponent', () => {
  let component: FileUploadDemoComponent;
  let fixture: ComponentFixture<FileUploadDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty tags array', () => {
    expect(component.tags).toEqual([]);
  });

  it('should convert files to tags when files are selected', () => {
    const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

    component.onFileSelected([mockFile]);

    expect(component.tags.length).toBe(1);
    expect(component.tags[0].label).toBe('test.pdf');
    expect(component.tags[0].icon).toBe('file-text');
    expect(component.tags[0].color).toBe('primary');
    expect(component.tags[0].removable).toBe(true);
  });

  it('should handle multiple file selection', () => {
    const mockFiles = [
      new File(['test content'], 'document.pdf', { type: 'application/pdf' }),
      new File(['image content'], 'photo.jpg', { type: 'image/jpeg' }),
      new File(['data'], 'data.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    ];

    component.onFileSelected(mockFiles);

    expect(component.tags.length).toBe(3);
    expect(component.tags[0].label).toBe('document.pdf');
    expect(component.tags[1].label).toBe('photo.jpg');
    expect(component.tags[2].label).toBe('data.xlsx');
  });

  it('should map file extensions to correct icons', () => {
    expect((component as any).getFileIcon('pdf')).toBe('file-text');
    expect((component as any).getFileIcon('jpg')).toBe('image');
    expect((component as any).getFileIcon('xlsx')).toBe('file-spreadsheet');
    expect((component as any).getFileIcon('pptx')).toBe('presentation');
    expect((component as any).getFileIcon('zip')).toBe('file-archive');
    expect((component as any).getFileIcon('unknown')).toBe('paperclip');
  });

  it('should map file extensions to correct colors', () => {
    expect((component as any).getFileColor('pdf')).toBe('primary');
    expect((component as any).getFileColor('jpg')).toBe('info');
    expect((component as any).getFileColor('xlsx')).toBe('success');
    expect((component as any).getFileColor('pptx')).toBe('warning');
    expect((component as any).getFileColor('zip')).toBe('error');
    expect((component as any).getFileColor('unknown')).toBe('default');
  });

  it('should extract file extension correctly', () => {
    expect((component as any).getFileExtension('document.pdf')).toBe('pdf');
    expect((component as any).getFileExtension('photo.JPG')).toBe('jpg');
    expect((component as any).getFileExtension('file.name.with.dots.txt')).toBe('txt');
    expect((component as any).getFileExtension('noextension')).toBe('');
  });

  it('should handle tag removal', () => {
    // Add some tags first
    const mockFiles = [
      new File(['test'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['test'], 'test2.jpg', { type: 'image/jpeg' })
    ];
    component.onFileSelected(mockFiles);

    expect(component.tags.length).toBe(2);

    // Remove first tag
    const tagToRemove = component.tags[0];
    component.onTagRemoved(tagToRemove);

    expect(component.tags.length).toBe(1);
    expect(component.tags[0].label).toBe('test2.jpg');
  });
});
