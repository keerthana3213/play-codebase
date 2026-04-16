import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaCardContentComponent } from './aava-card-content.component';

describe('CardContentComponent', () => {
  let component: AavaCardContentComponent;
  let fixture: ComponentFixture<AavaCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCardContentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
