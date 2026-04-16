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
  selector: 'aava-menu-positioning-demo',
  standalone: true,
  imports: [CommonModule, AavaMenuComponent, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <h2>Menu - Positioning</h2>
      <p>Different positioning options for menu placement</p>

      <div class="positioning-grid">
        <!-- Top positioning -->
        <div class="position-item top">
          <aava-button
            variant="primary"
            size="sm"
            (click)="toggleMenu('top')"
            label="Top"
          >
          </aava-button>
          <aava-menu
            [items]="menuItems"
            [visible]="menuStates['top']"
            [positionConfig]="getPositionConfig('top')"
            [displayOptions]="displayOptions"
            (itemSelected)="onMenuItemSelected($event)"
          ></aava-menu>
        </div>

        <!-- Bottom positioning -->
        <div class="position-item bottom">
          <aava-button
            variant="primary"
            size="sm"
            (click)="toggleMenu('bottom')"
            label="Bottom"
          >
          </aava-button>
          <aava-menu
            [items]="menuItems"
            [visible]="menuStates['bottom']"
            [positionConfig]="getPositionConfig('bottom')"
            [displayOptions]="displayOptions"
            (itemSelected)="onMenuItemSelected($event)"
          ></aava-menu>
        </div>

        <!-- Left positioning -->
        <div class="position-item left">
          <aava-button
            variant="primary"
            size="sm"
            (click)="toggleMenu('left')"
            label="Left"
          >
          </aava-button>
          <aava-menu
            [items]="menuItems"
            [visible]="menuStates['left']"
            [positionConfig]="getPositionConfig('left')"
            [displayOptions]="displayOptions"
            (itemSelected)="onMenuItemSelected($event)"
          ></aava-menu>
        </div>

        <!-- Right positioning -->
        <div class="position-item right">
          <aava-button
            variant="primary"
            size="sm"
            (click)="toggleMenu('right')"
            label="Right"
          >
          </aava-button>
          <aava-menu
            [items]="menuItems"
            [visible]="menuStates['right']"
            [positionConfig]="getPositionConfig('right')"
            [displayOptions]="displayOptions"
            (itemSelected)="onMenuItemSelected($event)"
          ></aava-menu>
        </div>

        <!-- Top-start positioning -->
        <div class="position-item top-start">
          <aava-button
            variant="secondary"
            size="sm"
            (click)="toggleMenu('top-start')"
            label="Top Start"
          >
          </aava-button>
          <aava-menu
            [items]="menuItems"
            [visible]="menuStates['top-start']"
            [positionConfig]="getPositionConfig('top-start')"
            [displayOptions]="displayOptions"
            (itemSelected)="onMenuItemSelected($event)"
          ></aava-menu>
        </div>

        <!-- Bottom-end positioning -->
        <div class="position-item bottom-end">
          <aava-button
            variant="secondary"
            size="sm"
            (click)="toggleMenu('bottom-end')"
            label="Bottom End"
          >
          </aava-button>
          <aava-menu
            [items]="menuItems"
            [visible]="menuStates['bottom-end']"
            [positionConfig]="getPositionConfig('bottom-end')"
            [displayOptions]="displayOptions"
            (itemSelected)="onMenuItemSelected($event)"
          ></aava-menu>
        </div>
      </div>

      <div class="demo-info">
        <h3>Selected Item:</h3>
        <p *ngIf="selectedItem">{{ selectedItem.label }}</p>
        <p *ngIf="!selectedItem">No item selected</p>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .positioning-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin: 2rem 0;
        min-height: 400px;
      }

      .position-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #f8fafc;
      }

      .position-item.top {
        grid-column: 2;
        grid-row: 1;
      }

      .position-item.bottom {
        grid-column: 2;
        grid-row: 3;
      }

      .position-item.left {
        grid-column: 1;
        grid-row: 2;
      }

      .position-item.right {
        grid-column: 3;
        grid-row: 2;
      }

      .position-item.top-start {
        grid-column: 1;
        grid-row: 1;
      }

      .position-item.bottom-end {
        grid-column: 3;
        grid-row: 3;
      }

      .demo-info {
        margin-top: 2rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 8px;
        text-align: center;
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
    `,
  ],
})
export class PositioningDemoComponent {
  selectedItem: MenuItem | null = null;

  menuStates: Record<string, boolean> = {
    top: false,
    bottom: false,
    left: false,
    right: false,
    'top-start': false,
    'bottom-end': false,
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
    {
      label: 'Option 1',
      route: '/option1',
      icon: 'check',
    },
    {
      label: 'Option 2',
      route: '/option2',
      icon: 'star',
    },
    {
      label: 'Option 3',
      route: '/option3',
      icon: 'heart',
    },
  ];

  toggleMenu(position: string): void {
    // Close all other menus
    Object.keys(this.menuStates).forEach((key) => {
      this.menuStates[key] = false;
    });

    // Toggle the clicked menu
    this.menuStates[position] = !this.menuStates[position];
  }

  getPositionConfig(position: string): MenuPositionConfig {
    return {
      position: position as
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'top-start'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-end',
      alignment: 'start',
      offset: 8,
    };
  }

  onMenuItemSelected(event: {
    route?: string;
    label: string;
    item: MenuItem;
  }): void {
    this.selectedItem = event.item;
    // Close all menus
    Object.keys(this.menuStates).forEach((key) => {
      this.menuStates[key] = false;
    });
    console.log('Menu item selected:', event);
  }
}
