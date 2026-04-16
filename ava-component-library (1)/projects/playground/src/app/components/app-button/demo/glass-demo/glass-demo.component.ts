import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-glass-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-section center-demo glass-bg">
      <div class="glass-demo-background">
        <div class="button-group">
          <aava-button
            label="Glass 50 (Medium)"
            glassVariant="glass-50"
            [pill]="true"
          ></aava-button>
          <aava-button
            label="Glass 75 (Strong)"
            glassVariant="glass-75"
            [pill]="true"
          ></aava-button>
          <aava-button
            label="Glass 100 (Max)"
            glassVariant="glass-100"
            [pill]="true"
          ></aava-button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .center-demo {
        // display: flex;
        // align-items: center;
        justify-content: center;
        min-height: 60vh;
      }
      .demo-section {
        margin-bottom: 2rem;
        // padding: 2rem;
        // border-radius: 8px;
      }

      .glass-demo-background {
        background: url('/assets/glass_1.png') !important;
        background-size: 100% 100% !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        padding: 4rem 3rem;
        // border-radius: 2rem;
        position: relative;
        z-index: 3;
        min-height: 300px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      }
      .description {
        color: #666;
        margin-bottom: 1rem;
      }
      .button-group {
        display: flex;
        gap: 1rem; // Reduced from 1.5rem since buttons now have 4px margins
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class GlassDemoComponent { }
