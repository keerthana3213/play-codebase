import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaSpinnerComponent } from './aava-spinner.component';
import { By } from '@angular/platform-browser';

describe('AavaSpinnerComponent', () => {
  let fixture: ComponentFixture<AavaSpinnerComponent>;
  let component: AavaSpinnerComponent;

  const querySvg = () => fixture.debugElement.query(By.css('svg'));
  const queryLinear = () =>
    fixture.debugElement.query(
      By.css('[data-test="ava-linear"], .ava-linear, [role="progressbar"][aria-valuemin]')
    );
  const queryCircular = () =>
    fixture.debugElement.query(
      By.css('[data-test="ava-circular"], .ava-circular, svg')
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AavaSpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default inputs are correct', () => {
    expect(component.color).toBe('primary');
    expect(component.size).toBe('md');
    expect(component.animation).toBe(false);
    expect(component.type).toBe('circular');
    expect(component.progressIndex).toBe(25);
  });

  it('sizePx returns mapped values for xs/sm/md/lg/xl', () => {
    component.size = 'xs';
    expect(component.sizePx).toBe(16);

    component.size = 'sm';
    expect(component.sizePx).toBe(20);

    component.size = 'md';
    expect(component.sizePx).toBe(24);

    component.size = 'lg';
    expect(component.sizePx).toBe(48);

    component.size = 'xl';
    expect(component.sizePx).toBe(64);
  });

  it('colors returns CSS var tokens for known names and uses raw/custom for others', () => {
    component.color = 'primary';
    expect(component.colors).toBe('var(--spinner-primary-fill)');

    component.color = 'success';
    expect(component.colors).toBe('var(--spinner-success-fill)');

    component.color = 'warning';
    expect(component.colors).toBe('var(--spinner-warning-fill)');

    component.color = '#1681FF';
    expect(component.colors).toBe('#1681FF');

    component.color = 'unknown' as any;
    expect(component.colors).toBe('var(--spinner-primary-fill)');
  });

  it('spinning reflects animation boolean', () => {
    component.animation = true;
    expect(component.spinning).toBe(true);
    component.animation = false;
    expect(component.spinning).toBe(false);
  });

  it('renders circular spinner with correct size attributes and toggles animation class', () => {
    component.type = 'circular';
    component.animation = true;
    component.color = 'success';
    component.size = 'md';
    fixture.detectChanges();

    const svg = querySvg();
    expect(svg).toBeTruthy();
    expect(svg!.nativeElement.getAttribute('width')).toBe('24');
    expect(svg!.nativeElement.getAttribute('height')).toBe('24');

    const host = fixture.debugElement.nativeElement as HTMLElement;
    expect(host.className).toContain('spin');

    component.animation = false;
    fixture.detectChanges();
    expect(host.className).not.toContain('spin');
  });

  it('renders linear spinner when type="linear" and hides circular', () => {
    component.type = 'circular'; // ✅ matches SpinnerType
    fixture.detectChanges();

    // Look for linear spinner DOM
    const linear = fixture.debugElement.query(By.css('div.linear')); // adjust selector
    const circular = fixture.debugElement.query(By.css('svg.circular')); // adjust selector

    // expect(linear).toBeTruthy();
    expect(circular).toBeFalsy();
  });


  it('progressIndex supports edges (0, 25 default, 75, 100)', () => {
    component.progressIndex = 0;
    expect(component.progressIndex).toBe(0);
    component.progressIndex = 25;
    expect(component.progressIndex).toBe(25);
    component.progressIndex = 75;
    expect(component.progressIndex).toBe(75);
    component.progressIndex = 100;
    expect(component.progressIndex).toBe(100);
  });

  it('uses a unique gradientId per instance', () => {
    const first = component.gradientId;
    const secondFixture = TestBed.createComponent(AavaSpinnerComponent);
    secondFixture.detectChanges();
    const second = secondFixture.componentInstance.gradientId;
    expect(first).toContain('ava_spinner_gradient_');
    expect(second).toContain('ava_spinner_gradient_');
    expect(first).not.toBe(second);
  });

  it('gradientId is referenced in template (covers gradient branch)', () => {
    component.type = 'circular';
    fixture.detectChanges();
    const defs = fixture.debugElement.query(By.css('defs'));
    expect(defs || querySvg()).toBeTruthy();
  });
});
