import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTooltipComponent } from './test-tooltip.component';

describe('TestTooltipComponent', () => {
  let component: TestTooltipComponent;
  let fixture: ComponentFixture<TestTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
