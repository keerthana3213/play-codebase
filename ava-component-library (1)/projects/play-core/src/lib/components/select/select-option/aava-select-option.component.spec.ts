import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaSelectOptionComponent } from './aava-select-option.component';

describe('SelectOptionComponent', () => {
  let component: AavaSelectOptionComponent;
  let fixture: ComponentFixture<AavaSelectOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaSelectOptionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AavaSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
