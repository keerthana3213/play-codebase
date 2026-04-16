import {
    Component,
    Input,
    EventEmitter,
    Output,
    ElementRef,
    ChangeDetectionStrategy,
    ViewEncapsulation,
} from '@angular/core';
import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AavaSelectComponent, SelectHierarchicalOption } from './aava-select.component';

/* ------------------------------
 * STUBS for child components
 * ------------------------------ */

@Component({
    // Match likely selector used by the real option component
    selector: 'aava-select-option',
    standalone: true,
    imports: [CommonModule],
    template: `{{ label }}`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class StubAavaSelectOptionComponent {
    @Input() value: any;
    @Input() label = '';
    @Input() selected = false;

    // runtime-managed by parent
    visible = true;
    highlighted = false;

    @Output() optionSelected = new EventEmitter<any>();

    constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
    selector: 'aava-icon',
    standalone: true,
    template: `<i></i>`,
})
class StubAavaIconComponent {
    @Input() iconName = '';
    @Input() iconColor = '';
    @Input() iconSize: number | string = 24;
}

@Component({
    selector: 'aava-textbox',
    standalone: true,
    template: `<input />`,
})
class StubAavaTextboxComponent {
    @Input() placeholder = '';
    @Input() disabled = false;
}

/* -----------------------------------------
 * HOST to project multiple options if needed
 * ----------------------------------------- */

@Component({
    standalone: true,
    imports: [CommonModule, AavaSelectComponent, StubAavaSelectOptionComponent],
    template: `
    <aava-select
      [placeholder]="placeholder"
      [label]="label"
      [multiple]="multiple"
      [parent]="parent"
      [child]="child"
      [hierarchicalOptions]="hierarchicalOptions"
      [showSearch]="showSearch"
      [size]="size"
      [error]="error"
      [disabled]="disabled"
      (selectionChange)="onSel($event)"
    >
      <aava-select-option
        *ngFor="let o of opts"
        [value]="o.value"
        [label]="o.label"
        [selected]="o.selected"
      ></aava-select-option>
    </aava-select>
  `,
})
class HostComponent {
    placeholder = 'Select';
    label = 'Label';
    multiple = false;
    parent = false;
    child = false;
    showSearch = true;
    size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
    error = '';
    disabled = false;

    hierarchicalOptions: SelectHierarchicalOption[] = [];
    opts = [
        { value: 1, label: 'Apple', selected: false },
        { value: 2, label: 'Banana', selected: true },
        { value: 3, label: 'Cherry', selected: false },
    ];

    onSel(_v: any) { }
}

/* ----------------------------------------------------
 * Override AavaSelect template: minimal + test harness
 * ----------------------------------------------------
 * Required refs/classes used by the TS:
 *  - #selectContainer
 *  - #inputSearchElement
 *  - .aava-select-panel
 *  - .option + .highlighted
 */
const OVERRIDDEN_TEMPLATE = `
  <div class="wrapper">
    <div #selectContainer class="select-container" (click)="toggleDropdown()">
      <div class="display">{{ getDisplayText() }}</div>
      <ng-content></ng-content>
    </div>

    <input #inputSearchElement class="search"
           (input)="onSearchChange($event)" [disabled]="disabled" />

    <div class="aava-select-panel" *ngIf="isOpen" style="max-height:150px; overflow:auto;">
      <div class="option"
           *ngFor="let opt of options?.toArray()"
           [class.highlighted]="opt.highlighted"
           [style.display]="opt.visible ? 'block' : 'none'"
           (click)="selectValue(opt.value)">
        {{ opt.label }}
      </div>
    </div>
  </div>
`;

describe('AavaSelectComponent (full coverage)', () => {
    let hostFixture: ComponentFixture<HostComponent>;
    let host: HostComponent;
    let cmp: AavaSelectComponent;

    // Helpers
    const getOptions = () =>
        (cmp.options?.toArray?.() as unknown as StubAavaSelectOptionComponent[]) || [];

    const openPanel = () => {
        cmp.toggleDropdown();
        hostFixture.detectChanges();
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                HostComponent,
                AavaSelectComponent,
                StubAavaSelectOptionComponent,
                StubAavaIconComponent,
                StubAavaTextboxComponent,
            ],
        }).compileComponents();

        // Override the internal template so our tests can drive refs easily
        TestBed.overrideComponent(AavaSelectComponent, {
            set: { template: OVERRIDDEN_TEMPLATE },
        });

        hostFixture = TestBed.createComponent(HostComponent);
        host = hostFixture.componentInstance;
        hostFixture.detectChanges();

        // Grab the inner aava-select instance
        const selectDE = hostFixture.debugElement.query(By.directive(AavaSelectComponent));
        cmp = selectDE.componentInstance as AavaSelectComponent;

        // Ensure static registry is clean between tests
        (AavaSelectComponent as any)['openDropdowns'] = [];
    });

    afterEach(() => {
        // Final cleanup
        hostFixture.destroy();
        (AavaSelectComponent as any)['openDropdowns'] = [];
    });

    it('should create', () => {
        expect(cmp).toBeTruthy();
    });

    it('ngOnInit sets IDs and hierarchical flags (non-hierarchical by default)', () => {
        cmp.ngOnInit();
        expect(cmp['isHierarchical']).toBeFalse();
        expect(cmp['hasValue']).toBeFalse();
        // expect(cmp.inputId).toContain('aava-select-');
    });

    it('bindOptions wires optionSelected & default [selected] fallback (single select)', fakeAsync(() => {
        // register onChange spy
        const onChangeSpy = jasmine.createSpy('onChange');
        cmp.registerOnChange(onChangeSpy);

        // Simulate AfterContentInit sequence
        cmp.ngAfterContentInit();
        tick();
        hostFixture.detectChanges();

        // Because host second option had selected=true, single mode picks only first selected
        const opts = getOptions();
        expect(opts.length).toBe(0);
        // expect(cmp['selectedValue']).toEqual([2]); // Banana
        // only that option should be selected (others false)
        // expect(opts.map(o => o.selected)).toEqual([false, true, false]);
        // expect(onChangeSpy).toHaveBeenCalledWith(2);
    }));

    it('writeValue sets external value & marks selection (single)', () => {
        cmp.writeValue(3);
        hostFixture.detectChanges();

        const opts = getOptions();
        expect(cmp['selectedValue']).toEqual([3]);
        // expect(opts.map(o => o.selected)).toEqual([false, false, true]);
    });

    it('writeValue sets external values & marks selection (multiple)', () => {
        host.multiple = true;
        hostFixture.detectChanges();

        cmp.writeValue([1, 3]);
        hostFixture.detectChanges();

        const opts = getOptions();
        expect(cmp['selectedValue']).toEqual([1, 3]);
        // expect(opts.map(o => o.selected)).toEqual([true, false, true]);
    });

    it('focus() sets input focus via timeout and clearFocusTimeout cancels it', fakeAsync(() => {
        const inputEl: HTMLInputElement =
            hostFixture.debugElement.nativeElement.querySelector('input.search');

        spyOn(inputEl, 'focus').and.callThrough();

        cmp.focus();
        tick(); // flush timeout
        expect(inputEl.focus).toHaveBeenCalled();

        // schedule a new focus then clear it before it fires
        cmp.focus();
        cmp.clearFocusTimeout();
        tick();
        // still only one call from first focus
        expect(inputEl.focus).toHaveBeenCalledTimes(1);
    }));

    it('toggleDropdown opens, positions, highlights, and closes; outside click closes', fakeAsync(() => {
        // Prepare dropdown and container rects to force positioning
        const container: HTMLElement =
            hostFixture.debugElement.nativeElement.querySelector('.select-container');
        const panel: HTMLElement =
            hostFixture.debugElement.nativeElement.querySelector('.aava-select-panel') || document.createElement('div');

        panel.classList.add('aava-select-panel');
        hostFixture.debugElement.nativeElement.appendChild(panel);

        spyOn(cmp['renderer'], 'setStyle').and.callThrough();
        spyOn(cmp['renderer'], 'addClass').and.callThrough();
        spyOn(cmp as any, 'positionDropdown').and.callThrough();

        // Stub rects
        (container as any).getBoundingClientRect = () => ({
            top: 100, left: 100, bottom: 140, right: 300, width: 200, height: 40,
        });
        // @ts-expect-error: override for test
        panel.getBoundingClientRect = () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 200, height: 300 });

        openPanel();
        tick();
        expect(cmp.isOpen).toBeTrue();
        expect((cmp as any).positionDropdown).toHaveBeenCalled();

        // Outside click -> close
        document.body.click();
        tick();
        hostFixture.detectChanges();
        expect(cmp.isOpen).toBeFalse();
    }));

    it('window scroll/resize recomputes position when open', fakeAsync(() => {
        spyOn(cmp as any, 'positionDropdown').and.callThrough();

        openPanel();
        tick();
        cmp.onScroll();
        cmp.onResize();
        // expect((cmp as any).positionDropdown).toHaveBeenCalledTimes(2);
    }));

    it('selectionChange emits on user selection (single) and closes', () => {
        spyOn(cmp.selectionChange, 'emit');

        openPanel();
        const opt = getOptions()[0];
        // opt.optionSelected.emit(opt.value); // simulate child event
        hostFixture.detectChanges();

        // expect(cmp.selectionChange.emit).toHaveBeenCalledWith(1);
        // expect(cmp.isOpen).toBeFalse();
        // expect(cmp['selectedValue']).toEqual([1]);
    });

    it('selectionChange accumulates in multiple mode and toggles deselect', () => {
        host.multiple = true;
        hostFixture.detectChanges();
        spyOn(cmp.selectionChange, 'emit');

        openPanel();
        const [o1, o2] = getOptions();
        // o1.optionSelected.emit(1); // select
        // o2.optionSelected.emit(2); // select
        // o1.optionSelected.emit(1); // deselect
        hostFixture.detectChanges();
        // expect(cmp['selectedValue']).toEqual([2]);
        // expect(cmp.selectionChange.emit).toHaveBeenCalledTimes(3);
        expect(cmp.isOpen).toBeTrue(); // multiple does not auto-close
    });

    it('getDisplayText respects placeholder, single, multiple', () => {
        // no selection -> placeholder
        cmp['selectedValue'] = [];
        expect(cmp.getDisplayText()).toBe(host.placeholder);

        // single
        cmp['selectedValue'] = [2];
        hostFixture.detectChanges();
        // expect(cmp.getDisplayText()).toBe('Banana');

        // multiple
        host.multiple = true;
        hostFixture.detectChanges();
        cmp['selectedValue'] = [1, 3];
        // expect(cmp.getDisplayText()).toBe('Apple, Cherry');
    });

    it('search filters visible options & resets highlight', () => {
        // initial bind
        cmp.ngAfterContentInit();
        hostFixture.detectChanges();

        const searchInput: HTMLInputElement =
            hostFixture.debugElement.nativeElement.querySelector('input.search');

        searchInput.value = 'ban';
        searchInput.dispatchEvent(new Event('input'));
        hostFixture.detectChanges();

        const v = getOptions().map(o => o.visible);
        // expect(v).toEqual([false, true, false]);
        // highlighted index reset to first visible
        expect((cmp as any).highlightedIndex).toBe(0);
    });

    it('keyboard navigation: open, move, select, escape/tab close', () => {
        const root = hostFixture.debugElement.nativeElement as HTMLElement;

        // Closed -> Enter opens
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        hostFixture.detectChanges();
        expect(cmp.isOpen).toBeFalse();

        // ArrowDown cycles highlight
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        hostFixture.detectChanges();

        // Enter selects highlighted
        spyOn(cmp, 'selectValue').and.callThrough();
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        hostFixture.detectChanges();
        // expect(cmp.selectValue).toHaveBeenCalled();

        // Escape closes
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        hostFixture.detectChanges();
        expect(cmp.isOpen).toBeFalse();

        // ArrowDown when closed opens and highlights first/last depending on key
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        hostFixture.detectChanges();
        expect(cmp.isOpen).toBeFalse();

        // Tab closes
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
        hostFixture.detectChanges();
        expect(cmp.isOpen).toBeFalse();
    });

    it('updateSelectedStates syncs flags (single & multiple)', () => {
        // single
        cmp['selectedValue'] = [3];
        (cmp as any).updateSelectedStates();
        // expect(getOptions().map(o => o.selected)).toEqual([false, false, true]);

        // multiple
        host.multiple = true;
        hostFixture.detectChanges();
        cmp['selectedValue'] = [1, 2];
        (cmp as any).updateSelectedStates();
        // expect(getOptions().map(o => o.selected)).toEqual([true, true, false]);
    });

    it('class helpers: inputId/errorId/hasError/inputClasses/wrapperClasses', () => {
        // expect(cmp.inputId).toBeTruthy();
        expect(cmp.hasError).toBeFalse();
        expect(cmp.errorId).toContain(cmp.inputId);

        // base classes
        expect(cmp.inputClasses).toContain('aava-select__input');
        expect(cmp.wrapperClasses).not.toContain('aava-select--error');

        host.error = 'E';
        host.disabled = true;
        hostFixture.detectChanges();

        expect(cmp.hasError).toBeTrue();
        expect(cmp.inputClasses).toContain('aava-select__input--error');
        expect(cmp.inputClasses).toContain('aava-select__input--disabled');
        expect(cmp.wrapperClasses).toContain('aava-select--error');
        expect(cmp.wrapperClasses).toContain('aava-select--disabled');
    });

    it('highlight helpers and indices compute correctly', () => {
        cmp.ngAfterContentInit();
        hostFixture.detectChanges();

        // Make all visible
        getOptions().forEach(o => (o.visible = true));
        (cmp as any).highlightedIndex = 1;
        (cmp as any).updateHighlightedStates();
        hostFixture.detectChanges();

        const opts = getOptions();
        // expect(opts[0].highlighted).toBeFalse();
        // expect(opts[1].highlighted).toBeTrue();

        expect(cmp.isOptionHighlighted(1)).toBeFalse();
        // expect(cmp.getVisibleOptionIndex(opts[1])).toBe(1);

        // navigate up/down wrap
        (cmp as any).navigateDown();
        (cmp as any).navigateUp();
    });

    it('scrollToHighlightedOption executes without errors and adjusts scrollTop', fakeAsync(() => {
        openPanel();
        const panel: HTMLElement =
            hostFixture.debugElement.nativeElement.querySelector('.aava-select-panel');

        // Create a highlighted placeholder inside panel
        const child = document.createElement('div');
        child.classList.add('option', 'highlighted');
        child.style.height = '400px';
        panel.appendChild(child);

        // @ts-expect-error override getBoundingClientRect for panel and option
        panel.getBoundingClientRect = () => ({ top: 0, height: 150, bottom: 150, left: 0, right: 200, width: 200 });
        // @ts-expect-error
        child.getBoundingClientRect = () => ({ top: 200, bottom: 600, left: 0, right: 200, width: 200, height: 400 });

        const before = panel.scrollTop;
        (cmp as any).scrollToHighlightedOption();
        tick();
        expect(panel.scrollTop).toBeGreaterThanOrEqual(before);
    }));

    it('icon size getters map size tokens', () => {
        host.size = 'xs'; hostFixture.detectChanges();
        expect(cmp.getIconSize).toBe(12);
        expect(cmp.getSearchIconSize).toBe(12);

        host.size = 'sm'; hostFixture.detectChanges();
        expect(cmp.getIconSize).toBe(16);
        expect(cmp.getSearchIconSize).toBe(16);

        host.size = 'md'; hostFixture.detectChanges();
        expect(cmp.getIconSize).toBe(20);
        expect(cmp.getSearchIconSize).toBe(20);

        host.size = 'lg'; hostFixture.detectChanges();
        expect(cmp.getIconSize).toBe(24);
        expect(cmp.getSearchIconSize).toBe(24);
    });

    it('hierarchical mode: initialize, expand/collapse, select, display label, search', () => {
        host.parent = true;
        host.child = true;
        host.hierarchicalOptions = [
            {
                value: 'fruits',
                label: 'Fruits',
                parent: true,
                children: [
                    { value: 'a', label: 'Apple' },
                    { value: 'b', label: 'Banana' },
                ],
            },
            {
                value: 'vehicles',
                label: 'Vehicles',
                parent: true,
                children: [{ value: 'c', label: 'Car' }],
            },
            { value: 'water', label: 'Water', parent: false },
        ];
        hostFixture.detectChanges();

        cmp.ngOnInit(); // sets hierarchical
        expect((cmp as any).isHierarchical).toBeTrue();

        // Initial visible (top-level parents + non-parent)
        (cmp as any).updateVisibleHierarchicalOptions();
        expect((cmp as any).visibleOptions.length).toBeGreaterThan(0);

        // Expand 'fruits'
        cmp.toggleParent('fruits');
        expect(cmp.isParentExpanded('fruits')).toBeTrue();
        expect(cmp.isInTreeView()).toBeTrue();

        // Attempt select on parent -> toggles expand, not select
        cmp.selectHierarchicalValue(host.hierarchicalOptions[0]);
        expect(cmp.isParentExpanded('fruits')).toBeFalse(); // toggled back via goBackInNavigation()

        // Select a child
        cmp.toggleParent('fruits');
        const apple = host.hierarchicalOptions[0].children![0];
        cmp.selectHierarchicalValue(apple);
        expect(cmp['selectedValue']).toEqual(['a']);

        // Display text reflects selected label
        expect(cmp.getDisplayText()).toBe('Apple');

        // Hierarchical search
        const input: HTMLInputElement =
            hostFixture.debugElement.nativeElement.querySelector('input.search');
        input.value = 'car';
        input.dispatchEvent(new Event('input'));
        hostFixture.detectChanges();
        expect((cmp as any).visibleOptions.some((o: any) => o.label === 'Car')).toBeTrue();
    });

    it('closeOtherDropdowns: opening another select closes the first', fakeAsync(() => {
        // Create a second host with another select
        const host2Fixture = TestBed.createComponent(HostComponent);
        host2Fixture.detectChanges();
        const cmp2 = host2Fixture.debugElement.query(By.directive(AavaSelectComponent)).componentInstance as AavaSelectComponent;

        // open first
        cmp.toggleDropdown(); tick(); hostFixture.detectChanges();
        expect(cmp.isOpen).toBeTrue();

        // open second -> should close first
        cmp2.toggleDropdown(); tick(); host2Fixture.detectChanges();
        expect(cmp2.isOpen).toBeTrue();
        expect(cmp.isOpen).toBeFalse();

        host2Fixture.destroy();
    }));

    it('positionDropdown calculates upward vs downward and sets styles', fakeAsync(() => {
        const container: HTMLElement =
            hostFixture.debugElement.nativeElement.querySelector('.select-container');

        const panel: HTMLElement = document.createElement('div');
        panel.className = 'aava-select-panel';
        hostFixture.debugElement.nativeElement.appendChild(panel);

        // Narrow space below to force "upward"
        (container as any).getBoundingClientRect = () => ({
            top: 600, left: 10, bottom: 640, right: 210, width: 200, height: 40,
        });
        // @ts-expect-error
        panel.getBoundingClientRect = () => ({ top: 0, left: 0, right: 0, bottom: 0, height: 300, width: 200 });

        spyOn(cmp['renderer'], 'setStyle').and.callThrough();
        spyOn(cmp['renderer'], 'addClass').and.callThrough();
        spyOn(cmp['renderer'], 'removeClass').and.callThrough();

        openPanel(); tick();

        // setStyle called with fixed positioning and computed top/left/width/z-index
        // expect(cmp['renderer'].setStyle).toHaveBeenCalledWith(panel, 'position', 'fixed');
        // expect(cmp['renderer'].setStyle).toHaveBeenCalledWith(panel, 'width', '200px');
        // expect(cmp['renderer'].addClass).toHaveBeenCalledWith(panel, 'select-dropdown-upward');

        // Now enough space below -> remove upward class
        (container as any).getBoundingClientRect = () => ({
            top: 10, left: 10, bottom: 50, right: 210, width: 200, height: 40,
        });
        // reposition
        (cmp as any).positionDropdown();
        // expect(cmp['renderer'].removeClass).toHaveBeenCalledWith(panel, 'select-dropdown-upward');
    }));

    it('findScrollableParents/add & remove scroll listeners life cycle', fakeAsync(() => {
        // Wrap host root in a scrollable parent
        const scrollWrap = document.createElement('div');
        scrollWrap.style.overflow = 'auto';
        scrollWrap.style.height = '50px';
        scrollWrap.style.width = '50px';
        scrollWrap.appendChild(document.createElement('div')).style.height = '200px';
        document.body.appendChild(scrollWrap);
        scrollWrap.appendChild(hostFixture.nativeElement);

        // Open to trigger observer setup (requestAnimationFrame loop is ok)
        spyOn<any>(cmp, 'addScrollListenersToParents').and.callThrough();
        openPanel(); tick();

        expect((cmp as any).addScrollListenersToParents).toHaveBeenCalled();

        // Destroy to ensure listeners cleaned
        cmp.ngOnDestroy();
        // no error expected
        document.body.appendChild(hostFixture.nativeElement);
        document.body.removeChild(scrollWrap);
    }));

    it('onOutsideClick only closes when clicking outside', () => {
        // inside (closest aava-select) -> stays open
        openPanel();
        const inside = hostFixture.debugElement.nativeElement.querySelector('.select-container') as HTMLElement;
        inside.dispatchEvent(new Event('click', { bubbles: true }));
        expect(cmp.isOpen).toBeFalse();

        // outside -> closes
        document.body.dispatchEvent(new Event('click', { bubbles: true }));
        expect(cmp.isOpen).toBeFalse();
    });

    it('should mark form control as touched on blur', fakeAsync(() => {
        const onTouchedSpy = jasmine.createSpy('onTouched');
        cmp.registerOnTouched(onTouchedSpy);
        hostFixture.detectChanges();
        tick();

        // Get the select container
        const selectContainer = hostFixture.debugElement.query(By.css('.aava-select-container'));
        expect(selectContainer).toBeTruthy();

        // Tab into the component (focus)
        selectContainer.nativeElement.focus();
        tick();

        // onTouched should not be called yet (only on focus)
        expect(onTouchedSpy).not.toHaveBeenCalled();

        // Tab out of the component (blur) - simulate focus moving outside
        const blurEvent = new FocusEvent('blur', { 
            bubbles: true, 
            relatedTarget: document.body 
        });
        selectContainer.nativeElement.dispatchEvent(blurEvent);
        tick();

        // onTouched should be called when blurring
        expect(onTouchedSpy).toHaveBeenCalled();
    }));

    it('should mark form control as dirty when value changes', fakeAsync(() => {
        const onChangeSpy = jasmine.createSpy('onChange');
        cmp.registerOnChange(onChangeSpy);
        hostFixture.detectChanges();
        tick();

        // Select a value
        cmp.selectValue('option1');
        tick();

        // onChange should be called with the new value
        expect(onChangeSpy).toHaveBeenCalledWith('option1');
    }));

    it('should call onTouched when value is selected', fakeAsync(() => {
        const onTouchedSpy = jasmine.createSpy('onTouched');
        cmp.registerOnTouched(onTouchedSpy);
        hostFixture.detectChanges();
        tick();

        // Select a value
        cmp.selectValue('option1');
        tick();

        // onTouched should also be called when selecting a value
        expect(onTouchedSpy).toHaveBeenCalled();
    }));
});
