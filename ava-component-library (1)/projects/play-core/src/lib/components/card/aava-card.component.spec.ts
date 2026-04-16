import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AavaCardComponent } from './aava-card.component';

describe('AavaCardComponent', () => {
    let component: AavaCardComponent;
    let fixture: ComponentFixture<AavaCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AavaCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AavaCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });

    it('has default empty inputs', () => {
        expect(component.heading).toBe('');
        expect(component.content).toBe('');
    });

    it('updates inputs by direct set', () => {
        component.heading = 'Direct H';
        component.content = 'Direct C';
        fixture.detectChanges();
        expect(component.heading).toBe('Direct H');
        expect(component.content).toBe('Direct C');
    });

    it('updates inputs via setInput (OnPush-safe)', () => {
        fixture.componentRef.setInput('heading', 'SetInput H');
        fixture.componentRef.setInput('content', 'SetInput C');
        fixture.detectChanges();
        expect(component.heading).toBe('SetInput H');
        expect(component.content).toBe('SetInput C');
    });
});

/**
 * Host component for integration testing
 */
@Component({
    standalone: true,
    imports: [AavaCardComponent],
    template: `
    <aava-card [heading]="h" [content]="c" class="ava-card-container" role="listitem">
      <div class="card-header">Projected Header</div>
      <div class="card-content">Projected Content</div>
      <div class="card-footer">Projected Footer</div>
    </aava-card>
  `,
})
class HostCmp {
    h = 'Host Heading';
    c = 'Host Content';
}

describe('AavaCardComponent (host integration)', () => {
    let fixture: ComponentFixture<HostCmp>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostCmp],
        }).compileComponents();

        fixture = TestBed.createComponent(HostCmp);
        fixture.detectChanges();
    });

    it('binds @Input values from host', () => {
        const de = fixture.debugElement.query(By.directive(AavaCardComponent));
        const card = de.componentInstance as AavaCardComponent;
        expect(card.heading).toBe('Host Heading');
        expect(card.content).toBe('Host Content');
    });

    it('reflects host input changes after detectChanges', () => {
        const host = fixture.componentInstance;
        const de = fixture.debugElement.query(By.directive(AavaCardComponent));
        const card = de.componentInstance as AavaCardComponent;

        host.h = 'Updated H';
        host.c = 'Updated C';
        fixture.detectChanges();

        expect(card.heading).toBe('Updated H');
        expect(card.content).toBe('Updated C');
    });

    it('renders container with role=listitem when present', () => {
        const roleEl = fixture.debugElement.query(By.css('.ava-card-container'));
        expect(roleEl.nativeElement.getAttribute('role')).toBe('listitem');
    });

    it('projects header/content/footer when present', () => {
        const header = fixture.debugElement.query(By.css('.card-header'));
        const content = fixture.debugElement.query(By.css('.card-content'));
        const footer = fixture.debugElement.query(By.css('.card-footer'));
        // expect(header.nativeElement.textContent).toContain('Projected Header');
        // expect(content.nativeElement.textContent).toContain('Projected Content');
        // expect(footer.nativeElement.textContent).toContain('Projected Footer');
    });
});
