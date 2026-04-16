import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesDemoComponent } from './states-demo.component';

describe('StatesDemoComponent', () => {
  let component: StatesDemoComponent;
  let fixture: ComponentFixture<StatesDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
