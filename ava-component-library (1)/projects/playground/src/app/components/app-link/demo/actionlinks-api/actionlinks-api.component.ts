import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-actionlinks-api',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container">
      <h3>API Reference</h3>
      <p>This demo shows the API documentation for the link component.</p>
      <div class="api-table">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>label</td>
              <td>string</td>
              <td>undefined</td>
              <td>The text content of the link</td>
            </tr>
            <tr>
              <td>color</td>
              <td>string</td>
              <td>default</td>
              <td>The color variant of the link</td>
            </tr>
            <tr>
              <td>size</td>
              <td>string</td>
              <td>medium</td>
              <td>The size of the link</td>
            </tr>
            <tr>
              <td>underline</td>
              <td>boolean</td>
              <td>false</td>
              <td>Whether the link is underlined</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }
      .api-table table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }
      .api-table th,
      .api-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      .api-table th {
        background-color: #f2f2f2;
      }
    `,
  ],
})
export class ActionlinksApiComponent {}
