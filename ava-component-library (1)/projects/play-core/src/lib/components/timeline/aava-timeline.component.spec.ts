import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaTimelineComponent } from '@aava/play-core';

// import { Timeline } from './aava-timeline.component';

describe('TimelineComponent', () => {
  let component: AavaTimelineComponent;
  let fixture: ComponentFixture<AavaTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
