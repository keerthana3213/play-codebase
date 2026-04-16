import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent, HeaderData } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display primary heading when provided', () => {
    const testData: HeaderData = {
      primaryHeading: 'Test Primary Heading'
    };
    component.data = testData;
    fixture.detectChanges();

    const primaryHeading = fixture.nativeElement.querySelector('.header-primary-heading');
    expect(primaryHeading).toBeTruthy();
    expect(primaryHeading.textContent.trim()).toBe('Test Primary Heading');
  });

  it('should display secondary heading when provided', () => {
    const testData: HeaderData = {
      secondaryHeading: 'Test Secondary Heading'
    };
    component.data = testData;
    fixture.detectChanges();

    const secondaryHeading = fixture.nativeElement.querySelector('.header-secondary-heading');
    expect(secondaryHeading).toBeTruthy();
    expect(secondaryHeading.textContent.trim()).toBe('Test Secondary Heading');
  });

  it('should display tabs when provided', () => {
    const testData: HeaderData = {
      tabs: [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' }
      ]
    };
    component.data = testData;
    fixture.detectChanges();

    const tabsContainer = fixture.nativeElement.querySelector('.header-tabs');
    expect(tabsContainer).toBeTruthy();
  });

  it('should display number and text when provided', () => {
    const testData: HeaderData = {
      numberText: {
        number: '42',
        text: 'test items'
      }
    };
    component.data = testData;
    fixture.detectChanges();

    const numberElement = fixture.nativeElement.querySelector('.header-number');
    const textElement = fixture.nativeElement.querySelector('.header-text');

    expect(numberElement).toBeTruthy();
    expect(textElement).toBeTruthy();
    expect(numberElement.textContent.trim()).toBe('42');
    expect(textElement.textContent.trim()).toBe('test items');
  });
});
