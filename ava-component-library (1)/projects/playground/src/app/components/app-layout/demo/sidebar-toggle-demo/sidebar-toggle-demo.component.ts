import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLayoutComponent, AavaButtonComponent } from '@aava/play-core';

@Component({
    selector: 'ava-layout-sidebar-toggle-demo',
    standalone: true,
    imports: [CommonModule, AavaLayoutComponent, AavaButtonComponent],
    template: `
    <div class="demo-controls">
      <aava-button (click)="leftOpen = !leftOpen" [label]="(leftOpen ? 'Close' : 'Open') + ' Left Panel'" size="sm" variant="secondary"></aava-button>
      <aava-button (click)="rightOpen = !rightOpen" [label]="(rightOpen ? 'Close' : 'Open') + ' Right Panel'" size="sm" variant="secondary"></aava-button>
    </div>
    <div class="layout-wrapper">
      <aava-layout
        [(leftPanelOpen)]="leftOpen"
        [(rightPanelOpen)]="rightOpen"
        [showLeftPanel]="true"
        [showRightPanel]="true"
        leftPanelWidth="200px"
        rightPanelWidth="200px"
      >
        <div slot="header" class="demo-header">Sidebar Toggle Demo</div>
        <div slot="left-panel" class="panel-content">Left Panel Content</div>
        <div slot="right-panel" class="panel-content">Right Panel Content</div>
        <div class="demo-main">
          <p>Use the buttons above to toggle the side panels.</p>
        </div>
      </aava-layout>
    </div>
  `,
    styles: [
        `
      .demo-controls {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
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
        background: #f1f5f9;
        font-weight: 600;
      }
      .panel-content {
        padding: 1rem;
        height: 100%;
        background: #f8fafc;
      }
      .demo-main {
        padding: 2rem;
      }
    `,
    ],
})
export class LayoutSidebarToggleDemoComponent {
    leftOpen = true;
    rightOpen = false;
}
