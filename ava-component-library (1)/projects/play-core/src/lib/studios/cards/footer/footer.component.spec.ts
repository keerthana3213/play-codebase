import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent, FooterData } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button when buttonText is provided', () => {
    const testData: FooterData = {
      buttonText: 'Test Button'
    };
    component.data = testData;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('aava-button');
    expect(button).toBeTruthy();
  });

  it('should not display footer when no buttonText is provided', () => {
    const testData: FooterData = {};
    component.data = testData;
    fixture.detectChanges();

    const footerContainer = fixture.nativeElement.querySelector('.footer-container');
    expect(footerContainer).toBeFalsy();
  });

  it('should emit buttonClick event when button is clicked', () => {
    spyOn(component.buttonClick, 'emit');

    component.onButtonClick();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
