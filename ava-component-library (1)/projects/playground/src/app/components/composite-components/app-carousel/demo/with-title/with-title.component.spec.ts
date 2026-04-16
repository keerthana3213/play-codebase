import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithTitleComponent } from './with-title.component';

describe('WithTitleComponent', () => {
  let component: WithTitleComponent;
  let fixture: ComponentFixture<WithTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
