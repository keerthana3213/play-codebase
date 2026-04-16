import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaCardHeaderComponent } from './aava-card-header.component';

describe('CardHeaderComponent', () => {
  let component: AavaCardHeaderComponent;
  let fixture: ComponentFixture<AavaCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCardHeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
