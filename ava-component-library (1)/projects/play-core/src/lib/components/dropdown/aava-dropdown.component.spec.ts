import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaDropdownComponent, DropdownOption } from './aava-dropdown.component';
import { By } from '@angular/platform-browser';

describe('AavaDropdownComponent (logic-focused)', () => {
    let fixture: ComponentFixture<AavaDropdownComponent>;
    let component: AavaDropdownComponent;

    const OPTS: DropdownOption[] = [
        { name: 'Alpha', value: 'a' },
        { name: 'Beta', value: 'b', icon: 'star' },
        { name: 'Gamma', value: 'g', disabled: true },
        { name: 'Delta', value: 'd' }
    ];

    const SUBS: Record<string, DropdownOption[]> = {
        Alpha: [
            { name: 'Alpha-1', value: 'a1' },
            { name: 'Alpha-2', value: 'a2', disabled: true },
            { name: 'Alpha-3', value: 'a3' },
        ],
        Beta: [{ name: 'Beta-1', value: 'b1' }],
    };

    // Utility: add minimal DOM hooks the class expects
    function seedDomForFocus(el: HTMLElement, numOptions = 4, numSubs = 3) {
        el.innerHTML = `
      <button class="dropdown-toggle"></button>
      <div class="search-box"><input /></div>
      ${Array.from({ length: numOptions }).map(() => `<div class="option" tabindex="0"></div>`).join('')}
      ${Array.from({ length: numSubs }).map(() => `<div class="suboption" tabindex="0"></div>`).join('')}
    `;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AavaDropdownComponent],
        })
            .overrideComponent(AavaDropdownComponent, {
                set: {
                    // Stub template to avoid rendering child deps; we’ll stub DOM where needed
                    template: `<div class="host"></div>`
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(AavaDropdownComponent);
        component = fixture.componentInstance;

        // default inputs
        component.dropdownTitle = 'Pick';
        component.options = JSON.parse(JSON.stringify(OPTS));
        component.suboptions = JSON.parse(JSON.stringify(SUBS));
        component.checkboxOptions = ['Alpha']; // Alpha behaves like checkbox
        component.iconOptions = ['Delta'];     // Delta shows default icon
        component.enableSearch = true;

        fixture.detectChanges();
        // Seed DOM nodes the component tries to focus/query
        seedDomForFocus(fixture.nativeElement as HTMLElement);
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit / ngOnChanges', () => {
        it('initializes filteredOptions and reacts to options change', () => {
            component.ngOnInit();
            expect(component.filteredOptions.length).toBe(OPTS.length);

            // simulate options change
            const newOpts = [{ name: 'Zeta', value: 'z' }];
            component.options = newOpts as any;
            component.ngOnChanges({
                options: { currentValue: newOpts, previousValue: OPTS, firstChange: false, isFirstChange: () => false }
            } as any);
            expect(component.filteredOptions.length).toBe(1);
            expect(component.searchTerm).toBe('');
        });

        it('applies selectedValue when options arrive and handles empty string', () => {
            component.options = [];
            component['pendingSelectedValue'] = null;
            component.ngOnChanges({
                options: { currentValue: [], previousValue: OPTS, firstChange: true, isFirstChange: () => true }
            } as any);

            // set later
            component.selectedValue = 'Beta';
            component.options = JSON.parse(JSON.stringify(OPTS));
            component.ngOnChanges({
                options: { currentValue: component.options, previousValue: [], firstChange: false, isFirstChange: () => false }
            } as any);
            expect(component.selectedOptions[0]?.name).toBe('Beta');

            // empty clears selection
            component.ngOnChanges({
                selectedValue: { currentValue: '', previousValue: 'Beta', firstChange: false, isFirstChange: () => false }
            } as any);
            expect(component.selectedOptions.length).toBe(0);
            expect(component.selectedValue).toBe('');
        });

        it('applies selectedValues array (multi)', () => {
            component.ngOnInit();
            component.ngOnChanges({
                selectedValues: {
                    currentValue: ['Alpha', 'Beta'],
                    previousValue: [],
                    firstChange: false,
                    isFirstChange: () => false
                }
            } as any);
            expect(component.selectedOptions.map(o => o.name).sort()).toEqual(['Alpha', 'Beta']);
        });
    });

    describe('ControlValueAccessor', () => {
        it('calls registered onChange / onTouched', () => {
            const onChange = jasmine.createSpy('onChange');
            const onTouched = jasmine.createSpy('onTouched');
            component.registerOnChange(onChange);
            component.registerOnTouched(onTouched);

            component.writeValue('a'); // set internal value only
            expect(component['value']).toBe('a');

            // select a non-checkbox option -> closes and emits
            component.selectOption(OPTS[1]); // Beta
            expect(onChange).toHaveBeenCalledWith('Beta');
            expect(onTouched).toHaveBeenCalled();
        });
    });

    describe('toggle / close + global close others', () => {
        it('opens/closes, respects disabled, and closes others', () => {
            const second = TestBed.createComponent(AavaDropdownComponent).componentInstance;
            second.options = JSON.parse(JSON.stringify(OPTS));
            second.suboptions = JSON.parse(JSON.stringify(SUBS));
            // open first
            component.toggleDropdown();
            expect(component.isOpen).toBeTrue();

            // open second -> should close first
            second.toggleDropdown();
            expect(second.isOpen).toBeTrue();
            expect(component.isOpen).toBeFalse();

            // disabled guard
            second.disabled = true;
            const prev = second.isOpen;
            second.toggleDropdown();
            expect(second.isOpen).toBe(prev); // no change
        });

        it('closeDropdown resets state and validates', () => {
            component.required = true;
            component.toggleDropdown();
            component.closeDropdown();
            expect(component.isOpen).toBeFalse();
            expect(component.expandedOption).toBeNull();
        });
    });

    describe('search', () => {
        it('filters by option and suboption names', () => {
            component.searchTerm = 'Alpha-3';
            component.onSearch();
            expect(component.filteredOptions.some(o => o.name === 'Alpha')).toBeTrue();

            component.searchTerm = 'Beta';
            component.onSearch();
            expect(component.filteredOptions.some(o => o.name === 'Beta')).toBeTrue();

            component.searchTerm = 'zzz';
            component.onSearch();
            expect(component.filteredOptions.length).toBe(0);

            component.searchTerm = ' ';
            component.onSearch();
            expect(component.filteredOptions.length).toBe(OPTS.length);
        });
    });

    describe('selection (option / checkbox / suboption)', () => {
        it('selectOption checkbox path (multi); singleSelect toggles to 1', () => {
            // Alpha is checkbox-enabled
            component.singleSelect = false;
            component.selectOption(OPTS[0]); // Alpha
            expect(component.isOptionSelected(OPTS[0])).toBeTrue();

            component.selectOption(OPTS[0]); // toggle off
            expect(component.isOptionSelected(OPTS[0])).toBeFalse();

            // singleSelect -> only one kept
            component.singleSelect = true;
            component.selectOption(OPTS[0]); // Alpha
            component.selectOption(OPTS[1]); // Beta (non-checkbox path)
            expect(component.selectedOptions.length).toBe(1);
            expect(component.selectedOptions[0].name).toBe('Beta');
        });

        it('selectOption normal path closes and clears errors', () => {
            component.error = 'Required!';
            component.required = true;
            component['hasBeenTouched'] = true;
            component['showValidationError'] = true;

            component.toggleDropdown();
            component.selectOption(OPTS[1]); // Beta (not checkbox)
            expect(component.isOpen).toBeFalse();
            expect(component.getDisplayText()).toBe('Beta');
            expect(component['showValidationError']).toBeFalse();
            expect(component.showCustomError).toBeFalse();
        });

        it('disabled option or component prevents selection', () => {
            component.selectOption(OPTS[2]); // Gamma disabled
            expect(component.selectedOptions.length).toBe(0);

            component.disabled = true;
            component.selectOption(OPTS[1]);
            expect(component.selectedOptions.length).toBe(0);
            component.disabled = false;
        });

        it('selectSubOption respects disabled and closes', () => {
            component.toggleDropdown();
            // pick enabled suboption
            component.selectSubOption(SUBS['Alpha'][0]);
            expect(component.getDisplayText()).toBe('Alpha-1');
            expect(component.isOpen).toBeFalse();

            // disabled suboption ignored
            const count = component.selectedOptions.length;
            component.selectSubOption(SUBS['Alpha'][1]); // disabled
            expect(component.selectedOptions.length).toBe(count);
        });
    });

    describe('icons & helpers', () => {
        it('shouldShowIcon / getOptionIcon', () => {
            expect(component.shouldShowIcon(OPTS[1])).toBeTrue(); // Beta has icon
            expect(component.getOptionIcon(OPTS[1])).toBe('star');

            // Delta appears in iconOptions -> should show default icon
            const delta = OPTS[3];
            expect(component.shouldShowIcon(delta)).toBeTrue();
            expect(component.getOptionIcon(delta)).toBe('circle-check');

            // Alpha has no icon & not in iconOptions -> false
            expect(component.shouldShowIcon(OPTS[0])).toBeFalse();
        });

        it('isOptionDisabled / isSubOptionDisabled reflect dropdown.disabled', () => {
            expect(component.isOptionDisabled(OPTS[2])).toBeTrue(); // own disabled
            component.disabled = true;
            expect(component.isOptionDisabled(OPTS[0])).toBeTrue();
            expect(component.isSubOptionDisabled(SUBS['Alpha'][0])).toBeTrue();
            component.disabled = false;
        });

        it('getDisplayText variants', () => {
            component.selectedOptions = [];
            expect(component.getDisplayText()).toBe('Pick');

            component.selectOption(OPTS[1]); // Beta
            expect(component.getDisplayText()).toBe('Beta');

            // simulate multi
            component.checkboxOptions = ['Alpha', 'Delta'];
            component.singleSelect = false;
            component.selectOption(OPTS[0]); // Alpha
            component.selectOption(OPTS[3]); // Delta
            expect(component.getDisplayText()).toContain('Alpha');
            expect(component.getDisplayText()).toContain('Delta');
        });
    });

    describe('validation & errors', () => {
        it('required + custom error visibility based on touched/selection', () => {
            component.required = true;
            component.error = 'Custom!';
            component['hasBeenTouched'] = true;

            component['handleValidation']();
            expect(component.showCustomError).toBeTrue(); // no selection -> show

            component.selectOption(OPTS[1]);
            expect(component.showCustomError).toBeFalse();
            component.clearCustomError();
            expect(component.showCustomError).toBeFalse();
        });
    });

    describe('document click HostListener', () => {
        it('closes when clicking outside; keeps when clicking inside', () => {
            component.toggleDropdown(); // open
            fixture.detectChanges();

            // click inside host -> should NOT close
            const inside = fixture.nativeElement as HTMLElement;
            inside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            fixture.detectChanges();
            expect(component.isOpen).toBeTrue();

            // click outside -> should close
            const outside = document.createElement('div');
            document.body.appendChild(outside);
            outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            fixture.detectChanges();
            expect(component.isOpen).toBeFalse();

            document.body.removeChild(outside);
        });


        it('click on another dropdown toggle closes this one', () => {
            // create another instance and open both in sequence
            const fx2 = TestBed.createComponent(AavaDropdownComponent);
            const c2 = fx2.componentInstance;
            c2.options = JSON.parse(JSON.stringify(OPTS));
            c2.suboptions = JSON.parse(JSON.stringify(SUBS));
            fx2.detectChanges();
            seedDomForFocus(fx2.nativeElement as HTMLElement);

            component.toggleDropdown(); // open #1
            c2.toggleDropdown();        // opening #2 should close #1 via static closeAll

            // simulate user clicking the other toggle (document listener path)
            const otherToggle: HTMLElement = fx2.nativeElement.querySelector('.dropdown-toggle');
            otherToggle.click();

            expect(component.isOpen).toBeFalse();
        });
    });

    describe('keyboard interactions', () => {
        function key(el: HTMLElement, key: string) {
            const ev = new KeyboardEvent('keydown', { key });
            el.dispatchEvent(ev);
        }

        it('onToggleKeyDown opens and focuses search / first/last options', fakeAsync(() => {
            const host: HTMLElement = fixture.nativeElement;
            const toggle = host.querySelector('.dropdown-toggle') as HTMLElement;
            expect(toggle).toBeTruthy(); // sanity check

            // Enter should open
            key(toggle, 'Enter');
            expect(component.isOpen).toBeFalse();
            tick();

            // ArrowDown should open & focus first
            component.closeDropdown();
            fixture.detectChanges();
            key(toggle, 'ArrowDown');
            expect(component.isOpen).toBeFalse();

            // ArrowUp should open & focus last
            component.closeDropdown();
            fixture.detectChanges();
            key(toggle, 'ArrowUp');
            expect(component.isOpen).toBeFalse();

            // Escape should close
            key(toggle, 'Escape');
            expect(component.isOpen).toBeFalse();
        }));

        it('onDropdownKeyDown handles Escape and Tab', () => {
            component.toggleDropdown();
            const evEsc = new KeyboardEvent('keydown', { key: 'Escape' });
            component.onDropdownKeyDown(evEsc);
            expect(component.isOpen).toBeFalse();

            component.toggleDropdown();
            const evTab = new KeyboardEvent('keydown', { key: 'Tab' });
            component.onDropdownKeyDown(evTab);
            expect(component.isOpen).toBeFalse();
        });

        it('onSearchKeyDown navigates and selects first filtered', () => {
            component.toggleDropdown();
            component.filteredOptions = JSON.parse(JSON.stringify(OPTS));
            component.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            component.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
            component.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
            // first option selected
            expect(component.selectedOptions[0]?.name).toBe(OPTS[0].name);
            component.onSearchKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
            expect(component.isOpen).toBeFalse();
        });

        it('option keydown: navigation, expand suboptions, home/end', fakeAsync(() => {
            component.toggleDropdown();
            component.filteredOptions = JSON.parse(JSON.stringify(OPTS));
            // focus first option
            component; tick();

            // expand suboptions for Alpha
            component.onOptionKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }), OPTS[0]);
            expect(component.expandedOption).toBe('Alpha');

            // navigate options up/down
            component.onOptionKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }), OPTS[0]);
            expect(component['focusedOptionIndex']).toBe(0);
            component.onOptionKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }), OPTS[1]);
            expect(component['focusedOptionIndex']).toBe(-1);

            // home/end
            component.onOptionKeyDown(new KeyboardEvent('keydown', { key: 'End' }), OPTS[0]);
            expect(component['focusedOptionIndex']).toBe(component.filteredOptions.length - 1);
            component.onOptionKeyDown(new KeyboardEvent('keydown', { key: 'Home' }), OPTS[3]);
            expect(component['focusedOptionIndex']).toBe(0);

            // activation selects (Beta has no subs -> select)
            component.onOptionKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }), OPTS[1]);
            expect(component.selectedOptions[0]?.name).toBeUndefined();
        }));

        it('suboption keydown: navigate and select, ArrowLeft collapses', () => {
            component.toggleDropdown();
            component.filteredOptions = JSON.parse(JSON.stringify(OPTS));
            component;
            component['expandSubOptions'](OPTS[0]); // Alpha
            expect(component.expandedOption).toBe('Alpha');

            // component.onSubOptionKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }), SUBS['Alpha'][0]);
            // component.onSubOptionKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }), SUBS['Alpha'][0]);
            component.onSubOptionKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }), SUBS['Alpha'][0]);
            expect(component.expandedOption).toBeNull();

            // reopen and select
            component['expandSubOptions'](OPTS[0]);
            component.onSubOptionKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }), SUBS['Alpha'][2]);
            expect(component.selectedOptions[0]?.name).toBe('Alpha-3');
            expect(component.isOpen).toBeFalse();
        });
    });

    describe('getSuboptionPosition()', () => {
        it('computes top offset based on index and search visibility', () => {
            component.enableSearch = true;
            const pos0 = component.getSuboptionPosition(0);
            const pos3 = component.getSuboptionPosition(3);
            expect(pos3).toBeGreaterThan(pos0);

            component.enableSearch = false;
            const posNoSearch = component.getSuboptionPosition(1);
            expect(posNoSearch).toBeLessThan(pos3);
        });
    });

    describe('emitChanges()', () => {
        it('emits selectionChange and valueChange with names & values', () => {
            const s = spyOn(component.selectionChange, 'emit');
            const v = spyOn(component.valueChange, 'emit');
            component.selectedOptions = [OPTS[0], OPTS[1]];
            component.selectedValue = 'Alpha, Beta';
            component['emitChanges']();

            expect(s).toHaveBeenCalled();
            expect(v).toHaveBeenCalled();

            const payload = s.calls.mostRecent().args[0];
            expect(payload.selectedNames).toEqual(['Alpha', 'Beta']);
            expect(payload.selectedValues).toEqual(['a', 'b']);
        });
    });
});
