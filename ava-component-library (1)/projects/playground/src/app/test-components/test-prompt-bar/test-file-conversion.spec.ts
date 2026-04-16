import { TestPromptBarComponent } from './test-prompt-bar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromptBarTag } from '@aava/play-core';

describe('TestPromptBarComponent - File Conversion', () => {
  let component: TestPromptBarComponent;
  let fixture: ComponentFixture<TestPromptBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPromptBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPromptBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('File to Tag Conversion', () => {
    it('should convert PDF file to tag with correct properties', () => {
      // Create a mock PDF file
      const mockFile = new File(['test content'], 'document.pdf', { type: 'application/pdf' });
      
      // Convert file to tag
      const tag = (component as any).createTagFromFile(mockFile);
      
      expect(tag.label).toBe('document.pdf');
      expect(tag.icon).toBe('file-text');
      expect(tag.color).toBe('primary');
      expect(tag.removable).toBe(true);
      expect(tag.iconPosition).toBe('start');
      expect(tag.id).toContain('file_');
    });

    it('should convert image file to tag with correct properties', () => {
      const mockFile = new File(['test content'], 'photo.jpg', { type: 'image/jpeg' });
      
      const tag = (component as any).createTagFromFile(mockFile);
      
      expect(tag.label).toBe('photo.jpg');
      expect(tag.icon).toBe('image');
      expect(tag.color).toBe('info');
      expect(tag.removable).toBe(true);
    });

    it('should convert Excel file to tag with correct properties', () => {
      const mockFile = new File(['test content'], 'spreadsheet.xlsx', { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      const tag = (component as any).createTagFromFile(mockFile);
      
      expect(tag.label).toBe('spreadsheet.xlsx');
      expect(tag.icon).toBe('file-spreadsheet');
      expect(tag.color).toBe('success');
    });

    it('should handle unknown file types with default properties', () => {
      const mockFile = new File(['test content'], 'unknown.xyz', { type: 'application/unknown' });
      
      const tag = (component as any).createTagFromFile(mockFile);
      
      expect(tag.label).toBe('unknown.xyz');
      expect(tag.icon).toBe('paperclip');
      expect(tag.color).toBe('default');
    });
  });

  describe('File Extension Detection', () => {
    it('should extract file extension correctly', () => {
      expect((component as any).getFileExtension('document.pdf')).toBe('pdf');
      expect((component as any).getFileExtension('photo.JPG')).toBe('jpg');
      expect((component as any).getFileExtension('file.name.with.dots.txt')).toBe('txt');
      expect((component as any).getFileExtension('noextension')).toBe('');
    });
  });

  describe('File Upload Workflow', () => {
    it('should add multiple files as tags', () => {
      const mockFiles = [
        new File(['content1'], 'file1.pdf', { type: 'application/pdf' }),
        new File(['content2'], 'file2.jpg', { type: 'image/jpeg' }),
        new File(['content3'], 'file3.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      ];

      // Initial state - no tags
      expect(component.tags.length).toBe(0);

      // Simulate file selection
      component.onFilesSelected(mockFiles);

      // Should have 3 tags now
      expect(component.tags.length).toBe(3);
      expect(component.tags[0].label).toBe('file1.pdf');
      expect(component.tags[1].label).toBe('file2.jpg');
      expect(component.tags[2].label).toBe('file3.xlsx');
      
      // File upload dialog should be closed
      expect(component.showFileUpload).toBe(false);
    });

    it('should remove tags when onTagRemoved is called', () => {
      // Add some initial tags
      component.tags = [
        { id: '1', label: 'file1.pdf', removable: true, color: 'primary' },
        { id: '2', label: 'file2.jpg', removable: true, color: 'info' }
      ];

      expect(component.tags.length).toBe(2);

      // Remove first tag
      component.onTagRemoved(component.tags[0]);

      expect(component.tags.length).toBe(1);
      expect(component.tags[0].label).toBe('file2.jpg');
    });

    it('should open file upload dialog when onFileAttach is called', () => {
      expect(component.showFileUpload).toBe(false);
      
      component.onFileAttach();
      
      expect(component.showFileUpload).toBe(true);
    });

    it('should close file upload dialog when onFileUploadClose is called', () => {
      component.showFileUpload = true;
      
      component.onFileUploadClose();
      
      expect(component.showFileUpload).toBe(false);
    });
  });

  describe('Icon and Color Mapping', () => {
    it('should map document extensions to correct icons', () => {
      expect((component as any).getFileIcon('pdf')).toBe('file-text');
      expect((component as any).getFileIcon('doc')).toBe('file-text');
      expect((component as any).getFileIcon('docx')).toBe('file-text');
      expect((component as any).getFileIcon('txt')).toBe('file-text');
    });

    it('should map image extensions to image icon', () => {
      expect((component as any).getFileIcon('jpg')).toBe('image');
      expect((component as any).getFileIcon('jpeg')).toBe('image');
      expect((component as any).getFileIcon('png')).toBe('image');
      expect((component as any).getFileIcon('gif')).toBe('image');
    });

    it('should map spreadsheet extensions to spreadsheet icon', () => {
      expect((component as any).getFileIcon('xlsx')).toBe('file-spreadsheet');
      expect((component as any).getFileIcon('xls')).toBe('file-spreadsheet');
      expect((component as any).getFileIcon('csv')).toBe('file-spreadsheet');
    });

    it('should assign correct colors based on file type', () => {
      expect((component as any).getFileColor('pdf')).toBe('primary');
      expect((component as any).getFileColor('jpg')).toBe('info');
      expect((component as any).getFileColor('xlsx')).toBe('success');
      expect((component as any).getFileColor('pptx')).toBe('warning');
      expect((component as any).getFileColor('zip')).toBe('error');
      expect((component as any).getFileColor('unknown')).toBe('default');
    });
  });
});
