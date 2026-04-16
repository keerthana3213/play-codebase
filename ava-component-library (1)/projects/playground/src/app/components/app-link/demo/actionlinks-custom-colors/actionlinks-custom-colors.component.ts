import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLinkComponent } from '@aava/play-core';

@Component({
  selector: 'ava-actionlinks-custom-colors',
  standalone: true,
  imports: [CommonModule, AavaLinkComponent],
  template: `
    <div class="demo-container">
      <h3>Custom Colors Demo</h3>
      <p>This demo shows custom hex color usage for links.</p>
      <aava-link label="Custom Purple Link" color="#7C3AED"></aava-link>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }
    `,
  ],
})
export class ActionlinksCustomColorsComponent { }
