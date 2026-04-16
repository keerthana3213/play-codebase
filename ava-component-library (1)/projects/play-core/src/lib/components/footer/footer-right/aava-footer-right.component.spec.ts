import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaFooterRightComponent } from '@aava/play-core';

describe('FooterRightComponent', () => {
  let component: AavaFooterRightComponent;
  let fixture: ComponentFixture<AavaFooterRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaFooterRightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaFooterRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
