// pagination-controls.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaPaginationControlsComponent } from './aava-pagination-controls.component';

describe('PaginationControlsComponent', () => {
  let component: AavaPaginationControlsComponent;
  let fixture: ComponentFixture<AavaPaginationControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaPaginationControlsComponent],
    })
      .overrideComponent(AavaPaginationControlsComponent, {
        set: { template: '' },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaPaginationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit + getCssVariableValue', () => {
    it('sets iconColor from CSS var', () => {
      const spy = spyOn(component, 'getCssVariableValue').and.returnValue('#aabbcc');
      component.ngOnInit();
      expect(spy).toHaveBeenCalledOnceWith('--color-text-on-secondary');
      expect(component.iconColor).toBe('#aabbcc');
    });

    it('getCssVariableValue trims result', () => {
      const orig = window.getComputedStyle;
      (window as any).getComputedStyle = () => ({
        getPropertyValue: () => '  value  ',
      });
      expect(component.getCssVariableValue('--any')).toBe('value');
      (window as any).getComputedStyle = orig;
    });
  });

  describe('goToPage', () => {
    it('emits when page is a different number', () => {
      const spy = spyOn(component.pageChange, 'emit');
      component.currentPage = 2;
      component.goToPage(3);
      expect(spy).toHaveBeenCalledOnceWith(3);
    });

    it('does not emit for same page or non-number', () => {
      const spy = spyOn(component.pageChange, 'emit');
      component.currentPage = 2;
      component.goToPage(2);      // same
      component.goToPage('...');  // non-number
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('pages getter (covers private getMUIStylePages)', () => {
    it('<=7 pages: returns all pages', () => {
      component.type = 'basic';
      component.totalPages = 7;
      component.currentPage = 4;
      expect(component.pages).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('beginning window (current <= 4)', () => {
      component.type = 'basicunfilled';
      component.totalPages = 10;
      component.currentPage = 4;
      expect(component.pages).toEqual([1, 2, 3, 4, 5, '...', 10]);
    });

    it('middle window', () => {
      component.type = 'unfilled';
      component.totalPages = 20;
      component.currentPage = 10;
      expect(component.pages).toEqual([1, '...', 9, 10, 11, '...', 20]);
    });

    it('end window (current >= total-3)', () => {
      component.type = 'basic';
      component.totalPages = 12;
      component.currentPage = 9;
      expect(component.pages).toEqual([1, '...', 8, 9, 10, 11, 12]);
    });

    it('non-MUI types return []', () => {
      component.type = 'pageinfo';
      expect(component.pages).toEqual([]);
      component.type = 'pageinfofilled';
      expect(component.pages).toEqual([]);
    });
  });

  describe('nextPage / prevPage', () => {
    it('nextPage emits when not on last page', () => {
      component.currentPage = 3;
      component.totalPages = 5;
      const spy = spyOn(component.pageChange, 'emit');
      component.nextPage();
      expect(spy).toHaveBeenCalledOnceWith(4);
    });

    it('nextPage does nothing at last page', () => {
      component.currentPage = 5;
      component.totalPages = 5;
      const spy = spyOn(component.pageChange, 'emit');
      component.nextPage();
      expect(spy).not.toHaveBeenCalled();
    });

    it('prevPage emits when not on first page', () => {
      component.currentPage = 2;
      const spy = spyOn(component.pageChange, 'emit');
      component.prevPage();
      expect(spy).toHaveBeenCalledOnceWith(1);
    });

    it('prevPage does nothing at first page', () => {
      component.currentPage = 1;
      const spy = spyOn(component.pageChange, 'emit');
      component.prevPage();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('trackByPage', () => {
    it('returns "<page>-<index>"', () => {
      expect(component.trackByPage(0, 1)).toBe('1-0');
      expect(component.trackByPage(2, '...')).toBe('...-2');
    });
  });

  describe('getFontSize', () => {
    it('returns mapped sizes', () => {
      component.size = 'xs'; expect(component.getFontSize()).toBe('12px');
      component.size = 'sm'; expect(component.getFontSize()).toBe('14px');
      component.size = 'md'; expect(component.getFontSize()).toBe('16px');
      component.size = 'lg'; expect(component.getFontSize()).toBe('20px');
      component.size = 'xl'; expect(component.getFontSize()).toBe('24px');
    });

    it('falls back to 16px for unknown size', () => {
      (component as any).size = 'weird';
      expect(component.getFontSize()).toBe('16px');
    });
  });
});
