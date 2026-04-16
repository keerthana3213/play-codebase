import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaFooterComponent } from './aava-footer.component';

describe('FooterComponent', () => {
  let component: AavaFooterComponent;
  let fixture: ComponentFixture<AavaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaFooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
