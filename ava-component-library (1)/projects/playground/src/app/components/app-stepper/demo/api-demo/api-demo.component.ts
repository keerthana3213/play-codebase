import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="center-demo">
      <div class="demo-section">
        <h3>API Reference</h3>
        <p class="description">
          Complete reference of all available properties, events, and methods
          for the stepper component.
        </p>

        <div class="demo-item">
          <h4>Input Properties</h4>
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
                  <td><code>steps</code></td>
                  <td><code>string[]</code></td>
                  <td><code>[]</code></td>
                  <td>Array of step labels to display</td>
                </tr>
                <tr>
                  <td><code>currentStep</code></td>
                  <td><code>number</code></td>
                  <td><code>0</code></td>
                  <td>Index of the currently active step (0-based)</td>
                </tr>
                <tr>
                  <td><code>orientation</code></td>
                  <td><code>'horizontal' | 'vertical'</code></td>
                  <td><code>'horizontal'</code></td>
                  <td>Layout orientation of the stepper</td>
                </tr>
                <tr>
                  <td><code>showNavigation</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether to show navigation elements</td>
                </tr>
                <tr>
                  <td><code>interactive</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether steps are clickable for navigation</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'small' | 'medium' | 'large'</code></td>
                  <td><code>'medium'</code></td>
                  <td>Visual size of the stepper component</td>
                </tr>
                <tr>
                  <td><code>disabledSteps</code></td>
                  <td><code>number[]</code></td>
                  <td><code>[]</code></td>
                  <td>Array of step indices that should be disabled</td>
                </tr>
                <tr>
                  <td><code>iconColor</code></td>
                  <td><code>string</code></td>
                  <td><code>'#fff'</code></td>
                  <td>Color for the check mark icons in completed steps</td>
                </tr>
                <tr>
                  <td><code>iconSize</code></td>
                  <td><code>string</code></td>
                  <td><code>'20'</code></td>
                  <td>Size of the check mark icons</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="demo-item">
          <h4>Output Events</h4>
          <div class="api-table">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>stepChange</code></td>
                  <td><code>EventEmitter&lt;number&gt;</code></td>
                  <td>Emitted when user navigates to a different step</td>
                </tr>
                <tr>
                  <td><code>stepperComplete</code></td>
                  <td><code>EventEmitter&lt;void&gt;</code></td>
                  <td>Emitted when the workflow reaches completion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="demo-item">
          <h4>Methods</h4>
          <div class="api-table">
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Parameters</th>
                  <th>Return Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>goToStep(index: number)</code></td>
                  <td><code>index: number</code></td>
                  <td><code>void</code></td>
                  <td>Navigate to a specific step programmatically</td>
                </tr>
                <tr>
                  <td><code>isDisabled(index: number)</code></td>
                  <td><code>index: number</code></td>
                  <td><code>boolean</code></td>
                  <td>Check if a specific step is disabled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="demo-item">
          <h4>CSS Custom Properties</h4>
          <div class="api-table">
            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>--stepper-wrapper-background</code></td>
                  <td><code>Dynamic</code></td>
                  <td>Background color for active/completed elements</td>
                </tr>
                <tr>
                  <td><code>--stepper-background</code></td>
                  <td><code>Dynamic</code></td>
                  <td>Background color for inactive elements</td>
                </tr>
                <tr>
                  <td><code>--stepper-line-completed-background</code></td>
                  <td><code>Dynamic</code></td>
                  <td>Background for completed progress lines</td>
                </tr>
                <tr>
                  <td><code>--step-label-font</code></td>
                  <td><code>Dynamic</code></td>
                  <td>Font size for step labels</td>
                </tr>
                <tr>
                  <td><code>--step-label-active-font-weight</code></td>
                  <td><code>Dynamic</code></td>
                  <td>Font weight for active/completed labels</td>
                </tr>
                <tr>
                  <td><code>--step-circle-text</code></td>
                  <td><code>Dynamic</code></td>
                  <td>Text color for step circles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .center-demo {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: white;
        padding: 20px;
      }

      .demo-section {
        max-width: 1000px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;

        h3 {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
          font-size: 24px;
        }

        .description {
          text-align: center;
          margin-bottom: 30px;
          color: #666;
          font-size: 16px;
        }
      }

      .demo-item {
        margin-bottom: 40px;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: #fafafa;

        h4 {
          margin-bottom: 15px;
          color: #555;
          font-size: 18px;
        }
      }

      .api-table {
        overflow-x: auto;

        table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
          border-radius: 4px;
          overflow: hidden;

          thead {
            background-color: #f8f9fa;

            th {
              padding: 12px;
              text-align: left;
              font-weight: 600;
              color: #333;
              border-bottom: 2px solid #dee2e6;
              font-size: 14px;
            }
          }

          tbody {
            tr {
              border-bottom: 1px solid #dee2e6;

              &:last-child {
                border-bottom: none;
              }

              &:hover {
                background-color: #f8f9fa;
              }

              td {
                padding: 12px;
                vertical-align: top;
                color: #333;
                font-size: 14px;

                code {
                  background-color: #f1f3f4;
                  padding: 2px 6px;
                  border-radius: 3px;
                  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                  font-size: 13px;
                  color: #d73a49;
                }
              }
            }
          }
        }
      }
    `,
  ],
})
export class ApiDemoComponent {
  // This component is purely for documentation display
  // No interactive functionality needed
}
