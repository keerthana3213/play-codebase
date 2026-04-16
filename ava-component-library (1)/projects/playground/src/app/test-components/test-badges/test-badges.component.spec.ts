import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBadgesComponent } from './test-badges.component';

describe('TestBadgesComponent', () => {
  let component: TestBadgesComponent;
  let fixture: ComponentFixture<TestBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBadgesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
