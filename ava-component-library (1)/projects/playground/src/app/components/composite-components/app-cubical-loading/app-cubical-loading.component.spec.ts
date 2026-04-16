import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCubicalLoadingComponent } from './app-cubical-loading.component';

describe('AppCubicalLoadingComponent', () => {
  let component: AppCubicalLoadingComponent;
  let fixture: ComponentFixture<AppCubicalLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCubicalLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCubicalLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
