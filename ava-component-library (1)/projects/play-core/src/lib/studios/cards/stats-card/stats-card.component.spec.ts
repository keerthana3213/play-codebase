import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsCardComponent, StatsCardData } from './stats-card.component';

describe('StatsCardComponent', () => {
  let component: StatsCardComponent;
  let fixture: ComponentFixture<StatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display stats data correctly', () => {
    const testData: StatsCardData = {
      icon: 'user',
      label: 'Agent',
      value: '56',
      valueColor: '#8B5CF6'
    };
    component.data = testData;
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.stats-card-label');
    const value = fixture.nativeElement.querySelector('.stats-card-value');
    const icon = fixture.nativeElement.querySelector('aava-icon');

    expect(label.textContent.trim()).toBe('Agent');
    expect(value.textContent.trim()).toBe('56');
    expect(icon).toBeTruthy();
    expect(value.style.color).toBe('rgb(139, 92, 246)');
  });
});
