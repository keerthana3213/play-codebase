import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLinkComponent } from '@aava/play-core';

@Component({
  selector: 'ava-actionlinks-underline',
  standalone: true,
  imports: [CommonModule, AavaLinkComponent],
  template: `
    <div class="demo-container">
      <div class="demo-section">
        <div class="underline-examples">
          <aava-link label="No Underline" [underline]="false" color="primary"></aava-link>
          <aava-link label="With Underline" [underline]="true" color="primary"></aava-link>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
      }
      .demo-section {
        margin-bottom: 2rem;
      }
      .underline-examples {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }
    `,
  ],
})
export class ActionlinksUnderlineComponent {}
