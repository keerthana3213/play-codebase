import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'ava-textbox-sizes',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaTextboxComponent],
  templateUrl: './textbox-sizes.component.html',
  styleUrls: ['./textbox-sizes.component.scss'],
})
export class TextboxSizesComponent {
  smallValue = '';
  mediumValue = '';
  largeValue = '';

  onSmallChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Small textbox value changed:', target.value);
  }

  onMediumChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Medium textbox value changed:', target.value);
  }

  onLargeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Large textbox value changed:', target.value);
  }
}
