import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaBreadcrumbsComponent } from './aava-breadcrumbs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('BreadcrumbsComponent', () => {
  let component: AavaBreadcrumbsComponent;
  let fixture: ComponentFixture<AavaBreadcrumbsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, RouterTestingModule, AavaBreadcrumbsComponent, AavaIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AavaBreadcrumbsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onBreadcrumbClick', () => {
    it('should navigate to the correct URL and set clickedBreadcrumbIndex', () => {
      spyOn(router, 'navigate');
      const event = { preventDefault: jasmine.createSpy('preventDefault') };
      component.breadcrumbs = [{ label: 'Home', url: '/home', active: false }];
      component.onBreadcrumbClick(event as unknown as Event, 0);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      expect(component.clickedBreadcrumbIndex).toBe(0);
    });
  });

  describe('onEllipsisClick', () => {
    it('should set clickedBreadcrumbIndex to the second-to-last item', () => {
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'Level1', url: '/level1', active: false },
        { label: 'Level2', url: '/level2', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      component.onEllipsisClick();
      expect(component.clickedBreadcrumbIndex).toBe(2);
    });
  });

  describe('getOriginalIndex', () => {
    it('should return the correct original index for non-collapsible breadcrumbs', () => {
      component.collapsible = false;
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      const index = component.getOriginalIndex(0);
      expect(index).toBe(0);
    });

    it('should return the correct original index for collapsible breadcrumbs', () => {
      component.collapsible = true;
      component.maxVisibleItems = 3;
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'Level1', url: '/level1', active: false },
        { label: 'Level2', url: '/level2', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      component.clickedBreadcrumbIndex = 0;
      const index = component.getOriginalIndex(0);
      expect(index).toBe(0);
    });
  });

  describe('getIconColor', () => {
    it('should return the correct color for active breadcrumb', () => {
      const color = component.getIconColor(true);
      expect(color).toBe('var(--breadcrumbs-item-current-text)');
    });

    it('should return the correct color for inactive breadcrumb', () => {
      const color = component.getIconColor(false);
      expect(color).toBe('var(--breadcrumbs-item-text)');
    });
  });

  describe('onBreadcrumbKeydown', () => {
    it('should handle ArrowRight key correctly', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      component.onBreadcrumbKeydown(event, 0);
      expect(component.clickedBreadcrumbIndex).toBe(1);
    });

    it('should handle ArrowLeft key correctly', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      component.clickedBreadcrumbIndex = 1;
      component.onBreadcrumbKeydown(event, 1);
      expect(component.clickedBreadcrumbIndex).toBe(0);
    });

    it('should handle Enter key correctly', () => {
      spyOn(router, 'navigate');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.breadcrumbs = [{ label: 'Home', url: '/home', active: false }];
      component.onBreadcrumbKeydown(event, 0);
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('displayedBreadcrumbs', () => {
    it('should return all breadcrumbs if not collapsible', () => {
      component.collapsible = false;
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      const displayedBreadcrumbs = component.displayedBreadcrumbs;
      expect(displayedBreadcrumbs.length).toBe(2);
    });

    it('should return collapsed breadcrumbs if collapsible and many items', () => {
      component.collapsible = true;
      component.maxVisibleItems = 3;
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'Level1', url: '/level1', active: false },
        { label: 'Level2', url: '/level2', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      const displayedBreadcrumbs = component.displayedBreadcrumbs;
      expect(displayedBreadcrumbs.length).toBe(3);
    });
  });

  describe('shouldCollapse', () => {
    it('should return true if breadcrumbs should collapse', () => {
      component.collapsible = true;
      component.maxVisibleItems = 3;
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'Level1', url: '/level1', active: false },
        { label: 'Level2', url: '/level2', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      expect(component.shouldCollapse).toBe(true);
    });

    it('should return false if breadcrumbs should not collapse', () => {
      component.collapsible = false;
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      expect(component.shouldCollapse).toBe(false);
    });
  });

  describe('shouldShowEllipsis', () => {
    it('should return true if ellipsis should be shown', () => {
      component.collapsible = true;
      component.maxVisibleItems = 3;
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'Level1', url: '/level1', active: false },
        { label: 'Level2', url: '/level2', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      expect(component.shouldShowEllipsis).toBe(true);
    });

    it('should return false if ellipsis should not be shown', () => {
      component.collapsible = false;
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      expect(component.shouldShowEllipsis).toBe(false);
    });
  });

  describe('getCollapsedBreadcrumbs', () => {
    it('should return the correct collapsed breadcrumbs', () => {
      component.breadcrumbs = [
        { label: 'Home', url: '/home', active: false },
        { label: 'Level1', url: '/level1', active: false },
        { label: 'Level2', url: '/level2', active: false },
        { label: 'About', url: '/about', active: true }
      ];
      const collapsedBreadcrumbs = component['getCollapsedBreadcrumbs']();
      expect(collapsedBreadcrumbs.length).toBe(3);
    });
  });
});
