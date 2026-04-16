import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFileAttachPillComponent, FileAttachOption } from '@aava/play-core';

@Component({
    selector: 'ava-file-attach-pill-theme-demo',
    standalone: true,
    imports: [CommonModule, AavaFileAttachPillComponent],
    template: `
    <div class="demo-section center-demo" [class.dark-bg]="currentTheme === 'dark'">
      <div class="controls">
        <button (click)="toggleTheme()">Switch to {{ currentTheme === 'light' ? 'Dark' : 'Light' }} Theme</button>
      </div>
      <div class="pill-group">
        <aava-file-attach-pill
          [options]="fileOptions"
          [currentTheme]="currentTheme"
          [mainText]="currentTheme === 'light' ? 'Light Theme Pill' : 'Dark Theme Pill'"
          (optionSelected)="onOptionSelected($event)">
        </aava-file-attach-pill>
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
        min-height: 250px;
        transition: background-color 0.3s ease;
        border-radius: 8px;
        padding: 2rem;
      }
      .dark-bg {
        background-color: #1e1e1e;
        color: white;
      }
      .controls {
        margin-bottom: 2rem;
      }
      .controls button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
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
export class FileAttachPillThemeDemoComponent {
    currentTheme: 'light' | 'dark' = 'light';

    fileOptions: FileAttachOption[] = [
        { name: 'Option A', icon: 'file', value: 'a' },
        { name: 'Option B', icon: 'file-text', value: 'b' }
    ];

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    }

    onOptionSelected(option: FileAttachOption) {
        console.log('Selected in theme demo:', option.name);
    }
}
