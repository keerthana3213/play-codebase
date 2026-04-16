import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTooltipDirective } from '@aava/play-core';
import { AavaButtonComponent } from '@aava/play-core';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'ava-tooltip-animation-demo',
  standalone: true,
  imports: [CommonModule,
    // AavaTooltipDirective, 
    AavaButtonComponent, AavaToggleComponent],
  template: `
    <div class="demo-container">
      <h2>Tooltip Animation</h2>
      <p class="demo-description">
        Enable or disable Tooltip animation for appearance/disappearance. Toggle
        the setting below to see the difference in behavior.
      </p>

      <div class="demo-section">
        <h3>Animation Control</h3>
        <div class="animation-control">
          <aava-toggle
            [checked]="animationEnabled"
            (checkedChange)="toggleAnimation($event)"
            label="Enable Animation"
          >
          </aava-toggle>
          <span class="status-text">
            Animation:
            <strong>{{ animationEnabled ? 'Enabled' : 'Disabled' }}</strong>
          </span>
        </div>
      </div>

      <div class="demo-section">
        <h3>Test Animation</h3>
        <div class="animation-test-grid">
          <aava-button
            label="Hover Me"
            variant="primary"
            size="md"
            aavaTooltipDescription="This Tooltip respects the animation setting"
            aavaTooltipPosition="top"
          >
          </aava-button>

          <aava-button
            label="Test Here Too"
            variant="secondary"
            size="md"
            aavaTooltipDescription="Animation can make Tooltips feel more polished and professional"
            aavaTooltipPosition="bottom"
          >
          </aava-button>

          <aava-button
            label="And Here"
            variant="secondary"
            size="md"
            aavaTooltipDescription="Try toggling animation on and off to see the difference"
            aavaTooltipPosition="right"
          >
          </aava-button>
        </div>
      </div>

      <div class="demo-section">
        <h3>Animation Comparison</h3>
        <div class="comparison-grid">
          <div class="comparison-item">
            <h4>With Animation</h4>
            <aava-button
              label="Animated"
              variant="success"
              size="md"
              aavaTooltipDescription="Smooth fade-in and fade-out animation"
              aavaTooltipPosition="top"
            >
            </aava-button>
            <p class="comparison-description">
              Smooth transition creates a polished user experience
            </p>
          </div>

          <div class="comparison-item">
            <h4>Without Animation</h4>
            <aava-button
              label="Instant"
              variant="warning"
              size="md"
              aavaTooltipDescription="Immediate show and hide without transition"
              aavaTooltipPosition="top"
            >
            </aava-button>
            <p class="comparison-description">
              Instant appearance for faster information access
            </p>
          </div>
        </div>
      </div>

      <div class="demo-section">
        <h3>Performance Considerations</h3>
        <div class="performance-info">
          <div class="info-card">
            <h4>When to Enable Animation</h4>
            <ul>
              <li>Modern devices with good performance</li>
              <li>Non-critical Tooltip information</li>
              <li>Enhanced user experience is prioritized</li>
              <li>Tooltips appear infrequently</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>When to Disable Animation</h4>
            <ul>
              <li>Performance-critical applications</li>
              <li>Reduced motion accessibility preference</li>
              <li>Frequent Tooltip interactions</li>
              <li>Older or lower-powered devices</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="code-example">
        <h3>Code Example</h3>
        <pre><code>{{ codeExample }}</code></pre>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
      }

      .demo-description {
        color: #666;
        margin-bottom: 30px;
        font-size: 16px;
      }

      .demo-section {
        margin-bottom: 40px;
      }

      .demo-section h3 {
        color: #333;
        margin-bottom: 20px;
        font-size: 18px;
      }

      .animation-control {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #dee2e6;
      }

      .status-text {
        color: #495057;
        font-size: 14px;
      }

      .animation-test-grid {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
        padding: 2rem;
      }

      .comparison-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-top: 1rem;
      }

      .comparison-item {
        text-align: center;
        padding: 1.5rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #dee2e6;
      }

      .comparison-item h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 16px;
      }

      .comparison-description {
        margin-top: 1rem;
        color: #666;
        font-size: 14px;
        line-height: 1.4;
      }

      .performance-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-top: 1rem;
      }

      .info-card {
        background-color: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #007bff;
      }

      .info-card h4 {
        margin: 0 0 1rem 0;
        color: #333;
        font-size: 16px;
      }

      .info-card ul {
        margin: 0;
        padding-left: 1.5rem;
        color: #666;
      }

      .info-card li {
        margin-bottom: 0.5rem;
        line-height: 1.4;
      }

      .code-example {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #007bff;
      }

      .code-example h3 {
        margin-top: 0;
        color: #333;
      }

      pre {
        background-color: #2d3748;
        color: #e2e8f0;
        padding: 16px;
        border-radius: 6px;
        overflow-x: auto;
        margin: 0;
      }

      code {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 14px;
      }

      @media (max-width: 768px) {
        .comparison-grid,
        .performance-info {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class TooltipAnimationDemoComponent {
  animationEnabled = true;

  toggleAnimation(enabled: boolean): void {
    this.animationEnabled = enabled;
  }

  codeExample = `<!-- Enable animation (default) -->
<aava-button
  label="Animated"
  aavaTooltip="Smooth animation">
</aava-button>

<!-- Disable animation -->
<aava-button
  label="Instant"
  aavaTooltip="No animation">
</aava-button>

<!-- Dynamic animation control -->
<aava-button
  label="Dynamic"
  aavaTooltip="Animation controlled by variable">
</aava-button>`;
}
