import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaFileAttachPillComponent, FileAttachOption } from './aava-file-attach-pill.component';

describe('AavaFileAttachPillComponent (branch-complete)', () => {
    let fixture: ComponentFixture<AavaFileAttachPillComponent>;
    let component: AavaFileAttachPillComponent;

    function mkEvt(): MouseEvent & { stopPropagation: jasmine.Spy } {
        const ev = new MouseEvent('click') as MouseEvent & { stopPropagation: jasmine.Spy };
        (ev as any).stopPropagation = jasmine.createSpy('stopPropagation');
        return ev;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AavaFileAttachPillComponent],
        })
            .overrideComponent(AavaFileAttachPillComponent, {
                set: {
                    // Minimal template that wires handlers; avoids child deps.
                    template: `
            <div class="pill-root"
                 (mouseenter)="onMouseEnter()"
                 (mouseleave)="onMouseLeave()">
              <button class="pill-trigger" (click)="toggleDropdown($event)">{{ mainText }}</button>
              <div class="dropdown"
                   *ngIf="isDropdownOpen()"
                   (mouseenter)="onDropdownMouseEnter()"
                   (mouseleave)="onDropdownMouseLeave()">
                <button class="opt"
                        *ngFor="let o of options; trackBy: trackByOptionValue"
                        (click)="selectOption(o, $event)">{{o.name}}</button>
              </div>
            </div>
          `
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(AavaFileAttachPillComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => fixture.destroy());

    it('creates', () => {
        expect(component).toBeTruthy();
    });

    it('defaults & signals', () => {
        expect(component.options.length).toBe(3);
        expect(component.mainText).toBe('Attach File');
        expect(component.currentTheme).toBe('light');
        expect(component.useCustomMainIcon).toBeFalse();
        expect(component.iconSize).toBe(20);
        expect(component.isDropdownOpen()).toBeFalse();
        expect(component.isHovered()).toBeFalse();
    });

    it('host theme classes + iconColor', () => {
        const host = fixture.nativeElement as HTMLElement;
        expect(host.classList.contains('theme-light')).toBeTrue();
        expect(component.iconColor).toBe('gray');

        component.currentTheme = 'dark';
        fixture.detectChanges();
        expect(host.classList.contains('theme-dark')).toBeTrue();
        expect(host.classList.contains('theme-light')).toBeFalse();
        expect(component.iconColor).toBe('white');
    });

    it('trackBy uses option.value and is stable', () => {
        const a: FileAttachOption = { name: 'A', icon: 'i', value: 'same' };
        const b: FileAttachOption = { name: 'B', icon: 'i', value: 'same' };
        expect(component.trackByOptionValue(0, a)).toBe('same');
        expect(component.trackByOptionValue(1, b)).toBe('same');
    });

    it('isCustomIcon: main vs per-option flag', () => {
        component.useCustomMainIcon = false;
        expect(component.isCustomIcon()).toBeFalse();
        component.useCustomMainIcon = true;
        expect(component.isCustomIcon()).toBeTrue();

        const withFlag: FileAttachOption = { name: 'C', icon: '/c.svg', value: 'c', useCustomIcon: true };
        const withoutFlag: FileAttachOption = { name: 'D', icon: 'link', value: 'd' };
        expect(component.isCustomIcon(withFlag)).toBeTrue();
        expect(component.isCustomIcon(withoutFlag)).toBeFalse();
    });

    it('toggleDropdown: open -> close with stopPropagation', () => {
        const e1 = mkEvt();
        component.toggleDropdown(e1);
        expect(e1.stopPropagation).toHaveBeenCalled();
        expect(component.isDropdownOpen()).toBeTrue();

        const e2 = mkEvt();
        component.toggleDropdown(e2);
        expect(e2.stopPropagation).toHaveBeenCalled();
        expect(component.isDropdownOpen()).toBeFalse();
    });

    it('selectOption emits & closes (and stops propagation)', () => {
        const opt = component.options[0];
        const got: FileAttachOption[] = [];
        component.optionSelected.subscribe(v => got.push(v));
        component.isDropdownOpen.set(true);

        const ev = mkEvt();
        component.selectOption(opt, ev);
        expect(ev.stopPropagation).toHaveBeenCalled();
        expect(got).toEqual([opt]);
        expect(component.isDropdownOpen()).toBeFalse();
        expect(component.isHovered()).toBeFalse();
    });

    it('hover enter/leave: delayed close when not over dropdown', fakeAsync(() => {
        component.onMouseEnter();
        expect(component.isHovered()).toBeTrue();

        component.isDropdownOpen.set(true);
        component.onMouseLeave(); // schedules close in 100ms

        tick(90);
        expect(component.isDropdownOpen()).toBeTrue();

        tick(15); // >100ms
        expect(component.isDropdownOpen()).toBeFalse();
        expect(component.isHovered()).toBeFalse();
    }));

    it('dropdown guard: entering dropdown prevents timed close until leave', fakeAsync(() => {
        component.isDropdownOpen.set(true);
        component.onDropdownMouseEnter(); // guard = true
        component.onMouseLeave();         // scheduled but guarded
        tick(150);
        expect(component.isDropdownOpen()).toBeTrue();

        component.onDropdownMouseLeave(); // guard=false -> immediate close
        expect(component.isDropdownOpen()).toBeFalse();
    }));

    it('document click: outside closes, inside does not', () => {
        // open
        component.isDropdownOpen.set(true);

        // Outside
        const containsSpy = spyOn(component['elementRef'].nativeElement, 'contains').and.returnValue(false);
        document.dispatchEvent(new MouseEvent('click'));
        expect(containsSpy).toHaveBeenCalled();
        expect(component.isDropdownOpen()).toBeFalse();

        // Inside
        component.isDropdownOpen.set(true);
        (containsSpy as jasmine.Spy).and.returnValue(true);
        document.dispatchEvent(new MouseEvent('click'));
        expect(component.isDropdownOpen()).toBeTrue();
    });

    it('rapid open -> dropdown enter -> select option sequence works', () => {
        component.toggleDropdown(mkEvt());
        expect(component.isDropdownOpen()).toBeTrue();

        component.onDropdownMouseEnter();
        const opt = component.options[1];

        const got: FileAttachOption[] = [];
        component.optionSelected.subscribe(v => got.push(v));

        component.selectOption(opt, mkEvt());
        expect(got[0]).toEqual(opt);
        expect(component.isDropdownOpen()).toBeFalse();
    });

    it('handles empty options input safely', () => {
        component.options = [];
        expect(() => component.trackByOptionValue(0, { name: 'x', icon: 'i', value: 'x' })).not.toThrow();
    });

    it('multiple toggles and final outside click leaves it closed & not hovered', () => {
        component.toggleDropdown(mkEvt()); // open
        component.toggleDropdown(mkEvt()); // close
        component.toggleDropdown(mkEvt()); // open again
        const containsSpy = spyOn(component['elementRef'].nativeElement, 'contains').and.returnValue(false);
        document.dispatchEvent(new MouseEvent('click'));
        expect(containsSpy).toHaveBeenCalled();
        expect(component.isDropdownOpen()).toBeFalse();
        expect(component.isHovered()).toBeFalse();
    });

    it('hover then toggle then leave: closes via timeout', fakeAsync(() => {
        component.onMouseEnter();
        component.toggleDropdown(mkEvt());
        component.onMouseLeave();
        tick(110);
        expect(component.isDropdownOpen()).toBeFalse();
        expect(component.isHovered()).toBeFalse();
    }));
});
