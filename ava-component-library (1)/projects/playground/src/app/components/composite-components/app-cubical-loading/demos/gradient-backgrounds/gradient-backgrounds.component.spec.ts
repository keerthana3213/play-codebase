import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientBackgroundsComponent } from './gradient-backgrounds.component';

describe('GradientBackgroundsComponent', () => {
  let component: GradientBackgroundsComponent;
  let fixture: ComponentFixture<GradientBackgroundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientBackgroundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientBackgroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
