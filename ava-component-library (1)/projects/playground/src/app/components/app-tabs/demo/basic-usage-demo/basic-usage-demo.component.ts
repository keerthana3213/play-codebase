import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTabsComponent } from '@aava/play-core';
import { basicTabs } from '../tabs-demo.data';

@Component({
  selector: 'ava-tabs-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div class="tabs-demo-wrapper">
      <aava-tabs
        [tabs]="basicTabs"
        [activeTabId]="activeTabId"
        (tabChange)="activeTabId = $event.id"
        ariaLabel="Basic tabs demo"
      ></aava-tabs>
    </div>
  `,
  styles: [
    `
      .tabs-demo-wrapper {
        max-width: 800px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      ::ng-deep .ava-tabs__panel {
        margin-top: 2rem;
        padding: 1.5rem;
        border: 1px solid #eee;
        border-radius: 8px;
        min-width: 320px;
        min-height: 80px;
        display: flex;
      }
      :host {
        display: block;
        margin-top: 0;
      }
    `,
  ],
})
export class AppTabsBasicUsageDemoComponent {
  basicTabs = basicTabs;
  activeTabId = this.basicTabs[0]?.id || 'home';
}
