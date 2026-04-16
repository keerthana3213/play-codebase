import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCardComponent } from './action-card.component';

describe('ActionCardComponent', () => {
  let component: ActionCardComponent;
  let fixture: ComponentFixture<ActionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display action card data correctly', () => {
    const testData = {
      icon: { 
        name: 'plus', 
        size: 24,
        color: '#8B5CF6'
      },
      title: 'Create New Artifacts',
      subtitle: 'Start building something amazing',
      styling: {
        textColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderColor: '#8B5CF6'
      },
      iconBackground: {
        color: '#FFFFFF',
        borderColor: '#E5E7EB'
      }
    };
    component.data = testData;
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.action-card-title');
    const subtitle = fixture.nativeElement.querySelector('.action-card-subtitle');
    const icon = fixture.nativeElement.querySelector('aava-icon');

    expect(title?.textContent.trim()).toBe('Create New Artifacts');
    expect(subtitle?.textContent.trim()).toBe('Start building something amazing');
    expect(icon).toBeTruthy();
  });

  it('should apply custom styles correctly', () => {
    const testData = {
      title: 'Test Action',
      styling: {
        textColor: '#FF0000',
        backgroundColor: '#F0F0F0',
        borderColor: '#000000'
      },
      iconBackground: {
        color: '#FFFF00',
        borderColor: '#FF0000'
      }
    };
    component.data = testData;
    fixture.detectChanges();

    const cardStyles = component.cardCustomStyles;
    expect(cardStyles['background']).toBe('#F0F0F0');
    expect(cardStyles['border']).toBe('2px solid #000000');

    const textStyles = component.textStyles;
    expect(textStyles['color']).toBe('#FF0000');

    const iconBgStyles = component.iconBackgroundStyles;
    expect(iconBgStyles['background-color']).toBe('#FFFF00');
    expect(iconBgStyles['border']).toBe('2px solid #FF0000');
  });

  it('should handle missing optional properties', () => {
    const testData = {
      title: 'Simple Action'
    };
    component.data = testData;
    fixture.detectChanges();

    expect(component.hasContent).toBeTruthy();
    expect(component.iconSize).toBe(24); // default
    expect(component.iconColor).toBe('#8B5CF6'); // default
  });

  it('should handle empty data gracefully', () => {
    component.data = {};
    fixture.detectChanges();

    expect(component.hasContent).toBeFalsy();
    expect(component).toBeTruthy();
  });
});
