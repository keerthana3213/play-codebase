import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesDemoComponent } from './sizes-demo.component';

describe('SizesDemoComponent', () => {
  let component: SizesDemoComponent;
  let fixture: ComponentFixture<SizesDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizesDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
