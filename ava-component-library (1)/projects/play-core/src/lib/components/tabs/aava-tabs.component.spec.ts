import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AavaTabsComponent, TabItem } from './aava-tabs.component';
import { ChangeDetectorRef } from '@angular/core';

describe('AavaTabsComponent', () => {
  let component: AavaTabsComponent;
  let fixture: ComponentFixture<AavaTabsComponent>;
  let tabs: TabItem[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AavaTabsComponent],
      providers: [ChangeDetectorRef]
    }).compileComponents();

    fixture = TestBed.createComponent(AavaTabsComponent);
    component = fixture.componentInstance;

    tabs = [
      { id: 't1', label: 'Tab 1', content: 'Content 1' },
      { id: 't2', label: 'Tab 2', content: 'Content 2', disabled: true },
      { id: 't3', label: 'Tab 3', content: 'Content 3' }
    ];

    component.tabs = tabs;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should initialize tabs', () => {
    component.activeTabId = 't1';
    component.ngOnInit();
    expect(component.activeTab?.id).toBe('t1');
  });

  it('ngOnChanges should call initializeTabs and updateVisibleTabs', () => {
    spyOn<any>(component, 'initializeTabs').and.callThrough();
    spyOn<any>(component, 'updateVisibleTabs').and.callThrough();
    component.ngOnChanges({ tabs: { currentValue: tabs, previousValue: [], firstChange: true, isFirstChange: () => true } });
    expect(component['initializeTabs']).toHaveBeenCalled();
    expect(component['updateVisibleTabs']).toHaveBeenCalled();
  });

  it('should fallback to first non-disabled tab when activeTabId is invalid', () => {
    component.activeTabId = 'invalid';
    component.ngOnInit();
    expect(component.activeTab?.id).toBe('t1');
  });

  it('onTabClick should set active tab and emit', () => {
    spyOn(component.tabChange, 'emit');
    component.onTabClick(tabs[0]);
    expect(component.activeTab?.id).toBe('t1');
    expect(component.tabChange.emit).toHaveBeenCalledWith(tabs[0]);
  });

  it('onTabClick should not emit if disabled', () => {
    spyOn(component.tabChange, 'emit');
    component.onTabClick(tabs[1]);
    expect(component.tabChange.emit).not.toHaveBeenCalled();
  });

  it('onTabClickWithAnimation should handle animation flow', fakeAsync(() => {
    spyOn(component.tabChange, 'emit');
    component.activeTabId = 't1';
    component.visibleTabs = tabs;
    component.onTabClickWithAnimation(tabs[2]);
    tick(600);
    expect(component.tabChange.emit).toHaveBeenCalledWith(tabs[2]);
  }));

  it('onTabClose should emit and stop event', () => {
    spyOn(component.tabClose, 'emit');
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    component.onTabClose(tabs[0], event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.tabClose.emit).toHaveBeenCalledWith(tabs[0]);
  });

  it('toggleDropdown should toggle and emit', () => {
    spyOn(component.dropdownToggle, 'emit');
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeTrue();
    expect(component.dropdownToggle.emit).toHaveBeenCalledWith(true);
  });

  it('scrollLeft and scrollRight should call updateScrollButtons', fakeAsync(() => {
    const mockEl = document.createElement('div');
    Object.defineProperty(mockEl, 'scrollWidth', { value: 1000 });
    Object.defineProperty(mockEl, 'clientWidth', { value: 100 });
    mockEl.scrollLeft = 100;
    spyOn(mockEl, 'scrollBy');
    component.scrollContainer = { nativeElement: mockEl } as any;

    component.scrollLeft();
    tick(200);
    expect(mockEl.scrollBy).toHaveBeenCalled();

    component.scrollRight();
    tick(200);
    expect(mockEl.scrollBy).toHaveBeenCalled();
  }));

  it('onScroll should update scroll buttons', () => {
    spyOn<any>(component, 'updateScrollButtons');
    component.scrollContainer = { nativeElement: document.createElement('div') } as any;
    component.onScroll();
    expect(component['updateScrollButtons']).toHaveBeenCalled();
  });

  it('onKeyDown should call onTabClick on Enter/Space', () => {
    spyOn(component, 'onTabClick');
    component.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }), tabs[0]);
    component.onKeyDown(new KeyboardEvent('keydown', { key: ' ' }), tabs[0]);
    expect(component.onTabClick).toHaveBeenCalledTimes(2);
  });

  it('isTabActive should return correct state', () => {
    component.activeTab = tabs[0];
    expect(component.isTabActive(tabs[0])).toBeTrue();
    expect(component.isTabActive(tabs[2])).toBeFalse();
  });

  it('isTabInDropdown should return true if tab is hidden', () => {
    component.hiddenTabs = [tabs[2]];
    expect(component.isTabInDropdown(tabs[2])).toBeTrue();
  });

  it('getActiveTabContent should return content', () => {
    component.activeTab = tabs[0];
    expect(component.getActiveTabContent()).toBe('Content 1');
  });

  it('getIconSize should return sizes based on variant and size', () => {
    component.variant = 'iconOnlySquare';
    component.size = 'xl';
    expect(component.getIconSize()).toBe(24);
    component.variant = 'default';
    component.size = 'sm';
    expect(component.getIconSize()).toBe(16);
  });

  it('getTabId and getPanelId should return ids', () => {
    expect(component.getTabId(tabs[0])).toBe('tab-t1');
    expect(component.getPanelId(tabs[0])).toBe('panel-t1');
  });

  it('trackByTabId should return id', () => {
    expect(component.trackByTabId(0, tabs[0])).toBe('t1');
  });

  it('getTabContentSelector should return selector', () => {
    expect(component.getTabContentSelector(tabs[0])).toBe('[data-tab-id="t1"]');
  });

  it('hasTabRowBackgroundStyles should detect styles', () => {
    component.tabRowBackgroundStyles = { background: 'red' };
    expect(component.hasTabRowBackgroundStyles()).toBeTrue();
  });

  it('hasCustomActiveButtonTabStyles should detect styles', () => {
    component.activeButtonTabStyles = { color: 'red' };
    expect(component.hasCustomActiveButtonTabStyles).toBeTrue();
  });
});

