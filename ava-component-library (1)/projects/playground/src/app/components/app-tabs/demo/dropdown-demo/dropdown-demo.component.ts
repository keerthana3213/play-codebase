import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTabsComponent } from '@aava/play-core';
import { manyTabs } from '../tabs-demo.data';

@Component({
  selector: 'ava-tabs-dropdown-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div style="max-width: 700px; margin: 2rem auto;">
      <aava-tabs
        [tabs]="manyTabs"
        [activeTabId]="activeTabId"
        [scrollable]="true"
        [showDropdown]="true"
        [maxVisibleTabs]="4"
        (tabChange)="activeTabId = $event.id"
        ariaLabel="Dropdown tabs demo"
      ></aava-tabs>
      <div
        style="margin-top: 2rem; padding: 1rem; border: 1px solid #eee; border-radius: 8px;"
      >
        <ng-container *ngIf="activeTabId"
          >Tab {{ activeTabId }} Content</ng-container
        >
      </div>
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
        color: #eee;
      }
    `,
  ],
})
export class AppTabsDropdownDemoComponent {
  manyTabs = manyTabs;
  activeTabId = this.manyTabs[0]?.id || 'tab1';
}
