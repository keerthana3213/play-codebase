import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextareaComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textarea-sizes-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextareaComponent],
  templateUrl: './textarea-sizes-demo.component.html',
  styleUrls: ['./textarea-sizes-demo.component.scss'],
})
export class TextareaSizesDemoComponent {
  extraSmallValue = '';
  smallValue = '';
  mediumValue = '';
  largeValue = '';
  extraLargeValue = '';

  onExtraSmallChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Extra small textarea value changed:', target.value);
  }

  onSmallChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Small textarea value changed:', target.value);
  }

  onMediumChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Medium textarea value changed:', target.value);
  }

  onLargeChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Large textarea value changed:', target.value);
  }

  onExtraLargeChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    console.log('Extra large textarea value changed:', target.value);
  }
}
