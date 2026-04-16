import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AavaTabsComponent } from '@aava/play-core';
import { buttonTabs, iconTabs } from '../tabs-demo.data';

@Component({
  selector: 'ava-tabs-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div class="tabs-demo-wrapper">
      <!-- First Line: Pill and Rectangle with Border/Without Border -->
      <div class="variant-row">
        <div class="variant-item">
          <span>Pill with Border</span>
          <aava-tabs
            [tabs]="compactTabs"
            variant="button"
            buttonShape="pill"
            [bordered]="true"
            size="sm"
            [activeTabId]="activeTabIds.pill"
            (tabChange)="activeTabIds.pill = $event.id"
            [showContentPanels]="false"
          ></aava-tabs>
        </div>
        <div class="variant-item">
          <span>Rectangle with Border</span>
          <aava-tabs
            [tabs]="compactTabs"
            variant="button"
            buttonShape="rounded"
            [bordered]="true"
            size="sm"
            [activeTabId]="activeTabIds.rectangle"
            (tabChange)="activeTabIds.rectangle = $event.id"
            [showContentPanels]="false"
          ></aava-tabs>
        </div>
      </div>

      <!-- Second Line: Icons and Underline -->
      <div class="variant-row">
        <div class="variant-item">
          <span>Icon Only</span>
          <aava-tabs
            [tabs]="iconTabs.slice(0, 4)"
            variant="iconOnlySquare"
            size="sm"
            [activeTabId]="activeTabIds.iconOnly"
            (tabChange)="activeTabIds.iconOnly = $event.id"
            [showContentPanels]="false"
          ></aava-tabs>
        </div>
        <div class="variant-item">
          <span>Default Underline</span>
          <aava-tabs
            [tabs]="compactTabs"
            variant="default"
            size="sm"
            [activeTabId]="activeTabIds.underline"
            (tabChange)="activeTabIds.underline = $event.id"
            [showContentPanels]="false"
          ></aava-tabs>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .tabs-demo-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        color: var(--color-text-primary);
        padding: 1rem;
      }

      .variant-row {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .variant-item {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        align-items: center;
        min-width: 250px;
      }

      .variant-item span {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-secondary);
        text-align: center;
      }

      :host {
        display: block;
        border-radius: 8px;
        color: var(--color-text-primary);
      }
    `,
  ],
})
export class AppTabsVariantsDemoComponent {
  buttonTabs = buttonTabs;
  iconTabs = iconTabs;

  // Compact version with fewer tabs for better fit
  compactTabs = this.buttonTabs.slice(0, 3);

  activeTabIds = {
    pill: this.compactTabs[0]?.id || 'overview',
    rectangle: this.compactTabs[0]?.id || 'overview',
    iconOnly: this.iconTabs[0]?.id || 'dashboard',
    underline: this.compactTabs[0]?.id || 'overview'
  };
}

