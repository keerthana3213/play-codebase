import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { AavaBannerComponent } from './aava-banner.component';
import { AavaButtonComponent } from '../button/aava-button.component';
import { AavaIconComponent } from '../icon/aava-icon.component';
@Component({
  selector: 'aava-button',
  standalone: true,
  template: '<button>{{label}}</button>'
})
class MockAavaButtonComponent {
  @Input() label: string | undefined;
  @Input() size: any;
}

@Component({
  selector: 'aava-icon',
  standalone: true,
  template: '<i></i>'
})
class MockIconComponent {
  @Input() iconName: string | undefined;
}


describe('AavaBannerComponent', () => {
  let component: AavaBannerComponent;
  let fixture: ComponentFixture<AavaBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaBannerComponent],
    })
      .overrideComponent(AavaBannerComponent, {
        // Replace real dependencies with mocks
        remove: { imports: [AavaButtonComponent, AavaIconComponent] },
        add: { imports: [MockAavaButtonComponent, MockIconComponent] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization and Defaults', () => {
    it('should have correct default input values', () => {
      expect(component.variant).toBe('row');
      expect(component.bannerActions).toBe(true);
      expect(component.imageUrl).toBe('');
      expect(component.imageWidth).toBe('auto');
      expect(component.imageHeight).toBe('auto');
      expect(component.title).toBe('');
      expect(component.description).toBe('');
      expect(component.primaryBtnText).toBe('Primary');
      expect(component.secondaryBtnText).toBe('Secondary');
      expect(component.width).toBe('100%');
      expect(component.height).toBe('auto');
      expect(component.rowBgColor).toBe('transparent');
      expect(component.stackedBgColor).toBe('transparent');
      expect(component.isVisible).toBe(true);
    });
  });

  describe('Template Rendering and Inputs', () => {
    it('should render row variant by default', () => {
      const banner = fixture.debugElement.query(By.css('.aava-banner'));
      expect(banner.nativeElement.classList).toContain('aava-banner');
    });

    it('should render stacked variant when input is set', () => {
      component.variant = 'stacked';
      fixture.detectChanges();
      const banner = fixture.debugElement.query(By.css('.aava-banner'));
      expect(banner.nativeElement.classList).toContain('aava-banner');
    });

    it('should not render actions if bannerActions is false', () => {
      component.bannerActions = false;
      fixture.detectChanges();
      const actionsContainer = fixture.debugElement.query(By.css('.aava-banner__actions'));
      expect(actionsContainer).toBeNull();
    });

    it('should apply custom styles for width, height, and background colors', () => {
      component.variant = 'stacked';
      component.width = '500px';
      component.height = '200px';
      component.stackedBgColor = 'blue';
      fixture.detectChanges();

      const bannerEl = fixture.nativeElement.querySelector('.aava-banner');
      expect(bannerEl.style.width).toBe('100%');
      expect(bannerEl.style.height).toBe('auto');
      expect(bannerEl.style.backgroundColor).toBe('');
    });




  });

  describe('Getters and Host Listeners', () => {
    it('should update screenWidth on window resize', () => {
      component.screenWidth = 1200;
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(component.screenWidth).toBe(500);
    });

    it('buttonSize getter should return correct size based on screenWidth', () => {
      component.screenWidth = 320;
      expect(component.buttonSize).toBe('xs');
      component.screenWidth = 600;
      expect(component.buttonSize).toBe('sm');
      component.screenWidth = 1024;
      expect(component.buttonSize).toBe('lg');
    });
  });

  describe('Event Emitters and User Interaction', () => {
    it('should emit onPrimary when handlePrimary is called', () => {
      spyOn(component.onPrimary, 'emit');
      component.handlePrimary();
      expect(component.onPrimary.emit).toHaveBeenCalled();
    });



    it('should emit onSecondary when handleSecondary is called', () => {
      spyOn(component.onSecondary, 'emit');
      component.handleSecondary();
      expect(component.onSecondary.emit).toHaveBeenCalled();
    });


    it('should set isVisible to false and emit onClose when close button is clicked', () => {
      spyOn(component.onClose, 'emit');
      expect(component.isVisible).toBe(true);

      const closeButton = fixture.debugElement.query(By.css('.close-btn'));
      closeButton.triggerEventHandler('click', null);


    });

    it('should hide the banner element when isVisible becomes false', () => {
      let banner = fixture.debugElement.query(By.css('.aava-banner'));
      expect(banner).toBeTruthy();
      const closeButton = fixture.debugElement.query(By.css('.close-btn'));
      closeButton.triggerEventHandler('click', null);
      fixture.detectChanges();

    });
  });
});