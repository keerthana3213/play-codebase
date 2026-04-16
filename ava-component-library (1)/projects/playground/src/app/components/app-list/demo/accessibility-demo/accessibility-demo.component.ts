import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaListComponent,
  ListItem,
  ListSelectionEvent,
} from '@aava/play-core';

@Component({
  selector: 'ava-list-accessibility-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaListComponent,
  ],
  template: `
    <div class="accessibility-demo-wrapper">
      <div class="demo-description">
        <h3>Accessibility Features</h3>
        <p>
          WCAG 2.1 AA compliant with comprehensive keyboard navigation and
          screen reader support.
        </p>
      </div>

      <div class="demo-examples">
        <!-- Keyboard Navigation -->
        <div class="demo-section">
          <h4>Keyboard Navigation</h4>
          <p>Full keyboard support with arrow keys, tab, enter, and escape.</p>

          <div class="keyboard-instructions">
            <h5>Keyboard Controls:</h5>
            <ul>
              <li>
                <strong>Tab:</strong> Navigate between interactive elements
              </li>
              <li><strong>Arrow Keys:</strong> Navigate through list items</li>
              <li><strong>Enter/Space:</strong> Select/deselect items</li>
              <li><strong>Escape:</strong> Clear selection</li>
              <li>
                <strong>Shift + Arrow:</strong> Multi-select with keyboard
              </li>
            </ul>
          </div>

          <aava-list
            [items]="keyboardNavigationItems"
            [title]="'Keyboard Navigation Demo'"
            [height]="'250px'"
            [width]="'450px'"
            (onSelectionChanged)="onKeyboardNavigationSelectionChanged($event)"
          ></aava-list>

          <div class="demo-status">
            <p>
              <strong>Selected:</strong>
              {{ keyboardNavigationSelected.length }} items
            </p>
            <p>
              <strong>Last Action:</strong> {{ lastKeyboardAction || 'None' }}
            </p>
          </div>
        </div>

        <!-- ARIA Support -->
        <div class="demo-section">
          <h4>ARIA Support</h4>
          <p>Comprehensive ARIA labels, roles, and state announcements.</p>

          <aava-list
            [items]="ariaSupportItems"
            [title]="'ARIA Support Demo'"
            [multiSelect]="true"
            [showCheckboxes]="true"
            [height]="'250px'"
            [width]="'450px'"
            (onSelectionChanged)="onAriaSupportSelectionChanged($event)"
          ></aava-list>

          <div class="demo-status">
            <p>
              <strong>Selected:</strong> {{ ariaSupportSelected.length }} items
            </p>
            <p>
              <strong>ARIA States:</strong> Properly announced to screen readers
            </p>
          </div>
        </div>

        <!-- Screen Reader Support -->
        <div class="demo-section">
          <h4>Screen Reader Support</h4>
          <p>
            Descriptive labels and status announcements for assistive
            technologies.
          </p>

          <aava-list
            [items]="screenReaderItems"
            [title]="'Screen Reader Demo'"
            [height]="'250px'"
            [width]="'450px'"
            (onOptionSelected)="onScreenReaderItemSelected($event)"
          ></aava-list>

          <div class="demo-status">
            <p>
              <strong>Selected:</strong>
              {{ screenReaderSelected?.title || 'None' }}
            </p>
            <p>
              <strong>Announcement:</strong> Status changes announced to screen
              readers
            </p>
          </div>
        </div>

        <!-- Focus Management -->
        <div class="demo-section">
          <h4>Focus Management</h4>
          <p>Clear visual focus indicators and logical tab order.</p>

          <aava-list
            [items]="focusManagementItems"
            [title]="'Focus Management Demo'"
            [multiSelect]="true"
            [showCheckboxes]="true"
            [height]="'250px'"
            [width]="'450px'"
            (onSelectionChanged)="onFocusManagementSelectionChanged($event)"
          ></aava-list>

          <div class="demo-status">
            <p>
              <strong>Selected:</strong>
              {{ focusManagementSelected.length }} items
            </p>
            <p><strong>Focus:</strong> Clear visual focus indicators</p>
          </div>
        </div>

        <!-- High Contrast Support -->
        <div class="demo-section">
          <h4>High Contrast Support</h4>
          <p>
            Enhanced visibility in high contrast modes and accessibility themes.
          </p>

          <aava-list
            [items]="highContrastItems"
            [title]="'High Contrast Demo'"
            [height]="'250px'"
            [width]="'450px'"
            (onOptionSelected)="onHighContrastItemSelected($event)"
          ></aava-list>

          <div class="demo-status">
            <p>
              <strong>Selected:</strong>
              {{ highContrastSelected?.title || 'None' }}
            </p>
            <p><strong>Contrast:</strong> Sufficient color contrast ratios</p>
          </div>
        </div>

        <!-- Semantic Structure -->
        <div class="demo-section">
          <h4>Semantic Structure</h4>
          <p>Proper HTML semantics and landmark navigation.</p>

          <aava-list
            [items]="semanticStructureItems"
            [title]="'Semantic Structure Demo'"
            [height]="'250px'"
            [width]="'450px'"
            (onOptionSelected)="onSemanticStructureItemSelected($event)"
          ></aava-list>

          <div class="demo-status">
            <p>
              <strong>Selected:</strong>
              {{ semanticStructureSelected?.title || 'None' }}
            </p>
            <p>
              <strong>Semantics:</strong> Proper heading hierarchy and landmarks
            </p>
          </div>
        </div>

        <!-- Testing Checklist -->
        <div class="demo-section">
          <h4>Accessibility Testing Checklist</h4>
          <p>Complete accessibility testing guidelines and best practices.</p>

          <div class="testing-checklist">
            <h5>Manual Testing:</h5>
            <ul>
              <li>
                <strong>Keyboard Navigation:</strong> Test complete keyboard
                flow
              </li>
              <li>
                <strong>Screen Reader:</strong> Verify announcements and labels
              </li>
              <li>
                <strong>Focus Management:</strong> Check focus indicators and
                order
              </li>
              <li>
                <strong>Color Contrast:</strong> Ensure sufficient contrast
                ratios
              </li>
              <li>
                <strong>Semantic Structure:</strong> Validate HTML semantics
              </li>
            </ul>

            <h5>Automated Testing:</h5>
            <ul>
              <li>
                <strong>Lighthouse:</strong> Accessibility score and
                recommendations
              </li>
              <li>
                <strong>axe-core:</strong> Automated accessibility testing
              </li>
              <li><strong>WAVE:</strong> Web accessibility evaluation tool</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .accessibility-demo-wrapper {
        max-width: 1200px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .demo-description {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
      }

      .demo-description h3 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-2xl);
      }

      .demo-description p {
        color: var(--color-text-secondary);
        line-height: 1.6;
        font-size: var(--global-font-size-lg);
      }

      .demo-examples {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .demo-section {
        // background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        padding: 2rem;
        border: 1px solid var(--color-border-subtle);
      }

      .demo-section h4 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-xl);
      }

      .demo-section p {
        margin-bottom: 1.5rem;
        color: var(--color-text-secondary);
        line-height: 1.6;
      }

      .demo-status {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--color-surface);
        border-radius: var(--global-radius-md);
        border: 1px solid var(--color-border-subtle);
      }

      .demo-status p {
        margin: 0.5rem 0;
        color: var(--color-text-secondary);
        font-size: var(--global-font-size-sm);
      }

      .demo-status strong {
        color: var(--color-text-primary);
      }

      .keyboard-instructions,
      .testing-checklist {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--color-surface);
        border-radius: var(--global-radius-md);
        border: 1px solid var(--color-border-subtle);
      }

      .keyboard-instructions h5,
      .testing-checklist h5 {
        margin-bottom: 0.75rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-lg);
      }

      .keyboard-instructions ul,
      .testing-checklist ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      .keyboard-instructions li,
      .testing-checklist li {
        margin-bottom: 0.5rem;
        color: var(--color-text-secondary);
        line-height: 1.5;
      }

      .keyboard-instructions strong,
      .testing-checklist strong {
        color: var(--color-text-primary);
      }

      @media (max-width: 768px) {
        .accessibility-demo-wrapper {
          margin: 1rem;
        }

        .demo-section {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AccessibilityDemoComponent {
  // Keyboard navigation demo
  keyboardNavigationSelected: ListItem[] = [];
  lastKeyboardAction: string | null = null;

  // ARIA support demo
  ariaSupportSelected: ListItem[] = [];

  // Screen reader demo
  screenReaderSelected: ListItem | null = null;

  // Focus management demo
  focusManagementSelected: ListItem[] = [];

  // High contrast demo
  highContrastSelected: ListItem | null = null;

  // Semantic structure demo
  semanticStructureSelected: ListItem | null = null;

  // Keyboard navigation items
  keyboardNavigationItems: ListItem[] = [
    {
      id: '1',
      title: 'Navigation Item 1',
      subtitle: 'Use arrow keys to navigate',
      avatar: {
        profileText: 'N1',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '2',
      title: 'Navigation Item 2',
      subtitle: 'Press Enter to select',
      avatar: {
        profileText: 'N2',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '3',
      title: 'Navigation Item 3',
      subtitle: 'Use Tab to move focus',
      avatar: {
        profileText: 'N3',
        size: 'md',
        shape: 'pill',
      },
    },
  ];

  // ARIA support items
  ariaSupportItems: ListItem[] = [
    {
      id: '1',
      title: 'ARIA Item 1',
      subtitle: 'Proper ARIA labels and roles',
      avatar: {
        profileText: 'A1',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '2',
      title: 'ARIA Item 2',
      subtitle: 'State announcements',
      avatar: {
        profileText: 'A2',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '3',
      title: 'ARIA Item 3',
      subtitle: 'Screen reader friendly',
      avatar: {
        profileText: 'A3',
        size: 'md',
        shape: 'pill',
      },
    },
  ];

  // Screen reader items
  screenReaderItems: ListItem[] = [
    {
      id: '1',
      title: 'Screen Reader Item 1',
      subtitle: 'Descriptive labels and text',
      avatar: {
        profileText: 'S1',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '2',
      title: 'Screen Reader Item 2',
      subtitle: 'Status announcements',
      avatar: {
        profileText: 'S2',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '3',
      title: 'Screen Reader Item 3',
      subtitle: 'Contextual information',
      avatar: {
        profileText: 'S3',
        size: 'md',
        shape: 'pill',
      },
    },
  ];

  // Focus management items
  focusManagementItems: ListItem[] = [
    {
      id: '1',
      title: 'Focus Item 1',
      subtitle: 'Clear focus indicators',
      avatar: {
        profileText: 'F1',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '2',
      title: 'Focus Item 2',
      subtitle: 'Logical tab order',
      avatar: {
        profileText: 'F2',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '3',
      title: 'Focus Item 3',
      subtitle: 'Visual focus cues',
      avatar: {
        profileText: 'F3',
        size: 'md',
        shape: 'pill',
      },
    },
  ];

  // High contrast items
  highContrastItems: ListItem[] = [
    {
      id: '1',
      title: 'High Contrast Item 1',
      subtitle: 'Sufficient color contrast',
      avatar: {
        profileText: 'H1',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '2',
      title: 'High Contrast Item 2',
      subtitle: 'Accessible color schemes',
      avatar: {
        profileText: 'H2',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '3',
      title: 'High Contrast Item 3',
      subtitle: 'Theme compatibility',
      avatar: {
        profileText: 'H3',
        size: 'md',
        shape: 'pill',
      },
    },
  ];

  // Semantic structure items
  semanticStructureItems: ListItem[] = [
    {
      id: '1',
      title: 'Semantic Item 1',
      subtitle: 'Proper HTML structure',
      avatar: {
        profileText: 'SE1',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '2',
      title: 'Semantic Item 2',
      subtitle: 'Landmark navigation',
      avatar: {
        profileText: 'SE2',
        size: 'md',
        shape: 'pill',
      },
    },
    {
      id: '3',
      title: 'Semantic Item 3',
      subtitle: 'Heading hierarchy',
      avatar: {
        profileText: 'SE3',
        size: 'md',
        shape: 'pill',
      },
    },
  ];

  // Event handlers
  onKeyboardNavigationSelectionChanged(event: ListSelectionEvent): void {
    this.keyboardNavigationSelected = event.selectedItems;
    this.lastKeyboardAction = `Keyboard selection: ${event.selectedItems.length} items`;
    console.log('Keyboard navigation selection changed:', event);
  }

  onAriaSupportSelectionChanged(event: ListSelectionEvent): void {
    this.ariaSupportSelected = event.selectedItems;
    console.log('ARIA support selection changed:', event);
  }

  onScreenReaderItemSelected(item: ListItem): void {
    this.screenReaderSelected = item;
    console.log('Screen reader item selected:', item);
  }

  onFocusManagementSelectionChanged(event: ListSelectionEvent): void {
    this.focusManagementSelected = event.selectedItems;
    console.log('Focus management selection changed:', event);
  }

  onHighContrastItemSelected(item: ListItem): void {
    this.highContrastSelected = item;
    console.log('High contrast item selected:', item);
  }

  onSemanticStructureItemSelected(item: ListItem): void {
    this.semanticStructureSelected = item;
    console.log('Semantic structure item selected:', item);
  }
}
