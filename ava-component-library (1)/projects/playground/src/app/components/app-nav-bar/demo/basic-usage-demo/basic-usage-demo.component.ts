import { Component } from '@angular/core';
import {
  AavaNavBarComponent,
  NavBarContainerStyles,
  AavaIconComponent,
  AavaMenuComponent,
  MenuItem,
  MenuPositionConfig,
  MenuItemDisplayOptions,

} from '@aava/play-core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-nav-bar-basic-usage-demo',
  standalone: true,
  imports: [AavaNavBarComponent, AavaIconComponent, AavaMenuComponent, CommonModule],
  template: `
    <div class="demo-container">
      <div class="demo-nav-container">
        <aava-nav-bar [containerStyles]="navBarStyles">
          <!-- Dashboard -->
          <button
            class="nav-item"
            [class.active]="activeItem === 'dashboard'"
            (click)="setActive('dashboard')"
            (mouseenter)="hoveredItem = 'dashboard'"
            (mouseleave)="hoveredItem = ''"
          >
            <aava-icon
              iconName="layout-dashboard"
              [iconSize]="16"
              [iconColor]="getIconColor('dashboard')"
            ></aava-icon>
            Dashboard
          </button>

          <!-- Build Button with Dropdown - Following app-menu pattern exactly -->
          <div class="build-dropdown-container">
            <button
              class="nav-item"
              [class.active]="activeItem === 'build'"
              (click)="toggleDropdown('build')"
              (mouseenter)="hoveredItem = 'build'"
              (mouseleave)="hoveredItem = ''"
            >
              <aava-icon
                iconName="hammer"
                [iconSize]="16"
                [iconColor]="getIconColor('build')"
              ></aava-icon>
              Build
              <aava-icon
                iconName="chevron-down"
                [iconSize]="14"
                [iconColor]="getIconColor('build')"
                [class.rotated]="dropdownStates.build"
              ></aava-icon>
            </button>

            <!-- Menu positioned relative to button container -->
            <aava-menu
              [items]="buildMenuItems"
              [visible]="dropdownStates.build"
              [itemsPerColumn]="3"
              [positionConfig]="menuPositionConfig"
              [displayOptions]="menuDisplayOptions"
              (itemSelected)="onMenuItemSelected('build', $event)"
            ></aava-menu>
          </div>

          <!-- Libraries -->
          <button
            class="nav-item"
            [class.active]="activeItem === 'libraries'"
            (click)="setActive('libraries')"
            (mouseenter)="hoveredItem = 'libraries'"
            (mouseleave)="hoveredItem = ''"
          >
            <aava-icon
              iconName="book"
              [iconSize]="16"
              [iconColor]="getIconColor('libraries')"
            ></aava-icon>
            Libraries
          </button>

          <!-- Approvals -->
          <button
            class="nav-item"
            [class.active]="activeItem === 'approvals'"
            (click)="setActive('approvals')"
            (mouseenter)="hoveredItem = 'approvals'"
            (mouseleave)="hoveredItem = ''"
          >
            <aava-icon
              iconName="user-check"
              [iconSize]="16"
              [iconColor]="getIconColor('approvals')"
            ></aava-icon>
            Approvals
          </button>

          <!-- User Management -->
          <button
            class="nav-item"
            [class.active]="activeItem === 'users'"
            (click)="setActive('users')"
            (mouseenter)="hoveredItem = 'users'"
            (mouseleave)="hoveredItem = ''"
          >
            <aava-icon
              iconName="users"
              [iconSize]="16"
              [iconColor]="getIconColor('users')"
            ></aava-icon>
            User Management
          </button>

          <!-- Analytics -->
          <button
            class="nav-item"
            [class.active]="activeItem === 'analytics'"
            (click)="setActive('analytics')"
            (mouseenter)="hoveredItem = 'analytics'"
            (mouseleave)="hoveredItem = ''"
          >
            <aava-icon
              iconName="chart-bar"
              [iconSize]="16"
              [iconColor]="getIconColor('analytics')"
            ></aava-icon>
            Analytics
          </button>
        </aava-nav-bar>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 870px;
        margin: 0 auto;
      }

      .demo-nav-container {
        position: relative;
        display: inline-block;
        min-height: 200px;
        border-radius: 12px;
        padding: 2rem;
        width: 100%;
        text-align: center;
      }

      /* Build dropdown container - following app-menu pattern exactly */
      .build-dropdown-container {
        position: relative;
        display: inline-block;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 32px;
        border: none;
        background: transparent;
        color: #64748b;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }

      .nav-item:hover:not(.active) {
        background: linear-gradient(118deg, #215ad6 55.27%, #03bdd4);
        color: #ffffff;
      }

      .nav-item.active {
        background: linear-gradient(118deg, #215ad6 55.27%, #03bdd4);
        color: #ffffff;
      }

      .rotated {
        transform: rotate(180deg);
      }

      .current-selection {
        margin-top: 1rem;
        padding: 1rem;
        background: #f1f5f9;
        border-radius: 8px;
        font-size: 14px;
      }
    `,
  ],
})
export class BasicUsageDemoComponent {
  activeItem = 'libraries'; // Default active item
  selectedMenuItem = '';
  hoveredItem = '';

  dropdownStates = {
    build: false,
  };

  navBarStyles: NavBarContainerStyles = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '50px',
    padding: '8px',
    // boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    gap: '8px',
    outerGlow: true,
    outerGlowColor: 'rgba(134, 184, 234, 1)',
    outerGlowIntensity: '20px',
  };

  // Menu configuration
  menuPositionConfig: MenuPositionConfig = {
    position: 'bottom-start',
    alignment: 'start',
    offset: 12,
  };

  menuDisplayOptions: MenuItemDisplayOptions = {
    showIcon: true,
    showTitle: true,
    showDescription: true,
    iconSize: 24,
    titleWeight: 'medium',
    descriptionSize: 'sm',
  };

  buildMenuItems: MenuItem[] = [
    {
      label: 'Agents',
      description: 'Create, Manage and Edit Agents',
      route: '/build/agents',
      icon: 'bot',
    },
    {
      label: 'Workflows',
      description: 'Create, Manage and Edit Workflows',
      route: '/build/workflows',
      icon: 'git-branch',
    },
    {
      label: 'Templates',
      description: 'Ready-to-use templates',
      route: '/build/templates',
      icon: 'file-text',
    },
    {
      label: 'Analytics',
      description: 'View reports and data insights',
      route: '/build/analytics',
      icon: 'chart-bar',
    },
    {
      label: 'Settings',
      description: 'Build configuration and settings',
      route: '/build/settings',
      icon: 'settings',
    },
    {
      label: 'Integrations',
      description: 'Connect external services',
      route: '/build/integrations',
      icon: 'plug',
    },
  ];

  setActive(item: string): void {
    this.activeItem = item;
    this.selectedMenuItem = '';
    // Close any open dropdowns when selecting a different item
    Object.keys(this.dropdownStates).forEach((key) => {
      this.dropdownStates[key as keyof typeof this.dropdownStates] = false;
    });
  }

  toggleDropdown(item: string): void {
    // Toggle the dropdown state
    this.dropdownStates[item as keyof typeof this.dropdownStates] =
      !this.dropdownStates[item as keyof typeof this.dropdownStates];

    // Set active item but don't close dropdowns
    this.activeItem = item;
    this.selectedMenuItem = '';
  }

  onMenuItemSelected(
    navItem: string,
    event: { route?: string; label: string; item: MenuItem }
  ): void {
    this.selectedMenuItem = event.label;
    this.dropdownStates[navItem as keyof typeof this.dropdownStates] = false;
    console.log('Menu item selected:', event);
  }

  getIconColor(item: string): string {
    // Return white for active or hovered item, gray for others
    return this.activeItem === item || this.hoveredItem === item
      ? '#ffffff'
      : '#64748b';
  }
}
