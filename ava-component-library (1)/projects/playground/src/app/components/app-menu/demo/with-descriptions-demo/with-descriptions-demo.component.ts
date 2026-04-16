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
  selector: 'ava-menu-with-descriptions-demo',
  standalone: true,
  imports: [CommonModule, AavaMenuComponent, AavaButtonComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="button-container">
          <aava-button
            label="Menu with Descriptions"
            variant="secondary"
            size="md"
            (click)="toggleMenu()"
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

      .demo-info .description {
        font-style: italic;
        margin-top: 0.25rem;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class WithDescriptionsDemoComponent {
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
    showDescription: true,
    iconSize: 24,
    titleWeight: 'medium',
    descriptionSize: 'sm',
  };

  menuItems: MenuItem[] = [
    {
      label: 'Export as PDF',
      description: 'Download your data as a PDF document',
      route: '/export/pdf',
      icon: 'file-text',
    },
    {
      label: 'Export as Excel',
      description: 'Download your data as an Excel spreadsheet',
      route: '/export/excel',
      icon: 'table',
    },
    {
      label: 'Share via Email',
      description: 'Send the data to someone via email',
      route: '/share/email',
      icon: 'mail',
    },
    {
      label: 'Share via Link',
      description: 'Generate a shareable link for the data',
      route: '/share/link',
      icon: 'link',
    },
    {
      label: 'Archive',
      description: 'Move this item to the archive folder',
      route: '/archive',
      icon: 'archive',
    },
    {
      label: 'Delete Permanently',
      description: 'Remove this item permanently (cannot be undone)',
      route: '/delete',
      icon: 'trash-2',
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
