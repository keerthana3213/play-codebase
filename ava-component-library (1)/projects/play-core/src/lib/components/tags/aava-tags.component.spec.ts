import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaTagComponent } from './aava-tags.component';
import { By } from '@angular/platform-browser';

describe('AavaTagComponent', () => {
  let component: AavaTagComponent;
  let fixture: ComponentFixture<AavaTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaTagComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTagComponent);
    component = fixture.componentInstance;
    component.label = 'Test Tag';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should accept different inputs', () => {
      component.color = 'primary';
      component.variant = 'outlined';
      component.size = 'xl';
      component.pill = true;
      component.removable = true;
      component.disabled = true;
      component.icon = 'close';
      component.iconPosition = 'end';
      component.avatar = 'A';
      component.iconColor = 'red';
      component.customStyle = { color: 'blue' };
      component.customClass = 'extra-class';
      component.type = 'badge';
      fixture.detectChanges();

      expect(component.color).toBe('primary');
      expect(component.variant).toBe('outlined');
      expect(component.size).toBe('xl');
      expect(component.pill).toBeTrue();
      expect(component.removable).toBeTrue();
      expect(component.disabled).toBeTrue();
      expect(component.icon).toBe('close');
      expect(component.iconPosition).toBe('end');
      expect(component.avatar).toBe('A');
      expect(component.iconColor).toBe('red');
      expect(component.customStyle).toEqual({ color: 'blue' });
      expect(component.customClass).toBe('extra-class');
      expect(component.type).toBe('badge');
    });
  });

  describe('clickable getter', () => {
    it('should return true when clicked observed and not disabled', () => {
      component.disabled = false;
      let clicked = false;
      component.clicked.subscribe(() => (clicked = true));
      expect(component.clickable).toBeTrue();
    });

    it('should return false when disabled', () => {
      component.disabled = true;
      let clicked = false;
      component.clicked.subscribe(() => (clicked = true));
      expect(component.clickable).toBeFalse();
    });
  });

  describe('getIconSize', () => {
    it('should return size based on tag size', () => {
      component.size = 'xs';
      expect(component.getIconSize()).toBe(12);

      component.size = 'sm';
      expect(component.getIconSize()).toBe(12);

      component.size = 'md';
      expect(component.getIconSize()).toBe(14);

      component.size = 'lg';
      expect(component.getIconSize()).toBe(16);

      component.size = 'xl';
      expect(component.getIconSize()).toBe(20);
    });
  });

  describe('getIconColor', () => {
    it('should return custom iconColor if provided', () => {
      component.iconColor = 'red';
      expect(component.getIconColor('start')).toBe('red');
    });

    it('should return gray for disabled state', () => {
      component.disabled = true;
      expect(component.getIconColor('start')).toContain('gray');
      expect(component.getIconColor('end')).toContain('gray');
    });

    it('should return black for start position', () => {
      component.disabled = false;
      component.iconColor = undefined;
      expect(component.getIconColor('start')).toContain('black');
    });

    it('should return black on hover for end position', () => {
      component.isHovered = true;
      expect(component.getIconColor('end')).toContain('black');
    });

    it('should return gray on non-hover end position', () => {
      component.isHovered = false;
      expect(component.getIconColor('end')).toContain('gray');
    });
  });

  describe('Avatar logic', () => {
    it('should show avatar if avatar is set', () => {
      component.avatar = 'X';
      expect(component.shouldShowAvatar).toBeTrue();
    });

    it('should return avatar size based on tag size', () => {
      component.size = 'xl';
      expect(component.getAvatarSize()).toBe('extra-small');

      component.size = 'lg';
      expect(component.getAvatarSize()).toBe('ultra-small');

      component.size = 'md';
      expect(component.getAvatarSize()).toBe('ultra-small');

      component.size = 'sm';
      expect(component.getAvatarSize()).toBe('ultra-small');

      component.size = 'xs';
      expect(component.getAvatarSize()).toBe('ultra-small');
    });
  });

  describe('Events', () => {
    it('should emit removed event when not disabled', () => {
      spyOn(component.removed, 'emit');
      const event = new Event('click');
      spyOn(event, 'stopPropagation');
      component.disabled = false;
      component.onRemove(event);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.removed.emit).toHaveBeenCalled();
    });

    it('should not emit removed event when disabled', () => {
      spyOn(component.removed, 'emit');
      const event = new Event('click');
      component.disabled = true;
      component.onRemove(event);
      expect(component.removed.emit).not.toHaveBeenCalled();
    });

    it('should emit clicked event when clickable', () => {
      spyOn(component.clicked, 'emit');
      component.disabled = false;
      component.clicked.subscribe(() => { }); // make observed true
      component.onClick();
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should not emit clicked event when not clickable', () => {
      spyOn(component.clicked, 'emit');
      component.disabled = true;
      component.onClick();
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });
  });

  describe('Hover states', () => {
    it('should set isHovered to true on mouse enter when not disabled', () => {
      component.disabled = false;
      component.onMouseEnter();
      expect(component.isHovered).toBeTrue();
    });

    it('should not set isHovered to true on mouse enter when disabled', () => {
      component.disabled = true;
      component.onMouseEnter();
      expect(component.isHovered).toBeFalse();
    });

    it('should reset isHovered on mouse leave', () => {
      component.isHovered = true;
      component.onMouseLeave();
      expect(component.isHovered).toBeFalse();
    });
  });
});
