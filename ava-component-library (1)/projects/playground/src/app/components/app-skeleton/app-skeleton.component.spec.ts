import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSkeletonComponent } from './app-skeleton.component';

describe('AppSkeletonComponent', () => {
  let component: AppSkeletonComponent;
  let fixture: ComponentFixture<AppSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
