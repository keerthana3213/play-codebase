import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialsComponent } from './initials.component';

describe('InitialsComponent', () => {
  let component: InitialsComponent;
  let fixture: ComponentFixture<InitialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
