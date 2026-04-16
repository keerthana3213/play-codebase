import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSpinnersComponent } from './app-spinners.component';

describe('AppSpinnersComponent', () => {
  let component: AppSpinnersComponent;
  let fixture: ComponentFixture<AppSpinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSpinnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSpinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
