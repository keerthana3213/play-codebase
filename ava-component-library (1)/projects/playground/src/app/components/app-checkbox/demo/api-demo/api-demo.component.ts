import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-section center-demo">
      <h3>API Reference</h3>
      <p class="description">Checkbox component API documentation and usage</p>

      <div class="api-content">
        <div class="api-section">
          <h4>Inputs</h4>
          <div class="api-table-wrapper">
            <table class="api-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let prop of inputs">
                  <td>{{ prop.name }}</td>
                  <td>
                    <code>{{ prop.type }}</code>
                  </td>
                  <td>{{ prop.default }}</td>
                  <td>{{ prop.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="api-section">
          <h4>Outputs</h4>
          <div class="api-table-wrapper">
            <table class="api-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let event of outputs">
                  <td>{{ event.name }}</td>
                  <td>
                    <code>{{ event.type }}</code>
                  </td>
                  <td>{{ event.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="api-section">
          <h4>CSS Custom Properties</h4>
          <p class="section-description">
            The checkbox component uses semantic design tokens that can be
            overridden:
          </p>
          <div class="css-properties">
            <div class="property-group">
              <h5>Box styling</h5>
              <ul>
                <li><code>--checkbox-box-background</code></li>
                <li><code>--checkbox-box-checked-border</code></li>
                <li><code>--checkbox-box-checked-background</code></li>
                <li><code>--checkbox-box-border-disabled</code></li>
                <li><code>--checkbox-box-background-disabled</code></li>
                <li><code>--checkbox-box-border-radius</code></li>
              </ul>
            </div>
            <div class="property-group">
              <h5>Icon styling</h5>
              <ul>
                <li><code>--checkbox-icon-color-disabled</code></li>
                <li><code>--checkbox-box-checked-color</code></li>
              </ul>
            </div>
            <div class="property-group">
              <h5>Label styling</h5>
              <ul>
                <li><code>--checkbox-label-font</code></li>
                <li><code>--checkbox-label-color</code></li>
                <li><code>--checkbox-label-color-disabled</code></li>
                <li><code>--checkbox-label-cursor</code></li>
                <li><code>--checkbox-label-cursor-disabled</code></li>
              </ul>
            </div>
            <div class="property-group">
              <h5>Interaction</h5>
              <ul>
                <li><code>--checkbox-cursor-disabled</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="api-section">
          <h4>Computed Properties</h4>
          <p class="section-description">
            The component provides several computed properties for advanced
            usage:
          </p>
          <div class="computed-properties">
            <div class="property-item">
              <strong>containerClasses</strong> - CSS classes for the container
              element
            </div>
            <div class="property-item">
              <strong>checkboxClasses</strong> - CSS classes for the checkbox
              element
            </div>
            <div class="property-item">
              <strong>showIcon</strong> - Whether to show the icon (checkmark or
              indeterminate)
            </div>
            <div class="property-item">
              <strong>showCheckmark</strong> - Whether to show checkmark
              specifically
            </div>
          </div>
        </div>

        <div class="api-section">
          <h4>Animation Timing</h4>
          <p class="section-description">
            Each variant has carefully tuned animation timing for optimal user
            experience:
          </p>
          <div class="animation-timing">
            <div class="timing-group">
              <h5>Default Variant</h5>
              <ul>
                <li>
                  <strong>Check:</strong> 250ms cubic-bezier(0.25, 0.46, 0.45,
                  0.94)
                </li>
                <li>
                  <strong>Uncheck:</strong> 300ms cubic-bezier(0.55, 0.06, 0.68,
                  0.19)
                </li>
              </ul>
            </div>
            <div class="timing-group">
              <h5>With-bg Variant</h5>
              <ul>
                <li>
                  <strong>Check:</strong> 150ms cubic-bezier(0.25, 0.46, 0.45,
                  0.94)
                </li>
                <li>
                  <strong>Uncheck:</strong> 150ms cubic-bezier(0.55, 0.06, 0.68,
                  0.19)
                </li>
              </ul>
            </div>
            <div class="timing-group">
              <h5>Animated Variant</h5>
              <ul>
                <li><strong>Background:</strong> 300ms ease-out</li>
                <li>
                  <strong>Checkmark:</strong> 300ms cubic-bezier(0.25, 0.46,
                  0.45, 0.94) with 300ms delay
                </li>
                <li>
                  <strong>Uncheck:</strong> 300ms background + 150ms checkmark
                  (simultaneous)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .center-demo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
      }
      .demo-section {
        margin-bottom: 2rem;
        padding: 2rem;
        background: #fff;
        border-radius: 8px;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
      }
      .description {
        color: #666;
        margin-bottom: 2rem;
        text-align: center;
      }
      .api-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .api-section {
        background: #fff;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }
      .api-section h4 {
        margin: 0 0 1rem 0;
        color: #1f2937;
        font-size: 1.2rem;
      }
      .section-description {
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
      }
      .api-table-wrapper {
        width: 100%;
        overflow-x: auto;
      }
      .api-table {
        border-collapse: collapse;
        width: 100%;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      .api-table th,
      .api-table td {
        padding: 0.75rem 1rem;
        border: 1px solid #e5e7eb;
        text-align: left;
      }
      .api-table th {
        background: #f3f4f6;
        font-weight: 600;
        color: #1f2937;
      }
      .api-table td {
        vertical-align: top;
      }
      .api-table code {
        background: #f3f4f6;
        padding: 0.125rem 0.25rem;
        border-radius: 3px;
        font-size: 0.85rem;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      }
      .css-properties {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      .property-group {
        padding: 1rem;
        background: #f9fafb;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }
      .property-group h5 {
        margin: 0 0 0.75rem 0;
        color: #1f2937;
        font-size: 1rem;
      }
      .property-group ul {
        margin: 0;
        padding-left: 1.25rem;
      }
      .property-group li {
        margin-bottom: 0.25rem;
        line-height: 1.4;
        font-size: 0.9rem;
      }
      .property-group code {
        background: #f3f4f6;
        padding: 0.125rem 0.25rem;
        border-radius: 3px;
        font-size: 0.85rem;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      }
      .computed-properties {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .property-item {
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
        font-size: 0.9rem;
        line-height: 1.4;
      }
      .animation-timing {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      .timing-group {
        padding: 1rem;
        background: #f9fafb;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
      }
      .timing-group h5 {
        margin: 0 0 0.75rem 0;
        color: #1f2937;
        font-size: 1rem;
      }
      .timing-group ul {
        margin: 0;
        padding-left: 1.25rem;
      }
      .timing-group li {
        margin-bottom: 0.25rem;
        line-height: 1.4;
        font-size: 0.9rem;
      }
    `,
  ],
})
export class ApiDemoComponent {
  inputs = [
    {
      name: 'variant',
      type: "'default' | 'with-bg' | 'animated'",
      default: "'default'",
      description: 'Animation style variant',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'Checkbox size',
    },
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Visible label text',
    },
    {
      name: 'isChecked',
      type: 'boolean',
      default: 'false',
      description: 'Whether checkbox is checked',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Whether checkbox is in indeterminate state',
    },
    {
      name: 'disable',
      type: 'boolean',
      default: 'false',
      description: 'Whether checkbox is disabled',
    },
  ];

  outputs = [
    {
      name: 'isCheckedChange',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when checkbox state changes',
    },
  ];
}
