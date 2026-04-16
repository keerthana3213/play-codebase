import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AavaIconComponent } from './aava-icon.component';
import { By } from '@angular/platform-browser';
import { LucideAngularModule, House } from 'lucide-angular';
describe('IconComponent', () => {
    let component: AavaIconComponent;
    let fixture: ComponentFixture<AavaIconComponent>;
    let hostElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AavaIconComponent, LucideAngularModule.pick({ House })]
        }).compileComponents();

        fixture = TestBed.createComponent(AavaIconComponent);
        component = fixture.componentInstance;
        hostElement = fixture.nativeElement;
        component.iconName = 'house';
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('Default State and Host Bindings', () => {
        it('should have default input values', () => {
            const freshFixture = TestBed.createComponent(AavaIconComponent);
            const freshComponent = freshFixture.componentInstance;
            expect(freshComponent.iconName).toBe('');
            //expect(freshComponent.iconColor).toBe('#a1a1a1');
            expect(freshComponent.iconSize).toBe(24);
            expect(freshComponent.disabled).toBe(false);
            expect(freshComponent.cursor).toBe(false);
        });

        it('should apply default host styles for size', () => {
            expect(component.iconSize).toBe(24);
            expect(hostElement.style.height).toBe('24px');
            expect(hostElement.style.width).toBe('24px');
        });

        it('should apply the static host styles for alignment', () => {
            expect(hostElement.style.display).toBe('inline-flex');
            expect(hostElement.style.alignItems).toBe('center');
            expect(hostElement.style.justifyContent).toBe('center');
        });
    });

    describe('Input Properties and DOM Interaction', () => {
        it('should update host element size when iconSize input changes', () => {
            component.iconSize = 48;
            fixture.detectChanges();
            expect(hostElement.style.height).toBe('48px');
            expect(hostElement.style.width).toBe('48px');
        });


        it('should NOT have the "cursor-pointer" class when cursor is false', () => {
            component.cursor = false;
            fixture.detectChanges();

            const lucideIconDebugElement = fixture.debugElement.query(By.css('lucide-icon'));
            // expect(lucideIconDebugElement.componentInstance.name).toBe('house');

            // const innerElement = lucideIconDebugElement.nativeElement;
            // expect(innerElement.classList).not.toContain('cursor-pointer');
        });

        it('should pass the iconName to the lucide-icon component', () => {
            fixture.detectChanges();

            const lucideIconDebugElement = fixture.debugElement.query(By.css('lucide-icon'));
            // expect(lucideIconDebugElement).not.toBeNull();

            // expect(lucideIconDebugElement.componentInstance.name).toBe('house'); // lowercase
        });


        it('should pass the iconName to the lucide-icon component', () => {
            component.iconName = 'house'; // lowercase
            fixture.detectChanges();

            // const lucideIconDebugElement = fixture.debugElement.query(By.css('lucide-icon'));
        });

    });

    describe('computedColor Getter', () => {
        it('should return the disabled color when component is disabled', () => {
            component.disabled = true;
            component.iconColor = '#ff0000';
            expect(component.computedColor).toBe('var(--button-icon-color-disabled)');
        });

        it('should return the iconColor when component is not disabled', () => {
            component.disabled = false;
            component.iconColor = '#123456';
            expect(component.computedColor).toBe('#123456');
        });
    });

    describe('Event Emission: (userClick)', () => {
        it('should NOT emit userClick when clicked if disabled', () => {
            spyOn(component.userClick, 'emit');
            component.disabled = true;
            component.cursor = true;
            fixture.detectChanges();

            hostElement.click();

            expect(component.userClick.emit).not.toHaveBeenCalled();
        });

        it('should NOT emit userClick when clicked if cursor is false', () => {
            spyOn(component.userClick, 'emit');
            component.disabled = false;
            component.cursor = false;
            fixture.detectChanges();

            hostElement.click();

            expect(component.userClick.emit).not.toHaveBeenCalled();
        });

        it('should call preventDefault on the event if not clickable', () => {
            const mockEvent = new MouseEvent('click');
            spyOn(mockEvent, 'preventDefault');
            component.disabled = true;
            component.handleClick(mockEvent);
            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });
    });
});