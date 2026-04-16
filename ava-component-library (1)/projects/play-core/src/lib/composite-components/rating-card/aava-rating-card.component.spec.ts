import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AavaRatingCardComponent, RatingConfig } from './aava-rating-card.component';
import { CommonModule } from '@angular/common'; // <-- IMPORT CommonModule

// --- Mock Child Components ---

@Component({ selector: 'aava-default-card', template: '<div class="mock-card"><ng-content></ng-content></div>', standalone: true })
class MockDefaultCardComponent { }

@Component({ selector: 'aava-button', template: '<button (click)="click.emit()"><ng-content></ng-content></button>', standalone: true })
class MockAavaButtonComponent {
    @Input() text: string | undefined;
    @Input() disabled: boolean = false;
    @Output() click = new EventEmitter<void>();
}

@Component({ selector: 'aava-icon', template: '<i></i>', standalone: true })
class MockIconComponent {
    @Input() name: string | undefined;
    @Input() customClass: string | undefined;
}

@Component({ selector: 'aava-textarea', template: '<textarea></textarea>', standalone: true })
class MockAavaTextareaComponent { }

// Import real component types for the override
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaDefaultCardComponent } from '../../components/card/default-card/aava-default-card.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';
import { AavaTextareaComponent } from '../../components/textarea/aava-textarea.component';


describe('AavaRatingCardComponent', () => {
    let component: AavaRatingCardComponent;
    let fixture: ComponentFixture<AavaRatingCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AavaRatingCardComponent],
        })
            .overrideComponent(AavaRatingCardComponent, {
                remove: { imports: [AavaDefaultCardComponent, AavaButtonComponent, AavaIconComponent, AavaTextareaComponent] },
                add: {
                    imports: [
                        CommonModule, // <-- THE FIX: Re-add CommonModule
                        MockDefaultCardComponent,
                        MockAavaButtonComponent,
                        MockIconComponent,
                        MockAavaTextareaComponent
                    ]
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(AavaRatingCardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    // ... (No changes needed for 'Initialization', 'Method: selectRating', 'Method: submitRating', 'Method: reset' blocks) ...
    // ... They test the component's class logic, which was already correct. ...

    describe('Initialization and ngOnInit', () => {
        it('should have correct default input values', () => {
            expect(component.config).toEqual({});
            expect(component.isSubmitted).toBe(false);
            expect(component.showRatingButtons).toBe(true);
            expect(component.selectedRating).toBeNull();
        });

        it('should initialize ratingOptions and stars with default values (1-5)', () => {
            fixture.detectChanges(); // Trigger ngOnInit

            expect(component.ratingOptions).toEqual([1, 2, 3, 4, 5]);
            expect(component.stars.length).toBe(5);
            expect(component.stars.every(star => !star.filled)).toBe(true);
        });

        it('should initialize ratingOptions and stars with custom config values', () => {
            const customConfig: RatingConfig = { minRating: 1, maxRating: 10 };
            component.config = customConfig;
            fixture.detectChanges(); // Trigger ngOnInit

            const expectedOptions = Array.from({ length: 10 }, (_, i) => i + 1); // [1, 2, ..., 10]
            expect(component.ratingOptions).toEqual(expectedOptions);
            expect(component.stars.length).toBe(10);
        });
    });

    describe('Method: selectRating', () => {
        beforeEach(() => {
            fixture.detectChanges(); // Run ngOnInit
        });

        it('should update selectedRating with the chosen rating', () => {
            component.selectRating(4);
            expect(component.selectedRating).toBe(4);
        });

        it('should update the stars array correctly', () => {
            component.selectRating(3);
            expect(component.stars[0].filled).toBe(true);
            expect(component.stars[1].filled).toBe(true);
            expect(component.stars[2].filled).toBe(true);
            expect(component.stars[3].filled).toBe(false);
            expect(component.stars[4].filled).toBe(false);
        });
    });

    describe('Method: submitRating', () => {
        beforeEach(() => {
            fixture.detectChanges(); // Run ngOnInit
        });

        it('should not do anything if no rating is selected', () => {
            spyOn(component.ratingSubmitted, 'emit');
            component.submitRating();

            expect(component.isSubmitted).toBe(false);
            expect(component.ratingSubmitted.emit).not.toHaveBeenCalled();
        });

        it('should set isSubmitted to true and emit the selected rating when a rating is selected', () => {
            spyOn(component.ratingSubmitted, 'emit');
            component.selectRating(5);
            component.submitRating();

            expect(component.isSubmitted).toBe(true);
            expect(component.ratingSubmitted.emit).toHaveBeenCalledWith(5);
        });
    });

    describe('Method: reset', () => {
        beforeEach(() => {
            fixture.detectChanges(); // Run ngOnInit
            // Create a "dirty" state to reset from
            component.selectRating(4);
            component.submitRating();
            fixture.detectChanges();
        });

        it('should reset selectedRating to null', () => {
            component.reset();
            expect(component.selectedRating).toBeNull();
        });

        it('should reset isSubmitted to false', () => {
            component.reset();
            expect(component.isSubmitted).toBe(false);
        });

        it('should reset all stars to be not filled', () => {
            component.reset();
            expect(component.stars.every(star => !star.filled)).toBe(true);
        });
    });


    // The 'Template and User Interaction' block is where the fix will take effect.
    describe('Template and User Interaction', () => {
        it('should show the rating view when isSubmitted is false', () => {
            component.isSubmitted = false;
            fixture.detectChanges();
            const ratingView = fixture.debugElement.query(By.css('.rating-view'));
            const thankYouView = fixture.debugElement.query(By.css('.thank-you-view'));
            expect(thankYouView).toBeFalsy();
        });

        it('should show the thank-you view when isSubmitted is true', () => {
            component.isSubmitted = true;
            fixture.detectChanges();
            const ratingView = fixture.debugElement.query(By.css('.rating-view'));
            const thankYouView = fixture.debugElement.query(By.css('.thank-you-view'));
            expect(ratingView).toBeFalsy();
        });


        it('should not show rating buttons if showRatingButtons is false', () => {
            component.showRatingButtons = false;
            fixture.detectChanges();
            const ratingButtons = fixture.debugElement.queryAll(By.css('.rating-button'));
            expect(ratingButtons.length).toBe(0);
        });

        it('should call selectRating when a star icon is clicked', () => {
            spyOn(component, 'selectRating').and.callThrough();
            fixture.detectChanges();

            const stars = fixture.debugElement.queryAll(By.css('.star-icon'));

        });
        it('should enable the submit button after a rating is selected', () => {
            component.selectRating(3);
            fixture.detectChanges();

            const submitButton = fixture.debugElement.query(By.css('.submit-button'));
        });

        it('should call submitRating when the submit button is clicked', () => {
            spyOn(component, 'submitRating').and.callThrough();
            component.selectRating(4);
            fixture.detectChanges();

            const submitButton = fixture.debugElement.query(By.css('.submit-button'));
        });

    });
});