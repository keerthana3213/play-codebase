import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewCardComponent, ReviewCardData } from './review-card.component';

describe('ReviewCardComponent', () => {
  let component: ReviewCardComponent;
  let fixture: ComponentFixture<ReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display review data correctly', () => {
    const testData: ReviewCardData = {
      text: 'User Authentication Flow',
      topTag: { label: 'For Revision', color: 'custom', bg: '#FEF3C7', textColor: '#D97706' },
      description: '"Security vulnerabilities in password"',
      byText: 'By: Harvey Specter • 4 days ago'
    };
    component.data = testData;
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.review-card-text');
    const description = fixture.nativeElement.querySelector('.review-card-description');
    const byText = fixture.nativeElement.querySelector('.review-card-by-text');

    expect(text?.textContent.trim()).toBe('User Authentication Flow');
    expect(description?.textContent.trim()).toBe('"Security vulnerabilities in password"');
    expect(byText?.textContent.trim()).toBe('By: Harvey Specter • 4 days ago');
  });

  it('should display security variant correctly', () => {
    const testData: ReviewCardData = {
      text: 'Failed Login',
      topTag: { label: 'High Risk', color: 'error', variant: 'filled' },
      description: 'Multiple failed login attempts',
      target: 'admin@company.com',
      variant: 'security'
    };
    component.data = testData;
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.review-card-container--security');
    const description = fixture.nativeElement.querySelector('.review-card-description--security');
    const target = fixture.nativeElement.querySelector('.review-card-target--security');

    expect(container).toBeTruthy();
    expect(description?.textContent.trim()).toBe('Multiple failed login attempts');
    expect(target?.textContent.trim()).toBe('admin@company.com');
  });

  it('should show target instead of byText when target is provided', () => {
    const testData: ReviewCardData = {
      text: 'Failed Login',
      description: 'Multiple failed login attempts',
      byText: 'By System',
      target: 'admin@company.com',
      variant: 'security'
    };
    component.data = testData;
    fixture.detectChanges();

    const byText = fixture.nativeElement.querySelector('.review-card-by-text');
    const target = fixture.nativeElement.querySelector('.review-card-target');

    expect(byText).toBeFalsy(); // Should not show byText when target is present
    expect(target?.textContent.trim()).toBe('admin@company.com');
  });
});
