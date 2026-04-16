import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaFooterCentreComponent } from './aava-footer-centre.component';

describe('FooterCentreComponent', () => {
  let component: AavaFooterCentreComponent;
  let fixture: ComponentFixture<AavaFooterCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaFooterCentreComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaFooterCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
