import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaMenuComponent,
  MenuItem,
  AavaButtonComponent,
  MenuPositionConfig,
  MenuItemDisplayOptions,
} from '@aava/play-core';

@Component({
  selector: 'ava-menu-multi-column-demo',
  standalone: true,
  imports: [CommonModule, AavaMenuComponent, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <h2>Menu - Multi-Column Layout</h2>
      <p>
        Organize menu items into multiple columns for better space utilization
      </p>

      <div class="demo-section">
        <div class="demo-controls">
          <div class="control-group">
            <span class="control-label">Items per column:</span>
            <aava-button
              *ngFor="let count of [2, 3, 4, 5]"
              variant="secondary"
              size="sm"
              [class.active]="itemsPerColumn === count"
              (click)="setItemsPerColumn(count)"
            >
              {{ count }}
            </aava-button>
          </div>
        </div>

        <div class="demo-trigger">
          <aava-button variant="primary" size="md" (click)="toggleMenu()">
            Multi-Column Menu ({{ itemsPerColumn }} items/column)
          </aava-button>
        </div>

        <aava-menu
          [items]="menuItems"
          [visible]="menuVisible"
          [itemsPerColumn]="itemsPerColumn"
          [positionConfig]="positionConfig"
          [displayOptions]="displayOptions"
          (itemSelected)="onMenuItemSelected($event)"
        ></aava-menu>
      </div>

      <div class="demo-info">
        <h3>Selected Item:</h3>
        <p *ngIf="selectedItem">{{ selectedItem.label }}</p>
        <p *ngIf="!selectedItem">No item selected</p>
        <p class="info-text">
          Total items: {{ menuItems.length }} | Columns:
          {{ Math.ceil(menuItems.length / itemsPerColumn) }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
      }

      .demo-section {
        position: relative;
        display: inline-block;
        margin: 2rem 0;
      }

      .demo-controls {
        margin-bottom: 1rem;
      }

      .control-group {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .control-group .control-label {
        font-weight: 500;
        color: #374151;
      }

      .control-group aava-button {
        margin-right: 0.5rem;
      }

      .control-group aava-button.active {
        background: var(--color-brand-primary);
        color: white;
      }

      .demo-trigger {
        margin-bottom: 1rem;
      }

      .demo-info {
        margin-top: 2rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
      }

      .demo-info h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        font-weight: 600;
      }

      .demo-info p {
        margin: 0;
        color: #64748b;
      }

      .demo-info .info-text {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        font-style: italic;
      }
    `,
  ],
})
export class MultiColumnDemoComponent {
  menuVisible = false;
  selectedItem: MenuItem | null = null;
  itemsPerColumn = 3;
  Math = Math;

  positionConfig: MenuPositionConfig = {
    position: 'bottom',
    alignment: 'start',
    offset: 8,
  };

  displayOptions: MenuItemDisplayOptions = {
    showIcon: true,
    showTitle: true,
    showDescription: false,
    iconSize: 20,
    titleWeight: 'medium',
    descriptionSize: 'sm',
  };

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'layout-dashboard' },
    { label: 'Analytics', route: '/analytics', icon: 'chart-bar' },
    { label: 'Settings', route: '/settings', icon: 'settings' },
    { label: 'Profile', route: '/profile', icon: 'user' },
    { label: 'Messages', route: '/messages', icon: 'mail' },
    { label: 'Calendar', route: '/calendar', icon: 'calendar' },
    { label: 'Tasks', route: '/tasks', icon: 'clipboard-list' },
    { label: 'Team', route: '/team', icon: 'users' },
    { label: 'Projects', route: '/projects', icon: 'folder' },
    { label: 'Reports', route: '/reports', icon: 'file-text' },
    { label: 'Integrations', route: '/integrations', icon: 'plug' },
    { label: 'Help', route: '/help', icon: 'help-circle' },
    { label: 'Support', route: '/support', icon: 'headphones' },
    { label: 'Feedback', route: '/feedback', icon: 'message-square' },
    { label: 'About', route: '/about', icon: 'info' },
  ];

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  setItemsPerColumn(count: number): void {
    this.itemsPerColumn = count;
  }

  onMenuItemSelected(event: {
    route?: string;
    label: string;
    item: MenuItem;
  }): void {
    this.selectedItem = event.item;
    this.menuVisible = false;
    console.log('Menu item selected:', event);
  }
}
