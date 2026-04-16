import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryCardComponent, SummaryCardData } from './summary-card.component';

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: ComponentFixture<SummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display summary data correctly', () => {
    const testData: SummaryCardData = {
      title: 'Total Projects',
      subtitle: 'Active development across 3 teams',
      tag: { label: 'Pipeline', color: 'custom', bg: '#EBF8FF', textColor: '#2563EB' }
    };
    component.data = testData;
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.summary-card-title');
    const subtitle = fixture.nativeElement.querySelector('.summary-card-subtitle');

    expect(title?.textContent.trim()).toBe('Total Projects');
    expect(subtitle?.textContent.trim()).toBe('Active development across 3 teams');
  });

  it('should display rating with dot separator when both subtitle and rating are provided', () => {
    const testData: SummaryCardData = {
      title: 'Smart Email Responder',
      subtitle: '2.4k downloads this week',
      tag: { label: 'Active', color: 'custom', bg: '#DCFCE7', textColor: '#16A34A' },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    };
    component.data = testData;
    fixture.detectChanges();

    const subtitle = fixture.nativeElement.querySelector('.summary-card-subtitle');
    const dot = fixture.nativeElement.querySelector('.summary-card-dot');
    const ratingValue = fixture.nativeElement.querySelector('.rating-value');

    expect(subtitle?.textContent.trim()).toBe('2.4k downloads this week');
    expect(dot?.textContent.trim()).toBe('•');
    expect(ratingValue?.textContent.trim()).toBe('4.8');
  });

  it('should display only rating when subtitle is not provided', () => {
    const testData: SummaryCardData = {
      title: 'Data Cleansing Workflow',
      tag: { label: 'Popular', color: 'custom', bg: '#F3E8FF', textColor: '#8B5CF6' },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    };
    component.data = testData;
    fixture.detectChanges();

    const subtitle = fixture.nativeElement.querySelector('.summary-card-subtitle');
    const dot = fixture.nativeElement.querySelector('.summary-card-dot');
    const ratingValue = fixture.nativeElement.querySelector('.rating-value');

    expect(subtitle).toBeFalsy();
    expect(dot).toBeFalsy();
    expect(ratingValue?.textContent.trim()).toBe('4.8');
  });
});
