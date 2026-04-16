import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleCardsComponent } from './console-cards.component';

describe('ConsoleCardsComponent', () => {
  let component: ConsoleCardsComponent;
  let fixture: ComponentFixture<ConsoleCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsoleCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
