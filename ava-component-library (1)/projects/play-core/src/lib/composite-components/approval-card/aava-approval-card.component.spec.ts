import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaApprovalCardComponent } from './aava-approval-card.component';

describe('ApprovalCardComponent', () => {
  let component: AavaApprovalCardComponent;
  let fixture: ComponentFixture<AavaApprovalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaApprovalCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaApprovalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
