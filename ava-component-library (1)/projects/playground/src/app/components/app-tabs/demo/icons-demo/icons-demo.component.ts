import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTabsComponent } from '@aava/play-core';
import { iconTabs } from '../tabs-demo.data';

@Component({
  selector: 'ava-tabs-icons-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div class="icons-demo-wrapper">
      <!-- Icon Position: Left (Start) -->
      <div class="demo-section">
        <aava-tabs
          [tabs]="iconTabs"
          [activeTabId]="activeTabIds.left"
          variant="default"
          iconPosition="start"
          (tabChange)="activeTabIds.left = $event.id"
          [showContentPanels]="false"
          ariaLabel="Tabs with icons on left"
        ></aava-tabs>
      </div>

      <!-- Icon Position: Right (End) -->
      <div class="demo-section">
        <aava-tabs
          [tabs]="iconTabs"
          [activeTabId]="activeTabIds.right"
          variant="default"
          iconPosition="end"
          (tabChange)="activeTabIds.right = $event.id"
          [showContentPanels]="false"
          ariaLabel="Tabs with icons on right"
        ></aava-tabs>
      </div>

      <!-- Icon Only -->
      <div class="demo-section">
        <aava-tabs
          [tabs]="iconTabs"
          [activeTabId]="activeTabIds.iconOnly"
          variant="iconOnlySquare"
          (tabChange)="activeTabIds.iconOnly = $event.id"
          [showContentPanels]="false"
          ariaLabel="Icon-only tabs"
        ></aava-tabs>
      </div>
    </div>
  `,
  styles: [
    `
      .icons-demo-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
      }
      :host {
        display: block;
        margin-top: 0;
        color: var(--color-text-primary);
      }
    `,
  ],
})
export class AppTabsIconsDemoComponent {
  iconTabs = iconTabs;

  activeTabIds = {
    left: this.iconTabs[0]?.id || 'dashboard',
    right: this.iconTabs[0]?.id || 'dashboard',
    iconOnly: this.iconTabs[0]?.id || 'dashboard'
  };
}