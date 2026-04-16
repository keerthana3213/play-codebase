import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ElementRef,
} from '@angular/core';
import { AavaAvatarsComponent, AavaIconComponent, AavaDialogService, AavaButtonComponent, AavaSelectComponent, AavaSelectOptionComponent, AavaTooltipDirective, AvatarSize } from '../../../public-api';
import { CommonModule } from '@angular/common';
import {
  AavaNavigationCardsComponent,
  NavigationCard,
  NavigationCardsConfig,
} from '../aava-navigation-cards/aava-navigation-cards.component';
import {
  SecondaryAvatarSelectionModalComponent,
  SecondaryAvatarSelectItem
} from './secondary-avatar-selection-modal/secondary-avatar-selection-modal.component';

export interface RailTopMenuItem {
  id: string;
  iconName: string;
  label: string;
  action?: string;
  isSelected?: boolean;
  isDisabled?: boolean; // Controls disabled state with cursor none and opacity 0.5
  studioCards?: NavigationCard[];
  studioHeading?: string; // Heading for studio cards
  iconType?: 'lucide' | 'svg' | 'url';
  tooltip?: string;
  retainActiveState?: boolean;
  defaultSvg?: string; // Default SVG content for dual SVG mode
  activeSvg?: string; // Active SVG content for dual SVG mode
}

export interface RailBottomMenuItem {
  id: string;
  iconName: string;
  label: string;
  action?: string;
  isSelected?: boolean;
  isDisabled?: boolean; // Controls disabled state with cursor none and opacity 0.5
  iconType?: 'lucide' | 'svg' | 'url';
  tooltip?: string;
  retainActiveState?: boolean; // Controls whether this specific sub-menu item retains active state
}

export interface ProfileSubMenuItem {
  id: string;
  iconName: string;
  label: string;
  action?: string;
  isDisabled?: boolean; // Controls disabled state with cursor none and opacity 0.5
  iconType?: 'lucide' | 'svg' | 'url';
  tooltip?: string;
  isSelected?: boolean; // Track selected state for language/theme selection

}

export interface ProfileMenuItem {
  id: string;
  iconName: string;
  label: string;
  action?: string;
  isDisabled?: boolean; // Controls disabled state with cursor none and opacity 0.5
  iconType?: 'lucide' | 'svg' | 'url';
  tooltip?: string;
  isDestructive?: boolean; // For logout/delete actions
  isToggle?: boolean; // For items that can open submenus
  subMenuItems?: ProfileSubMenuItem[]; // Submenu items
  selectedSubItem?: ProfileSubMenuItem; // Currently selected submenu item
}

// Re-export for backward compatibility
export type { SecondaryAvatarSelectItem } from './secondary-avatar-selection-modal/secondary-avatar-selection-modal.component';

export interface SecondaryAvatarFlyoutConfig {
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  title?: string;
  description?: string;
  details?: string;
  collaboration?: string;
  buttonLabel?: string;
  buttonVariant?: 'primary' | 'secondary' | 'tertiary';
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export interface RailNavigationConfig {
  headerIcon?: {
    iconName: string;
    iconType?: 'lucide' | 'svg' | 'url';
    label?: string;
    action?: string;
    tooltip?: string;
    isDisabled?: boolean; // Controls disabled state with cursor none and opacity 0.5
    iconSize?: number; // Size of the header icon (default: 60)
  };
  menuItems: RailTopMenuItem[];
  subMenuItems?: RailBottomMenuItem[];
  secondaryAvatar?: {
    imageUrl?: string;
    altText?: string;
    action?: string;
    tooltip?: string;
    initials?: string;
    initialsBackground?: string;
    initialsColor?: string;
    selectItems?: SecondaryAvatarSelectItem[];
    selectLabel?: string; // Modal select label
    selectPlaceholder?: string; // Modal select placeholder
    flyoutConfig?: SecondaryAvatarFlyoutConfig;
    isDisabled?: boolean; // Controls disabled state with cursor none and opacity 0.5
  };
  profile?: {
    imageUrl?: string;
    altText?: string;
    action?: string;
    tooltip?: string;
    profileMenu?: ProfileMenuItem[];
    initials?: string;
    initialsBackground?: string;
    initialsColor?: string;
    isDisabled?: boolean; // Controls disabled state with cursor none and opacity 0.5
  };
}

@Component({
  selector: 'aava-rail-navigation-sidebar',
  imports: [
    AavaAvatarsComponent,
    AavaIconComponent,
    AavaButtonComponent,
    CommonModule,
    AavaNavigationCardsComponent,
    AavaSelectComponent,
    AavaSelectOptionComponent,
    AavaTooltipDirective
  ],
  templateUrl: './aava-rail-navigation-sidebar.component.html',
  styleUrl: './aava-rail-navigation-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AavaRailNavigationSidebarComponent {
  @Input() config: RailNavigationConfig = { menuItems: [] };
  @Input() customStyles: Record<string, string> = {}; // CSS custom properties override
  @Input() width?: string;
  @Input() height?: string;

  @Output() headerIconClick = new EventEmitter<string>();
  @Output() menuItemClick = new EventEmitter<RailTopMenuItem>();
  @Output() subMenuItemClick = new EventEmitter<RailBottomMenuItem>();
  @Output() profileClick = new EventEmitter<string>();
  @Output() profileMenuItemClick = new EventEmitter<ProfileMenuItem>();
  @Output() profileSubMenuItemClick = new EventEmitter<{
    parentItem: ProfileMenuItem;
    subItem: ProfileSubMenuItem;
  }>();
  @Output() studioCardClick = new EventEmitter<{
    menuItemId: string;
    card: NavigationCard;
  }>();
  @Output() languageSelectionChange = new EventEmitter<ProfileSubMenuItem>();

  @Output() secondaryAvatarClick = new EventEmitter<string>();
  @Output() secondaryAvatarSelectionChange = new EventEmitter<SecondaryAvatarSelectItem>();

  constructor(private dialogService: AavaDialogService, private cdr: ChangeDetectorRef, private el: ElementRef
  ) { }

  get safeSecondaryAvatar() {
    return this.config.secondaryAvatar || {};
  }

  onSecondaryAvatarClick(): void {
    // Prevent action if secondary avatar is disabled
    if (this.config.secondaryAvatar?.isDisabled) {
      return;
    }

    this.showSecondaryAvatarFlyout = !this.showSecondaryAvatarFlyout;

    if (this.showSecondaryAvatarFlyout) {
      // Calculate the position of the secondary avatar to position the flyout beside it
      setTimeout(() => {
        const secondaryAvatar = document.querySelector('.secondary-avatar') as HTMLElement;
        if (secondaryAvatar) {
          const rect = secondaryAvatar.getBoundingClientRect();
          const sidebarRect = document.querySelector('.sidebar-container')?.getBoundingClientRect();

          if (sidebarRect) {
            // Calculate position relative to the sidebar container
            const relativeTop = rect.top - sidebarRect.top + (rect.height / 2);
            const flyoutContainer = document.querySelector('.secondary-avatar-flyout-container') as HTMLElement;

            if (flyoutContainer) {
              flyoutContainer.style.setProperty('--secondary-avatar-position', `${relativeTop}px`);
              flyoutContainer.style.top = `${relativeTop}px`;
            }
          }
        }
      }, 0);
    }

    this.secondaryAvatarClick.emit(this.config.secondaryAvatar?.action || 'secondary-avatar-action');
  }

  onSecondaryAvatarChangeClick(): void {
    this.showSecondaryAvatarFlyout = false;
    this.openSecondaryAvatarSelectionModal();
  }

  openSecondaryAvatarSelectionModal(): void {
    const modalPromise = this.dialogService.openModal(SecondaryAvatarSelectionModalComponent, {
      width: '400px',
      position: 'center',
      height: 'auto',
      minHeight: '80px',
      showCloseButton: false,
      customDialogStyle: {
        padding: '10px',
        border: 'none',
        boxshadow: 'none',
      }
    }, {
      items: this.config.secondaryAvatar?.selectItems || [],
      label: this.config.secondaryAvatar?.selectLabel || 'Select Realm',
      placeholder: this.config.secondaryAvatar?.selectPlaceholder || 'Select realm here'
    });

    modalPromise.then((result) => {
      if (result && result.selectedItem) {
        this.onSecondaryAvatarSelectionChange(result.selectedItem);
      }
    });
  }

  onSecondaryAvatarSelectionChange(selectedItem: SecondaryAvatarSelectItem): void {
    // Update the selected state in the secondary avatar items
    if (this.config.secondaryAvatar?.selectItems) {
      this.config.secondaryAvatar.selectItems.forEach(item => {
        item.isSelected = item.id === selectedItem.id;
      });
    }

    // Update the main secondary avatar
    if (this.config.secondaryAvatar) {
      this.config.secondaryAvatar.imageUrl = selectedItem.avatar;
      this.config.secondaryAvatar.initials = selectedItem.initials;
      this.config.secondaryAvatar.initialsBackground = selectedItem.initialsBackground;
      this.config.secondaryAvatar.initialsColor = selectedItem.initialsColor;
    }

    // Emit the selection change
    this.secondaryAvatarSelectionChange.emit(selectedItem);
  }
  get languageMenuItems(): ProfileSubMenuItem[] {
    const languageItem = this.config.profile?.profileMenu?.find(item => item.id === 'language');
    return languageItem?.subMenuItems || [];
  }

  onLanguageSelect(selectedItem: ProfileSubMenuItem): void {
    const languageMenuItem = this.config.profile?.profileMenu?.find(item => item.id === 'language');
    if (languageMenuItem) {
      this.onLanguageSelectionChange(languageMenuItem, selectedItem);
    }
    this.showLanguageFlyout = false;
    this.cdr.markForCheck();
  }

  onLanguageSelectValue(itemId: string): void {
    const selectedItem = this.languageMenuItems.find(item => item.id === itemId);
    if (selectedItem) {
      this.onLanguageSelect(selectedItem);
    }
  }

  onLanguageSelectionChange(parentItem: ProfileMenuItem, selectedItem: ProfileSubMenuItem): void {
    // Update the selected state in the language submenu items
    if (parentItem.subMenuItems) {
      parentItem.subMenuItems.forEach(item => {
        item.isSelected = item.id === selectedItem.id;
      });
    }

    // Update the parent item's selected sub item and icon
    parentItem.selectedSubItem = selectedItem;
    parentItem.iconName = selectedItem.iconName;
    parentItem.iconType = selectedItem.iconType;

    // Emit the selection change
    this.languageSelectionChange.emit(selectedItem);
  }


  selectedItem?: RailTopMenuItem;
  activeTop = 0;
  private previousActiveMenuItem: HTMLElement | null = null;

  // Profile menu state
  showProfileMenu = false;
  openToggleItemId: string | null = null;

  // Secondary Avatar flyout state
  showSecondaryAvatarFlyout = false;
  showLanguageFlyout = false;

  // Profile Avatar size state - defaults to xl, toggles to md on click
  profileAvatarSize: AvatarSize = 'xl';


  // Icon colors configuration
  selectedIconColor = 'var(--global-color-gray-700)';
  defaultIconColor = 'var(--global-color-gray-400)';

  get studioConfig(): NavigationCardsConfig {
    return {
      heading: this.selectedItem?.studioHeading || this.selectedItem?.label,
      cards: this.selectedItem?.studioCards || [],
    };
  }

  get studioPosition(): { top: number } {
    return { top: this.activeTop };
  }

  get isStudioVisible(): boolean {
    return !!this.selectedItem?.studioCards?.length;
  }

  get computedStyles(): Record<string, string> {
    const styles: Record<string, string> = {
      // Apply custom width/height if provided
      ...(this.width && { width: this.width }),
      ...(this.height && { height: this.height }),

      // Apply custom styles (this allows CSS custom property overrides)
      ...this.customStyles,
    };

    return styles;
  }

  formatIconName(
    iconName: string,
    iconType?: 'lucide' | 'svg' | 'url'
  ): string {
    if (!iconType) {
      // Default to lucide if no type specified
      return iconName;
    }

    switch (iconType) {
      case 'svg':
        return `svg:${iconName}`;
      case 'url':
        return `url:${iconName}`;
      case 'lucide':
      default:
        return iconName;
    }
  }

  /**
   * Get the appropriate SVG content for a menu item based on its selected state
   */
  getMenuItemSvg(item: RailTopMenuItem): string {
    // If item has both default and active SVGs, choose based on selection state
    if (item.defaultSvg && item.activeSvg) {
      return item.isSelected ? item.activeSvg : item.defaultSvg;
    }

    // Fallback to iconName if no custom SVGs provided
    return item.iconName;
  }

  /**
   * Get the appropriate icon name for a menu item, handling SVG content
   */
  getMenuItemIconName(item: RailTopMenuItem): string {
    // If item has custom SVGs, return the appropriate one with svg: prefix
    if (item.defaultSvg && item.activeSvg) {
      const svgContent = this.getMenuItemSvg(item);
      return `svg:${svgContent}`;
    }

    // Otherwise use the standard formatIconName method
    return this.formatIconName(item.iconName, item.iconType);
  }

  onMenuItemClick(item: RailTopMenuItem, event?: Event): void {
    // Prevent action if item is disabled
    if (item.isDisabled) {
      return;
    }

    // Store the menu item element for focus return
    if (event) {
      const target = event.target as HTMLElement;
      const menuItemEl = target.closest('.menu-item');
      if (menuItemEl) {
        this.previousActiveMenuItem = menuItemEl as HTMLElement;
      }
    } else {
      // For keyboard events, find the menu item by ID
      const menuItemEl = document.querySelector(`[data-item-id="${item.id}"]`);
      if (menuItemEl) {
        this.previousActiveMenuItem = menuItemEl as HTMLElement;
      }
    }

    // Only update selection if this specific item's retainActiveState is true
    if (item.retainActiveState !== false) {
      this.config.menuItems.forEach((menuItem) => {
        menuItem.isSelected = menuItem.id === item.id;
      });
    }

    this.selectedItem = item.studioCards?.length ? item : undefined;
    if (event instanceof MouseEvent) {
      this.calculateStudioPosition(item.id, event);
    }
    this.menuItemClick.emit(item);
  }

  onSubMenuItemClick(item: RailBottomMenuItem): void {
    // Prevent action if item is disabled
    if (item.isDisabled) {
      return;
    }

    // Only update selection if this specific sub-menu item's retainActiveState is true
    if (item.retainActiveState !== false) {
      // Clear selection from main menu items
      this.config.menuItems.forEach((menuItem) => {
        menuItem.isSelected = false;
      });

      // Clear selection from other sub-menu items
      if (this.config.subMenuItems) {
        this.config.subMenuItems.forEach((subItem) => {
          subItem.isSelected = subItem.id === item.id;
        });
      }
    }

    this.subMenuItemClick.emit(item);
  }

  onHeaderIconClick(): void {
    // Prevent action if header icon is disabled
    if (this.config.headerIcon?.isDisabled) {
      return;
    }

    this.headerIconClick.emit(
      this.config.headerIcon?.action || 'header-action'
    );
  }

  onProfileClick(): void {
    // Prevent action if profile is disabled
    if (this.config.profile?.isDisabled) {
      return;
    }

    if (this.config.profile?.profileMenu?.length) {
      this.showProfileMenu = !this.showProfileMenu;
      // Set size based on menu state: md when open, xl when closed
      this.profileAvatarSize = this.showProfileMenu ? 'md' : 'xl';
    } else {
      this.profileClick.emit(this.config.profile?.action || 'profile-action');
    }
  }

  onProfileMenuItemClick(item: ProfileMenuItem, event?: Event): void {
    // Prevent action if item is disabled
    if (item.isDisabled) {
      return;
    }
    // Special handling for language item - show flyout instead of submenu
    if (item.id === 'language') {
      console.log('Language item clicked, showing flyout');
      // Stop event propagation to prevent immediate closure by document click handler
      if (event) {
        event.stopPropagation();
      }
      this.showProfileMenu = false;
      this.profileAvatarSize = 'xl'; // Reset avatar size when closing menu
      this.openToggleItemId = null;
      this.showLanguageFlyout = true;
      console.log('showLanguageFlyout set to:', this.showLanguageFlyout);
      this.cdr.markForCheck(); // Trigger change detection for OnPush strategy
      return;
    }

    if (item.isToggle && item.subMenuItems?.length) {
      // Toggle submenu
      this.openToggleItemId =
        this.openToggleItemId === item.id ? null : item.id;
    } else {
      // Regular menu item - close profile menu and emit event
      this.showProfileMenu = false;
      this.profileAvatarSize = 'xl'; // Reset avatar size when closing menu
      this.openToggleItemId = null;
      this.profileMenuItemClick.emit(item);
    }
  }

  onProfileSubMenuItemClick(
    parentItem: ProfileMenuItem,
    subItem: ProfileSubMenuItem
  ): void {
    // Prevent action if sub item is disabled
    if (subItem.isDisabled) {
      return;
    }

    // Update the parent item's selected sub item and icon
    parentItem.selectedSubItem = subItem;
    parentItem.iconName = subItem.iconName;
    parentItem.iconType = subItem.iconType;

    // Close submenu and profile menu
    this.openToggleItemId = null;
    this.showProfileMenu = false;
    this.profileAvatarSize = 'xl'; // Reset avatar size when closing menu

    // Emit event
    this.profileSubMenuItemClick.emit({ parentItem, subItem });
  }

  isToggleItemOpen(itemId: string): boolean {
    return this.openToggleItemId === itemId;
  }

  getAvailableSubMenuItems(item: ProfileMenuItem): ProfileSubMenuItem[] {
    if (!item.subMenuItems) {
      return [];
    }

    // Filter out the currently selected item from the submenu
    return item.subMenuItems.filter(
      (subItem) =>
        !item.selectedSubItem || subItem.id !== item.selectedSubItem.id
    );
  }

  onStudioCardClick(card: NavigationCard): void {
    if (!this.selectedItem) return;
    this.studioCardClick.emit({ menuItemId: this.selectedItem.id, card });
    // Keep the parent menu item selected but hide the studio cards
    // We'll clear the selectedItem to hide cards but maintain the menu item's isSelected state
    const menuItemId = this.selectedItem.id;
    this.selectedItem = undefined;

    // Clear the CSS custom property when hiding cards
    this.clearCardsTopPosition();

    // Clear selection from all menu items first
    this.config.menuItems.forEach((item) => {
      item.isSelected = false;
    });

    // Then set the clicked item's parent as selected
    const menuItem = this.config.menuItems.find(
      (item) => item.id === menuItemId
    );
    if (menuItem) {
      menuItem.isSelected = true;
    }

    // Return focus to the menu item
    this.returnFocusToMenuItem();
  }

  onCardsCloseRequested(): void {
    // Close the cards panel
    if (this.selectedItem) {
      const menuItemId = this.selectedItem.id;
      this.selectedItem = undefined;

      // Clear the CSS custom property when hiding cards
      this.clearCardsTopPosition();

      // Return focus to the menu item that opened the cards
      this.returnFocusToMenuItem(menuItemId);
    }
  }

  private returnFocusToMenuItem(menuItemId?: string): void {
    // Return focus to the previously active menu item
    if (this.previousActiveMenuItem && typeof this.previousActiveMenuItem.focus === 'function') {
      try {
        this.previousActiveMenuItem.focus({ preventScroll: true });
      } catch (e) {
        // Fallback for browsers that don't support preventScroll
        this.previousActiveMenuItem.focus();
      }
      this.previousActiveMenuItem = null;
    } else if (menuItemId) {
      // Fallback: find the menu item by ID and focus it
      setTimeout(() => {
        const menuItemEl = document.querySelector(`[data-item-id="${menuItemId}"]`) as HTMLElement;
        if (menuItemEl) {
          try {
            menuItemEl.focus({ preventScroll: true });
          } catch (e) {
            menuItemEl.focus();
          }
        }
      }, 50);
    }
  }

  private calculateStudioPosition(itemId: string, event?: MouseEvent): void {
    if (event) {
      const target = event.target as HTMLElement;
      const menuItemEl = target.closest('.menu-item');
      if (menuItemEl) {
        const rect = menuItemEl.getBoundingClientRect();
        const panelHeight = 250;
        const sidebarHeight =
          document.querySelector('.sidebar-container')?.clientHeight ||
          window.innerHeight;
        const isBottomHalf = rect.top > sidebarHeight / 2;
        if (isBottomHalf) {
          this.activeTop = rect.top - panelHeight;
        } else {
          this.activeTop = rect.top;
        }

        // Set CSS custom property for dynamic height calculation
        this.setCardsTopPosition(this.activeTop);
      }
    } else {
      const menuItemEl = document.querySelector(`[data-item-id="${itemId}"]`);
      if (menuItemEl) {
        const rect = menuItemEl.getBoundingClientRect();
        const panelHeight = 250;
        const sidebarHeight =
          document.querySelector('.sidebar-container')?.clientHeight ||
          window.innerHeight;
        const isBottomHalf = rect.top > sidebarHeight / 2;
        if (isBottomHalf) {
          this.activeTop = rect.top - panelHeight;
        } else {
          this.activeTop = rect.top;
        }

        // Set CSS custom property for dynamic height calculation
        this.setCardsTopPosition(this.activeTop);
      }
    }
  }

  // Tooltip methods
  // Removed custom tooltip methods in favor of AavaTooltipDirective
  get safeProfile() {
    return this.config.profile || {};
  }

  get safeFlyoutConfig(): SecondaryAvatarFlyoutConfig {
    return this.config.secondaryAvatar?.flyoutConfig || {};
  }

  private setCardsTopPosition(topPosition: number): void {
    // Set the CSS custom property for the cards container height calculation
    document.documentElement.style.setProperty('--cards-top-position', `${topPosition}px`);
  }

  private clearCardsTopPosition(): void {
    // Clear the CSS custom property when cards are hidden
    document.documentElement.style.removeProperty('--cards-top-position');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Handle secondary avatar flyout click outside to close
    if (this.showSecondaryAvatarFlyout) {
      // Check if the click is on the secondary avatar that triggers the flyout
      const secondaryAvatar = document.querySelector('.secondary-avatar');
      const isClickOnSecondaryAvatar = secondaryAvatar?.contains(target);

      // Check if the click is inside the secondary avatar flyout container
      const secondaryAvatarFlyoutContainer = document.querySelector('.secondary-avatar-flyout-container');
      const isClickInsideSecondaryAvatarFlyout = secondaryAvatarFlyoutContainer?.contains(target);

      // If click is outside both the secondary avatar and the flyout, close the flyout
      if (!isClickOnSecondaryAvatar && !isClickInsideSecondaryAvatarFlyout) {
        this.showSecondaryAvatarFlyout = false;
      }
    }

    // Handle profile menu click outside to close
    if (this.showProfileMenu) {
      // Check if the click is on the profile avatar that triggers the menu
      const profileAvatar = document.querySelector('.profile-avatar');
      const isClickOnProfileAvatar = profileAvatar?.contains(target);
      const profileMenuExpanded = document.querySelector('.profile-menu-expanded');
      const isClickInsideProfileMenu = profileMenuExpanded?.contains(target);
      if (!isClickOnProfileAvatar && !isClickInsideProfileMenu) {
        this.showProfileMenu = false;
        this.profileAvatarSize = 'xl'; // Reset avatar size when closing menu
        this.openToggleItemId = null;
      }
    }
    // Handle language flyout click outside to close
    if (this.showLanguageFlyout) {
      const languageFlyoutContainer = document.querySelector('.language-flyout-container');
      const isClickInsideLanguageFlyout = languageFlyoutContainer?.contains(target);

      if (!isClickInsideLanguageFlyout) {
        this.showLanguageFlyout = false;
        this.cdr.markForCheck(); // Trigger change detection for OnPush strategy
      }
    }

    // Handle studio cards click outside to close
    if (this.isStudioVisible && this.selectedItem) {
      // Check if the click is outside the navigation cards component
      const navigationCardsContainer = document.getElementById(
        'navigation-cards-container'
      );
      const isClickInsideCards = navigationCardsContainer?.contains(target);

      // Check if the click is on the menu item that triggered the studio cards
      const menuItemElement = document.querySelector(
        `[data-item-id="${this.selectedItem.id}"]`
      );
      const isClickOnTriggerMenuItem = menuItemElement?.contains(target);

      // If click is outside both the cards and the trigger menu item, hide the studio cards
      if (!isClickInsideCards && !isClickOnTriggerMenuItem) {
        this.selectedItem = undefined;
        // Clear the CSS custom property when hiding cards
        this.clearCardsTopPosition();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const focusableSelectors = [
        '.header-icon-item:not(.disabled)',
        '.menu-item:not(.disabled)',
        '.sub-menu-item:not(.disabled) .sub-menu-icon',
        '.secondary-avatar:not(.disabled)',
        '.profile-avatar:not(.disabled)',
        '.profile-menu-item:not(.disabled)',
        '.profile-submenu-item:not(.disabled)'
      ];

      // Use ElementRef to scope the query to this component
      const sidebarContainer = this.el.nativeElement.querySelector('.sidebar-container');
      if (!sidebarContainer) return;

      // querySelectorAll returns a NodeList, convert to Array to use array methods
      const allFocusableItems = Array.from(
        sidebarContainer.querySelectorAll(focusableSelectors.join(', '))
      ) as HTMLElement[];

      // Filter out hidden items using dimensions instead of offsetParent for better reliability
      const visibleFocusableItems = allFocusableItems.filter(item => {
        return item.offsetWidth > 0 && item.offsetHeight > 0;
      });

      if (visibleFocusableItems.length === 0) return;

      let currentFocus = document.activeElement as HTMLElement;

      // If the active element is not one of our items, checks if it's a child of one of our items
      // This handles cases where focus might be on an internal element of a component
      const parentItem = currentFocus.closest(focusableSelectors.join(', ')) as HTMLElement;
      if (parentItem && visibleFocusableItems.includes(parentItem)) {
        currentFocus = parentItem;
      }

      let currentIndex = visibleFocusableItems.indexOf(currentFocus);

      if (currentIndex === -1) {
        // If focus is not on any recognized item, do nothing (preserve default behavior)
        return;
      }

      event.preventDefault(); // Prevent default scroll

      let nextIndex = 0;

      if (event.key === 'ArrowDown') {
        nextIndex = currentIndex + 1;
        if (nextIndex >= visibleFocusableItems.length) {
          nextIndex = visibleFocusableItems.length - 1; // Stop at bottom
          // nextIndex = 0; // Wrap to top - optional, user can request if needed
        }
      } else if (event.key === 'ArrowUp') {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = 0; // Stop at top
          // nextIndex = visibleFocusableItems.length - 1; // Wrap to bottom - optional
        }
      }

      const nextItem = visibleFocusableItems[nextIndex];
      nextItem.focus();
    }
  }
}

