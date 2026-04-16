import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaConfettiComponent } from './aava-confetti.component';

describe('AavaConfettiComponent', () => {
  let component: AavaConfettiComponent;
  let fixture: ComponentFixture<AavaConfettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaConfettiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AavaConfettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
