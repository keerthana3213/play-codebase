import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { verticalTabs } from '../tabs-demo.data';
import { AavaTabsComponent } from '@aava/play-core';

@Component({
  selector: 'ava-tabs-vertical-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div style="max-width: 800px; margin: 2rem auto; display: flex; gap: 2rem;">
      <aava-tabs
        [tabs]="verticalTabs"
        [activeTabId]="activeTabId"
        orientation="vertical"
        style="min-height: 300px;"
        (tabChange)="activeTabId = $event.id"
        ariaLabel="Vertical tabs demo"
        variant="button"
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
        margin-top: 1rem;
        padding: 1.5rem;
        border: 1px solid #eee;
        border-radius: 8px;
        min-width: 320px;
        height: 29vh;
        // display: flex;
        margin-top: 0;
      }
    `,
  ],
})
export class AppTabsVerticalDemoComponent {
  verticalTabs = verticalTabs;
  activeTabId = this.verticalTabs[0]?.id || 'overview';
}
