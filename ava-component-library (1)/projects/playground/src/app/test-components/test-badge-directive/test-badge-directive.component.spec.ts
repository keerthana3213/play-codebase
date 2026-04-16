import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBadgeDirectiveComponent } from './test-badge-directive.component';

describe('TestBadgeDirectiveComponent', () => {
  let component: TestBadgeDirectiveComponent;
  let fixture: ComponentFixture<TestBadgeDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBadgeDirectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBadgeDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
