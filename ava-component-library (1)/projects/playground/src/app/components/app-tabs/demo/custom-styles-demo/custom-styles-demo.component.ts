import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AavaTabsComponent } from '@aava/play-core';
import {
  buttonTabs,
  pillTabRowWrapperStyles,
  pillTabRowBackgroundStyles,
} from '../tabs-demo.data';

@Component({
  selector: 'ava-tabs-custom-styles-demo',
  standalone: true,
  imports: [CommonModule, AavaTabsComponent],
  template: `
    <div style="max-width: 800px; margin: 2rem auto;">
      <aava-tabs
        [tabs]="buttonTabs"
        [activeTabId]="activeTabId"
        variant="button"
        buttonShape="pill"
        [tabRowWrapperStyles]="pillTabRowWrapperStyles"
        [tabRowBackgroundStyles]="pillTabRowBackgroundStyles"
        (tabChange)="activeTabId = $event.id"
        ariaLabel="Custom styles tabs demo"
        [scrollable]="true"
        [activeButtonTabStyles]="{
          background: '#0097a7',
          border: 'none',
        }"
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
export class AppTabsCustomStylesDemoComponent {
  buttonTabs = buttonTabs;
  pillTabRowWrapperStyles = pillTabRowWrapperStyles;
  pillTabRowBackgroundStyles = pillTabRowBackgroundStyles;
  activeTabId = this.buttonTabs[0]?.id || 'overview';
}
