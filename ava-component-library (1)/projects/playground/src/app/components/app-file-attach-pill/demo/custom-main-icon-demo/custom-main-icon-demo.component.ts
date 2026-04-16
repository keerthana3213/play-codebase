import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileAttachPillComponent, FileAttachOption } from '@aava/play-core';

@Component({
    selector: 'ava-file-attach-pill-custom-main-icon-demo',
    standalone: true,
    imports: [CommonModule, AavaFileAttachPillComponent],
    template: `
    <div class="demo-section center-demo">
      <div class="pill-group">
        <aava-file-attach-pill
          [options]="techOptions"
          mainText="Framework"
          mainIcon="/assets/awe_angular.svg"
          [useCustomMainIcon]="true"
          (optionSelected)="onOptionSelected($event)">
        </aava-file-attach-pill>
      </div>
      <p class="description">
        This pill uses a custom SVG asset for its primary icon.
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
export class FileAttachPillCustomMainIconDemoComponent {
    techOptions: FileAttachOption[] = [
        { name: 'Angular', icon: '/assets/awe_angular.svg', value: 'angular', useCustomIcon: true },
        { name: 'React', icon: '/assets/awe_react.svg', value: 'react', useCustomIcon: true },
        { name: 'Vue', icon: '/assets/awe_vue.svg', value: 'vue', useCustomIcon: true }
    ];

    onOptionSelected(option: FileAttachOption) {
        console.log('Framework selected:', option.name);
    }
}
