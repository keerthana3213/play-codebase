import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestToasterComponent } from './test-toaster.component';

describe('TestToasterComponent', () => {
  let component: TestToasterComponent;
  let fixture: ComponentFixture<TestToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestToasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
