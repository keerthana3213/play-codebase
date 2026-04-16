import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInlinetextelementsComponent } from './app-inlinetextelements.component';

describe('AppInlinetextelementsComponent', () => {
  let component: AppInlinetextelementsComponent;
  let fixture: ComponentFixture<AppInlinetextelementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInlinetextelementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInlinetextelementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
