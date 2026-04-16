import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaTooltipDirective } from '../../directives/aava-tooltip.directive';

export interface TabTooltip {
  title?: string;
  description?: string;
  type?: 'simple' | 'card' | 'guided';
  arrow?: 'start' | 'center' | 'end';
  trigger?: 'hover' | 'click' | 'focus';
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default';
  icon?: string;
  iconColor?: string;
  width?: number | string;
  offsetTop?: number;
  offsetLeft?: number;
}

export interface TabItem {
  id: string;
  label: string;
  content?: string;
  iconName?: string;
  subtitle?: string;
  disabled?: boolean;
  badge?: string | number;
  closeable?: boolean;
  color?: string;
  backgroundColor?: string;
  tooltip?: TabTooltip;
}

export type TabVariant =
  | 'default'
  | 'button'
  | 'icon'
  | 'iconOnlySquare'
  | 'iconOnlyCircle'
  | 'iconEnhanced';
export type TabSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'aava-tabs',
  imports: [CommonModule, AavaIconComponent, AavaTooltipDirective],
  templateUrl: './aava-tabs.component.html',
  styleUrls: ['./aava-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ava-tabs',
    '[attr.data-variant]': 'variant',
    '[attr.data-size]': 'size',
    '[class.ava-tabs--disabled]': 'disabled',
    '[class.ava-tabs--scrollable]': 'scrollable',
    '[class.ava-tabs--vertical]': "orientation === 'vertical'",
    '[class.ava-tabs__container--bg]': 'showTabsContainerBg',
    '[class.ava-tabs__container-bg]': 'showcontainerBg',
  },
})
export class AavaTabsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('tabsList', { static: false }) tabsList?: ElementRef<HTMLElement>;
  @ViewChild('scrollContainer', { static: false })
  scrollContainer?: ElementRef<HTMLElement>;
  @ViewChildren('tabButton') tabButtons!: QueryList<
    ElementRef<HTMLButtonElement>
  >;

  @Input() tabs: TabItem[] = [];
  @Input() activeTabId = '';
  @Input() variant: TabVariant = 'default';
  /**
   * If true, adds a border around icon-only tabs (for iconOnlySquare and iconOnlyCircle variants).
   */
  @Input() bordered = false;
  @Input() size: TabSize = 'md'; // Now supports 'xs', 'sm', 'md', 'lg', 'xl'
  @Input() disabled = false;
  @Input() scrollable = false;
  @Input() showDropdown = false;
  @Input() maxVisibleTabs = 5;
  @Input() allowTabClose = false;
  @Input() centeredTabs = false;
  @Input() fullWidth = false;
  @Input() animateTransitions = true;
  @Input() lazyLoadContent = false;
  @Input() persistActiveTab = true;
  @Input() ariaLabel = 'Tabs navigation';
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;
  @Input() iconPosition: 'start' | 'end' = 'start';
  removeDefaultAnimation = false;
  /**
   * If true, shows tabs container background (#F0F1F2) and fixed 10px padding.
   * Padding and background are not affected by size variant.
   * Default: false
   */
  @Input() showTabsContainerBg = false;

  /**
   * If true, shows background and border for the entire tabs container using --neutral-bg.
   * Default: true
   */
  @Input() showcontainerBg = false;

  /**
   * Custom styles for the active tab in the button variant.
   * Example: { background: '#fff', color: '#e91e63', borderColor: '#e91e63' }
   */
  @Input() activeButtonTabStyles: Record<string, string> = {};
  /**
   * Shape for button variant: 'rounded' (default) or 'pill'.
   */
  @Input() buttonShape: 'rounded' | 'pill' = 'rounded';
  /**
   * Whether to show content panels below the tabs. Set to false for navigation-only tabs.
   * @default true
   */
  @Input() showContentPanels = true;
  /**
   * Custom styles for the tab row wrapper (the row containing the tabs/buttons/icons and scroll buttons).
   * Example: { borderRadius: '9999px', background: '#f5f5f5', border: '1px solid #eee' }
   */
  @Input() tabRowWrapperStyles: Record<string, string> = {};
  /**
   * Custom styles for the tab row background (the area directly behind the tabs/buttons/icons).
   * Example: { background: '#f5f5f5', borderRadius: '9999px' }
   */
  @Input() tabRowBackgroundStyles: Record<string, string> = {};
  /**
   * Orientation of the tabs: 'horizontal' (default) or 'vertical'.
   */
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() customStyles: Record<string, string> = {};
  /**
   * Custom styles for tab badges.
   * Example: { background: '#e91e63', color: '#fff', fontSize: '0.875rem' }
   */
  @Input() badgeStyles: Record<string, string> = {};
  @Input() id = '';
  @Input() activeTabIndex = 0;

  @Output() tabChange = new EventEmitter<TabItem>();
  @Output() tabClose = new EventEmitter<TabItem>();
  @Output() tabsReorder = new EventEmitter<TabItem[]>();
  @Output() dropdownToggle = new EventEmitter<boolean>();

  // Internal state
  activeTab: TabItem | null = null;
  visibleTabs: TabItem[] = [];
  hiddenTabs: TabItem[] = [];
  isDropdownOpen = false;
  canScrollLeft = false;
  canScrollRight = false;
  liquidAnimatingTabId: string | null = null;
  liquidAnimationDirection: 'ltr' | 'rtl' = 'ltr';
  liquidExitingTabId: string | null = null;
  liquidExitDirection: 'ltr' | 'rtl' = 'ltr';
  
  // Timeout tracking for cleanup
  private timeouts: ReturnType<typeof setTimeout>[] = [];
  
  // Unique ID generation
  private readonly _uniqueId = `aava-tabs-${Math.random().toString(36).slice(2, 11)}`;
  
  // Animation constants
  private readonly UNDERLINE_ANIMATION_DELAY = 250;
  private readonly UNDERLINE_RESET_DELAY = 400;
  private readonly TAB_CHANGE_ANIMATION_DELAY = 500;
  private readonly SCROLL_UPDATE_DELAY = 150;

  // Underline animation properties
  underlineStyles = {
    left: '0px',
    width: '0px',
    opacity: 0,
  };

  private previousUnderlinePosition: { left: number; width: number } | null =
    null;
  private isUnderlineAnimating = false;

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeTabs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabs'] || changes['activeTabId']) {
      this.validateInputs();
      this.initializeTabs();
      // Force change detection when activeTabId changes
      if (changes['activeTabId']) {
        this.scheduleUnderlineUpdate();
      }
    }
    if (changes['scrollable'] || changes['maxVisibleTabs']) {
      this.updateVisibleTabs();
    }
  }
  
  ngOnDestroy(): void {
    // Clear all pending timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts = [];
  }


  ngAfterViewInit(): void {
    // Check if playAnimate directive is applied on this element
    if (this.elementRef.nativeElement.hasAttribute('playAnimate')) {
      // Remove the default animation class
      this.removeDefaultAnimation = true;
    } 
    if (this.scrollable) {
      this.updateScrollButtons();
    }
    // Initialize underline position after view is ready
    this.scheduleUnderlineUpdate();
  }

  /**
   * Validates component inputs for correctness.
   */
  private validateInputs(): void {
    if (this.tabs && this.tabs.length > 0) {
      // Validate activeTabId exists in tabs
      if (this.activeTabId && !this.tabs.some(tab => tab.id === this.activeTabId)) {
        console.warn(`AavaTabsComponent: activeTabId "${this.activeTabId}" not found in tabs array`);
      }
      
      // Check for duplicate IDs
      const ids = this.tabs.map(tab => tab.id);
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        console.warn('AavaTabsComponent: Duplicate tab IDs detected');
      }
    }
  }

  /**
   * Initializes the tabs component, setting the active tab and updating visible tabs.
   */
  private initializeTabs(): void {
    if (!this.tabs || this.tabs.length === 0) {
      this.activeTab = null;
      this.cdr.markForCheck();
      return;
    }

    // Set active tab
    if (this.activeTabId) {
      const foundTab = this.tabs.find((tab) => tab.id === this.activeTabId);
      if (foundTab) {
        this.activeTab = foundTab;
      } else {
        // If activeTabId doesn't exist in tabs, fall back to first available tab
        this.activeTab = this.tabs.find((tab) => !tab.disabled) || this.tabs[0];
        if (this.activeTab) {
          this.activeTabId = this.activeTab.id;
        }
      }
    } else {
      // If no active tab set, use first non-disabled tab
      this.activeTab = this.tabs.find((tab) => !tab.disabled) || this.tabs[0];
      if (this.activeTab) {
        this.activeTabId = this.activeTab.id;
      }
    }

    this.updateVisibleTabs();

    // Force change detection to ensure proper rendering
    this.cdr.markForCheck();
  }

  /**
   * Updates the visible and hidden tabs based on scrollable and dropdown settings.
   */
  private updateVisibleTabs(): void {
    if (!this.scrollable || !this.showDropdown) {
      this.visibleTabs = this.tabs;
      this.hiddenTabs = [];
      return;
    }

    if (this.tabs && this.tabs.length > this.maxVisibleTabs) {
      this.visibleTabs = this.tabs.slice(0, this.maxVisibleTabs - 1);
      this.hiddenTabs = this.tabs.slice(this.maxVisibleTabs - 1);
    } else {
      this.visibleTabs = this.tabs;
      this.hiddenTabs = [];
    }
  }
  
  /**
   * Schedules an underline position update using setTimeout with proper tracking.
   */
  private scheduleUnderlineUpdate(): void {
    const timeoutId = setTimeout(() => {
      this.timeouts = this.timeouts.filter(id => id !== timeoutId);
      this.updateUnderlinePosition();
    }, 0);
    this.timeouts.push(timeoutId);
  }

  /**
   * Updates the underline indicator position for the default variant.
   */
  private updateUnderlinePosition(): void {
    if (
      this.variant !== 'default' ||
      this.orientation === 'vertical' ||
      !this.activeTab ||
      !this.tabButtons ||
      !this.visibleTabs ||
      this.visibleTabs.length === 0
    ) {
      this.underlineStyles.opacity = 0;
      return;
    }

    try {
      const activeTabIndex = this.visibleTabs.findIndex(
        (tab) => tab.id === this.activeTab?.id
      );
      
      if (activeTabIndex === -1) {
        this.underlineStyles.opacity = 0;
        return;
      }
      
      const tabButtonsArray = this.tabButtons.toArray();
      if (activeTabIndex >= tabButtonsArray.length) {
        this.underlineStyles.opacity = 0;
        return;
      }
      
      const activeTabButton = tabButtonsArray[activeTabIndex];

      if (activeTabButton?.nativeElement) {
        const buttonElement = activeTabButton.nativeElement;
        const newLeft = buttonElement.offsetLeft;
        const newWidth = buttonElement.offsetWidth;

        // If we have a previous position, animate the flow
        if (this.previousUnderlinePosition && !this.isUnderlineAnimating) {
          this.animateUnderlineFlow(this.previousUnderlinePosition, {
            left: newLeft,
            width: newWidth,
          });
        } else {
          // First time or immediate update
          this.underlineStyles = {
            left: `${newLeft}px`,
            width: `${newWidth}px`,
            opacity: 1,
          };
        }

        // Store current position for next animation
        this.previousUnderlinePosition = { left: newLeft, width: newWidth };
        this.cdr.markForCheck();
      }
    } catch (error) {
      console.error('AavaTabsComponent: Error updating underline position', error);
      this.underlineStyles.opacity = 0;
    }
  }

  /**
   * Animates the underline flow between two positions.
   */
  private animateUnderlineFlow(
    from: { left: number; width: number },
    to: { left: number; width: number }
  ): void {
    this.isUnderlineAnimating = true;

    // Calculate the direction and create a flowing effect
    const direction = to.left > from.left ? 'ltr' : 'rtl';
    const totalDistance = Math.abs(to.left - from.left);
    const maxWidth = Math.max(from.width, to.width);

    // Phase 1: Stretch the underline to cover both positions
    const stretchWidth = totalDistance + maxWidth;
    const stretchLeft = direction === 'ltr' ? from.left : to.left;

    this.underlineStyles = {
      left: `${stretchLeft}px`,
      width: `${stretchWidth}px`,
      opacity: 1,
    };
    this.cdr.markForCheck();

    // Phase 2: Contract to the final position
    const timeoutId1 = setTimeout(() => {
      this.timeouts = this.timeouts.filter(id => id !== timeoutId1);
      this.underlineStyles = {
        left: `${to.left}px`,
        width: `${to.width}px`,
        opacity: 1,
      };
      this.cdr.markForCheck();

      // Reset animation flag
      const timeoutId2 = setTimeout(() => {
        this.timeouts = this.timeouts.filter(id => id !== timeoutId2);
        this.isUnderlineAnimating = false;
      }, this.UNDERLINE_RESET_DELAY);
      this.timeouts.push(timeoutId2);
    }, this.UNDERLINE_ANIMATION_DELAY);
    this.timeouts.push(timeoutId1);
  }

  /**
   * Handles tab click event.
   */
  onTabClick(tab: TabItem): void {
    if (!tab || tab.disabled || this.disabled) return;

    this.activeTab = tab;
    this.activeTabId = tab.id;
    this.tabChange.emit(tab);

    if (this.isDropdownOpen) {
      this.toggleDropdown();
    }
    this.cdr.markForCheck();

    // Update underline position for default variant
    if (this.variant === 'default') {
      this.scheduleUnderlineUpdate();
    }
  }

  /**
   * Handles tab click with animation support.
   */
  onTabClickWithAnimation(tab: TabItem): void {
    if (!tab || tab.disabled || this.disabled || this.isTabActive(tab)) return;
    if (this.variant === 'button' && this.hasCustomActiveButtonTabStyles) {
      this.onTabClick(tab);
      return;
    }
    
    if (!this.visibleTabs || this.visibleTabs.length === 0) return;
    
    const currentIndex = this.visibleTabs.findIndex(
      (t) => t.id === this.activeTabId
    );
    const nextIndex = this.visibleTabs.findIndex((t) => t.id === tab.id);
    
    if (nextIndex === -1) {
      this.onTabClick(tab);
      return;
    }

    // Determine direction based on orientation
    let direction: 'ltr' | 'rtl';
    if (this.orientation === 'vertical') {
      // For vertical: top-to-bottom = 'ltr', bottom-to-top = 'rtl'
      direction = nextIndex > currentIndex ? 'ltr' : 'rtl';
    } else {
      // For horizontal: left-to-right = 'ltr', right-to-left = 'rtl'
      direction = nextIndex > currentIndex ? 'ltr' : 'rtl';
    }

    // Set up animations
    this.liquidAnimationDirection = direction;
    this.liquidAnimatingTabId = tab.id;
    this.liquidExitingTabId = this.activeTabId;
    this.liquidExitDirection = direction;

    // Update active tab immediately for underline positioning
    this.activeTab = tab;
    this.activeTabId = tab.id;

    // Handle dropdown if open
    if (this.isDropdownOpen) {
      this.toggleDropdown();
    }

    // Force change detection to apply classes
    this.cdr.markForCheck();

    // Update underline position immediately for default variant
    if (this.variant === 'default') {
      this.scheduleUnderlineUpdate();
    }

    // Emit tab change and clear animations after animation completes
    const timeoutId = setTimeout(() => {
      this.timeouts = this.timeouts.filter(id => id !== timeoutId);
      this.tabChange.emit(tab);
      this.liquidAnimatingTabId = null;
      this.liquidExitingTabId = null;
      this.cdr.markForCheck();
    }, this.TAB_CHANGE_ANIMATION_DELAY);
    this.timeouts.push(timeoutId);
  }

  /**
   * Handles tab close event with focus management.
   */
  onTabClose(tab: TabItem, event: Event): void {
    event.stopPropagation();
    if (!tab || tab.disabled || this.disabled) return;

    // Check if the closed tab is the active tab
    const isActiveTab = this.isTabActive(tab);
    
    this.tabClose.emit(tab);
    
    // If the active tab is being closed, switch to another tab
    if (isActiveTab && this.tabs && this.tabs.length > 1) {
      const remainingTabs = this.tabs.filter(t => t.id !== tab.id);
      const nextTab = remainingTabs.find(t => !t.disabled) || remainingTabs[0];
      
      if (nextTab) {
        // Use setTimeout to ensure DOM is updated after tab removal
        const timeoutId = setTimeout(() => {
          this.timeouts = this.timeouts.filter(id => id !== timeoutId);
          this.onTabClick(nextTab);
          this.focusTab(nextTab);
        }, 0);
        this.timeouts.push(timeoutId);
      }
    }
  }
  
  /**
   * Focuses a specific tab button.
   */
  private focusTab(tab: TabItem): void {
    if (!tab || !this.tabButtons) return;
    
    try {
      const tabIndex = this.visibleTabs.findIndex(t => t.id === tab.id);
      if (tabIndex !== -1) {
        const tabButtonsArray = this.tabButtons.toArray();
        if (tabIndex < tabButtonsArray.length) {
          tabButtonsArray[tabIndex]?.nativeElement?.focus();
        }
      }
    } catch (error) {
      console.error('AavaTabsComponent: Error focusing tab', error);
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.dropdownToggle.emit(this.isDropdownOpen);
  }

  /**
   * Scrolls tabs container to the left.
   */
  scrollLeft(): void {
    if (!this.scrollContainer?.nativeElement) return;

    try {
      const container = this.scrollContainer.nativeElement;
      const scrollAmount = 200;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });

      const timeoutId = setTimeout(() => {
        this.timeouts = this.timeouts.filter(id => id !== timeoutId);
        this.updateScrollButtons();
      }, this.SCROLL_UPDATE_DELAY);
      this.timeouts.push(timeoutId);
    } catch (error) {
      console.error('AavaTabsComponent: Error scrolling left', error);
    }
  }

  /**
   * Scrolls tabs container to the right.
   */
  scrollRight(): void {
    if (!this.scrollContainer?.nativeElement) return;

    try {
      const container = this.scrollContainer.nativeElement;
      const scrollAmount = 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      const timeoutId = setTimeout(() => {
        this.timeouts = this.timeouts.filter(id => id !== timeoutId);
        this.updateScrollButtons();
      }, this.SCROLL_UPDATE_DELAY);
      this.timeouts.push(timeoutId);
    } catch (error) {
      console.error('AavaTabsComponent: Error scrolling right', error);
    }
  }

  /**
   * Updates the scroll button visibility based on scroll position.
   */
  private updateScrollButtons(): void {
    if (!this.scrollContainer?.nativeElement) {
      this.canScrollLeft = false;
      this.canScrollRight = false;
      return;
    }

    try {
      const container = this.scrollContainer.nativeElement;
      this.canScrollLeft = container.scrollLeft > 0;
      this.canScrollRight =
        container.scrollLeft < container.scrollWidth - container.clientWidth;
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaTabsComponent: Error updating scroll buttons', error);
      this.canScrollLeft = false;
      this.canScrollRight = false;
    }
  }

  onScroll(): void {
    this.updateScrollButtons();
  }

  /**
   * Handles keyboard navigation for tabs.
   */
  onKeyDown(event: KeyboardEvent, tab: TabItem): void {
    if (!tab || tab.disabled || this.disabled) return;
    
    // Handle Enter and Space for activation
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onTabClick(tab);
      return;
    }
    
    // Handle arrow keys for navigation
    const enabledTabs = (this.visibleTabs || []).filter(t => !t.disabled);
    if (enabledTabs.length === 0) return;
    
    const currentIndex = enabledTabs.findIndex(t => t.id === tab.id);
    if (currentIndex === -1) return;
    
    let targetIndex = currentIndex;
    let handled = false;
    
    if (this.orientation === 'horizontal') {
      if (event.key === 'ArrowLeft') {
        targetIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
        handled = true;
      } else if (event.key === 'ArrowRight') {
        targetIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
        handled = true;
      }
    } else {
      // Vertical orientation
      if (event.key === 'ArrowUp') {
        targetIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
        handled = true;
      } else if (event.key === 'ArrowDown') {
        targetIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
        handled = true;
      }
    }
    
    // Handle Home and End keys
    if (event.key === 'Home') {
      event.preventDefault();
      targetIndex = 0;
      handled = true;
    } else if (event.key === 'End') {
      event.preventDefault();
      targetIndex = enabledTabs.length - 1;
      handled = true;
    }
    
    if (handled && targetIndex !== currentIndex && enabledTabs[targetIndex]) {
      event.preventDefault();
      const targetTab = enabledTabs[targetIndex];
      
      // Update active tab
      this.activeTab = targetTab;
      this.activeTabId = targetTab.id;
      this.tabChange.emit(targetTab);
      
      // Focus the target tab
      this.focusTab(targetTab);
      
      // Update underline if default variant
      if (this.variant === 'default') {
        this.scheduleUnderlineUpdate();
      }
      
      this.cdr.markForCheck();
    }
  }

  // Utility methods
  isTabActive(tab: TabItem): boolean {
    return this.activeTab?.id === tab.id;
  }

  isTabInDropdown(tab: TabItem): boolean {
    return this.hiddenTabs.includes(tab);
  }

  getActiveTabContent(): string {
    return this.activeTab?.content || '';
  }

  // Icon size mapping based on tab size
  getIconSize(): number {
    switch (this.size) {
      case 'xs':
        return 12;
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      case 'xl':
        return 24;
      default:
        return 20;
    }
  }

  /**
   * Gets the unique ID for the tabs container.
   */
  get tabsContainerId(): string {
    return this.id ? `aava-tabs-${this.id}` : this._uniqueId;
  }
  
  /**
   * Generates a unique ID for a tab.
   */
  getTabId(tab: TabItem): string {
    return `tab-${tab.id}-${this._uniqueId}`;
  }

  /**
   * Generates a unique ID for a tab panel.
   */
  getPanelId(tab: TabItem): string {
    return `panel-${tab.id}-${this._uniqueId}`;
  }
  
  /**
   * Gets computed aria-label based on inputs.
   */
  get computedAriaLabel(): string | null {
    return this.ariaLabelledby ? null : (this.ariaLabel || null);
  }

  // TrackBy function for ngFor optimization
  trackByTabId(index: number, tab: TabItem): string {
    return tab.id;
  }

  // Generate selector for content projection
  getTabContentSelector(tab: TabItem): string {
    return `[data-tab-id="${tab.id}"]`;
  }

  hasTabRowBackgroundStyles(): boolean {
    return (
      !!this.tabRowBackgroundStyles &&
      Object.keys(this.tabRowBackgroundStyles).length > 0
    );
  }

  /**
   * Checks if custom active button tab styles are provided.
   */
  get hasCustomActiveButtonTabStyles(): boolean {
    return (
      this.activeButtonTabStyles &&
      Object.keys(this.activeButtonTabStyles).length > 0
    );
  }
}
