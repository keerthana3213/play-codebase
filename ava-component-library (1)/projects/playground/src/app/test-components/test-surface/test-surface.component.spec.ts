import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSurfaceComponent } from './test-surface.component';

describe('TestSurfaceComponent', () => {
  let component: TestSurfaceComponent;
  let fixture: ComponentFixture<TestSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSurfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
