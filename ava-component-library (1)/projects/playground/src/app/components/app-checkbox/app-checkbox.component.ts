import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { AavaCheckboxComponent } from '@aava/play-core';
// import { IconsComponent } from "../../../../../@aava/play-core/src/lib/components/icons/icons.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CheckboxDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'ava-app-checkbox',
  imports: [AavaCheckboxComponent, CommonModule, RouterModule],
  templateUrl: './app-checkbox.component.html',
  styleUrls: ['./app-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppCheckboxComponent implements AfterViewInit {
  @ViewChild('indeterminateCheckbox') indeterminateCheckbox!: ElementRef;

  // Documentation Sections
  sections: CheckboxDocSection[] = [
    {
      title: 'Basic Checkboxes',
      description:
        'Checkbox component with basic states such as unchecked, checked, indeterminate, and disabled.',
      showCode: false,
    },
    {
      title: 'Checkbox Variants',
      description:
        'Different visual variants: default, with-bg (background fill), and animated (with scaling animation).',
      showCode: false,
    },
    {
      title: 'Checkbox Sizes',
      description:
        'Available sizes for the checkbox: small, medium, and large across different variants.',
      showCode: false,
    },
    {
      title: 'Horizontal Alignment',
      description:
        'Checkboxes aligned horizontally like radio buttons for compact layouts and form sections.',
      showCode: false,
    },
    {
      title: 'Checkbox Indeterminate',
      description:
        'Checkbox component with indeterminate state for partial selections.',
      showCode: false,
    },
    {
      title: 'Checkbox Multiple',
      description:
        'Nested checkbox hierarchy with automatic parent-child state management.',
      showCode: false,
    },
    {
      title: 'Select All/Deselect All Hierarchy',
      description:
        'Advanced multi-level hierarchy with Select All and Deselect All functionality for complete tree management.',
      showCode: false,
    },
    {
      title: 'Disabled States',
      description: 'Disabled checkboxes in various states and variants.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'variant',
      type: "'default' | 'with-bg' | 'animated'",
      default: "'default'",
      description: 'Visual variant of the checkbox.',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'Sets the size of the checkbox.',
    },
    {
      name: 'alignment',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description:
        'Layout alignment for radio button style horizontal display.',
    },
    {
      name: 'label',
      type: 'string',
      default: '""',
      description: 'Label displayed next to the checkbox.',
    },
    {
      name: 'isChecked',
      type: 'boolean',
      default: 'false',
      description: 'Indicates whether the checkbox is checked.',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Defines the indeterminate state for the checkbox.',
    },
    {
      name: 'disable',
      type: 'boolean',
      default: 'false',
      description: 'Disables the checkbox when true.',
    },
  ];

  // Events
  events = [
    {
      name: 'isCheckedChange',
      type: 'EventEmitter<boolean>',
      description:
        '(Deprecated) Emitted when the checkbox state changes. Use "checked" instead.',
    },
    {
      name: 'checked',
      type: 'EventEmitter<boolean>',
      description:
        'Emits the current checked state when checkbox value changes.',
    },
  ];

  // Component State
  parentChecked = false;
  indeterminate = false;

  children = [
    { label: 'Child task 1', checked: false },
    { label: 'Child task 2', checked: false },
    { label: 'Child task 3', checked: false },
  ];

  multiLevelCheckboxes = [
    {
      label: 'Tall Things',
      checked: false,
      indeterminate: false,
      children: [
        { label: 'Buildings', checked: false },
        {
          label: 'Giants',
          checked: false,
          indeterminate: false,
          children: [
            { label: 'Andre', checked: false },
            { label: 'Paul Bunyan', checked: false },
          ],
        },
        { label: 'Two sandwiches', checked: false },
      ],
    },
    {
      label: 'Fast Things',
      checked: false,
      indeterminate: false,
      children: [
        { label: 'Cars', checked: false },
        { label: 'Planes', checked: false },
        {
          label: 'Animals',
          checked: false,
          indeterminate: false,
          children: [
            { label: 'Cheetah', checked: false },
            { label: 'Falcon', checked: false },
          ],
        },
      ],
    },
  ];

  // Advanced hierarchy with Select All/Deselect All
  advancedHierarchy = [
    {
      id: 'projects',
      label: 'Project Management',
      checked: false,
      indeterminate: false,
      children: [
        {
          id: 'web-projects',
          label: 'Web Development Projects',
          checked: false,
          indeterminate: false,
          children: [
            {
              id: 'frontend',
              label: 'Frontend Development',
              checked: false,
              indeterminate: false,
              children: [
                { id: 'react', label: 'React Application', checked: false },
                { id: 'angular', label: 'Angular Dashboard', checked: false },
                { id: 'vue', label: 'Vue.js Components', checked: false },
              ],
            },
            {
              id: 'backend',
              label: 'Backend Development',
              checked: false,
              indeterminate: false,
              children: [
                { id: 'nodejs', label: 'Node.js API', checked: false },
                { id: 'python', label: 'Python Microservices', checked: false },
                { id: 'database', label: 'Database Design', checked: false },
              ],
            },
          ],
        },
        {
          id: 'mobile-projects',
          label: 'Mobile Development Projects',
          checked: false,
          indeterminate: false,
          children: [
            {
              id: 'ios',
              label: 'iOS Development',
              checked: false,
              indeterminate: false,
              children: [
                { id: 'swift', label: 'Swift Application', checked: false },
                {
                  id: 'objective-c',
                  label: 'Objective-C Legacy',
                  checked: false,
                },
              ],
            },
            {
              id: 'android',
              label: 'Android Development',
              checked: false,
              indeterminate: false,
              children: [
                { id: 'kotlin', label: 'Kotlin Application', checked: false },
                {
                  id: 'java-android',
                  label: 'Java Android App',
                  checked: false,
                },
              ],
            },
            {
              id: 'react-native',
              label: 'React Native Cross-platform',
              checked: false,
            },
          ],
        },
      ],
    },
    {
      id: 'design',
      label: 'Design & UX',
      checked: false,
      indeterminate: false,
      children: [
        {
          id: 'ui-design',
          label: 'UI Design',
          checked: false,
          indeterminate: false,
          children: [
            { id: 'wireframes', label: 'Wireframes', checked: false },
            { id: 'mockups', label: 'High-fidelity Mockups', checked: false },
            {
              id: 'prototypes',
              label: 'Interactive Prototypes',
              checked: false,
            },
          ],
        },
        {
          id: 'ux-research',
          label: 'UX Research',
          checked: false,
          indeterminate: false,
          children: [
            { id: 'user-interviews', label: 'User Interviews', checked: false },
            {
              id: 'usability-testing',
              label: 'Usability Testing',
              checked: false,
            },
            { id: 'analytics', label: 'Analytics Review', checked: false },
          ],
        },
      ],
    },
    {
      id: 'deployment',
      label: 'Deployment & DevOps',
      checked: false,
      indeterminate: false,
      children: [
        { id: 'ci-cd', label: 'CI/CD Pipeline Setup', checked: false },
        { id: 'docker', label: 'Docker Configuration', checked: false },
        { id: 'kubernetes', label: 'Kubernetes Deployment', checked: false },
        { id: 'monitoring', label: 'Monitoring & Logging', checked: false },
      ],
    },
  ];

  // Demo states for interactive examples
  demoStates = {
    basicDefault: false,
    basicWithBg: false,
    basicAnimated: false,
    sizeSmall: false,
    sizeMedium: true,
    sizeLarge: false,
    horizontalOptions: false,
    horizontalFeatures: true,
    horizontalPreferences: false,
  };

  ngAfterViewInit(): void {
    // Set the indeterminate state for the checkbox
    if (this.indeterminateCheckbox) {
      this.indeterminateCheckbox.nativeElement.indeterminate = true;
    }
  }

  // Section Management
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Parent-Child Checkbox Logic
  onParentChanged(checked: boolean): void {
    this.parentChecked = checked;
    this.indeterminate = false;
    this.children = this.children.map((child) => ({ ...child, checked }));
  }

  onChildChanged(index: number, checked: boolean): void {
    this.children[index].checked = checked;
    this.updateParentState();
  }

  updateParentState(): void {
    const total = this.children.length;
    const checkedCount = this.children.filter((c) => c.checked).length;

    if (checkedCount === total) {
      this.parentChecked = true;
      this.indeterminate = false;
    } else if (checkedCount === 0) {
      this.parentChecked = false;
      this.indeterminate = false;
    } else {
      this.parentChecked = false;
      this.indeterminate = true;
    }
  }

  // Multi-level Checkbox Logic
  onMultiCheckboxChanged(item: any, checked: boolean): void {
    item.checked = checked;
    item.indeterminate = false;

    if (item.children) {
      item.children.forEach((child: any) =>
        this.onMultiCheckboxChanged(child, checked)
      );
    }

    this.updateParentStates(this.multiLevelCheckboxes);
  }

  updateParentStates(items: any[]): void {
    items.forEach((item) => {
      if (item.children) {
        this.updateParentStates(item.children);
        const total = item.children.length;
        const checkedCount = item.children.filter(
          (c: any) => c.checked || c.indeterminate
        ).length;
        const fullyCheckedCount = item.children.filter(
          (c: any) => c.checked && !c.indeterminate
        ).length;

        if (fullyCheckedCount === total) {
          item.checked = true;
          item.indeterminate = false;
        } else if (checkedCount === 0) {
          item.checked = false;
          item.indeterminate = false;
        } else {
          item.checked = false;
          item.indeterminate = true;
        }
      }
    });
  }

  // Advanced Hierarchy Logic with Select All/Deselect All
  onAdvancedCheckboxChanged(item: any, checked: boolean): void {
    this.setItemState(item, checked);
    this.updateAdvancedParentStates(this.advancedHierarchy);
  }

  private setItemState(item: any, checked: boolean): void {
    item.checked = checked;
    item.indeterminate = false;

    if (item.children) {
      item.children.forEach((child: any) => this.setItemState(child, checked));
    }
  }

  selectAllInHierarchy(): void {
    this.advancedHierarchy.forEach((item) => this.setItemState(item, true));
  }

  deselectAllInHierarchy(): void {
    this.advancedHierarchy.forEach((item) => this.setItemState(item, false));
  }

  selectAllInCategory(categoryItem: any): void {
    this.setItemState(categoryItem, true);
    this.updateAdvancedParentStates(this.advancedHierarchy);
  }

  deselectAllInCategory(categoryItem: any): void {
    this.setItemState(categoryItem, false);
    this.updateAdvancedParentStates(this.advancedHierarchy);
  }

  private updateAdvancedParentStates(items: any[]): void {
    items.forEach((item) => {
      if (item.children) {
        this.updateAdvancedParentStates(item.children);
        const total = item.children.length;
        const checkedCount = item.children.filter(
          (c: any) => c.checked || c.indeterminate
        ).length;
        const fullyCheckedCount = item.children.filter(
          (c: any) => c.checked && !c.indeterminate
        ).length;

        if (fullyCheckedCount === total) {
          item.checked = true;
          item.indeterminate = false;
        } else if (checkedCount === 0) {
          item.checked = false;
          item.indeterminate = false;
        } else {
          item.checked = false;
          item.indeterminate = true;
        }
      }
    });
  }

  getSelectedCount(): number {
    return this.countSelected(this.advancedHierarchy);
  }

  getTotalCount(): number {
    return this.countTotal(this.advancedHierarchy);
  }

  private countSelected(items: any[]): number {
    let count = 0;
    items.forEach((item) => {
      if (item.children) {
        count += this.countSelected(item.children);
      } else if (item.checked) {
        count++;
      }
    });
    return count;
  }

  private countTotal(items: any[]): number {
    let count = 0;
    items.forEach((item) => {
      if (item.children) {
        count += this.countTotal(item.children);
      } else {
        count++;
      }
    });
    return count;
  }

  getSelectedItems(): string[] {
    const selected: string[] = [];
    this.collectSelected(this.advancedHierarchy, selected);
    return selected;
  }

  private collectSelected(items: any[], selected: string[]): void {
    items.forEach((item) => {
      if (item.children) {
        this.collectSelected(item.children, selected);
      } else if (item.checked) {
        selected.push(item.label);
      }
    });
  }

  // Example Code Generator
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic checkboxes': `<!-- Basic States -->
<aava-checkbox label="Unchecked"></aava-checkbox>
<aava-checkbox label="Checked" [isChecked]="true"></aava-checkbox>
<aava-checkbox label="Indeterminate" [indeterminate]="true"></aava-checkbox>
<aava-checkbox label="Disabled" [disable]="true"></aava-checkbox>
<aava-checkbox label="Disabled Checked" [disable]="true" [isChecked]="true"></aava-checkbox>`,

      'checkbox variants': `<!-- Default Variant -->
<aava-checkbox variant="default" label="Default" [isChecked]="demoStates.basicDefault" 
  (isCheckedChange)="demoStates.basicDefault = $event"></aava-checkbox>

<!-- With Background Variant -->
<aava-checkbox variant="with-bg" label="With Background" [isChecked]="demoStates.basicWithBg" 
  (isCheckedChange)="demoStates.basicWithBg = $event"></aava-checkbox>

<!-- Animated Variant -->
<aava-checkbox variant="animated" label="Animated" [isChecked]="demoStates.basicAnimated" 
  (isCheckedChange)="demoStates.basicAnimated = $event"></aava-checkbox>

<!-- Variants with Indeterminate State -->
<aava-checkbox variant="default" label="Default Indeterminate" [indeterminate]="true"></aava-checkbox>
<aava-checkbox variant="with-bg" label="With-bg Indeterminate" [indeterminate]="true"></aava-checkbox>
<aava-checkbox variant="animated" label="Animated Indeterminate" [indeterminate]="true"></aava-checkbox>`,

      'checkbox sizes': `<!-- Small Size -->
<aava-checkbox size="sm" variant="default" label="Small Default" [isChecked]="demoStates.sizeSmall"></aava-checkbox>
<aava-checkbox size="sm" variant="with-bg" label="Small With-bg" [isChecked]="true"></aava-checkbox>
<aava-checkbox size="sm" variant="animated" label="Small Animated" [isChecked]="true"></aava-checkbox>

<!-- Medium Size -->
<aava-checkbox size="md" variant="default" label="Medium Default" [isChecked]="demoStates.sizeMedium"></aava-checkbox>
<aava-checkbox size="md" variant="with-bg" label="Medium With-bg" [isChecked]="true"></aava-checkbox>
<aava-checkbox size="md" variant="animated" label="Medium Animated" [isChecked]="true"></aava-checkbox>

<!-- Large Size -->
<aava-checkbox size="lg" variant="default" label="Large Default" [isChecked]="demoStates.sizeLarge"></aava-checkbox>
<aava-checkbox size="lg" variant="with-bg" label="Large With-bg" [isChecked]="true"></aava-checkbox>
<aava-checkbox size="lg" variant="animated" label="Large Animated" [isChecked]="true"></aava-checkbox>`,

      'horizontal alignment': `<!-- Radio Button Style Layout -->
<div class="horizontal-checkbox-group">
  <aava-checkbox alignment="horizontal" label="Option A" [isChecked]="demoStates.horizontalOptions" 
    (isCheckedChange)="demoStates.horizontalOptions = $event"></aava-checkbox>
  <aava-checkbox alignment="horizontal" label="Option B" [isChecked]="demoStates.horizontalFeatures" 
    (isCheckedChange)="demoStates.horizontalFeatures = $event"></aava-checkbox>
  <aava-checkbox alignment="horizontal" label="Option C" [isChecked]="demoStates.horizontalPreferences" 
    (isCheckedChange)="demoStates.horizontalPreferences = $event"></aava-checkbox>
</div>

<!-- Works with all variants -->
<div class="horizontal-checkbox-group">
  <aava-checkbox alignment="horizontal" variant="default" label="Default" [isChecked]="true"></aava-checkbox>
  <aava-checkbox alignment="horizontal" variant="with-bg" label="With-bg" [isChecked]="true"></aava-checkbox>
  <aava-checkbox alignment="horizontal" variant="animated" label="Animated" [isChecked]="true"></aava-checkbox>
</div>

<!-- Works with all sizes -->
<div class="horizontal-checkbox-group">
  <aava-checkbox alignment="horizontal" size="small" label="Small" [isChecked]="true"></aava-checkbox>
  <aava-checkbox alignment="horizontal" size="medium" label="Medium" [isChecked]="true"></aava-checkbox>
  <aava-checkbox alignment="horizontal" size="large" label="Large" [isChecked]="true"></aava-checkbox>
</div>

<!-- CSS for horizontal layout -->
.horizontal-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}`,

      'checkbox indeterminate': `<aava-checkbox
  [label]="'Parent task'"
  [isChecked]="parentChecked"
  [indeterminate]="indeterminate"
  (isCheckedChange)="onParentChanged($event)">
</aava-checkbox>

<div style="margin-left: 20px;">
  <aava-checkbox
    *ngFor="let child of children; let i = index"
    [label]="child.label"
    [isChecked]="child.checked"
    (isCheckedChange)="onChildChanged(i, $event)">
  </aava-checkbox>
</div>

// Component Logic
onParentChanged(checked: boolean): void {
  this.parentChecked = checked;
  this.indeterminate = false;
  this.children = this.children.map(child => ({ ...child, checked }));
}

onChildChanged(index: number, checked: boolean): void {
  this.children[index].checked = checked;
  this.updateParentState();
}`,

      'checkbox multiple': `<ng-container *ngFor="let item of multiLevelCheckboxes">
  <ng-template [ngTemplateOutlet]="renderCheckbox" [ngTemplateOutletContext]="{ item: item }"></ng-template>
</ng-container>

<ng-template #renderCheckbox let-item="item">
  <div class="checkbox-item" [style.margin-left]="item.level ? (item.level * 20) + 'px' : '0'">
    <aava-checkbox
      [label]="item.label"
      [isChecked]="item.checked"
      [indeterminate]="item.indeterminate"
      (isCheckedChange)="onMultiCheckboxChanged(item, $event)">
    </aava-checkbox>

    <div *ngIf="item.children?.length > 0" style="margin-left: 20px;">
      <ng-container *ngFor="let child of item.children">
        <ng-template [ngTemplateOutlet]="renderCheckbox" [ngTemplateOutletContext]="{ item: child }"></ng-template>
      </ng-container>
    </div>
  </div>
</ng-template>`,

      'select all/deselect all hierarchy': `<!-- Global Control Panel -->
<div class="hierarchy-controls">
  <div class="control-group">
    <h4>Global Controls ({{ getSelectedCount() }}/{{ getTotalCount() }} selected)</h4>
    <div class="button-group">
      <button (click)="selectAllInHierarchy()">Select All</button>
      <button (click)="deselectAllInHierarchy()">Deselect All</button>
    </div>
  </div>
</div>

<!-- Advanced Hierarchy Tree -->
<div class="advanced-hierarchy-tree">
  <ng-container *ngFor="let category of advancedHierarchy">
    <ng-template [ngTemplateOutlet]="advancedCheckboxTemplate" 
                 [ngTemplateOutletContext]="{ item: category, level: 0 }">
    </ng-template>
  </ng-container>
</div>

<!-- Recursive Template for Advanced Hierarchy -->
<ng-template #advancedCheckboxTemplate let-item="item" let-level="level">
  <div class="checkbox-node" [class]="'level-' + level">
    <!-- Node with controls for categories/subcategories -->
    <div class="node-header" *ngIf="item.children?.length > 0">
      <aava-checkbox
        [label]="item.label"
        [isChecked]="item.checked"
        [indeterminate]="item.indeterminate"
        (isCheckedChange)="onAdvancedCheckboxChanged(item, $event)">
      </aava-checkbox>
      
      <div class="level-controls" *ngIf="level < 2">
        <button class="mini-btn select" (click)="selectAllInCategory(item)">
          Select All
        </button>
        <button class="mini-btn deselect" (click)="deselectAllInCategory(item)">
          Deselect All
        </button>
      </div>
    </div>

    <!-- Leaf node without controls -->
    <div class="node-leaf" *ngIf="!item.children?.length">
      <aava-checkbox
        [label]="item.label"
        [isChecked]="item.checked"
        (isCheckedChange)="onAdvancedCheckboxChanged(item, $event)">
      </aava-checkbox>
    </div>

    <!-- Render children recursively -->
    <div class="children-container" *ngIf="item.children?.length > 0">
      <ng-container *ngFor="let child of item.children">
        <ng-template [ngTemplateOutlet]="advancedCheckboxTemplate" 
                     [ngTemplateOutletContext]="{ item: child, level: level + 1 }">
        </ng-template>
      </ng-container>
    </div>
  </div>
</ng-template>

// TypeScript Component Logic
export class AdvancedCheckboxComponent {
  advancedHierarchy = [
    // Your hierarchy data structure
  ];

  onAdvancedCheckboxChanged(item: any, checked: boolean): void {
    this.setItemState(item, checked);
    this.updateAdvancedParentStates(this.advancedHierarchy);
  }

  selectAllInHierarchy(): void {
    this.advancedHierarchy.forEach(item => this.setItemState(item, true));
  }

  deselectAllInHierarchy(): void {
    this.advancedHierarchy.forEach(item => this.setItemState(item, false));
  }

  getSelectedCount(): number {
    return this.countSelected(this.advancedHierarchy);
  }

  getTotalCount(): number {
    return this.countTotal(this.advancedHierarchy);
  }
}`,

      'disabled states': `<!-- Disabled in different variants -->
<aava-checkbox variant="default" label="Disabled Default" [disable]="true"></aava-checkbox>
<aava-checkbox variant="default" label="Disabled Checked Default" [disable]="true" [isChecked]="true"></aava-checkbox>
<aava-checkbox variant="default" label="Disabled Indeterminate Default" [disable]="true" [indeterminate]="true"></aava-checkbox>

<aava-checkbox variant="with-bg" label="Disabled With-bg" [disable]="true"></aava-checkbox>
<aava-checkbox variant="with-bg" label="Disabled Checked With-bg" [disable]="true" [isChecked]="true"></aava-checkbox>
<aava-checkbox variant="with-bg" label="Disabled Indeterminate With-bg" [disable]="true" [indeterminate]="true"></aava-checkbox>

<aava-checkbox variant="animated" label="Disabled Animated" [disable]="true"></aava-checkbox>
<aava-checkbox variant="animated" label="Disabled Checked Animated" [disable]="true" [isChecked]="true"></aava-checkbox>
<aava-checkbox variant="animated" label="Disabled Indeterminate Animated" [disable]="true" [indeterminate]="true"></aava-checkbox>`,
    };
    return examples[section] || '';
  }

  // Copy Code to Clipboard
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
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
