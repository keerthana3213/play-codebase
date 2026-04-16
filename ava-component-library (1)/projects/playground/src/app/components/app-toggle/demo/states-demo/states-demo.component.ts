import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'ava-states-demo',
  standalone: true,
  imports: [CommonModule, AavaToggleComponent],
  templateUrl: './states-demo.component.html',
  styleUrls: ['./states-demo.component.scss']
})
export class StatesDemoComponent {
  onSelectionChange(event: any) {
    console.log('Toggle changed:', event);
  }
}
