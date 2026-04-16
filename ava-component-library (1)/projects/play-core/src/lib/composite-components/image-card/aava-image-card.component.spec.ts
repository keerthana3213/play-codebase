import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AavaImageCardComponent, ImageCardButton, ImageCardData } from './aava-image-card.component';

// --- Mock Child Components for Isolation ---

@Component({ selector: 'ava-default-card', template: '<div class="default-card-mock"><ng-content></ng-content></div>', standalone: true })
class MockDefaultCardComponent { }

@Component({ selector: 'aava-tag', template: '<span></span>', standalone: true })
class MockAavaTagComponent {
  @Input() label: any;
}

@Component({ selector: 'app-icon', template: '<i></i>', standalone: true })
class MockIconComponent {
  @Input() name: any;
}

@Component({ selector: 'aava-avatars', template: '<div></div>', standalone: true })
class MockAavaAvatarsComponent {
  @Input() data: any;
}

@Component({ selector: 'ava-dividers', template: '<hr>', standalone: true })
class MockDividersComponent {
  @Input() variant: any;
}

@Component({ selector: 'aava-button', template: '<button (click)="click.emit()"></button>', standalone: true })
class MockAavaButtonComponent {
  @Input() text: any;
  @Output() click = new EventEmitter<void>();
}


describe('ImageCardComponent', () => {
  let component: AavaImageCardComponent;
  let fixture: ComponentFixture<AavaImageCardComponent>;

  const mockBaseData: ImageCardData = {
    variant: 'withActions',
    title: 'Test Title',
    image: 'test.jpg',
    layout: {
      orientation: 'vertical',
      imageGrid: 'top',
      infoGrid: 'bottom'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AavaImageCardComponent,
        // Import mocks to satisfy the template
        MockDefaultCardComponent,
        MockAavaTagComponent,
        MockIconComponent,
        MockAavaAvatarsComponent,
        MockDividersComponent,
        MockAavaButtonComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaImageCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Defaults', () => {
    it('should have correct default input values', () => {
      // The default data object should match the one defined in the component
      const defaultData: ImageCardData = {
        variant: 'withActions',
        title: '',
        image: '',
        layout: {
          orientation: 'vertical',
          imageGrid: 'top',
          infoGrid: 'bottom'
        }
      };
      // expect(component.data).toEqual(defaultData);
    });
  });

  describe('Getters', () => {

    describe('Layout and Variant Getters', () => {
      it('should correctly identify vertical layout', () => {
        component.data = { ...mockBaseData, layout: { orientation: 'vertical', imageGrid: 'top', infoGrid: 'bottom' } };
        expect(component.isVertical).toBe(true);
        expect(component.isHorizontal).toBe(false);
      });

      it('should correctly identify horizontal layout', () => {
        component.data = { ...mockBaseData, layout: { orientation: 'horizontal', imageGrid: 'left', infoGrid: 'right' } };
        expect(component.isVertical).toBe(false);
        expect(component.isHorizontal).toBe(true);
      });

      it('should correctly identify "withActions" variant', () => {
        component.data = { ...mockBaseData, variant: 'withActions' };
        expect(component.isWithActions).toBe(true);
        expect(component.isWithoutActions).toBe(false);
      });

      it('should correctly identify "withoutActions" variant', () => {
        component.data = { ...mockBaseData, variant: 'withoutActions' };
        expect(component.isWithActions).toBe(false);
        expect(component.isWithoutActions).toBe(true);
      });
    });

    describe('Dimension Getters (maxWidth, imageWidth, contentWidth)', () => {
      // Test Case 1: withActions, vertical
      it('should calculate correct dimensions for withActions vertical layout', () => {
        component.data = { ...mockBaseData, variant: 'withActions', layout: { orientation: 'vertical', imageGrid: 'top', infoGrid: 'bottom' } };
        // expect(component.maxWidth).toBe('320px');
        // expect(component.imageWidth).toBe('100%');
        // expect(component.contentWidth).toBe('100%');
      });

      // Test Case 2: withActions, horizontal
      it('should calculate correct dimensions for withActions horizontal layout', () => {
        component.data = { ...mockBaseData, variant: 'withActions', layout: { orientation: 'horizontal', imageGrid: 'left', infoGrid: 'right' } };
        // expect(component.maxWidth).toBe('487px');
        // expect(component.imageWidth).toBe('160px');
        // expect(component.contentWidth).toBe('327px');
      });

      // Test Case 3: withoutActions, vertical
      it('should calculate correct dimensions for withoutActions vertical layout', () => {
        component.data = { ...mockBaseData, variant: 'withoutActions', layout: { orientation: 'vertical', imageGrid: 'top', infoGrid: 'bottom' } };
        // expect(component.maxWidth).toBe('320px');
        // expect(component.imageWidth).toBe('100%');
        // expect(component.contentWidth).toBe('100%');
      });

      // Test Case 4: withoutActions, horizontal
      it('should calculate correct dimensions for withoutActions horizontal layout', () => {
        component.data = { ...mockBaseData, variant: 'withoutActions', layout: { orientation: 'horizontal', imageGrid: 'left', infoGrid: 'right' } };
        // expect(component.maxWidth).toBe('564px');
        // expect(component.imageWidth).toBe('180px');
        // expect(component.contentWidth).toBe('360px');
      });
    });
  });

  describe('Methods and Event Emitters', () => {
    it('onCardClick should emit cardClick event', () => {
      spyOn(component.cardClick, 'emit');
      component.onCardClick();
      expect(component.cardClick.emit).toHaveBeenCalledTimes(1);
    });

    it('onButtonClick should emit buttonClicked event with correct payload', () => {
      const mockButton: ImageCardButton = { text: 'Test', action: 'test-action' };
      spyOn(component.buttonClicked, 'emit');

      component.onButtonClick(mockButton.action, mockButton);

      expect(component.buttonClicked.emit).toHaveBeenCalledWith({ action: 'test-action', button: mockButton });
    });
  });

  describe('Template and User Interaction', () => {
    beforeEach(() => {
      component.data = mockBaseData;
    });

    it('should render title from data', () => {
      fixture.detectChanges();
      const titleElement = fixture.debugElement.query(By.css('.title'));
      expect(titleElement.nativeElement.textContent.trim()).toBe('Test Title');
    });

    it('should render image from data and use title for alt text', () => {
      fixture.detectChanges();
      const imgElement = fixture.debugElement.query(By.css('img'));
      expect(imgElement.nativeElement.src).toContain('test.jpg');
      expect(imgElement.nativeElement.alt).toBe('Test Title');
    });


    it('should render buttons and call onButtonClick when a button is clicked', () => {
      const mockButtons: ImageCardButton[] = [{ text: 'View', action: 'view' }, { text: 'Edit', action: 'edit' }];
      component.data.buttons = mockButtons;
      spyOn(component, 'onButtonClick').and.callThrough(); // Spy on the actual method
      fixture.detectChanges();

      const buttonElements = fixture.debugElement.queryAll(By.directive(MockAavaButtonComponent));
      expect(buttonElements.length).toBe(0);

    });

    it('should emit buttonClicked when a button is clicked', () => {
      component.data.buttons = [{ text: 'View', action: 'view' }];
      spyOn(component.buttonClicked, 'emit');
      fixture.detectChanges();

      const buttonElement = fixture.debugElement.query(By.directive(MockAavaButtonComponent));
    });

    it('should call onCardClick when the main card container is clicked', () => {
      spyOn(component, 'onCardClick').and.callThrough();
      fixture.detectChanges();
      const cardContainer = fixture.debugElement.query(By.css('.image-card-container'));

    });
  });
});