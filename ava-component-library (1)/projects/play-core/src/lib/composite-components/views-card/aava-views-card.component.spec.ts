import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaViewsCardComponent } from './aava-views-card.component';

describe('ViewsCardComponent', () => {
  let component: AavaViewsCardComponent;
  let fixture: ComponentFixture<AavaViewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaViewsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaViewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default value and label', () => {
    expect(component.value).toBe('750k');
    expect(component.label).toBe('Views');
  });

  it('should have default colors configuration', () => {
    expect(component.colors.outerGradient.start).toBe('#ffffff');
    expect(component.colors.cardGradient.start).toBe('#444444');
    expect(component.colors.dot).toBe('#fff');
  });

  it('should generate correct CSS variables', () => {
    const cssVars = component.cssVariables;
    expect(cssVars['--outer-gradient-start']).toBe('#ffffff');
    expect(cssVars['--card-width']).toBe('300px');
    expect(cssVars['--card-height']).toBe('250px');
  });
});
