import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaAvatarsComponent } from './aava-avatars.component';

describe('AavaAvatarsComponent', () => {
  let fixture: ComponentFixture<AavaAvatarsComponent>;
  let component: AavaAvatarsComponent;

  const defaultColors = ['#E91E63', '#FF9800'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaAvatarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaAvatarsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('avatarClasses: default includes size and shape', () => {
    // default: size=large, shape=pill
    const cls = component.avatarClasses;
    expect(cls).toContain('avatar');
    expect(cls).toContain('avatar--large');
    expect(cls).toContain('avatar--pill');
  });



  it('avatarClasses: shape square reflected', () => {
    component.shape = 'square';
    const cls = component.avatarClasses;
    expect(cls).toContain('avatar--square');
    expect(cls).not.toContain('avatar--pill');
  });

  it('hasBadge: true when badgeState set, or when badgeCount set; false otherwise', () => {
    component.badgeState = undefined as any;
    component.badgeCount = undefined;
    expect(component.hasBadge).toBeFalse();

    component.badgeCount = 0;
    expect(component.hasBadge).toBeFalse();

    component.badgeCount = 3;
    expect(component.hasBadge).toBeTrue();

    component.badgeCount = undefined;
    (component as any).badgeState = 'success';
    expect(component.hasBadge).toBeTrue();
  });

  it('text flags and hasAnyText aggregate', () => {
    component.statusText = undefined;
    component.profileText = undefined;
    component.additionalText = undefined;
    expect(component.hasStatusText).toBeFalse();
    expect(component.hasProfileText).toBeFalse();
    expect(component.hasAdditionalText).toBeFalse();
    expect(component.hasAnyText).toBeFalse();

    component.statusText = 'Online';
    expect(component.hasStatusText).toBeTrue();
    expect(component.hasAnyText).toBeTrue();

    component.statusText = undefined;
    component.profileText = 'MJ';
    expect(component.hasProfileText).toBeTrue();
    expect(component.hasAnyText).toBeTrue();

    component.profileText = undefined;
    component.additionalText = 'More';
    expect(component.hasAdditionalText).toBeTrue();
    expect(component.hasAnyText).toBeTrue();
  });




});
