import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExperienceHistoryCardsComponent } from './app-experience-history-cards.component';

describe('AppExperienceHistoryCardsComponent', () => {
  let component: AppExperienceHistoryCardsComponent;
  let fixture: ComponentFixture<AppExperienceHistoryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExperienceHistoryCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppExperienceHistoryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
