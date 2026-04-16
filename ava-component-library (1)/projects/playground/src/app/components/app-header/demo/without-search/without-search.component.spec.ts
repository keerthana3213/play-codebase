import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutSearchComponent } from './without-search.component';

describe('WithoutSearchComponent', () => {
  let component: WithoutSearchComponent;
  let fixture: ComponentFixture<WithoutSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
