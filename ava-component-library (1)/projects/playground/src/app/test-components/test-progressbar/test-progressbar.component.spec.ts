import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProgressbarComponent } from './test-progressbar.component';

describe('TestProgressbarComponent', () => {
  let component: TestProgressbarComponent;
  let fixture: ComponentFixture<TestProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestProgressbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
