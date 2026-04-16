import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AavaIconComponent } from '../icon/aava-icon.component';

export type MenuPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';
export type MenuAlignment = 'start' | 'center' | 'end';

export interface MenuItemDisplayOptions {
  showIcon?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  iconSize?: number;
  titleWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  descriptionSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export interface MenuPositionConfig {
  position?: MenuPosition;
  alignment?: MenuAlignment;
  offset?: number;
  autoFlip?: boolean;
}

export interface MenuItem {
  label: string;
  description?: string;
  route?: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  customData?: Record<string, unknown>;
}

@Component({
  selector: 'aava-menu',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-menu.component.html',
  styleUrl: './aava-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaMenuComponent implements OnDestroy {
  // Static registry to track all open menus
  private static openMenus: AavaMenuComponent[] = [];

  @Input() items: MenuItem[] = [];
  @Input() visible = false;
  @Input() itemsPerColumn = 3;
  @Input() positionConfig: MenuPositionConfig = {
    position: 'bottom',
    alignment: 'start',
    offset: 8,
  };
  @Input() displayOptions: MenuItemDisplayOptions = {
    showIcon: true,
    showTitle: true,
    showDescription: true,
    iconSize: 24,
    titleWeight: 'medium',
    descriptionSize: 'sm',
  };
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
  @Output() itemSelected = new EventEmitter<{
    route?: string;
    label: string;
    item: MenuItem;
  }>();

  constructor(private el: ElementRef, private router: Router) { }

  // Register this menu as open
  private registerAsOpen(): void {
    AavaMenuComponent.openMenus.push(this);
  }

  // Unregister this menu as open
  private unregisterAsOpen(): void {
    const index = AavaMenuComponent.openMenus.indexOf(this);
    if (index > -1) {
      AavaMenuComponent.openMenus.splice(index, 1);
    }
  }

  // Close all other open menus except this one
  private closeOtherMenus(): void {
    AavaMenuComponent.openMenus.forEach((menu) => {
      if (menu !== this && menu.visible) {
        menu.visible = false;
      }
    });
  }

  // Method to show menu (should be called from parent)
  showMenu(): void {
    // Close all other menus first
    this.closeOtherMenus();

    // Register this menu as open
    this.registerAsOpen();

    // Show this menu
    this.visible = true;
  }

  // Method to hide menu
  hideMenu(): void {
    this.visible = false;
    this.unregisterAsOpen();
  }

  onItemClick(item: MenuItem, event: MouseEvent): void {
    if (item.disabled || item.divider) return;

    // Stop the event from bubbling up to parent elements
    event.stopPropagation();
    event.preventDefault();


    this.itemSelected.emit({
      route: item.route,
      label: item.label,
      item: item,
    });
  }

  // Check if this item is active based on the current route
  isItemActive(item: MenuItem): boolean {
    if (!item.route) return false;
    return this.router.url === item.route;
  }

  // Check if item should show icon
  shouldShowIcon(item: MenuItem): boolean {
    return this.displayOptions.showIcon !== false && !!item.icon;
  }

  // Check if item should show description
  shouldShowDescription(item: MenuItem): boolean {
    return this.displayOptions.showDescription !== false && !!item.description;
  }

  // Get computed styles for the menu container
  get menuStyles(): Record<string, string> {
    const styles: Record<string, string> = {};
    const alignment = this.positionConfig.alignment || 'start';
    const offset = this.positionConfig.offset || 8;

    // Apply positioning based on config
    switch (this.positionConfig.position) {
      case 'top':
        styles['bottom'] = '100%';
        styles['margin-bottom'] = `${offset}px`;
        // Handle alignment for top position
        if (alignment === 'center') {
          styles['left'] = '50%';
          styles['transform'] = 'translateX(-50%)';
        } else if (alignment === 'end') {
          styles['right'] = '0';
        } else {
          styles['left'] = '0';
        }
        break;
      case 'bottom':
        styles['top'] = '100%';
        styles['margin-top'] = `${offset}px`;
        // Handle alignment for bottom position
        if (alignment === 'center') {
          styles['left'] = '50%';
          styles['transform'] = 'translateX(-50%)';
        } else if (alignment === 'end') {
          styles['right'] = '0';
        } else {
          styles['left'] = '0';
        }
        break;
      case 'left':
        styles['right'] = '100%';
        styles['margin-right'] = `${offset}px`;
        // Handle alignment for left position
        if (alignment === 'center') {
          styles['top'] = '50%';
          styles['transform'] = 'translateY(-50%)';
        } else if (alignment === 'end') {
          styles['bottom'] = '0';
        } else {
          styles['top'] = '0';
        }
        break;
      case 'right':
        styles['left'] = '100%';
        styles['margin-left'] = `${offset}px`;
        // Handle alignment for right position
        if (alignment === 'center') {
          styles['top'] = '50%';
          styles['transform'] = 'translateY(-50%)';
        } else if (alignment === 'end') {
          styles['bottom'] = '0';
        } else {
          styles['top'] = '0';
        }
        break;
      case 'top-start':
        styles['bottom'] = '100%';
        styles['left'] = '0';
        styles['margin-bottom'] = `${offset}px`;
        break;
      case 'top-end':
        styles['bottom'] = '100%';
        styles['right'] = '0';
        styles['margin-bottom'] = `${offset}px`;
        break;
      case 'bottom-start':
        styles['top'] = '100%';
        styles['left'] = '0';
        styles['margin-top'] = `${offset}px`;
        break;
      case 'bottom-end':
        styles['top'] = '100%';
        styles['right'] = '0';
        styles['margin-top'] = `${offset}px`;
        break;
    }

    // Apply custom styles
    Object.assign(styles, this.customStyles);

    return styles;
  }

  // Method to split items into columns
  get columns(): MenuItem[][] {
    const columns: MenuItem[][] = [];
    const itemsPerColumn = this.itemsPerColumn;

    for (let i = 0; i < this.items.length; i += itemsPerColumn) {
      columns.push(this.items.slice(i, i + itemsPerColumn));
    }

    return columns;
  }

  ngOnDestroy(): void {
    // Clean up registry when component is destroyed
    this.unregisterAsOpen();
  }
}
