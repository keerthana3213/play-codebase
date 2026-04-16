import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppPopoverComponent } from './app-popover.component';
import { AavaPopoverDirective } from '../../../../../@aava/play-core/src/lib/directives/aava-popover.directive';
import { AavaButtonComponent } from '../../../../../@aava/play-core/src/lib/components/button/aava-button.component';
import { AavaIconComponent } from '../../../../../@aava/play-core/src/lib/components/icon/aava-icon.component';
import { AavaPopOverComponent } from '../../../../../@aava/play-core/src/lib/components/pop-over/aava-pop-over.component';

describe('AppPopoverComponent', () => {
  let component: AppPopoverComponent;
  let fixture: ComponentFixture<AppPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppPopoverComponent,
        AavaPopoverDirective,
        AavaButtonComponent,
        AavaIconComponent,
        AavaPopOverComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sample popover data', () => {
    expect(component.samplePopoverData).toBeDefined();
    expect(component.samplePopoverData.length).toBe(3);
    expect(component.samplePopoverData[0].header).toBe('Welcome to Our Platform');
  });

  it('should have multi-step data', () => {
    expect(component.multiStepData).toBeDefined();
    expect(component.multiStepData.length).toBe(4);
    expect(component.multiStepData[0].header).toBe('Step 1: Setup');
  });

  it('should have single step data', () => {
    expect(component.singleStepData).toBeDefined();
    expect(component.singleStepData.length).toBe(1);
    expect(component.singleStepData[0].header).toBe('Quick Tip');
  });

  it('should have tour data', () => {
    expect(component.tourData).toBeDefined();
    expect(component.tourData.length).toBe(5);
    expect(component.tourData[0].header).toBe('Dashboard Overview');
  });

  it('should render demo sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Pop-over Component Demo');
    expect(compiled.querySelector('h2')?.textContent).toContain('Basic Pop-over Examples');
  });

  it('should render buttons with popover directives', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('ava-button[avaPopover]');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should render icon with popover directive', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('ava-icon[avaPopover]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should render div and span elements with popover directives', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const divs = compiled.querySelectorAll('div[avaPopover]');
    const spans = compiled.querySelectorAll('span[avaPopover]');
    expect(divs.length).toBeGreaterThan(0);
    expect(spans.length).toBeGreaterThan(0);
  });
});
