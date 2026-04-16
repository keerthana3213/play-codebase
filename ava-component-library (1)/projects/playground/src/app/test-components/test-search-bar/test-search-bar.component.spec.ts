import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSearchBarComponent } from './test-search-bar.component';

describe('TestSearchBarComponent', () => {
  let component: TestSearchBarComponent;
  let fixture: ComponentFixture<TestSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
