import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAvatarsComponent } from './app-avatars.component';

describe('AppAvatarsComponent', () => {
  let component: AppAvatarsComponent;
  let fixture: ComponentFixture<AppAvatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAvatarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
