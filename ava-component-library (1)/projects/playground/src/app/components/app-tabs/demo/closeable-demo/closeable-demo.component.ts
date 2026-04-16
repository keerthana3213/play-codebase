import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItem, AavaTabsComponent } from '@aava/play-core';
import { advancedTabs } from '../tabs-demo.data';

@Component({
  selector: 'ava-tabs-closeable-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div style="max-width: 600px; margin: 2rem auto;">
      <aava-tabs
        [tabs]="closeableTabs"
        [activeTabId]="activeTabId"
        [allowTabClose]="true"
        (tabChange)="activeTabId = $event.id"
        (tabClose)="removeTab($event)"
        ariaLabel="Closeable tabs demo"
      ></aava-tabs>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        border-radius: 8px;
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
      }
    `,
  ],
})
export class AppTabsCloseableDemoComponent {
  closeableTabs: TabItem[] = advancedTabs.filter((tab) => tab.closeable);
  activeTabId = this.closeableTabs[0]?.id || 'tasks';

  removeTab(tab: TabItem) {
    this.closeableTabs = this.closeableTabs.filter((t) => t.id !== tab.id);
    if (this.activeTabId === tab.id && this.closeableTabs.length) {
      this.activeTabId = this.closeableTabs[0].id;
    }
  }
}
