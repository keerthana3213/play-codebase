import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBadgesComponent } from './app-badges.component';

describe('AppBadgesComponent', () => {
  let component: AppBadgesComponent;
  let fixture: ComponentFixture<AppBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBadgesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
