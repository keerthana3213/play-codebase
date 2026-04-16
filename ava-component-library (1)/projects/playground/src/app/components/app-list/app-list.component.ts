import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  AavaListComponent,
  ListItem,
  ListSelectionEvent,
  ListButtonClickEvent
} from '@aava/play-core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AavaListComponent,
  ],
  template: `
    <div class="list-demo-wrapper">
      <div class="demo-description">
        <h2>List Component</h2>
        <p>
          A versatile, feature-rich list component that supports single and multi-selection, 
          integrates with Angular forms, and provides extensive customization options including 
          avatars, icons, and action buttons.
        </p>
      </div>

      <div class="demo-navigation">
        <h3>Demo Pages</h3>
        <div class="nav-cards">
          <a routerLink="./basic-usage" class="nav-card">
            <h4>Basic Usage</h4>
            <p>Simple list implementations with avatars, icons, and basic selection</p>
          </a>
          
          <a routerLink="./multi-selection" class="nav-card">
            <h4>Multi-Selection</h4>
            <p>Advanced multi-selection with checkboxes and selection limits</p>
          </a>
          
          <a routerLink="./action-buttons" class="nav-card">
            <h4>Action Buttons</h4>
            <p>Interactive buttons and clickable icons within list items</p>
          </a>
          
          <a routerLink="./form-integration" class="nav-card">
            <h4>Forms Integration</h4>
            <p>Complete ControlValueAccessor implementation</p>
          </a>
          
          <a routerLink="./validation" class="nav-card">
            <h4>Validation</h4>
            <p>Built-in validation system with customizable error messages</p>
          </a>
          
          <a routerLink="./accessibility" class="nav-card">
            <h4>Accessibility</h4>
            <p>WCAG 2.1 AA compliant features and testing guidelines</p>
          </a>
        </div>
      </div>

      <div class="demo-showcase">
        <h3>Component Showcase</h3>
        <p>Quick preview of the List component capabilities</p>
        
        <div class="showcase-examples">
          <!-- Basic List Example -->
          <div class="showcase-section">
            <h4>Basic List with Avatars</h4>
            <aava-list
              [items]="showcaseItems"
              [title]="'Team Members'"
              [height]="'250px'"
              [width]="'400px'"
              (onOptionSelected)="onShowcaseItemSelected($event)"
              (onSelectionChanged)="onShowcaseSelectionChanged($event)"
            ></aava-list>
          </div>

          <!-- Multi-Selection Example -->
          <div class="showcase-section">
            <h4>Multi-Selection with Checkboxes</h4>
            <aava-list
              [items]="showcaseMultiItems"
              [title]="'Select Team Members'"
              [multiSelect]="true"
              [showCheckboxes]="true"
              [height]="'250px'"
              [width]="'400px'"
              (onSelectionChanged)="onShowcaseMultiSelectionChanged($event)"
            ></aava-list>
          </div>

          <!-- Action Buttons Example -->
          <div class="showcase-section">
            <h4>Action Buttons</h4>
            <aava-list
              [items]="showcaseActionItems"
              [title]="'Team with Actions'"
              [height]="'250px'"
              [width]="'450px'"
              (onButtonClick)="onShowcaseButtonClick($event)"
              (onSelectionChanged)="onShowcaseSelectionChanged($event)"
            ></aava-list>
          </div>
        </div>

        <div class="showcase-status">
          <p><strong>Last Selected:</strong> {{ lastSelectedItem?.title || 'None' }}</p>
          <p><strong>Multi-Selection Count:</strong> {{ multiSelectionCount }}</p>
          <p><strong>Last Button Action:</strong> {{ lastButtonAction || 'None' }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .list-demo-wrapper {
        max-width: 1200px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .demo-description {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      }

      .demo-description h2 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-3xl);
      }

      .demo-description p {
        color: var(--color-text-secondary);
        line-height: 1.6;
        font-size: var(--global-font-size-lg);
      }

      .demo-navigation {
        background: none;
        border-radius: var(--global-radius-lg);
        padding: 2rem;
        border: 1px solid var(--color-border-subtle);
      }

      .demo-navigation h3 {
        margin-bottom: 1.5rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-2xl);
        text-align: center;
      }

      .nav-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }

      .nav-card {
        background: var(--color-surface);
        border-radius: var(--global-radius-md);
        padding: 1.5rem;
        border: 1px solid var(--color-border-subtle);
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
        display: block;
      }

      .nav-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: var(--color-primary);
      }

      .nav-card h4 {
        margin-bottom: 0.75rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-xl);
      }

      .nav-card p {
        color: var(--color-text-secondary);
        line-height: 1.5;
        margin: 0;
      }

      .demo-showcase {
        border-radius: var(--global-radius-lg);
        padding: 2rem;
        border: 1px solid var(--color-border-subtle);
      }

      .demo-showcase h3 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-2xl);
        text-align: center;
      }

      .demo-showcase > p {
        text-align: center;
        color: var(--color-text-secondary);
        margin-bottom: 2rem;
      }

      .showcase-examples {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .showcase-section {
        background: var(--color-surface);
        border-radius: var(--global-radius-md);
        padding: 1.5rem;
        border: 1px solid var(--color-border-subtle);
      }

      .showcase-section h4 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-lg);
      }

      .showcase-status {
        background: var(--color-surface);
        border-radius: var(--global-radius-md);
        padding: 1rem;
        border: 1px solid var(--color-border-subtle);
        text-align: center;
      }

      .showcase-status p {
        margin: 0.5rem 0;
        color: var(--color-text-secondary);
        font-size: var(--global-font-size-sm);
      }

      .showcase-status strong {
        color: var(--color-text-primary);
      }

      @media (max-width: 768px) {
        .list-demo-wrapper {
          margin: 1rem;
        }
        
        .demo-navigation,
        .demo-showcase {
          padding: 1rem;
        }
        
        .nav-cards {
          grid-template-columns: 1fr;
        }
        
        .showcase-examples {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AppListComponent {
  lastSelectedItem: ListItem | null = null;
  multiSelectionCount = 0;
  lastButtonAction: string | null = null;

  // Showcase items for basic list
  showcaseItems: ListItem[] = [
    {
      id: '1',
      title: 'John Doe',
      subtitle: 'Software Engineer',
      avatar: {
        profileText: 'JD',
        size: 'md',
        shape: 'pill',
        active: true
      }
    },
    {
      id: '2',
      title: 'Jane Smith',
      subtitle: 'Product Manager',
      avatar: {
        profileText: 'JS',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '3',
      title: 'Bob Johnson',
      subtitle: 'UX Designer',
      avatar: {
        profileText: 'BJ',
        size: 'md',
        shape: 'pill'
      }
    }
  ];

  // Showcase items for multi-selection
  showcaseMultiItems: ListItem[] = [
    {
      id: '1',
      title: 'Alice Brown',
      subtitle: 'Data Scientist',
      avatar: {
        profileText: 'AB',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '2',
      title: 'Charlie Wilson',
      subtitle: 'DevOps Engineer',
      avatar: {
        profileText: 'CW',
        size: 'md',
        shape: 'pill'
      }
    },
    {
      id: '3',
      title: 'Diana Miller',
      subtitle: 'QA Engineer',
      avatar: {
        profileText: 'DM',
        size: 'md',
        shape: 'pill'
      }
    }
  ];

  // Showcase items for action buttons
  showcaseActionItems: ListItem[] = [
    {
      id: '1',
      title: 'Grace Lee',
      subtitle: 'UI Designer',
      avatar: {
        profileText: 'GL',
        size: 'md',
        shape: 'pill'
      },
      buttons: [
        {
          id: 'view',
          label: 'View',
          variant: 'primary',
          size: 'xs',
          pill: true
        },
        {
          id: 'edit',
          label: 'Edit',
          variant: 'secondary',
          size: 'xs',
          pill: true
        }
      ]
    },
    {
      id: '2',
      title: 'Henry Taylor',
      subtitle: 'Mobile Developer',
      avatar: {
        profileText: 'HT',
        size: 'md',
        shape: 'pill'
      },
      buttons: [
        {
          id: 'contact',
          label: 'Contact',
          variant: 'success',
          size: 'xs',
          pill: true
        }
      ]
    }
  ];

  // Event handlers
  onShowcaseItemSelected(item: ListItem): void {
    this.lastSelectedItem = item;
    console.log('Showcase item selected:', item);
  }

  onShowcaseSelectionChanged(event: ListSelectionEvent): void {
    console.log('Showcase selection changed:', event);
  }

  onShowcaseMultiSelectionChanged(event: ListSelectionEvent): void {
    this.multiSelectionCount = event.selectedItems.length;
    console.log('Showcase multi-selection changed:', event);
  }

  onShowcaseButtonClick(event: ListButtonClickEvent): void {
    this.lastButtonAction = `${event.button.label || event.button.id} clicked for ${event.item.title}`;
    console.log('Showcase button clicked:', event);
  }
}
