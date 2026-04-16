import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { AavaListComponent, ListItem, ListItemButton } from './aava-list.component';

function makeEvent(opts?: { onActionButtons?: boolean; onClickableIcon?: boolean; }): Event {
    // Minimal mock HTMLElement with closest()
    const target = {
        closest: (selector: string) => {
            if (opts?.onActionButtons && selector === '.item-buttons') return {} as any;
            if (opts?.onClickableIcon && selector === '.item-icon.clickable') return {} as any;
            return null;
        }
    } as unknown as HTMLElement;

    return {
        stopPropagation: () => void 0,
        target
    } as unknown as Event;
}

function makeStopEvent(): Event {
    return {
        stopPropagation: jasmine.createSpy('stopPropagation')
    } as unknown as Event;
}

describe('AavaListComponent (pure TS coverage)', () => {
    let fixture: ComponentFixture<AavaListComponent>;
    let component: AavaListComponent;

    const items: ListItem[] = [
        { id: '1', title: 'One', subtitle: 'S1', icon: { iconName: 'x', cursor: true } },
        { id: '2', title: 'Two', disabled: true, buttons: [{ id: 'b1', label: 'Go' }] },
        { id: '3', title: 'Three', avatar: { profileText: 'P', active: true }, icon: { iconName: 'y' } },
        { id: '4', title: 'Four' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, AavaListComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(AavaListComponent);
        component = fixture.componentInstance;
        component.items = JSON.parse(JSON.stringify(items));
    });

    it('creates', () => {
        expect(component).toBeTruthy();
        // touch simple getters to count lines
        expect(component.disabled).toBeFalse();
        expect(component.touched).toBeFalse();
        expect(component.value).toBeNull();
    });

    it('trackBy functions', () => {
        expect(component.trackByFn(0, items[0])).toBe('1');

        const btn: ListItemButton = { label: 'A' };
        expect(component.trackByButtonFn(0, btn)).toBe('0');
        expect(component.trackByButtonFn(0, { id: 'z' })).toBe('z');
    });

    it('hasAvatar/Icon/Buttons & icon clickable checks', () => {
        expect(component.hasAvatar(items[2])).toBeTrue();
        expect(component.hasAvatar(items[0])).toBeFalse();
        expect(component.hasIcon(items[0])).toBeTrue();
        expect(component.hasIcon(items[1])).toBeFalse();
        expect(component.hasButtons(items[1])).toBeTrue();
        expect(component.hasButtons(items[3])).toBeFalse();
        expect(component.isIconClickable(items[0])).toBeTrue();
        expect(component.isIconClickable(items[2])).toBeFalse();
    });

    it('single-select: onItemClick selects, emits, and changes value', () => {
        const selectedSpy = spyOn(component.onOptionSelected, 'emit');
        const changeSpy = jasmine.createSpy('onChange');
        const touchedSpy = jasmine.createSpy('onTouched');

        component.registerOnChange(changeSpy);
        component.registerOnTouched(touchedSpy);

        component.onItemClick(items[0]);
        expect(component.value).toBe('1');
        expect(selectedSpy).toHaveBeenCalledWith(items[0]);
        expect(changeSpy).toHaveBeenCalledWith('1');
        expect(component.touched).toBeTrue();
        expect(touchedSpy).toHaveBeenCalled();
        expect(component.isItemSelected(items[0])).toBeTrue();
        expect(component.isItemSelected(items[2])).toBeFalse();
    });

    it('single-select: clicking on action areas does not select', () => {
        const selectedSpy = spyOn(component.onOptionSelected, 'emit');
        component.onItemClick(items[0], makeEvent({ onActionButtons: true }));
        component.onItemClick(items[0], makeEvent({ onClickableIcon: true }));
        expect(selectedSpy).not.toHaveBeenCalled();
    });

    it('single-select: ignores when component or item is disabled', () => {
        const selectedSpy = spyOn(component.onOptionSelected, 'emit');

        // component disabled
        component.setDisabledState(true);
        component.onItemClick(items[0]);
        expect(selectedSpy).not.toHaveBeenCalled();

        // item disabled
        component.setDisabledState(false);
        component.onItemClick(items[1]);
        expect(selectedSpy).not.toHaveBeenCalled();
    });

    it('multi-select: toggling, maxSelections honored, removing item', () => {
        const selectedSpy = spyOn(component.onOptionSelected, 'emit');
        const changeSpy = jasmine.createSpy('onChange');
        component.registerOnChange(changeSpy);

        component.multiSelect = true;
        component.maxSelections = 2;

        // add first
        component.onItemClick(items[0]);
        expect(component.value).toEqual(['1']);
        expect(component.isItemSelected(items[0])).toBeTrue();

        // add second
        component.onItemClick(items[2]);
        expect(component.value).toEqual(['1', '3']);

        // cannot add third due to max
        component.onItemClick(items[3]);
        expect(component.value).toEqual(['1', '3']); // unchanged

        // remove one
        component.onItemClick(items[0]);
        expect(component.value).toEqual(['3']);

        expect(selectedSpy).toHaveBeenCalled();
        expect(changeSpy).toHaveBeenCalledTimes(3); // after each set value that changed
    });

    it('onCheckboxChange stops propagation and delegates to onItemClick', () => {
        const clickSpy = spyOn(component, 'onItemClick');
        const ev = makeStopEvent();
        component.onCheckboxChange(items[0], ev);
        expect((ev.stopPropagation as jasmine.Spy)).toHaveBeenCalled();
        expect(clickSpy).toHaveBeenCalledWith(items[0]);
    });

    it('onItemButtonClick & onItemIconClick stop propagation and emit payload', () => {
        const btn: ListItemButton = { id: 'b', label: 'Btn' };
        const btnSpy = spyOn(component.onButtonClick, 'emit');
        const iconSpy = spyOn(component.onIconClick, 'emit');

        const ev1 = makeStopEvent();
        component.onItemButtonClick(items[0], btn, 5, ev1);
        expect((ev1.stopPropagation as jasmine.Spy)).toHaveBeenCalled();
        expect(btnSpy).toHaveBeenCalledWith({ item: items[0], button: btn, buttonIndex: 5, event: ev1 });

        const ev2 = makeStopEvent();
        component.onItemIconClick(items[2], ev2);
        expect((ev2.stopPropagation as jasmine.Spy)).toHaveBeenCalled();
        expect(iconSpy).toHaveBeenCalledWith({ item: items[2], event: ev2 });
    });

    it('canSelectMore respects multiSelect and maxSelections', () => {
        // single-select -> always true
        component.multiSelect = false;
        expect(component.canSelectMore()).toBeTrue();

        // multi w/o max -> true
        component.multiSelect = true;
        component.maxSelections = undefined;
        component.selectedItemIds = ['1', '2'];
        expect(component.canSelectMore()).toBeTrue();

        // multi with max not reached
        component.maxSelections = 3;
        expect(component.canSelectMore()).toBeTrue();

        // max reached
        component.selectedItemIds = ['1', '2', '3'];
        expect(component.canSelectMore()).toBeFalse();
    });

    it('writeValue handles array and single correctly', () => {
        // start single
        component.multiSelect = false;
        component.writeValue('2');
        expect(component.value).toBe('2');
        expect(component['selectedItemId']).toBe('2');

        component.writeValue(['3']);
        expect(component.value).toEqual(['3']);
        // In single-select, array means first element taken
        expect(component['selectedItemId']).toBe('3');

        // switch to multi
        component.multiSelect = true;
        component.writeValue(null);
        expect(component.value).toBeNull();
        expect(component['selectedItemIds']).toEqual([]);

        component.writeValue('1');
        expect(component.value).toBe('1');
        expect(component['selectedItemIds']).toEqual(['1']);

        component.writeValue(['1', '4']);
        expect(component.value).toEqual(['1', '4']);
        expect(component['selectedItemIds']).toEqual(['1', '4']);
    });

    it('selectAll selects all non-disabled, honoring maxSelections', () => {
        component.multiSelect = true;
        component.items = [
            { id: 'a', title: 'A' },
            { id: 'b', title: 'B', disabled: true },
            { id: 'c', title: 'C' },
            { id: 'd', title: 'D' },
        ];

        component.maxSelections = undefined;
        component.selectAll();
        expect(component.value).toEqual(['a', 'c', 'd']);
        expect(component.touched).toBeTrue();

        component.maxSelections = 2;
        component.selectAll();
        expect(component.value).toEqual(['a', 'c']); // capped at 2
    });

    it('clearSelection handles single and multi', () => {
        const changeSpy = jasmine.createSpy('onChange');
        component.registerOnChange(changeSpy);

        // single
        component.multiSelect = false;
        component.writeValue('1');
        component.clearSelection();
        expect(component.value).toBeNull();

        // multi
        component.multiSelect = true;
        component.writeValue(['1', '3']);
        component.clearSelection();
        expect(component.value).toEqual([]);
        expect(changeSpy).toHaveBeenCalled();
        expect(component.touched).toBeTrue();
    });

    it('selectItems validates ids, honors max, works for single & multi', () => {
        // multi
        component.multiSelect = true;
        component.maxSelections = 2;
        component.items = items;

        component.selectItems(['1', '2', '3']); // '2' is disabled, should be skipped; also max 2
        expect(component.value).toEqual(['1', '3']); // capped to 2 valid ids

        // single
        component.multiSelect = false;
        component.selectItems(['2', 'nope', '3']); // first valid and not disabled is '3'
        expect(component.value).toBe('3');

        // single: none valid -> should not change to something invalid
        component.selectItems(['nope']);
        expect(component.value).toBe('3'); // unchanged
    });

    it('isItemSelected covers both single and multi code paths', () => {
        // single
        component.multiSelect = false;
        component.writeValue('4');
        expect(component.isItemSelected({ id: '4', title: 'X' })).toBeTrue();
        expect(component.isItemSelected({ id: '1', title: 'Y' })).toBeFalse();

        // multi
        component.multiSelect = true;
        component.writeValue(['1', '3']);
        expect(component.isItemSelected({ id: '1', title: 'A' })).toBeTrue();
        expect(component.isItemSelected({ id: '2', title: 'B' })).toBeFalse();
    });

    it('validation: hasError logic with required, touched, and showErrorImmediately', () => {
        // default: not required -> no error
        expect(component.hasError).toBeFalse();

        component.required = true;

        // showErrorImmediately = true (default) -> error immediately when empty
        component.resetValidation();
        component.value = null;
        expect(component.hasError).toBeTrue();

        // showErrorImmediately = false -> no error until touched
        component.hideErrorImmediately();
        component.resetValidation();
        component.value = null;
        expect(component.hasError).toBeFalse();
        component.validate(); // marks touched
        expect(component.hasError).toBeTrue();

        // when selection not empty -> no error
        component.showErrorImmediatelyMethod();
        component.multiSelect = true;
        component.value = ['1'];
        expect(component.hasError).toBeFalse();
    });

    it('validate() marks touched and returns validity (no error => true)', () => {
        component.required = true;
        component.multiSelect = false;
        component.value = '1';
        const ok = component.validate();
        expect(ok).toBeTrue();
        expect(component.touched).toBeTrue();
    });

    it('registerOnChange/registerOnTouched wiring & setDisabledState', () => {
        const changeSpy = jasmine.createSpy('c');
        const touchedSpy = jasmine.createSpy('t');
        component.registerOnChange(changeSpy);
        component.registerOnTouched(touchedSpy);

        // trigger change through setter
        component.value = '1';
        expect(changeSpy).toHaveBeenCalledWith('1');

        // trigger touched through click
        component.onItemClick({ id: '1', title: 'One' });
        expect(touchedSpy).toHaveBeenCalled();

        component.setDisabledState(true);
        expect(component.disabled).toBeTrue();
    });

    it('internal isClickOnActionElement true when clicking action or clickable icon', () => {
        // cover both branches
        // using (as any) to reach private method for coverage; safe in tests
        const fn = (component as any).isClickOnActionElement.bind(component);
        expect(fn(makeEvent({ onActionButtons: true }))).toBeTrue();
        expect(fn(makeEvent({ onClickableIcon: true }))).toBeTrue();
        expect(fn(makeEvent())).toBeFalse();
    });
});
