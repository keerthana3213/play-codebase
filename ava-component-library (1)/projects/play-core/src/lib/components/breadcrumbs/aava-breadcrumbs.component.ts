import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewEncapsulation,
  ElementRef,
  HostListener,
  SimpleChanges,
  ChangeDetectorRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AavaIconComponent } from '../icon/aava-icon.component';

/**
 * Dropdown item interface for breadcrumb dropdowns.
 */
interface DropdownItem {
  label: string;
  url: string;
  icon?: string;
  iconSize?: number;
}

/**
 * Breadcrumb item interface.
 */
interface BreadcrumbItem {
  label?: string;
  icon?: string;
  url: string;
  active: boolean;
  dropdownItems?: DropdownItem[];
  dropdownWidth?: number;
}

/**
 * Constants for component defaults and sizes.
 */
const ICON_SIZE_XS = 12;
const ICON_SIZE_SM = 16;
const ICON_SIZE_MD = 20;
const ICON_SIZE_LG = 24;
const SEPARATOR_SIZE_DEFAULT = 14;
const DROPDOWN_ICON_SIZE_DEFAULT = 14;
const MAX_VISIBLE_ITEMS_DEFAULT = 5;
const ELLIPSIS_DISPLAYED_ITEMS = 3;
const ANIMATION_DURATION = '0.5s';

/**
 * AavaBreadcrumbsComponent: A navigation breadcrumb component with collapsible support and dropdown menus.
 * Supports keyboard navigation, accessibility features, and dynamic breadcrumb display.
 */
@Component({
  selector: 'aava-breadcrumbs',
  imports: [CommonModule, RouterModule, AavaIconComponent],
  templateUrl: './aava-breadcrumbs.component.html',
  styleUrl: './aava-breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaBreadcrumbsComponent
  implements OnInit, OnChanges, OnDestroy
{
  @ViewChild('breadcrumbNav') breadcrumbNav?: ElementRef<HTMLElement>;

  /** Array of breadcrumb items */
  @Input() breadcrumbs: BreadcrumbItem[] = [];

  /** Breadcrumb size variant */
  @Input() size: 'sm' | 'md' | 'lg' | 'xs' = 'md';

  /** Separator icon name */
  @Input() separatorIcon = 'chevron-right';

  /** Separator icon size in pixels */
  @Input() separatorSize = SEPARATOR_SIZE_DEFAULT;

  /** Dropdown icon size in pixels */
  @Input() dropdownIconSize = DROPDOWN_ICON_SIZE_DEFAULT;

  /** Whether breadcrumbs are collapsible */
  @Input() collapsible = true;

  /** Maximum visible items before collapsing */
  @Input() maxVisibleItems = MAX_VISIBLE_ITEMS_DEFAULT;

  /** Custom styles for flyout */
  @Input() flyoutStyle?: Record<string, string>;

  /** Custom styles for the component */
  @Input() customStyles: Record<string, string> = {};

  /** Component ID */
  @Input() id = '';

  // Accessibility inputs
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledby: string | null = null;
  @Input() ariaDescribedby: string | null = null;

  // Constants
  private readonly _uniqueId = `aava-breadcrumb-${Math.random().toString(36).slice(2, 11)}`;
  private isDestroyed = false;
  private animationEndHandlers = new Map<HTMLElement, () => void>();

  // Internal state
  dropdownOpenMap = new Map<number, boolean>();
  selectedLabel = 'Home';
  clickedBreadcrumbIndex: number | null = null;
  displayedBreadcrumbs: BreadcrumbItem[] = [];

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  /**
   * Gets the unique ID for this breadcrumb component.
   * @returns The unique ID
   */
  get componentId(): string {
    return this.id || this._uniqueId;
  }

  /**
   * Gets the computed aria-label for the breadcrumb navigation.
   * @returns The aria-label or null
   */
  get computedAriaLabel(): string | null {
    if (this.ariaLabel) return this.ariaLabel;
    return 'Breadcrumb navigation';
  }

  /**
   * Gets icon size based on component size.
   * @returns The icon size in pixels
   */
  get iconSize(): number {
    try {
      if (this.size === 'lg') {
        return ICON_SIZE_LG;
      }
      if (this.size === 'md') {
        return ICON_SIZE_MD;
      }
      if (this.size === 'xs') {
        return ICON_SIZE_XS;
      }
      return ICON_SIZE_SM;
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in iconSize getter', error);
      return ICON_SIZE_SM;
    }
  }

  /**
   * Handles input changes.
   * @param changes - The changes object
   */
  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (changes['breadcrumbs']) {
        this.validateInputs();
        this.clickedBreadcrumbIndex = null;
        this.updateDisplayedBreadcrumbs();
        this.cdr.markForCheck();
      }
      if (changes['size'] || changes['maxVisibleItems'] || changes['collapsible']) {
        this.validateInputs();
        this.updateDisplayedBreadcrumbs();
        this.cdr.markForCheck();
      }
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in ngOnChanges', error);
    }
  }

  /**
   * Component initialization.
   */
  ngOnInit(): void {
    try {
      this.validateInputs();
      const active = this.breadcrumbs.find((b) => b.active);
      if (active) {
        this.selectedLabel = active.label || 'Home';
      }
      this.updateDisplayedBreadcrumbs();
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in ngOnInit', error);
    }
  }

  /**
   * Component cleanup.
   */
  ngOnDestroy(): void {
    this.isDestroyed = true;
    // Clean up animation end handlers
    this.animationEndHandlers.forEach((handler, element) => {
      element.removeEventListener('animationend', handler);
    });
    this.animationEndHandlers.clear();
    this.dropdownOpenMap.clear();
  }

  /**
   * Handles breadcrumb click events.
   * @param event - The click event
   * @param index - The breadcrumb index
   */
  onBreadcrumbClick(event: Event, index: number): void {
    try {
      event.preventDefault();

      if (this.isDestroyed) return;

      this.clickedBreadcrumbIndex = index;
      this.updateDisplayedBreadcrumbs();

      const clickedBreadcrumb = this.breadcrumbs[index];

      if (clickedBreadcrumb && clickedBreadcrumb.url) {
        this.router.navigate([clickedBreadcrumb.url]).catch((error) => {
          console.error('AavaBreadcrumbsComponent: Navigation error', error);
        });
      }

      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in onBreadcrumbClick', error);
    }
  }

  /**
   * Handles ellipsis click to expand breadcrumbs.
   */
  onEllipsisClick(): void {
    try {
      if (this.isDestroyed) return;

      // When clicking on "...", expand to show more breadcrumbs
      // Show up to the second-to-last item (keeping the last one separate)
      this.clickedBreadcrumbIndex = this.breadcrumbs.length - 2;
      this.updateDisplayedBreadcrumbs();
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in onEllipsisClick', error);
    }
  }

  /**
   * Handles keyboard events on ellipsis.
   * @param event - The keyboard event
   */
  onEllipsisKeydown(event: KeyboardEvent): void {
    try {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.onEllipsisClick();
      }
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in onEllipsisKeydown', error);
    }
  }

  /**
   * Gets the original index from displayed index.
   * @param displayedIndex - The displayed breadcrumb index
   * @returns The original breadcrumb index
   */
  getOriginalIndex(displayedIndex: number): number {
    try {
      // For non-collapsible breadcrumbs, return the index as-is
      if (!this.shouldCollapse) {
        return displayedIndex;
      }

      // Map displayed breadcrumb index to original breadcrumb index
      const displayed = this.displayedBreadcrumbs;
      const original = this.breadcrumbs;

      if (!Array.isArray(displayed) || !Array.isArray(original)) {
        return displayedIndex;
      }

      // Find the original index by matching the breadcrumb object
      const displayedBreadcrumb = displayed[displayedIndex];
      if (!displayedBreadcrumb) {
        return displayedIndex;
      }

      const originalIndex = original.findIndex(
        (b) => b.url === displayedBreadcrumb.url
      );

      return originalIndex >= 0 ? originalIndex : displayedIndex;
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in getOriginalIndex', error);
      return displayedIndex;
    }
  }

  /**
   * Gets the appropriate icon color based on breadcrumb state.
   * @param isLast - Whether this is the last breadcrumb
   * @returns The icon color CSS variable
   */
  getIconColor(isLast: boolean): string {
    try {
      if (isLast) {
        return 'var(--breadcrumbs-item-current-text)';
      }
      return 'var(--breadcrumbs-item-text)';
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in getIconColor', error);
      return 'var(--breadcrumbs-item-text)';
    }
  }

  /**
   * Handles keyboard navigation on breadcrumbs.
   * @param event - The keyboard event
   * @param index - The breadcrumb index
   */
  onBreadcrumbKeydown(event: KeyboardEvent, index: number): void {
    try {
      if (this.isDestroyed) return;

      const originalIndex = this.getOriginalIndex(index);

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          if (originalIndex < this.breadcrumbs.length - 1) {
            this.clickedBreadcrumbIndex = originalIndex + 1;
            this.updateDisplayedBreadcrumbs();
            this.cdr.markForCheck();
          }
          break;

        case 'ArrowLeft':
          event.preventDefault();
          if (originalIndex > 0) {
            this.clickedBreadcrumbIndex = originalIndex - 1;
            this.updateDisplayedBreadcrumbs();
            this.cdr.markForCheck();
          }
          break;

        case 'Home':
          event.preventDefault();
          if (this.breadcrumbs.length > 0) {
            this.clickedBreadcrumbIndex = 0;
            this.updateDisplayedBreadcrumbs();
            this.cdr.markForCheck();
          }
          break;

        case 'End':
          event.preventDefault();
          if (this.breadcrumbs.length > 0) {
            this.clickedBreadcrumbIndex = this.breadcrumbs.length - 1;
            this.updateDisplayedBreadcrumbs();
            this.cdr.markForCheck();
          }
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          this.onBreadcrumbClick(event, originalIndex);
          break;
      }
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in onBreadcrumbKeydown', error);
    }
  }

  /**
   * Handles keyboard navigation on dropdown items.
   * @param event - The keyboard event
   * @param item - The dropdown item
   * @param index - The breadcrumb index
   */
  onDropdownItemKeydown(event: KeyboardEvent, item: DropdownItem, index: number): void {
    try {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.onDropdownItemClick(item, index);
      } else if (event.key === 'Escape') {
        event.preventDefault();
        this.closeAllDropdowns();
        this.cdr.markForCheck();
      }
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in onDropdownItemKeydown', error);
    }
  }

  /**
   * Updates the displayed breadcrumbs based on current state.
   */
  updateDisplayedBreadcrumbs(): void {
    try {
      if (!Array.isArray(this.breadcrumbs)) {
        this.displayedBreadcrumbs = [];
        return;
      }

      let result: BreadcrumbItem[] = [];

      // If a breadcrumb was clicked, show path up to that point
      if (this.clickedBreadcrumbIndex !== null) {
        const pathToClicked = this.breadcrumbs.slice(
          0,
          this.clickedBreadcrumbIndex + 1
        );

        // For short breadcrumbs or when path is short, show path as-is
        if (!this.shouldCollapse || pathToClicked.length <= this.maxVisibleItems) {
          result = pathToClicked;
        } else {
          // For long paths: first + last two
          result = [pathToClicked[0], ...pathToClicked.slice(-2)];
        }

        this.displayedBreadcrumbs = result;
        return;
      }

      // If not collapsible or total breadcrumbs <= maxVisibleItems, show all
      if (!this.collapsible || this.breadcrumbs.length <= this.maxVisibleItems) {
        this.displayedBreadcrumbs = this.breadcrumbs;
        return;
      }

      // Default collapsed view: first + last two
      this.displayedBreadcrumbs = this.getCollapsedBreadcrumbs();
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in updateDisplayedBreadcrumbs', error);
      this.displayedBreadcrumbs = [];
    }
  }

  /**
   * Checks if breadcrumbs should be collapsed.
   * @returns True if breadcrumbs should be collapsed
   */
  get shouldCollapse(): boolean {
    try {
      return (
        this.collapsible &&
        Array.isArray(this.breadcrumbs) &&
        this.breadcrumbs.length > this.maxVisibleItems
      );
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in shouldCollapse getter', error);
      return false;
    }
  }

  /**
   * Checks if ellipsis should be shown.
   * @returns True if ellipsis should be shown
   */
  get shouldShowEllipsis(): boolean {
    try {
      if (!this.shouldCollapse) return false;

      const displayed = this.displayedBreadcrumbs;

      if (!Array.isArray(displayed) || !Array.isArray(this.breadcrumbs)) {
        return false;
      }

      // Show ellipsis if we have exactly 3 displayed items and there are more items in between
      if (displayed.length === ELLIPSIS_DISPLAYED_ITEMS) {
        // Check if it's first + last two pattern (meaning there are hidden items)
        const firstItem = displayed[0];
        const secondItem = displayed[1];

        if (!firstItem || !secondItem) {
          return false;
        }

        // Find indices in original breadcrumbs
        const firstIndex = this.breadcrumbs.findIndex((b) => b.url === firstItem.url);
        const secondIndex = this.breadcrumbs.findIndex((b) => b.url === secondItem.url);

        // Show ellipsis if there's a gap between first and second item
        return firstIndex === 0 && secondIndex > firstIndex + 1;
      }

      return false;
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in shouldShowEllipsis getter', error);
      return false;
    }
  }

  /**
   * Gets collapsed breadcrumbs (first + last two).
   * @returns Array of collapsed breadcrumb items
   */
  private getCollapsedBreadcrumbs(): BreadcrumbItem[] {
    try {
      if (!Array.isArray(this.breadcrumbs)) {
        return [];
      }

      if (this.breadcrumbs.length <= ELLIPSIS_DISPLAYED_ITEMS) {
        return this.breadcrumbs;
      }

      // Return first + last two
      return [this.breadcrumbs[0], ...this.breadcrumbs.slice(-2)];
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in getCollapsedBreadcrumbs', error);
      return [];
    }
  }

  /**
   * Toggles dropdown state for a breadcrumb.
   * @param index - The breadcrumb index
   */
  toggleDropdown(index: number): void {
    try {
      if (this.isDestroyed) return;

      const currentState = this.dropdownOpenMap.get(index) || false;

      if (currentState) {
        // If this dropdown is already open, close it
        this.dropdownOpenMap.set(index, false);
      } else {
        // If this dropdown is closed, close all others first, then open this one
        this.closeAllDropdowns();
        this.dropdownOpenMap.set(index, true);
      }

      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in toggleDropdown', error);
    }
  }

  /**
   * Handles dropdown item click.
   * @param item - The dropdown item
   * @param index - The breadcrumb index
   */
  onDropdownItemClick(item: DropdownItem, index: number): void {
    try {
      if (this.isDestroyed) return;

      this.closeAllDropdowns();

      if (item && item.url) {
        this.router.navigate([item.url]).catch((error) => {
          console.error('AavaBreadcrumbsComponent: Navigation error', error);
        });
        this.selectedLabel = item.label || 'Home';
      }

      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in onDropdownItemClick', error);
    }
  }

  /**
   * Checks if a dropdown is open.
   * @param index - The breadcrumb index
   * @returns True if the dropdown is open
   */
  isDropdownOpen(index: number): boolean {
    try {
      return this.dropdownOpenMap.get(index) || false;
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in isDropdownOpen', error);
      return false;
    }
  }

  /**
   * Handles document click events to close dropdowns.
   * @param event - The click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    try {
      if (this.isDestroyed) return;

      // Check if click is outside the breadcrumb component
      if (!this.elementRef.nativeElement.contains(event.target as Node)) {
        const popup = this.elementRef.nativeElement.querySelector(
          '.opened'
        ) as HTMLElement;

        if (popup) {
          // Trigger closing animation
          this.renderer.setStyle(
            popup,
            'animation',
            `shutter-close ${ANIMATION_DURATION} ease forwards`
          );

          // Wait for animation to finish, then remove the 'open' class
          const handler = () => {
            this.renderer.addClass(popup, 'opened');
            this.renderer.addClass(popup, 'open');
            popup.removeEventListener('animationend', handler);
            this.animationEndHandlers.delete(popup);
          };

          this.animationEndHandlers.set(popup, handler);
          popup.addEventListener('animationend', handler);
        }

        // Close all open dropdowns
        this.closeAllDropdowns();
        this.cdr.markForCheck();
      }
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in onDocumentClick', error);
    }
  }

  /**
   * Closes all open dropdowns.
   */
  private closeAllDropdowns(): void {
    try {
      this.dropdownOpenMap.clear();
      this.cdr.markForCheck();
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in closeAllDropdowns', error);
    }
  }

  /**
   * Gets font size based on component size.
   * @returns The font size CSS value
   */
  getFontSize(): string {
    try {
      switch (this.size) {
        case 'xs':
          return '0.75rem';
        case 'sm':
          return '0.875rem';
        case 'md':
          return '1rem';
        case 'lg':
          return '1.25rem';
        default:
          return '1rem';
      }
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in getFontSize', error);
      return '1rem';
    }
  }

  /**
   * Gets trigger height based on component size.
   * @returns The trigger height CSS value
   */
  getTriggerHeight(): string {
    try {
      switch (this.size) {
        case 'xs':
          return '24px';
        case 'sm':
          return '28px';
        case 'md':
          return '32px';
        case 'lg':
          return '40px';
        default:
          return '32px';
      }
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in getTriggerHeight', error);
      return '32px';
    }
  }

  /**
   * Gets dropdown icon size for an item.
   * @param item - The dropdown item
   * @returns The icon size in pixels
   */
  getDropdownIconSize(item: DropdownItem): number {
    try {
      if (item?.iconSize && item.iconSize > 0) {
        return item.iconSize;
      }
      return DROPDOWN_ICON_SIZE_DEFAULT;
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in getDropdownIconSize', error);
      return DROPDOWN_ICON_SIZE_DEFAULT;
    }
  }

  /**
   * Gets dropdown width for a breadcrumb.
   * @param breadcrumb - The breadcrumb item
   * @returns The dropdown width in pixels or null
   */
  getDropdownWidth(breadcrumb: BreadcrumbItem): number | null {
    try {
      if (breadcrumb?.dropdownWidth && breadcrumb.dropdownWidth > 0) {
        return breadcrumb.dropdownWidth;
      }
      return null;
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in getDropdownWidth', error);
      return null;
    }
  }

  /**
   * Checks if a breadcrumb has dropdown items.
   * @param breadcrumb - The breadcrumb item to check
   * @returns True if the breadcrumb has dropdown items
   */
  hasDropdown(breadcrumb: BreadcrumbItem): boolean {
    try {
      return !!(
        breadcrumb?.dropdownItems &&
        Array.isArray(breadcrumb.dropdownItems) &&
        breadcrumb.dropdownItems.length > 0
      );
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in hasDropdown', error);
      return false;
    }
  }

  /**
   * Validates input properties.
   */
  private validateInputs(): void {
    try {
      // Validate breadcrumbs array
      if (!Array.isArray(this.breadcrumbs)) {
        console.warn(
          'AavaBreadcrumbsComponent: breadcrumbs must be an array. Defaulting to empty array.'
        );
        this.breadcrumbs = [];
      }

      // Validate size
      const validSizes: ('sm' | 'md' | 'lg' | 'xs')[] = ['sm', 'md', 'lg', 'xs'];
      if (!validSizes.includes(this.size)) {
        console.warn(
          `AavaBreadcrumbsComponent: Invalid size '${this.size}'. Defaulting to 'md'.`
        );
        this.size = 'md';
      }

      // Validate maxVisibleItems
      if (
        typeof this.maxVisibleItems !== 'number' ||
        this.maxVisibleItems < 1
      ) {
        console.warn(
          `AavaBreadcrumbsComponent: Invalid maxVisibleItems '${this.maxVisibleItems}'. Defaulting to ${MAX_VISIBLE_ITEMS_DEFAULT}.`
        );
        this.maxVisibleItems = MAX_VISIBLE_ITEMS_DEFAULT;
      }

      // Validate separatorSize
      if (typeof this.separatorSize !== 'number' || this.separatorSize < 0) {
        console.warn(
          `AavaBreadcrumbsComponent: Invalid separatorSize '${this.separatorSize}'. Defaulting to ${SEPARATOR_SIZE_DEFAULT}.`
        );
        this.separatorSize = SEPARATOR_SIZE_DEFAULT;
      }

      // Validate dropdownIconSize
      if (
        typeof this.dropdownIconSize !== 'number' ||
        this.dropdownIconSize < 0
      ) {
        console.warn(
          `AavaBreadcrumbsComponent: Invalid dropdownIconSize '${this.dropdownIconSize}'. Defaulting to ${DROPDOWN_ICON_SIZE_DEFAULT}.`
        );
        this.dropdownIconSize = DROPDOWN_ICON_SIZE_DEFAULT;
      }
    } catch (error) {
      console.error('AavaBreadcrumbsComponent: Error in validateInputs', error);
    }
  }
}
