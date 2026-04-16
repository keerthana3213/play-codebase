// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AavaLinkComponent } from './aava-link.component';

// describe('LinkComponent', () => {
//   let component: AavaLinkComponent;
//   let fixture: ComponentFixture<AavaLinkComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AavaLinkComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AavaLinkComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AavaLinkComponent } from './aava-link.component';
import { Component, Input } from '@angular/core';

// --- Mock Child Component ---
// This isolates the AavaLinkComponent from its dependency on IconComponent.
@Component({
  selector: 'ava-icon',
  standalone: true,
  template: ''
})
class MockIconComponent {
  @Input() name: string | undefined;
  @Input() size: number | undefined;
  @Input() color: string | undefined;
}

describe('AavaLinkComponent', () => {
  let component: AavaLinkComponent;
  let fixture: ComponentFixture<AavaLinkComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaLinkComponent],
      // We provide DomSanitizer directly from the testbed to spy on it
      // providers: [DomSanitizer]
    })
      .overrideComponent(AavaLinkComponent, {
        // Replace the real IconComponent with our mock
        add: { imports: [MockIconComponent] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaLinkComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer); // Get the sanitizer instance
    fixture.detectChanges(); // Trigger initial data binding and ngOnChanges
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Defaults', () => {
    it('should have correct default input values', () => {
      expect(component.label).toBe('Action Link');
      expect(component.color).toBe('default');
      expect(component.size).toBe('md');
      expect(component.underline).toBe(false);
      expect(component.href).toBe('');
      expect(component.addIcon).toBe(false);
      expect(component.arrowDirection).toBe('left');
    });

    it('should initialize separatorSize based on default size', () => {
      // ngOnChanges runs on init
      expect(component.separatorSize).toBe(18);
    });
  });

  describe('ngOnChanges Lifecycle Hook', () => {

    it('should update separatorSize when size input changes to "lg"', () => {
      component.size = 'lg';
      fixture.detectChanges(); // Trigger ngOnChanges
      expect(component.separatorSize).toBe(18);
    });
  });

  describe('isHexColor Method', () => {
    it('should return true for a valid 3-digit hex color', () => {
      expect(component.isHexColor('#FFF')).toBe(true);
    });

    it('should return true for a valid 6-digit hex color', () => {
      expect(component.isHexColor('#AABBCC')).toBe(true);
    });

    it('should return false for a named color', () => {
      expect(component.isHexColor('primary')).toBe(false);
    });

    it('should return false for an invalid string', () => {
      expect(component.isHexColor('not-a-color')).toBe(false);
    });
  });

  describe('safeHref Getter', () => {
    it('should return a sanitized URL when href is provided', () => {
      const testUrl = 'https://example.com';
      spyOn(sanitizer, 'bypassSecurityTrustUrl').and.callThrough();
      component.href = testUrl;
      const safeUrl = component.safeHref;
      expect(sanitizer.bypassSecurityTrustUrl).toHaveBeenCalledWith(testUrl);
      expect(safeUrl).toBeDefined();
    });

    it('should return a javascript:void(0) link when href is empty', () => {
      spyOn(sanitizer, 'bypassSecurityTrustUrl').and.callThrough();
      component.href = '';
      const safeUrl = component.safeHref;
      expect(sanitizer.bypassSecurityTrustUrl).toHaveBeenCalledWith('javascript:void(0)');
      expect(safeUrl).toBeDefined();
    });
  });

  describe('Event Emitters and User Interaction', () => {
    it('should emit userClick event when anchorClick is called directly', () => {
      spyOn(component.userClick, 'emit');
      const mockEvent = new MouseEvent('click');
      component.anchorClick(mockEvent);
      expect(component.userClick.emit).toHaveBeenCalledWith(mockEvent);
    });

    it('should trigger anchorClick and emit userClick event on DOM anchor click', () => {
      spyOn(component, 'anchorClick').and.callThrough();
      spyOn(component.userClick, 'emit');

      const anchorElement = fixture.debugElement.query(By.css('a'));
      anchorElement.triggerEventHandler('click', new MouseEvent('click'));

      expect(component.anchorClick).toHaveBeenCalled();
      expect(component.userClick.emit).toHaveBeenCalled();
    });
  });
});
