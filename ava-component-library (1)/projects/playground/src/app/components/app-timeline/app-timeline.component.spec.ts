import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTimelineComponent } from './app-timeline.component';

describe('AppTimelineComponent', () => {
  let component: AppTimelineComponent;
  let fixture: ComponentFixture<AppTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
