import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSearchfieldsComponent } from './app-searchfields.component';

describe('AppSearchfieldsComponent', () => {
  let component: AppSearchfieldsComponent;
  let fixture: ComponentFixture<AppSearchfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSearchfieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSearchfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
