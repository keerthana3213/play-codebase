import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDividersComponent } from '@aava/play-core';

@Component({
  selector: 'ava-variants-demo',
  standalone: true,
  imports: [CommonModule, AavaDividersComponent],
  templateUrl: './variants-demo.component.html',
  styleUrls: ['./variants-demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .demo-container {
        max-width: 700px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }

      .demo-section {
        margin-bottom: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .example-container {
        width: 100%;
        max-width: 800px;
      }
    `,
  ],
})
export class VariantsDemoComponent {
  copyCode(codeType: string): void {
    const codeExamples: Record<string, string> = {
      solid: `
<!-- Solid divider for clear separation -->
<ava-dividers variant="solid" color="#333"></ava-dividers>`,

      dashed: `
<!-- Dashed divider for subtle separation -->
<ava-dividers variant="dashed" color="#666"></ava-dividers>`,

      dotted: `
<!-- Dotted divider for delicate separation -->
<ava-dividers variant="dotted" color="#999"></ava-dividers>`,

      gradient: `
<!-- Gradient divider for modern aesthetics -->
<ava-dividers variant="gradient"></ava-dividers>`,

      all: `
<!-- All variants example -->
<section>
  <h3>Main Content Section</h3>
  <p>Important content that needs clear separation...</p>
  <ava-dividers variant="solid" color="#333"></ava-dividers>
</section>

<section>
  <h3>Secondary Content</h3>
  <p>Secondary content with subtle separation...</p>
  <ava-dividers variant="dashed" color="#666"></ava-dividers>
</section>

<section>
  <h3>Fine Details</h3>
  <p>Fine content with delicate visual breaks...</p>
  <ava-dividers variant="dotted" color="#999"></ava-dividers>
</section>

<section>
  <h3>Premium Section</h3>
  <p>Modern content with gradient transitions...</p>
  <ava-dividers variant="gradient"></ava-dividers>
</section>`,
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
