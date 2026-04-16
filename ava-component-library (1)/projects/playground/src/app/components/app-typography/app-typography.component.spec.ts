import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTypographyComponent } from './app-typography.component';

describe('AppTypographyComponent', () => {
  let component: AppTypographyComponent;
  let fixture: ComponentFixture<AppTypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTypographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
