import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectionDemoComponent } from './multiple-selection-demo.component';

describe('MultipleSelectionDemoComponent', () => {
  let component: MultipleSelectionDemoComponent;
  let fixture: ComponentFixture<MultipleSelectionDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleSelectionDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleSelectionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
