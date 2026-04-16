import { ComponentFixture, TestBed } from '@angular/core/testing';
// import {  ListCardData, ListCardItem } from './list-card.component';
import { By } from '@angular/platform-browser';
import { AavaListCardComponent, ListCardData, ListCardItem } from './aava-list-card.component';
describe('ListCardComponent (logic-focused)', () => {
  let component: AavaListCardComponent;
  let fixture: ComponentFixture<AavaListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaListCardComponent],
    })
      .overrideComponent(AavaListCardComponent, {
        set: {
          // Minimal template to trigger handlers without rendering child deps
          template: `
            <div class="host">
              <h3 class="heading">{{ data.heading }}</h3>

              <!-- Button triggers onButtonClick with first item -->
              <button
                class="btn-action"
                (click)="onButtonClick(data.listItems[0]?.column3?.button?.action, data.listItems[0])">
                action
              </button>

              <!-- Anchor triggers onLinkClick with first item -->
              <a
                class="lnk"
                (click)="onLinkClick(data.listItems[0]?.column2?.link, data.listItems[0])">
                link
              </a>
            </div>
          `,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AavaListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with safe defaults', () => {
    expect(component).toBeTruthy();
    expect(component.data).toEqual({ heading: '', listItems: [] } as ListCardData);
  });

  it('should render heading from data (via overridden template)', () => {
    component.data = { heading: 'Team Members', listItems: [] };
    fixture.detectChanges();
    const headingEl = fixture.debugElement.query(By.css('.heading')).nativeElement as HTMLElement;
    // expect(headingEl.textContent?.trim()).toBe('Team Members');
  });

  it('onButtonClick should emit when action is provided', () => {
    const item: ListCardItem = {
      column2: { heading: 'Row 1' },
      column3: { button: { text: 'Delete', action: 'delete' } },
    };
    component.data = { heading: 'Test', listItems: [item] };
    fixture.detectChanges();

    const spy = jasmine.createSpy('buttonSpy');
    component.buttonClicked.subscribe(spy);

    const btn = fixture.debugElement.query(By.css('.btn-action'));
    btn.triggerEventHandler('click', {});
    // or (btn.nativeElement as HTMLButtonElement).click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.calls.mostRecent().args[0]).toEqual({ action: 'delete', item });
  });

  it('onButtonClick should NOT emit when action is undefined', () => {
    const item: ListCardItem = {
      column2: { heading: 'Row 1' },
      column3: { button: { text: 'Do Nothing', action: undefined } },
    };
    component.data = { heading: 'Test', listItems: [item] };
    fixture.detectChanges();

    const spy = jasmine.createSpy('buttonSpy');
    component.buttonClicked.subscribe(spy);

    const btn = fixture.debugElement.query(By.css('.btn-action'));
    btn.triggerEventHandler('click', {});

    expect(spy).not.toHaveBeenCalled();
  });

  it('onLinkClick should emit linkClicked with payload', () => {
    const linkObj = { text: 'Open', href: 'https://example.com', color: 'blue' };
    const item: ListCardItem = {
      column2: { heading: 'Row 1', link: linkObj },
    };
    component.data = { heading: 'Test', listItems: [item] };
    fixture.detectChanges();

    const spy = jasmine.createSpy('linkSpy');
    component.linkClicked.subscribe(spy);

    const lnk = fixture.debugElement.query(By.css('.lnk'));
    lnk.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.calls.mostRecent().args[0]).toEqual({ link: linkObj, item });
  });

  it('direct method call: onButtonClick emits only when action truthy', () => {
    const item: ListCardItem = {};
    const spy = jasmine.createSpy('btn');

    component.buttonClicked.subscribe(spy);

    component.onButtonClick('save', item);
    component.onButtonClick('', item as any);       // falsy
    component.onButtonClick(undefined, item);       // falsy

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.calls.mostRecent().args[0]).toEqual({ action: 'save', item });
  });

  it('direct method call: onLinkClick always emits', () => {
    const item: ListCardItem = {};
    const payload = { some: 'link' };

    const spy = jasmine.createSpy('lnk');
    component.linkClicked.subscribe(spy);

    component.onLinkClick(payload, item);
    component.onLinkClick(undefined as any, item); // even undefined is forwarded

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.calls.allArgs()[0][0]).toEqual({ link: payload, item });
    expect(spy.calls.allArgs()[1][0]).toEqual({ link: undefined, item });
  });
  it('should render heading from data (via overridden template)', () => {
    const obj = { heading: 'Team Members', listItems: [] };

    // ✅ triggers OnPush input change detection
    fixture.componentRef.setInput('data', obj);
    fixture.detectChanges();

    const headingEl = fixture.debugElement.query(By.css('.heading')).nativeElement as HTMLElement;
    expect(headingEl.textContent?.trim()).toBe('Team Members');
  });
});
