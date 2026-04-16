import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCustomSidebarComponent } from './test-custom-sidebar.component';

describe('TestCustomSidebarComponent', () => {
  let component: TestCustomSidebarComponent;
  let fixture: ComponentFixture<TestCustomSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCustomSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCustomSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
