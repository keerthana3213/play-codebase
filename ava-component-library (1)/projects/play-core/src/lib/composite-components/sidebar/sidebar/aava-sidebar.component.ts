
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AavaButtonComponent } from '../../../components/button/aava-button.component';
import { AavaIconComponent } from '../../../components/icon/aava-icon.component';


export interface MenuItem {
  id: string;
  icon: string;
  text: string;
  route: string;
  active?: boolean;
  badge?: string | number;
  subMenuItems?: MenuItem[];
  expanded?: boolean;
}

export interface UserProfile {
  name: string;
  role?: string;
  avatar?: string;
  email?: string;
}

export type SidebarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'aava-sidebar',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent, AavaIconComponent],
  templateUrl: './aava-sidebar.component.html',
  styleUrl: './aava-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaSidebarComponent implements OnInit, OnChanges {
  @Input() size: SidebarSize = 'lg';
  @Input() height: string = '100vh';
  @Input() showCollapseButton: boolean = false;
  @Input() buttonVariant: 'inside' | 'outside' = 'inside';
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() isCollapsed: boolean = false;
  @Input() position: 'left' | 'right' = 'left';
  @Input() menuItems: MenuItem[] = [];
  @Input() userProfile: UserProfile | null = null;
  @Input() headerTitle: string = '';
  @Input() headerSubtitle: string = '';
  @Input() logoUrl: string = '';
  @Input() collapsedLogoUrl: string = '';

  @Output() collapseToggle = new EventEmitter<boolean>();
  @Output() menuItemClick = new EventEmitter<MenuItem>();
  @Output() userProfileClick = new EventEmitter<UserProfile>();
  @Output() searchChange = new EventEmitter<string>();

  private _isCollapsed = false;
  showSearch = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._isCollapsed = this.isCollapsed;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isCollapsed'] && !changes['isCollapsed'].firstChange) {
      this._isCollapsed = this.isCollapsed;
      this.cdr.markForCheck();
    }
  }

  toggleCollapse(): void {
    this._isCollapsed = !this._isCollapsed;
    this.collapseToggle.emit(this._isCollapsed);
    this.cdr.markForCheck();
  }

  onMenuItemClick(item: MenuItem): void {
    // If item has sub-menu items, toggle expansion instead of navigation
    if (item.subMenuItems && item.subMenuItems.length > 0) {
      this.toggleSubMenu(item);
      return;
    }

    // Update active state for navigation items
    this.clearActiveStates(this.menuItems);
    item.active = true;

    this.menuItemClick.emit(item);
    this.cdr.markForCheck();
  }

  onSubMenuItemClick(_parentItem: MenuItem, subItem: MenuItem): void {
    // Clear all active states
    this.clearActiveStates(this.menuItems);

    // Set sub-item as active
    subItem.active = true;

    this.menuItemClick.emit(subItem);
    this.cdr.markForCheck();
  }

  toggleSubMenu(item: MenuItem): void {
    if (item.subMenuItems && item.subMenuItems.length > 0) {
      item.expanded = !item.expanded;
      this.cdr.markForCheck();
    }
  }

  private clearActiveStates(items: MenuItem[]): void {
    items.forEach(item => {
      item.active = false;
      if (item.subMenuItems) {
        this.clearActiveStates(item.subMenuItems);
      }
    });
  }

  onUserProfileClick(): void {
    if (this.userProfile) {
      this.userProfileClick.emit(this.userProfile);
    }
  }

  get sidebarWidth(): string {
    if (this._isCollapsed) {
      return this.collapsedWidth;
    }

    switch (this.size) {
      case 'sm':
        return '200px';
      case 'md':
        return '260px';
      case 'lg':
        return '320px';
      default:
        return '260px';
    }
  }

  get collapsedWidth(): string {
    switch (this.size) {
      case 'sm':
        return '48px';
      case 'md':
        return '56px';
      case 'lg':
        return '64px';
      default:
        return '56px';
    }
  }

  get hoverAreaWidth(): string {
    return this.size === 'sm' ? '8px' : this.size === 'md' ? '12px' : '16px';
  }

  get collapsed(): boolean {
    return this._isCollapsed;
  }

  get isRightPositioned(): boolean {
    return this.position === 'right';
  }

  get collapseButtonIcon(): string {
    if (this.position === 'right') {
      return this._isCollapsed ? 'chevron-left' : 'chevron-right';
    }
    return this._isCollapsed ? 'chevron-right' : 'chevron-left';
  }

  get sidebarClasses(): string {
    return [
      'ava-sidebar',
      `size-${this.size}`,
      this.collapsed ? 'collapsed' : '',
      this.isRightPositioned ? 'right-positioned' : ''
    ].filter(Boolean).join(' ');
  }

  get containerClasses(): string {
    return [
      'ava-sidebar-container',
      `size-${this.size}`,
      this.isRightPositioned ? 'right-positioned' : '',
      this.buttonVariant === 'outside' ? 'outside-button' : ''
    ].filter(Boolean).join(' ');
  }

  getIconSize(): number {
    switch (this.size) {
      case 'sm':
        return 13;
      case 'md':
        return 16;
      case 'lg':
        return 20;
      default:
        return 18;
    }
  }

  // Search related methods
  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      });
    } else {
      this.onSearchChange(''); // Clear search when closing
    }
    this.cdr.markForCheck();
  }

  closeSearch(): void {
    this.showSearch = false;
    this.onSearchChange(''); // Clear search when closing
    this.cdr.markForCheck();
  }

  onSearchChange(value: string): void {
      this.searchChange.emit(value);
  }
  
}
