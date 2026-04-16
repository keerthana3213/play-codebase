import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLinkComponent } from '@aava/play-core';

@Component({
  selector: 'ava-actionlinks-accessibility',
  standalone: true,
  imports: [CommonModule, AavaLinkComponent],
  template: `
    <div class="demo-container">
      <h3>Accessibility Demo</h3>
      <p>This demo shows accessibility features for links.</p>
      <aava-link
        label="Accessible Link"
        color="primary"
        tabindex="0"
        role="button"
      ></aava-link>
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
export class ActionlinksAccessibilityComponent { }
