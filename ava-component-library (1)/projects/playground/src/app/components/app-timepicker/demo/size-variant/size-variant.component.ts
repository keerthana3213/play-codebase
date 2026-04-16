import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-size-variant',
  standalone: true,
  imports: [CommonModule, AavaTimePickerComponent],
  templateUrl: './size-variant.component.html',
  styleUrl: './size-variant.component.scss',
})
export class SizeVariantComponent {

  selectedTime = '';

  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log('Selected time:', time);
  }
}
