import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextareaComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textarea-accessibility-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextareaComponent],
  templateUrl: './textarea-accessibility-demo.component.html',
  styleUrls: ['./textarea-accessibility-demo.component.scss'],
})
export class TextareaAccessibilityDemoComponent {
  labeledValue = '';
  helperValue = '';
  errorValue = '';
  requiredValue = '';
  maxLengthValue = '';

  onLabeledChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Labeled textarea value changed:', target.value);
  }

  onHelperChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Helper textarea value changed:', target.value);
  }

  onErrorChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Error textarea value changed:', target.value);
  }

  onRequiredChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Required textarea value changed:', target.value);
  }

  onMaxLengthChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Max length textarea value changed:', target.value);
  }
}
