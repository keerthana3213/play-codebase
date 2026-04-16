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
  selector: 'ava-menu-with-icons-demo',
  standalone: true,
  imports: [CommonModule, AavaMenuComponent, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="button-container">
          <aava-button
            label="Menu with Icons"
            variant="secondary"
            size="md"
            (click)="toggleMenu()"
            iconName="menu"
            [iconSize]="16"
          >
          </aava-button>
        </div>

        <aava-menu
          [items]="menuItems"
          [visible]="menuVisible"
          [positionConfig]="positionConfig"
          [displayOptions]="displayOptions"
          (itemSelected)="onMenuItemSelected($event)"
        ></aava-menu>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }

      .demo-section {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2rem 0;
      }

      .button-container {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
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
    `,
  ],
})
export class WithIconsDemoComponent {
  menuVisible = false;
  selectedItem: MenuItem | null = null;

  positionConfig: MenuPositionConfig = {
    position: 'bottom',
    alignment: 'center',
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
    {
      label: 'Edit',
      route: '/edit',
      icon: 'edit',
    },
    {
      label: 'Copy',
      route: '/copy',
      icon: 'copy',
    },
    {
      label: 'Delete',
      route: '/delete',
      icon: 'trash-2',
    },
    {
      label: 'Share',
      route: '/share',
      icon: 'share-2',
    },
    {
      label: 'Download',
      route: '/download',
      icon: 'download',
    },
    {
      label: 'Print',
      route: '/print',
      icon: 'printer',
    },
  ];

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
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
