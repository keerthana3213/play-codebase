import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLoaderComponent } from '@aava/play-core';

@Component({
    selector: 'ava-loader-basic-usage-demo',
    standalone: true,
    imports: [CommonModule, AavaLoaderComponent],
    template: `
    <div class="demo-section center-demo">
      <aava-loader>
        <div class="loading-content">
          <p>Loading data...</p>
        </div>
      </aava-loader>
    </div>
  `,
    styles: [
        `
      .center-demo {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        background: var(--surface-ground);
        border-radius: 8px;
        padding: 2rem;
      }
      .loading-content {
        text-align: center;
        color: var(--text-secondary);
      }
    `,
    ],
})
export class LoaderBasicUsageDemoComponent { }
