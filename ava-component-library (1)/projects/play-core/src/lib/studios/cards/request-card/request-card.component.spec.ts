import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestCardComponent, RequestCardData } from './request-card.component';

describe('RequestCardComponent', () => {
  let component: RequestCardComponent;
  let fixture: ComponentFixture<RequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display request data correctly', () => {
    const testData: RequestCardData = {
      name: 'Jennifer Walsh',
      department: 'Marketing • 2 hours ago',
      buttons: [
        { label: 'Approve', variant: 'secondary', action: 'approve' },
        { label: 'Reject', variant: 'secondary', color: '#6B7280', action: 'reject' }
      ]
    };
    component.data = testData;
    fixture.detectChanges();

    const name = fixture.nativeElement.querySelector('.request-card-name');
    const department = fixture.nativeElement.querySelector('.request-card-department');

    expect(name?.textContent.trim()).toBe('Jennifer Walsh');
    expect(department?.textContent.trim()).toBe('Marketing • 2 hours ago');
  });
});
