import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppActionlinksComponent } from './app-actionlinks.component';

describe('AppActionlinksComponent', () => {
  let component: AppActionlinksComponent;
  let fixture: ComponentFixture<AppActionlinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppActionlinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppActionlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
