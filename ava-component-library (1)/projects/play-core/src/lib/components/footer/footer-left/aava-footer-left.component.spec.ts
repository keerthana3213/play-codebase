import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaFooterLeftComponent } from '@aava/play-core';

describe('FooterLeftComponent', () => {
  let component: AavaFooterLeftComponent;
  let fixture: ComponentFixture<AavaFooterLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaFooterLeftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaFooterLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
