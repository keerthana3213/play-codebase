
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRadiobuttonComponent } from './app-radiobutton.component';

describe('AppRadiobuttonComponent', () => {
  let component: AppRadiobuttonComponent;
  let fixture: ComponentFixture<AppRadiobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRadiobuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRadiobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
