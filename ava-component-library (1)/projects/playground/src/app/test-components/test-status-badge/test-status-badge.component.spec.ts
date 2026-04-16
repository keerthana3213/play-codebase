import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStatusBadgeComponent } from './test-status-badge.component';

describe('TestStatusBadgeComponent', () => {
  let component: TestStatusBadgeComponent;
  let fixture: ComponentFixture<TestStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStatusBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
