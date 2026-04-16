import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestListConsoleComponent } from './test-list-console.component';

describe('TestListConsoleComponent', () => {
  let component: TestListConsoleComponent;
  let fixture: ComponentFixture<TestListConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestListConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestListConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
