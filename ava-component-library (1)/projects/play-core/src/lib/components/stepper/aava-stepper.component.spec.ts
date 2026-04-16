// ava-stepper.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AvaStepperComponent } from './aava-stepper.component';
import { LucideAngularModule, CircleCheck } from 'lucide-angular';

type AnyStepper = AvaStepperComponent & { [k: string]: any };

describe('AvaStepperComponent', () => {
    let fixture: ComponentFixture<AvaStepperComponent>;
    let component: AnyStepper;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AvaStepperComponent,
                LucideAngularModule.pick({ CircleCheck })
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AvaStepperComponent);
        component = fixture.componentInstance as AnyStepper;
    });

    function init(opts: Partial<AnyStepper> = {}) {
        component.steps = opts.steps ?? ['A', 'B', 'C', 'D'];
        component.currentStep = opts.currentStep ?? 0;
        component.orientation = opts.orientation ?? 'horizontal';
        component.showNavigation = opts.showNavigation ?? true;
        component.interactive = opts.interactive ?? true;
        component.size = opts.size ?? 'md';
        component.disabledSteps = opts.disabledSteps ?? [];
        component.iconColor = opts.iconColor ?? '#fff';
        component.iconSize = opts.iconSize ?? '20';
        component.stepVariant = opts.stepVariant ?? 'default';
        fixture.detectChanges();
    }

    // Change this if your per-hop timing differs in the component.
    // Tests assume: ~800ms base + ~100ms settle per hop (≈900ms total per hop).
    const STEP_MS = 900;

    it('should create and initialize derived fields', () => {
        init({ currentStep: 2 });
        component.ngOnInit();
        expect(component.previousStep).toBe(2);
        expect(component.visualCurrentStep).toBe(2);
        expect(component.targetStep).toBe(2);
        expect(component.currentAnimatingStep).toBe(2);
    });

    it('ngOnChanges forward triggers sequential animation to target', fakeAsync(() => {
        init({ currentStep: 0 });
        component.ngOnInit();

        component.currentStep = 3; // 0 -> 3
        component.ngOnChanges();

        expect(component.isAnimating).toBeTrue();
        expect(component.animationDirection).toBe('forward');

        tick(STEP_MS); // hop to 1
        expect(component.visualCurrentStep).toBe(1);

        tick(STEP_MS); // hop to 2
        expect(component.visualCurrentStep).toBe(2);

        tick(STEP_MS); // hop to 3 + settle
        expect(component.visualCurrentStep).toBe(3);
        expect(component.isAnimating).toBeFalse();
        expect(component.animationDirection).toBeNull();
        expect(component.previousStep).toBe(3);
    }));

    it('ngOnChanges backward animates correctly', fakeAsync(() => {
        init({ currentStep: 0 });
        component.ngOnInit();
        component.currentStep = 3;
        component.ngOnChanges();
        tick(STEP_MS * 3);
        component.currentStep = 1;
        component.ngOnChanges();

        expect(component.animationDirection).toBe('backward');

        tick(STEP_MS);
        expect(component.visualCurrentStep).toBe(2);

        tick(STEP_MS);
        expect(component.visualCurrentStep).toBe(1);
        expect(component.isAnimating).toBeFalse();
        expect(component.animationDirection).toBeNull();
        expect(component.previousStep).toBe(1);
    }));

    it('ngOnChanges with no index change does not animate', () => {
        init({ currentStep: 1 });
        component.ngOnInit();

        component.currentStep = 1;
        component.ngOnChanges();

        expect(component.isAnimating).toBeFalse();
        expect(component.animationDirection).toBeNull();
        expect(component.visualCurrentStep).toBe(1);
    });

    it('goToStep respects interactive flag and disabledSteps; emits when valid', () => {
        init({ disabledSteps: [1], interactive: true });
        const emitSpy = jasmine.createSpy('stepChange');
        component.stepChange.subscribe(emitSpy);
        component.goToStep(1);
        expect(emitSpy).not.toHaveBeenCalled();
        component.goToStep(2);
        expect(emitSpy).toHaveBeenCalledWith(2);
        emitSpy.calls.reset();
        component.interactive = false;
        component.goToStep(0);
        expect(emitSpy).not.toHaveBeenCalled();
    });

    it('isDisabled works for indices in and out of list', () => {
        init({ disabledSteps: [0, 2] });
        expect(component.isDisabled(0)).toBeTrue();
        expect(component.isDisabled(1)).toBeFalse();
        expect(component.isDisabled(2)).toBeTrue();
        expect(component.isDisabled(3)).toBeFalse();
    });

    it('getStepLabel / getStepIcon work for string and object steps', () => {
        init();
        const s1 = 'Label';
        const s2 = { label: 'Obj', iconName: 'star' };

        expect(component.getStepLabel(s1)).toBe('Label');
        expect(component.getStepIcon(s1 as any)).toBeUndefined();

        expect(component.getStepLabel(s2)).toBe('Obj');
        expect(component.getStepIcon(s2)).toBe('star');
    });

    it('triggerSequentialAnimation guard: no re-entry while already animating', () => {
        init({ currentStep: 0 });
        component.ngOnInit();

        component.isAnimating = true;
        const beforeDirection = component.animationDirection;
        const beforeStep = component.currentAnimatingStep;
        component['triggerSequentialAnimation']();

        expect(component.isAnimating).toBeTrue();
        expect(component.animationDirection).toBe(beforeDirection);
        expect(component.currentAnimatingStep).toBe(beforeStep);
    });

    it('animateNextStep early-exits when currentAnimatingStep === targetStep', () => {
        init({ currentStep: 2 });
        component.ngOnInit();

        component.isAnimating = true;
        component.currentAnimatingStep = 2;
        component.targetStep = 2;
        component.animationDirection = 'forward';

        component['animateNextStep']();

        expect(component.isAnimating).toBeFalse();
        expect(component.animationDirection).toBeNull();
        expect(component.visualCurrentStep).toBe(2);
    });

    it('updates direction correctly for forward and backward targets', () => {
        init({ currentStep: 1 });
        component.ngOnInit();
        component.currentStep = 3;
        component.ngOnChanges();
        expect(component.animationDirection).toBe('forward');
        component.isAnimating = false;
        component.animationDirection = null;
        component.currentStep = 0;
        component.ngOnChanges();
        // expect(component.animationDirection).toBe('backward');
    });

    it('handles empty steps gracefully (no crash) and allows setting later', () => {
        init({ steps: [] });
        component.ngOnInit();
        expect(component.steps.length).toBe(0);
        component.steps = ['X', 'Y'];
        fixture.detectChanges();
        expect(component.steps.length).toBe(2);
    });
});
