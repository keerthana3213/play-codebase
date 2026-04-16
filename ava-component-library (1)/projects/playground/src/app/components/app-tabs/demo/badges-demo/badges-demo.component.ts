import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { badgesTabs } from '../tabs-demo.data';
import {
  AavaTabsComponent,
  TabItem,
} from '@aava/play-core';

@Component({
  selector: 'ava-tabs-badges-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div style="max-width: 800px; margin: 2rem auto;">
      <aava-tabs
        [tabs]="tabsWithBadges"
        [activeTabId]="activeTabId"
        (tabChange)="activeTabId = $event.id"
        ariaLabel="Tabs with badges demo"
      ></aava-tabs>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 0;
      }
    `,
    `
      ::ng-deep .ava-tabs__panel {
        margin-top: 2rem;
        padding: 1.5rem;
        border: 1px solid #eee;
        border-radius: 8px;
        min-width: 320px;
        min-height: 80px;
        display: flex;
        margin-top: 0;
      }
    `,
  ],
})
export class AppTabsBadgesDemoComponent {
  tabsWithBadges: TabItem[] = badgesTabs.filter((tab) => tab.badge);
  activeTabId = this.tabsWithBadges[0]?.id || 'projects';
}
