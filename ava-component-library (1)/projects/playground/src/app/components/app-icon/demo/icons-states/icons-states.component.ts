import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-icons-states',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './icons-states.component.html',
  styleUrls: ['./icons-states.component.scss'],
})
export class IconsStatesComponent {
  // State examples with different configurations
  stateExamples = [
    { name: 'settings', label: 'Normal', disabled: false, cursor: false },
    { name: 'settings', label: 'Interactive', disabled: false, cursor: true },
    { name: 'settings', label: 'Disabled', disabled: true, cursor: false },
    {
      name: 'settings',
      label: 'Disabled Interactive',
      disabled: true,
      cursor: true,
    },
  ];

  onIconClick(event: Event, state: string): void {
    console.log(`${state} icon clicked:`, event);
  }
}
