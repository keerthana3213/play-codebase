import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTreeviewComponent } from './test-treeview.component';

describe('TestTreeviewComponent', () => {
  let component: TestTreeviewComponent;
  let fixture: ComponentFixture<TestTreeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTreeviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
