import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaCardFooterComponent } from './aava-card-footer.component';

describe('CardFooterComponent', () => {
  let component: AavaCardFooterComponent;
  let fixture: ComponentFixture<AavaCardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaCardFooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
