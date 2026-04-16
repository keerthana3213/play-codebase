import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTimePickerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaTimePickerComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss'],
})
export class BasicUsageDemoComponent {
  selectedTime = '';

  onTimeSelected(time: string) {
    this.selectedTime = time;
    console.log('Selected time:', time);
  }
}
