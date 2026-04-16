import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCheckboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-indeterminate-demo',
  standalone: true,
  imports: [CommonModule, AavaCheckboxComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="demo-examples">
        <div class="example-group">
           <div class="checkbox-hierarchy">
            <aava-checkbox
              label="Select All Tasks"
              [isChecked]="parentChecked"
              [indeterminate]="indeterminate"
              (isCheckedChange)="onParentChanged($event)"
            >
            </aava-checkbox>

            <div class="child-checkboxes">
              <aava-checkbox
                *ngFor="let child of children; let i = index"
                [label]="child.label"
                [isChecked]="child.checked"
                (isCheckedChange)="onChildChanged(i, $event)"
              >
              </aava-checkbox>
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
        margin-top: 0;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      .description {
        color: #666;
        margin-bottom: 2rem;
        text-align: center;
      }
      .demo-examples {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .example-group {
        padding: 1.5rem;
        margin-top: 0;
      }
      .example-group h4 {
        margin: 0 0 0.5rem 0;
        color: #1f2937;
        font-size: 1.1rem;
      }
      .example-description {
        color: #6b7280;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
      }
      .control-buttons {
        display: flex;
        gap: 12px;
        margin-bottom: 1.5rem;
        justify-content: center;
      }
      .control-btn {
        padding: 8px 16px;
        border-radius: 6px;
        border: none;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .control-btn.primary {
        background: #3b82f6;
        color: white;
        border: 1px solid #3b82f6;
      }
      .control-btn.primary:hover {
        background: #2563eb;
        border-color: #2563eb;
      }
      .control-btn.secondary {
        background: #6b7280;
        color: white;
        border: 1px solid #6b7280;
      }
      .control-btn.secondary:hover {
        background: #4b5563;
        border-color: #4b5563;
      }
      .checkbox-hierarchy {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .child-checkboxes {
        margin-left: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .tree-structure {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .checkbox-item {
        margin-bottom: 0.25rem;
      }
      .usage-cases {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }
      .usage-item {
        padding: 1rem;
        border-radius: 6px;
      }
      .usage-item h5 {
        margin: 0 0 0.5rem 0;
        color: #1f2937;
        font-size: 1rem;
      }
      .usage-item p {
        margin: 0;
        color: #6b7280;
        font-size: 0.9rem;
        line-height: 1.4;
      }
    `,
  ],
})
export class IndeterminateDemoComponent {
  parentChecked = false;
  indeterminate = false
  children = [
    { label: 'Child task 1', checked: false },
    { label: 'Child task 2', checked: false },
    { label: 'Child task 3', checked: false },
  ];

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



}
