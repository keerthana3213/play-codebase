import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExecutionCardComponent, ExecutionCardData } from './execution-card.component';

describe('ExecutionCardComponent', () => {
  let component: ExecutionCardComponent;
  let fixture: ComponentFixture<ExecutionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExecutionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display execution data correctly', () => {
    const testData: ExecutionCardData = {
      title: 'Daily Data Sync',
      subtitle: 'Started: 10:30 AM • Duration: 15 min',
      status: { label: 'Running', color: 'running', variant: 'filled', bg: '#EBF8FF', textColor: '#2563EB' },
      author: 'Sarah Chen',
      timestamp: '2 hours ago'
    };
    component.data = testData;
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.execution-card-title');
    const subtitle = fixture.nativeElement.querySelector('.execution-card-subtitle');

    expect(title?.textContent.trim()).toBe('Daily Data Sync');
    expect(subtitle?.textContent.trim()).toBe('Started: 10:30 AM • Duration: 15 min');
  });
});
