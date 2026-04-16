import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileAttachPillComponent, FileAttachOption } from '@aava/play-core';

@Component({
    selector: 'ava-file-attach-pill-mixed-icons-demo',
    standalone: true,
    imports: [CommonModule, AavaFileAttachPillComponent],
    template: `
    <div class="demo-section center-demo">
      <div class="pill-group">
        <aava-file-attach-pill
          [options]="mixedOptions"
          (optionSelected)="onOptionSelected($event)">
        </aava-file-attach-pill>
      </div>
      <p class="description" *ngIf="selectedOption">
        Selected: {{ selectedOption.name }}
      </p>
    </div>
  `,
    styles: [
        `
      .center-demo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }
      .demo-section {
        margin-bottom: 2rem;
        padding: 2rem;
        width: 100%;
      }
      .description {
        color: #666;
        margin-top: 1rem;
        font-size: 0.9rem;
      }
      .pill-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
    ],
})
export class FileAttachPillMixedIconsDemoComponent {
    mixedOptions: FileAttachOption[] = [
        { name: 'From Computer', icon: 'upload', value: 'computer' }, // library icon
        { name: 'Robot Asset', icon: 'assets/robot.png', value: 'robot', useCustomIcon: true }, // custom icon
        { name: 'Cloud Storage', icon: 'cloud-upload', value: 'cloud' } // library icon
    ];

    selectedOption: FileAttachOption | null = null;

    onOptionSelected(option: FileAttachOption) {
        this.selectedOption = option;
    }
}
