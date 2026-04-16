// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// // import { DropdownComponent, DropdownOption } from './dropdown.component';
// import { By } from '@angular/platform-browser';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { TestFileuploadComponent } from './test-fileupload.component';
// import { AavaDropdownComponent } from '../../../../../@aava/play-core/src/public-api';

// function click(el: HTMLElement) {
//   el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
// }

// function key(el: HTMLElement, key: string) {
//   el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
// }

// describe('DropdownComponent (full coverage)', () => {
//   let fixture: ComponentFixture<AavaDropdownComponent>;
//   let component: AavaDropdownComponent;

//   // Reusable options
//   // const OPTS: AavaDropdownComponent[] = [
//   //   { name: 'Alpha', value: 'a' },
//   //   { name: 'Beta', value: 'b', icon: 'star' },
//   //   { name: 'Gamma', value: 'c', disabled: true },
//   // ];
//   const SUBS = {
//     Alpha: [{ name: 'Alpha-1', value: 'a1' }, { name: 'Alpha-2', value: 'a2', disabled: true }],
//     Beta: [{ name: 'Beta-1', value: 'b1' }],
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AavaDropdownComponent],
//       // Override template to ensure DOM hooks exist
//     }).overrideComponent(AavaDropdownComponent, {
//       set: {
//         template: `
//           <button class="dropdown-toggle"
//                   (click)="onToggleClick($event)"
//                   (keydown)="onToggleKeyDown($event)">
//             {{getDisplayText()}}
//           </button>

//           <div class="dropdown" *ngIf="isOpen" (keydown)="onDropdownKeyDown($event)">
//             <div class="search-box" *ngIf="search || enableSearch">
//               <input (input)="onSearch()" (keydown)="onSearchKeyDown($event)" [(ngModel)]="searchTerm"/>
//             </div>

//             <div class="options">
//               <div class="option"
//                    *ngFor="let o of filteredOptions; let i = index"
//                    tabindex="0"
//                    (click)="selectOption(o)"
//                    (keydown)="onOptionKeyDown($event, o)">
//                 {{o.name}}
//                 <div class="suboptions" *ngIf="expandedOption === o.name">
//                   <div class="suboption"
//                        *ngFor="let s of suboptions[o.name]; let j = index"
//                        tabindex="0"
//                        (click)="selectSubOption(s)"
//                        (keydown)="onSubOptionKeyDown($event, s)">
//                     {{s.name}}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `,
//         // keep encapsulation None as in component to match querySelector behavior
//       }
//     })
//       .compileComponents();

//     fixture = TestBed.createComponent(TestFileuploadComponent);
//     component = fixture.componentInstance;
//     component.dropdownTitle = 'Select a Category';
//     component.options = [...OPTS];
//     component.suboptions = { ...SUBS };
//     component.checkboxOptions = ['Alpha', 'Beta']; // treat Alpha/Beta as checkbox rows
//     component.iconOptions = ['Alpha']; // extra path for shouldShowIcon
//     component.enableSearch = true;
//     component.required = true;
//     component.label = 'Label';
//     component.error = 'Custom error';
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('ControlValueAccessor: write/register & propagate on selection', () => {
//     const onChange = jasmine.createSpy('onChange');
//     const onTouched = jasmine.createSpy('onTouched');

//     component.writeValue('external');
//     expect(component.value).toBe('external');

//     component.registerOnChange(onChange);
//     component.registerOnTouched(onTouched);

//     // open and select an option
//     const toggle = fixture.debugElement.query(By.css('.dropdown-toggle')).nativeElement as HTMLElement;
//     click(toggle);
//     fixture.detectChanges();

//     const alpha = fixture.debugElement.queryAll(By.css('.option'))[0].nativeElement as HTMLElement;
//     click(alpha); // checkboxOptions contains 'Alpha' => will go through handleCheckboxSelection
//     fixture.detectChanges();

//     // Not a single-select normal click path yet (it’s checkbox path), so touch/change still occurs when selectOption() flows
//     // Now pick Beta which is also in checkboxOptions to exercise push
//     click(fixture.debugElement.queryAll(By.css('.option'))[1].nativeElement as HTMLElement);
//     fixture.detectChanges();

//     // Now pick a normal (non-checkbox) option by removing it from checkboxOptions
//     component.checkboxOptions = ['Alpha']; // Beta becomes normal option
//     fixture.detectChanges();
//     click(fixture.debugElement.queryAll(By.css('.option'))[1].nativeElement as HTMLElement);
//     fixture.detectChanges();

//     expect(onChange).toHaveBeenCalled(); // set via selectOption -> onChange
//     expect(onTouched).toHaveBeenCalled(); // set via selectOption -> onTouched
//   });

//   // it('ngOnInit initializes filteredOptions; ngOnChanges paths including pending selected value', () => {
//   //   // pendingSelectedValue path when options are empty initially
//   //   const f2 = TestBed.createComponent(DropdownComponent);
//   //   const c2 = f2.componentInstance;
//   //   // c2.options = []; // not loaded
//   //   // c2.suboptions = {};
//   //   // c2.selectedValue = 'Alpha'; // will be stored as pending
//   //   f2.detectChanges();
//   //   // expect((c2 as any).pendingSelectedValue).toBe('Alpha');

//   //   // now simulate options arriving via ngOnChanges
//   //   c2.ngOnChanges({
//   //     options: { currentValue: OPTS, previousValue: [], firstChange: false, isFirstChange: () => false }
//   //   } as any);
//   //   // expect(c2.filteredOptions.length).toBe(OPTS.length);
//   //   // pending should be applied and cleared
//   //   expect((c2 as any).pendingSelectedValue).toBeNull();
//   //   // expect(c2.selectedOptions.length).toBe(1);
//   //   expect(c2.selectedValue).toBe('Alpha');

//   //   // selectedValues array change (empty and non-empty)
//   //   c2.ngOnChanges({
//   //     selectedValues: { currentValue: ['Beta', 'Gamma'], previousValue: [], firstChange: false, isFirstChange: () => false }
//   //   } as any);
//   //   // expect(c2.selectedOptions.map(o => o.name)).toEqual(['Beta', 'Gamma']);

//   //   c2.ngOnChanges({
//   //     selectedValue: { currentValue: 'Alpha', previousValue: 'Beta', firstChange: false, isFirstChange: () => false }
//   //   } as any);
//   //   // expect(c2.selectedOptions.map(o => o.name)).toEqual(['Alpha']);
//   // });

//   it('toggleDropdown / closeDropdown / validation & custom error handling & disabled guard', () => {
//     // disabled guard
//     component.disabled = true;
//     fixture.detectChanges();
//     component.toggleDropdown();
//     expect(component.isOpen).toBeFalse();

//     // enable and toggle open
//     component.disabled = false;
//     component.required = true;
//     fixture.detectChanges();
//     component.toggleDropdown();
//     expect(component.isOpen).toBeTrue();

//     // mark touched & close, triggering validation
//     component.hasBeenTouched = true;
//     component.closeDropdown();
//     expect(component.isOpen).toBeFalse();
//     expect(component.showValidationError).toBeTrue(); // required + touched + no selections

//     // set custom error then clear on selection
//     component.error = 'Some error';
//     component.checkboxOptions = ['Alpha'];
//     component.toggleDropdown();
//     const optionEls = fixture.debugElement.queryAll(By.css('.option'));
//     // click(optionEls[0].nativeElement); // select Alpha via checkbox path -> clears errors
//     fixture.detectChanges();
//     // expect(component.showValidationError).toBeFalse();
//     // expect(component['showCustomError']).toBeFalse();
//   });

//   // it('HostListener(document:click): outside click closes; clicking a toggle closes others', fakeAsync(() => {
//   //   // Create another instance so static array contains multiple, exercise closeAllDropdownsExcept logic
//   //   const fx2 = TestBed.createComponent(DropdownComponent);
//   //   const c2 = fx2.componentInstance;
//   //   c2.options = [...OPTS];
//   //   fx2.detectChanges();

//   //   // open both
//   //   component.toggleDropdown();
//   //   c2.toggleDropdown();
//   //   // expect(component.isOpen).toBeTrue();
//   //   expect(c2.isOpen).toBeTrue();

//   //   // Simulate clicking the toggle on c2 → should close the other instance (component)
//   //   const c2Toggle = fx2.debugElement.query(By.css('.dropdown-toggle')).nativeElement as HTMLElement;
//   //   // The HostListener checks target.closest('ava-dropdown') AND '.dropdown-toggle'
//   //   // so we fake a DOM subtree by dispatching a click event on actual toggle
//   //   c2.onToggleClick(new MouseEvent('click'));
//   //   // The HostListener runs on document:click; trigger it explicitly
//   //   document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
//   //   tick();
//   //   // Manually call listener to ensure path covered even without real DOM ancestors
//   //   // c2.onDocumentClick(new MouseEvent('click') as any);
//   //   // component.onDocumentClick(new MouseEvent('click') as any);
//   //   expect(component.isOpen).toBeFalse(); // closed by "close others" path
//   //   // expect(c2.isOpen).toBeTrue();

//   //   // Clicking outside closes dropdown
//   //   c2.onDocumentClick(new MouseEvent('click') as any);
//   //   expect(c2.isOpen).toBeFalse();
//   // }));

//   it('search filters by main options and suboptions', () => {
//     component.toggleDropdown();
//     fixture.detectChanges();

//     // Type into search input
//     const input = fixture.debugElement.query(By.css('.search-box input')).nativeElement as HTMLInputElement;
//     component.searchTerm = 'beta-1';
//     input.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     // Should keep Beta in filtered list due to suboption Beta-1
//     const names = component.filteredOptions.map(o => o.name);
//     expect(names).toContain('Beta');

//     // Empty search resets filteredOptions
//     component.searchTerm = '  ';
//     input.dispatchEvent(new Event('input'));
//     fixture.detectChanges();
//     // expect(component.filteredOptions.length).toBe(OPTS.length);
//   });
//   // it('HostListener(document:click): outside click closes; clicking a toggle closes others', () => {
//   //   // Create a second instance to exercise "closeAllDropdownsExcept"
//   //   const fx2 = TestBed.createComponent(DropdownComponent);
//   //   const c2 = fx2.componentInstance;
//   //   c2.options = [...OPTS];
//   //   fx2.detectChanges();

//   //   // Open both dropdowns
//   //   component.toggleDropdown();
//   //   c2.toggleDropdown();
//   //   expect(component.isOpen).toBeTrue();
//   //   expect(c2.isOpen).toBeTrue();

//   //   // --- Click on c2's toggle: should close other instances (component), keep c2 open ---

//   //   // Grab c2's actual toggle element (has .dropdown-toggle)
//   //   const c2Toggle = fx2.debugElement.query(By.css('.dropdown-toggle')).nativeElement as HTMLElement;

//   //   // Call the document click handler with a target that has .closest()
//   //   c2.onDocumentClick({ target: c2Toggle } as any);

//   //   expect(component.isOpen).toBeFalse(); // closed by "close others" path
//   //   expect(c2.isOpen).toBeTrue();         // remains open

//   //   // --- Click outside any dropdown: should close c2 as well ---

//   //   const outside = document.createElement('div'); // not inside any dropdown/toggle
//   //   c2.onDocumentClick({ target: outside } as any);
//   //   expect(c2.isOpen).toBeFalse();
//   // });
//   // Optional safety (usually not needed in modern JSDOM):
//   if (!HTMLElement.prototype.closest) {
//     // @ts-ignore
//     HTMLElement.prototype.closest = function (selector: string) {
//       let el: HTMLElement | null = this;
//       while (el) {
//         if (el.matches && el.matches(selector)) return el;
//         el = el.parentElement;
//       }
//       return null;
//     };
//   }

//   it('selectOption: checkbox path, singleSelect, disabled option guard, emitChanges payload', () => {
//     const emitSpy = spyOn(component as any, 'emitChanges').and.callThrough();

//     // disabled guard
//     component.selectOption({ name: 'Gamma', value: 'c', disabled: true });
//     expect(emitSpy).not.toHaveBeenCalled();

//     // checkbox multi
//     component.checkboxOptions = ['Alpha', 'Beta'];
//     // component.handleCheckboxSelection(OPTS[0]); // add Alpha
//     // component.handleCheckboxSelection(OPTS[1]); // add Beta
//     // expect(component.selectedOptions.map(o => o.name)).toEqual(['Alpha', 'Beta']);

//     // checkbox singleSelect
//     component.singleSelect = true;
//     // component.handleCheckboxSelection(OPTS[1]); // should replace with Beta
//     // expect(component.selectedOptions.map(o => o.name)).toEqual(['Beta']);

//     // normal selection (non-checkbox): closes dropdown & sets selectedValue
//     component.isOpen = true;
//     component.checkboxOptions = []; // force normal path
//     // component.selectOption(OPTS[0]);
//     expect(component.isOpen).toBeFalse();
//     expect(component.selectedValue).toBe('Alpha');
//     expect(emitSpy).toHaveBeenCalled();

//     // emit payload shape
//     const lastCallArg = (component.selectionChange as any).observers?.length
//       ? null
//       : null; // observers not used; just ensure method covered
//   });

//   it('selectSubOption: respects disabled and closes', () => {
//     const subDisabled = { name: 'Alpha-2', value: 'a2', disabled: true };
//     component.isOpen = true;
//     component.selectSubOption(subDisabled as any);
//     expect(component.isOpen).toBeTrue(); // not closed because disabled ignored

//     const sub = { name: 'Alpha-1', value: 'a1' };
//     component.selectSubOption(sub as any);
//     expect(component.isOpen).toBeFalse();
//     expect(component.selectedValue).toBe('Alpha-1');
//   });

//   it('helpers: clearCustomError, hasSubOptions, icons, disabled checks, selection checks, display text', () => {
//     component.clearCustomError();
//     expect((component as any).showCustomError).toBeFalse();

//     expect(component.hasSubOptions('Alpha')).toBeTrue();
//     expect(component.hasSubOptions('Nope')).toBeFalse();

//     // const withIcon = OPTS[1]; // Beta has icon
//     expect(component.getOptionIcon(withIcon)).toBe('star');
//     // const noIcon = OPTS[0]; // Alpha no custom icon → default
//     // expect(component.getOptionIcon(noIcon)).toBe('circle-check');

//     // shouldShowIcon true when option has icon OR in iconOptions list
//     expect(component.shouldShowIcon(withIcon)).toBeTrue();
//     expect(component.shouldShowIcon(noIcon)).toBeTrue(); // Alpha is in iconOptions

//     expect(component.isOptionDisabled(OPTS[2])).toBeTrue();
//     expect(component.isSubOptionDisabled({ name: 'Alpha-2', value: 'a2', disabled: true })).toBeTrue();

//     // Display text branches
//     component.options = [];
//     expect(component.getDisplayText()).toBe('Select a Category');
//     component.options = [...OPTS];
//     component.selectedOptions = [];
//     expect(component.getDisplayText()).toBe('Select a Category');
//     component.selectedOptions = [OPTS[0]];
//     expect(component.getDisplayText()).toBe('Alpha');
//     component.selectedOptions = [OPTS[0], OPTS[1]];
//     expect(component.getDisplayText()).toBe('Alpha, Beta');
//   });

//   it('updateSelectedOptionsFromValue & updateSelectedOptionsFromValues edge cases', () => {
//     // empty string clears selection
//     (component as any).updateSelectedOptionsFromValue('');
//     expect(component.selectedOptions.length).toBe(0);
//     expect(component.selectedValue).toBe('');

//     // non-matching string leaves selection unchanged
//     (component as any).updateSelectedOptionsFromValue('Not-There');
//     expect(component.selectedOptions.length).toBe(0);

//     // set from values array
//     (component as any).updateSelectedOptionsFromValues(['Alpha', 'Gamma']);
//     expect(component.selectedOptions.map(o => o.name)).toEqual(['Alpha', 'Gamma']);

//     // unmatched array clears to []
//     (component as any).updateSelectedOptionsFromValues(['Nope']);
//     expect(component.selectedOptions.length).toBe(0);
//   });

//   it('emitChanges emits both selectionChange and valueChange with expected shape', () => {
//     const selSpy = spyOn(component.selectionChange, 'emit');
//     const valSpy = spyOn(component.valueChange, 'emit');

//     component.selectedOptions = [OPTS[0], OPTS[1]];
//     component.selectedValue = 'Alpha, Beta';
//     component.emitChanges();

//     expect(selSpy).toHaveBeenCalledTimes(1);
//     expect(valSpy).toHaveBeenCalledTimes(1);
//     const arg = selSpy.calls.mostRecent().args[0];
//     expect(arg.selectedOptions.length).toBe(2);
//     expect(arg.selectedValue).toBe('Alpha, Beta');
//     expect(arg.selectedValues).toEqual(['a', 'b']);
//     expect(arg.selectedNames).toEqual(['Alpha', 'Beta']);
//   });

//   it('Keyboard navigation: toggle, dropdown, search, option & suboption handlers', fakeAsync(() => {
//     const toggle = fixture.debugElement.query(By.css('.dropdown-toggle')).nativeElement as HTMLElement;

//     // Open via Enter
//     key(toggle, 'Enter');
//     fixture.detectChanges();

//     // With enableSearch true, focus should go to search input
//     tick(); // for setTimeout focus
//     const input = fixture.debugElement.query(By.css('.search-box input')).nativeElement as HTMLInputElement;
//     expect(input).toBeTruthy();

//     // From search: ArrowDown should focus first option, Enter selects it (checkbox path currently off)
//     key(input, 'ArrowDown');
//     tick();
//     fixture.detectChanges();

//     const options = fixture.debugElement.queryAll(By.css('.option'));
//     expect(options.length).toBeGreaterThan(0);

//     // Home/End behavior through option keydown helpers
//     key(options[0].nativeElement, 'Home');
//     key(options[0].nativeElement, 'End');

//     // Expand suboptions via ArrowRight and activate with Enter
//     // Ensure Alpha has suboptions
//     component.focusedOptionIndex = 0;
//     key(options[0].nativeElement, 'ArrowRight');
//     fixture.detectChanges();
//     const subEls = fixture.debugElement.queryAll(By.css('.suboption'));
//     expect(subEls.length).toBeGreaterThan(0);

//     key(subEls[0].nativeElement, 'Enter'); // select suboption
//     fixture.detectChanges();
//     expect(component.isOpen).toBeFalse();

//     // Re-open with ArrowDown from toggle
//     key(toggle, 'ArrowDown');
//     fixture.detectChanges();
//     // Escape from dropdown should close and refocus toggle
//     const dropdown = fixture.debugElement.query(By.css('.dropdown')).nativeElement as HTMLElement;
//     key(dropdown, 'Escape');
//     fixture.detectChanges();
//     expect(component.isOpen).toBeFalse();

//     // Open again, navigate up from first option back to search input
//     key(toggle, 'Enter');
//     fixture.detectChanges();
//     key(input, 'ArrowDown'); // move to first option
//     fixture.detectChanges();
//     const opt0 = fixture.debugElement.queryAll(By.css('.option'))[0].nativeElement as HTMLElement;
//     component.focusedOptionIndex = 0;
//     key(opt0, 'ArrowUp'); // should move focus to search input
//     tick();
//     fixture.detectChanges();

//     // Escape from search closes and focuses toggle
//     key(input, 'Escape');
//     fixture.detectChanges();
//     // expect(component.isOpen).toBeFalse();
//   }));

//   it('getSuboptionPosition returns computed top offset', () => {
//     // index 2 -> 50 + 2 + (search=40) + 0 + 2*40 = 172
//     component.enableSearch = true;
//     const pos = component.getSuboptionPosition(2);
//     expect(pos).toBe(172);
//   });

//   it('onToggleClick stops propagation & toggles', () => {
//     const evt = new MouseEvent('click');
//     spyOn(evt, 'stopPropagation').and.callThrough();
//     component.onToggleClick(evt);
//     expect(evt.stopPropagation).toHaveBeenCalled();
//     expect(component.isOpen).toBeTrue();
//   });

//   it('onDropdownKeyDown & onToggleKeyDown Tab/Escape/Space paths, openAndFocus & handleToggleActivation coverage', fakeAsync(() => {
//     const toggle = fixture.debugElement.query(By.css('.dropdown-toggle')).nativeElement as HTMLElement;

//     // Space opens and focuses search
//     key(toggle, ' ');
//     fixture.detectChanges();
//     tick();
//     expect(component.isOpen).toBeTrue();

//     // Tab closes
//     const dropdown = fixture.debugElement.query(By.css('.dropdown')).nativeElement as HTMLElement;
//     key(dropdown, 'Tab');
//     fixture.detectChanges();
//     expect(component.isOpen).toBeFalse();

//     // Reopen and Escape closes
//     key(toggle, 'Enter');
//     fixture.detectChanges();
//     key(dropdown, 'Escape');
//     fixture.detectChanges();
//     // expect(component.isOpen).toBeFalse();

//     // ArrowUp opens and focuses last option (when no search)
//     component.enableSearch = false;
//     fixture.detectChanges();
//     key(toggle, 'ArrowUp');
//     fixture.detectChanges();
//     // No assertion for focus location in JSDOM, but path executed
//     expect(component.isOpen).toBeTrue();
//   }));
// });
