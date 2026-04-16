import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLayoutComponent, AavaButtonComponent } from '@aava/play-core';

@Component({
    selector: 'ava-layout-custom-widths-demo',
    standalone: true,
    imports: [CommonModule, AavaLayoutComponent, AavaButtonComponent],
    template: `
    <div class="demo-controls">
      <div class="control-group">
        <label>Left Panel:</label>
        <aava-button (click)="leftWidth = '150px'" label="150px" size="xs" variant="secondary"></aava-button>
        <aava-button (click)="leftWidth = '300px'" label="300px" size="xs" variant="secondary"></aava-button>
      </div>
      <div class="control-group">
        <label>Header:</label>
        <aava-button (click)="headerHeight = '50px'" label="50px" size="xs" variant="secondary"></aava-button>
        <aava-button (click)="headerHeight = '120px'" label="120px" size="xs" variant="secondary"></aava-button>
      </div>
    </div>
    <div class="layout-wrapper">
      <aava-layout
        [leftPanelWidth]="leftWidth"
        [headerHeight]="headerHeight"
        [showLeftPanel]="true"
        [leftPanelOpen]="true"
      >
        <div slot="header" class="demo-header">Custom Widths & Heights</div>
        <div slot="left-panel" class="panel-content">Width: {{leftWidth}}</div>
        <div class="demo-main">
          <p>Header Height: {{headerHeight}}</p>
          <p>Left Panel Width: {{leftWidth}}</p>
        </div>
      </aava-layout>
    </div>
  `,
    styles: [
        `
      .demo-controls {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .control-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        label { min-width: 100px; font-weight: 600; }
      }
      .layout-wrapper {
        height: 400px;
        border: 1px solid var(--surface-border);
        border-radius: 8px;
        overflow: hidden;
      }
      .demo-header {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        background: #e2e8f0;
      }
      .panel-content {
        padding: 1rem;
        background: #f1f5f9;
        height: 100%;
      }
      .demo-main {
        padding: 2rem;
      }
    `,
    ],
})
export class LayoutCustomWidthsDemoComponent {
    leftWidth = '250px';
    headerHeight = '80px';
}
