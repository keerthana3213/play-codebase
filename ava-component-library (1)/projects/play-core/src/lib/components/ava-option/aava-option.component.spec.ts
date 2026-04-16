import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaOptionComponent } from './aava-option.component';

describe('AvaOptionComponent', () => {
  let component: AavaOptionComponent;
  let fixture: ComponentFixture<AavaOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaOptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
