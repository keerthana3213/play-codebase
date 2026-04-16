import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDividersComponent } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaDividersComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BasicUsageDemoComponent {
  copyCode(codeType: string): void {
    const codeExamples: Record<string, string> = {
      basic: `
<div class="content-section">
  <h3>Product Description</h3>
  <p>This is our premium product with excellent features and quality craftsmanship.</p>
  
  <!-- Basic horizontal divider -->
  <aava-dividers></aava-dividers>
  
  <h3>Customer Reviews</h3>
  <p>See what our customers are saying about this amazing product.</p>
</div>`,

      import: `
import { Component } from '@angular/core';
import { DividersComponent } from '@ava/@aava/play-core';

@Component({
  selector: 'app-basic-divider',
  standalone: true,
  imports: [DividersComponent],
  templateUrl: './basic-divider.component.html'
})
export class BasicDividerComponent {}`,
    };

    const code = codeExamples[codeType] || '';
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }
}
