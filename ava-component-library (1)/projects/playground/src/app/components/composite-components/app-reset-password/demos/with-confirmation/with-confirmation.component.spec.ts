import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithConfirmationComponent } from './with-confirmation.component';

describe('WithConfirmationComponent', () => {
  let component: WithConfirmationComponent;
  let fixture: ComponentFixture<WithConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
