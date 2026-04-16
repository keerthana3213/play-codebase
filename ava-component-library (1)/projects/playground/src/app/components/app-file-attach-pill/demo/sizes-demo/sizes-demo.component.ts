import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileAttachPillComponent, FileAttachOption } from '@aava/play-core';

@Component({
    selector: 'ava-file-attach-pill-sizes-demo',
    standalone: true,
    imports: [CommonModule, AavaFileAttachPillComponent],
    template: `
    <div class="demo-section center-demo">
      <div class="pill-group">
        <div class="size-item">
          <span>Small (16px)</span>
          <aava-file-attach-pill
            [options]="fileOptions"
            [iconSize]="16"
            mainText="Small Pill">
          </aava-file-attach-pill>
        </div>
        
        <div class="size-item">
          <span>Medium (default 20px)</span>
          <aava-file-attach-pill
            [options]="fileOptions"
            [iconSize]="20"
            mainText="Medium Pill">
          </aava-file-attach-pill>
        </div>

        <div class="size-item">
          <span>Large (28px)</span>
          <aava-file-attach-pill
            [options]="fileOptions"
            [iconSize]="28"
            mainText="Large Pill">
          </aava-file-attach-pill>
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
        min-height: 200px;
      }
      .demo-section {
        margin-bottom: 2rem;
        padding: 2rem;
        width: 100%;
      }
      .pill-group {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
      }
      .size-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
      .size-item span {
        font-size: 0.85rem;
        color: #888;
      }
    `,
    ],
})
export class FileAttachPillSizesDemoComponent {
    fileOptions: FileAttachOption[] = [
        { name: 'Upload', icon: 'upload', value: 'up' },
        { name: 'Download', icon: 'download', value: 'down' }
    ];
}
