import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutNavigationComponent } from './without-navigation.component';

describe('WithoutNavigationComponent', () => {
  let component: WithoutNavigationComponent;
  let fixture: ComponentFixture<WithoutNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
