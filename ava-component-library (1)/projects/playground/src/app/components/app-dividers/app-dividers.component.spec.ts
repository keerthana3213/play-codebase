import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDividersComponent } from './app-dividers.component';

describe('AppDividersComponent', () => {
  let component: AppDividersComponent;
  let fixture: ComponentFixture<AppDividersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDividersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDividersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
