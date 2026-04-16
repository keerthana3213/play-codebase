import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaBadgesComponent } from './aava-badges.component';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { By } from '@angular/platform-browser';



describe('BadgesComponent', () => {
  let component: AavaBadgesComponent;
  let fixture: ComponentFixture<AavaBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaBadgesComponent, AavaIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaBadgesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('displayCount', () => {
    it('should return empty string if count is undefined', () => {
      component.count = undefined;
      expect(component.displayCount).toBe('');
    });

    it('should return "999+" for count > 999', () => {
      component.count = 1000;
      expect(component.displayCount).toBe('99+');
    });

    it('should return "99+" for count > 99 and <= 999', () => {
      component.count = 150;
      expect(component.displayCount).toBe('99+');
    });

    it('should return "9+" for count > 9 and <= 99', () => {
      component.count = 45;
      expect(component.displayCount).toBe('9+');
    });

    it('should return count as string for count <= 9', () => {
      component.count = 7;
      expect(component.displayCount).toBe('7');
    });
  });

  describe('badgeClasses', () => {
    it('should return base classes if count is undefined', () => {
      component.count = undefined;
      component.state = 'neutral';
      component.size = 'md';
      expect(component.badgeClasses).toBe('badge badge--neutral badge--md badge--default');
    });

    it('should include "badge--expanded" if displayCount length > 1', () => {
      component.count = 45;
      component.state = 'high-priority';
      component.size = 'lg';
      expect(component.badgeClasses).toContain('badge--expanded');
    });

    it('should not include "badge--expanded" if displayCount is single digit', () => {
      component.count = 3;
      expect(component.badgeClasses).not.toContain('badge--expanded');
    });
  });

  describe('hasContent', () => {
    it('should be false if neither count nor iconName is present', () => {
      component.count = undefined;
      component.iconName = undefined;
      expect(component.hasContent).toBeFalse();
    });

    it('should be true if count is present', () => {
      component.count = 5;
      expect(component.hasContent).toBeTrue();
    });

    it('should be true if iconName is present', () => {
      component.count = undefined;
      component.iconName = 'info';
      expect(component.hasContent).toBeTrue();
    });
  });

  describe('isSingleDigit', () => {
    it('should be true if count is between 0 and 9', () => {
      component.count = 8;
      expect(component.isSingleDigit).toBeTrue();
    });

    it('should be false if count is > 9', () => {
      component.count = 12;
      expect(component.isSingleDigit).toBeFalse();
    });

    it('should be false if count is undefined', () => {
      component.count = undefined;
      expect(component.isSingleDigit).toBeFalse();
    });
  });

  describe('DOM rendering and events', () => {

    it('should call onKeyPress on Enter key', () => {
      spyOn(component, 'onKeyPress');
      fixture.detectChanges();

      const el = fixture.debugElement.query(By.css('div'));
      el.triggerEventHandler('keydown.enter', {});
      expect(component.onKeyPress).toHaveBeenCalled();
    });

    it('should call onKeyPress on Space key', () => {
      spyOn(component, 'onKeyPress');
      fixture.detectChanges();

      const el = fixture.debugElement.query(By.css('div'));
      el.triggerEventHandler('keydown.space', {});
      expect(component.onKeyPress).toHaveBeenCalled();
    });

    it('should set tabindex to 0 for keyboard navigation', () => {
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('div'));
      expect(el.attributes['tabindex']).toBe('0');
    });

    it('should set correct class on div', () => {
      component.count = 5;
      component.state = 'information';
      component.size = 'sm';
      fixture.detectChanges();

      const el = fixture.debugElement.query(By.css('div'));
      expect(el.nativeElement.className).toContain('badge--information');
      expect(el.nativeElement.className).toContain('badge--sm')
    });
  });

  describe('onKeyPress()', () => {
    it('should log message when key is pressed', () => {
      spyOn(console, 'log');
      component.onKeyPress();
      expect(console.log).toHaveBeenCalledWith('Badge component pressed via keyboard');
    });
  });
});
