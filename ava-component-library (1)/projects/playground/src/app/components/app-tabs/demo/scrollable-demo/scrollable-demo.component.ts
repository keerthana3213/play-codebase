import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTabsComponent } from '@aava/play-core';
import { manyTabs } from '../tabs-demo.data';

@Component({
  selector: 'ava-tabs-scrollable-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div style="max-width: 800px; margin: 2rem auto;">
      <aava-tabs
        [tabs]="manyTabs"
        [activeTabId]="activeTabId"
        [scrollable]="true"
        [maxVisibleTabs]="5"
        (tabChange)="activeTabId = $event.id"
        ariaLabel="Scrollable tabs demo"
        variant="button"
        buttonShape="pill"
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
export class AppTabsScrollableDemoComponent {
  manyTabs = manyTabs;
  activeTabId = this.manyTabs[0]?.id || 'tab1';
}
