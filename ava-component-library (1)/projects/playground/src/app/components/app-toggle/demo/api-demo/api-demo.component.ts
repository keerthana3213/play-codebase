import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface ApiEvent {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.scss']
})

export class ApiDemoComponent {

  inputProperties: ApiProperty[] = [
    {
      name: 'size',
      type: 'ToggleSize',
      default: "'medium'",
      description: 'Sets the size of the toggle component.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'The title displayed next to the toggle.',
    },
    {
      name: 'position',
      type: 'TogglePosition',
      default: "'left'",
      description:
        'Defines the position of the title relative to the toggle switch.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the toggle when set to true.',
    },
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      description:
        'Defines whether the toggle is checked (true) or not (false).',
    },
    {
      name: 'animation',
      type: 'boolean',
      default: 'true',
      description: 'Enables or disables animation during state transitions.',
    },
    {
      name: 'showIcons',
      type: 'boolean',
      default: 'false',
      description: 'Enables icon display inside the toggle slider.',
    },
    {
      name: 'uncheckedIcon',
      type: 'string',
      default: "'x'",
      description: 'Icon name to display when toggle is unchecked.',
    },
    {
      name: 'checkedIcon',
      type: 'string',
      default: "'check'",
      description: 'Icon name to display when toggle is checked.',
    },
  ];

  outputEvents: ApiEvent[] = [
    {
      name: 'checkedChange',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when the checked state changes.',
    },
  ];
}
