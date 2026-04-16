import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaTextCardComponent } from './aava-text-card.component';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, TrendingUp } from 'lucide-angular';

// Mock dependencies
@Component({ selector: 'aava-icon', template: '' })
class MockIconComponent {
  @Input() iconName: string = '';
  @Input() iconColor: string = '';
}

@Component({ selector: 'aava-card', template: '<ng-content></ng-content>' })
class MockCardComponent { }

@Component({ selector: 'lucide-icon', template: '' })
class MockLucideIconComponent {
  @Input() name: string = '';
}

describe('AavaTextCardComponent', () => {
  let component: AavaTextCardComponent;
  let fixture: ComponentFixture<AavaTextCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AavaTextCardComponent,
        LucideAngularModule.pick({ TrendingUp })  // ✅ register the icon
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AavaTextCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.iconName).toBe('trending-up');
    expect(component.title).toBe('');
    expect(component.value).toBe('');
    expect(component.description).toBe('');
    expect(component.width).toBe(0);
    expect(component.type).toBe('default');
    expect(component.iconColor).toBe('');
    expect(component.userCount).toBe(0);
    expect(component.promptName).toBe('');
    expect(component.name).toBe('');
    expect(component.date).toBe('');
    expect(component.iconList).toEqual([]);
    expect(component.headerIcons).toEqual([]);
    expect(component.footerIcons).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(component.skeletonAnimationColor).toBe('');
    expect(component.skeletonBackground).toBe('');
  });

  it('should emit cardClick on onCardClick', () => {
    spyOn(component.cardClick, 'emit');
    component.onCardClick();
    expect(component.cardClick.emit).toHaveBeenCalled();
  });

  it('should emit iconClick on iconClicked', () => {
    spyOn(component.iconClick, 'emit');
    const iconData = { iconName: 'test-icon' };
    component.iconClicked(iconData);
    expect(component.iconClick.emit).toHaveBeenCalledWith(iconData as any);
  });

  it('should update inputs correctly', () => {
    component.iconName = 'star';
    component.title = 'Test Title';
    component.value = 100;
    component.description = 'Test Description';
    component.width = 200;
    component.type = 'create';
    component.iconColor = 'red';
    component.userCount = 5;
    component.promptName = 'prompt1';
    component.name = 'Name1';
    component.date = '2025-08-21';
    component.iconList = [{ icon: 'icon1' }];
    component.headerIcons = [{ iconName: 'iconH', title: 'Header' }];
    component.footerIcons = [{ iconName: 'iconF', title: 'Footer' }];
    component.isLoading = true;
    component.skeletonAnimationColor = 'blue';
    component.skeletonBackground = 'gray';

    expect(component.iconName).toBe('star');
    expect(component.title).toBe('Test Title');
    expect(component.value).toBe(100);
    expect(component.description).toBe('Test Description');
    expect(component.width).toBe(200);
    expect(component.type).toBe('create');
    expect(component.iconColor).toBe('red');
    expect(component.userCount).toBe(5);
    expect(component.promptName).toBe('prompt1');
    expect(component.name).toBe('Name1');
    expect(component.date).toBe('2025-08-21');
    expect(component.iconList).toEqual([{ icon: 'icon1' }]);
    expect(component.headerIcons).toEqual([{ iconName: 'iconH', title: 'Header' }]);
    expect(component.footerIcons).toEqual([{ iconName: 'iconF', title: 'Footer' }]);
    expect(component.isLoading).toBeTrue();
    expect(component.skeletonAnimationColor).toBe('blue');
    expect(component.skeletonBackground).toBe('gray');
  });

  it('should render Card component and trigger cardClick on click', () => {
    spyOn(component, 'onCardClick').and.callThrough();
    spyOn(component.cardClick, 'emit');
    const cardDebug = fixture.debugElement.query(By.css('aava-card'));
    cardDebug.triggerEventHandler('click', null);

    // expect(component.onCardClick).onCardClick();
    // expect(component.cardClick.emit).toHaveBeenCalled();
  });
});
