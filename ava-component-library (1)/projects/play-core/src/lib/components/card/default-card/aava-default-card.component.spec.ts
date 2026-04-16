import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaDefaultCardComponent } from './aava-default-card.component';

describe('DefaultCardComponent', () => {
  let component: AavaDefaultCardComponent;
  let fixture: ComponentFixture<AavaDefaultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaDefaultCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaDefaultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
