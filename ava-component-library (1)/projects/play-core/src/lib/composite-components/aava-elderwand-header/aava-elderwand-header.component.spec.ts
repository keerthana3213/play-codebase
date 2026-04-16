import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AavaElderwandHeaderComponent } from './aava-elderwand-header.component';

describe('AavaElderwandHeaderComponent', () => {
  let component: AavaElderwandHeaderComponent;
  let fixture: ComponentFixture<AavaElderwandHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaElderwandHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AavaElderwandHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
