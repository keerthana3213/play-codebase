import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmissionCardComponent, SubmissionCardData } from './submission-card.component';

describe('SubmissionCardComponent', () => {
  let component: SubmissionCardComponent;
  let fixture: ComponentFixture<SubmissionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SubmissionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display submission data correctly', () => {
    const testData: SubmissionCardData = {
      icon: { name: 'bot', size: 24 },
      text: 'AI Assistant v2.1',
      topTag: { label: '7 days ago', color: 'custom', bg: '#FEF3C7', textColor: '#D97706' },
      tags: [{ label: 'Ascendion', color: 'default' }],
      avatar: { imageUrl: 'assets/1.svg', size: 'xxs' },
      label: 'Harvey Specter'
    };
    component.data = testData;
    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.submission-card-text');
    const label = fixture.nativeElement.querySelector('.submission-card-label');
    const icon = fixture.nativeElement.querySelector('aava-icon');

    expect(text?.textContent.trim()).toBe('AI Assistant v2.1');
    expect(label?.textContent.trim()).toBe('Harvey Specter');
    expect(icon).toBeTruthy();
  });
});
