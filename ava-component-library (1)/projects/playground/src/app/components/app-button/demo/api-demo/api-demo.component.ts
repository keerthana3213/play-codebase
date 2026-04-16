import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-section center-demo">
      <h3>API Reference</h3>
      <p class="description">Button component API documentation and usage</p>
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
            <tr *ngFor="let prop of apiProps">
              <td>{{ prop.name }}</td>
              <td>{{ prop.type }}</td>
              <td>{{ prop.default }}</td>
              <td>{{ prop.description }}</td>
            </tr>
          </tbody>
        </table>
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
        background: #f8f9fa;
        border-radius: 8px;
        width: 100%;
      }
      .description {
        color: #666;
        margin-bottom: 1rem;
      }
      .api-table-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .api-table {
        border-collapse: collapse;
        width: 100%;
        max-width: 900px;
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
      }
    `,
  ],
})
export class ApiDemoComponent {
  apiProps = [
    {
      name: 'variant',
      type: 'string',
      default: 'primary',
      description:
        'Button variant: primary, secondary, danger, success, warning',
    },
    {
      name: 'size',
      type: 'string',
      default: 'medium',
      description: 'Button size: xsmall, small, medium, large, xlarge',
    },
    {
      name: 'shape',
      type: 'string',
      default: 'rounded',
      description: 'Button shape: rounded, square, pill',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show loading state',
    },
    {
      name: 'icon',
      type: 'string',
      default: 'undefined',
      description: 'Icon name to display in the button',
    },
    {
      name: 'iconPosition',
      type: 'string',
      default: 'left',
      description: 'Icon position: left, right',
    },
  ];
}
