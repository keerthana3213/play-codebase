import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextareaComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textarea-basic-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextareaComponent],
  templateUrl: './textarea-basic-demo.component.html',
  styleUrls: ['./textarea-basic-demo.component.scss'],
})
export class TextareaBasicDemoComponent {
  basicValue = '';
  placeholderValue = '';
  readonlyValue =
    'This is a read-only textarea that cannot be edited by the user.';
  disabledValue = 'This textarea is disabled and cannot be interacted with.';

  onBasicChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Basic textarea value changed:', target.value);
  }

  onPlaceholderChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Placeholder textarea value changed:', target.value);
  }
}
