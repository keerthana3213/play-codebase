import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProgressbarComponent } from './app-progressbar.component';

describe('AppProgressbarComponent', () => {
  let component: AppProgressbarComponent;
  let fixture: ComponentFixture<AppProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProgressbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
