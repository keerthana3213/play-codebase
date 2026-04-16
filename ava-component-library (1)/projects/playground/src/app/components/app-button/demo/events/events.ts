import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '@aava/play-core';

@Component({
  selector: 'ava-events-demo',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent],
  template: `
    <div class="demo-section center-demo">
      <div class="button-group">
        <aava-button
          label="Click Handler"
          variant="primary"
          (userClick)="onButtonClick()"
          [customStyles]="{ 'max-width': '200px' }"
          [pill]="true"
        ></aava-button>
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
        max-width: 870px;
      }
      .description {
        color: #666;
        margin-bottom: 1rem;
      }
      .button-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class ButtonEventsDemoComponent {
  constructor() {
    console.log('Events Demo Component loaded!');
  }

  onButtonClick() {
    setTimeout(() => {
      alert('Hi There!');
    }, 200);
  }
}
