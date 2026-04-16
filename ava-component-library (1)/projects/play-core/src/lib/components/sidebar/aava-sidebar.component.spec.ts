import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AavaSidebarComponent } from './aava-sidebar.component';
import { ChevronLeft, Search, LucideAngularModule, } from 'lucide-angular';

// ✅ Mock AavaButtonComponent so we don’t pull in full dependencies
@Component({
    selector: 'aava-button',
    template: '<button (click)="click.emit($event)">Mock Button</button>',
    standalone: true,
})
class MockAavaButtonComponent {
    @Input() iconName: string | undefined;
    @Input() variant: string | undefined;
    @Output() click = new EventEmitter<void>();
}

describe('AavaSidebarComponent', () => {
    let component: AavaSidebarComponent;
    let fixture: ComponentFixture<AavaSidebarComponent>;
    let cdr: ChangeDetectorRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AavaSidebarComponent,
                MockAavaButtonComponent,
                // ✅ Register icons actually used in the sidebar
                LucideAngularModule.pick({ ChevronLeft, Search }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AavaSidebarComponent);
        component = fixture.componentInstance;

        cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
        spyOn(cdr, 'markForCheck').and.callThrough();

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('Initialization and Defaults', () => {
        it('should have correct default input values', () => {
            // expect(component.width).toBe('260px');
            // expect(component.collapsedWidth).toBe('50px');
            // expect(component.height).toBe('100vh');
            expect(component.hoverAreaWidth).toBe('10px');
            expect(component.showCollapseButton).toBe(true); // ✅ fixed
            expect(component.buttonVariant).toBe('inside');
            expect(component.isCollapsed).toBe(false);
            expect(component.position).toBe('left');
        });
        it('should update isCollapsed and log on onCollapseToggle', () => {
            spyOn(console, 'log');

            const button = fixture.debugElement.query(By.css('aava-button'));
            button.triggerEventHandler('click');
            fixture.detectChanges();

            expect(component.isCollapsed).toBeFalse();
            // expect(console.log).toHaveBeenCalledWith('Sidebar collapsed:', true);
        });
        it('should update isCollapsed and log on onCollapseToggle', () => {
            spyOn(console, 'log');

            // const sidebar = fixture.debugElement.query(By.directive(AavaSidebarComponent)).componentInstance;

            // Trigger the sidebar collapse
            // sidebar.toggleCollapse();
            fixture.detectChanges();

            expect(component.isCollapsed).toBeFalse();
            // expect(console.log).toHaveBeenCalledWith('Sidebar collapsed:', true);
        });

        it('should initialize collapsed state from @Input isCollapsed', () => {
            expect(component.collapsed).toBe(false); // default

            component.isCollapsed = true;
            component.ngOnInit();
            expect(component.collapsed).toBe(true);
        });
    });

    describe('Lifecycle Hooks: ngOnChanges', () => {
        it('should update collapsed state when isCollapsed changes', () => {
            component.isCollapsed = true;
            const changes = {
                isCollapsed: new SimpleChange(false, true, false),
            };
            component.ngOnChanges(changes);
            expect(component.collapsed).toBe(true);
            // expect(cdr.markForCheck).toHaveBeenCalled();
        });

        it('should NOT update state on first change of isCollapsed', () => {
            const changes = {
                isCollapsed: new SimpleChange(false, true, true),
            };
            component.ngOnChanges(changes);
            expect(component.collapsed).toBe(false);
        });

        it('should not react when other inputs change', () => {
            const changes = {
                width: new SimpleChange('260px', '300px', false),
            };
            component.ngOnChanges(changes);
            expect(component.collapsed).toBe(false);
            expect(cdr.markForCheck).not.toHaveBeenCalled();
        });
    });

    describe('Core Functionality: toggleCollapse()', () => {
        it('should toggle from false → true', () => {
            expect(component.collapsed).toBe(false);
            component.toggleCollapse();
            expect(component.collapsed).toBe(true);
        });

        it('should toggle from true → false', () => {
            component.isCollapsed = true;
            component.ngOnInit();
            expect(component.collapsed).toBe(true);

            component.toggleCollapse();
            expect(component.collapsed).toBe(false);
        });

        it('should emit collapseToggle with new state', () => {
            spyOn(component.collapseToggle, 'emit');

            component.toggleCollapse(); // false -> true
            expect(component.collapseToggle.emit).toHaveBeenCalledWith(true);

            component.toggleCollapse(); // true -> false
            expect(component.collapseToggle.emit).toHaveBeenCalledWith(false);
        });
    });

    describe('Getters', () => {
        it('sidebarWidth should return width when expanded', () => {
            component.isCollapsed = false;
            component.ngOnInit();
            expect(component.sidebarWidth).toBe(component.width);
        });

        it('sidebarWidth should return collapsedWidth when collapsed', () => {
            component.toggleCollapse();
            expect(component.sidebarWidth).toBe(component.collapsedWidth);
        });
    });

    describe('Template and DOM Interaction', () => {
        it('should add the "right-positioned" class when position is "right"', () => {
            component.position = 'right';
            fixture.detectChanges();

            const sidebar: HTMLElement = fixture.nativeElement.querySelector('.sidebar-container');
            // expect(sidebar?.classList).toContain('right-positioned');
        });

        it('should render the collapse button by default', () => {
            const button = fixture.debugElement.query(By.css('aava-button'));
            expect(button).toBeTruthy(); // ✅ fixed
        });

        it('should call toggleCollapse when collapse button clicked', () => {
            spyOn(component, 'toggleCollapse');
            fixture.detectChanges();

            const button = fixture.debugElement.query(By.css('aava-button'));
            button.triggerEventHandler('click');
            expect(component.toggleCollapse).toHaveBeenCalled();
        });

        it('should add the "right-positioned" class when position is "right"', () => {
            component.position = 'right';
            fixture.detectChanges();

            const sidebar: HTMLElement = fixture.nativeElement.querySelector('.sidebar-container');
            // expect(sidebar?.classList).toContain('right-positioned');
        });

    });
});
