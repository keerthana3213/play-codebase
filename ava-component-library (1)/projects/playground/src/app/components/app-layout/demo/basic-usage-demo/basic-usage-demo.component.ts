import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLayoutComponent } from '@aava/play-core';

@Component({
    selector: 'ava-layout-basic-usage-demo',
    standalone: true,
    imports: [CommonModule, AavaLayoutComponent],
    template: `
    <div class="layout-wrapper">
      <aava-layout
        headerHeight="60px"
        footerHeight="40px"
        footerText="© 2024 Basic Layout Demo"
        [showLeftPanel]="false"
        [showRightPanel]="false"
      >
        <div slot="header" class="demo-header">Header</div>
        <div class="demo-main">
          <h2>Main Content Area</h2>
          <p>This is a simple layout with only header and footer.</p>
        </div>
        <div slot="footer" class="demo-footer">Footer Content</div>
      </aava-layout>
    </div>
  `,
    styles: [
        `
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
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        font-weight: 600;
      }
      .demo-main {
        padding: 2rem;
      }
      .demo-footer {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        background: #f8fafc;
        border-top: 1px solid #e2e8f0;
        font-size: 0.875rem;
      }
    `,
    ],
})
export class LayoutBasicUsageDemoComponent { }
