import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-slider-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-api-demo.component.html',
  styleUrls: ['./slider-api-demo.component.scss'],
})
export class SliderApiDemoComponent {
  componentProps = [
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'Minimum value of the slider.'
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Maximum value of the slider.'
    },
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Current value of the slider.'
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Step increment for slider movement.'
    },
    {
      name: 'showTooltip',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show tooltip on handle hover/focus.'
    },
    {
      name: 'size',
      type: "'sm' | 'md'",
      default: 'md',
      description: 'Size variant of the slider component.'
    },
    {
      name: 'type',
      type: "'default' | 'input'",
      default: 'default',
      description: 'Type variant - input type shows textbox beside slider.'
    },
    {
      name: 'multiRange',
      type: 'boolean',
      default: 'false',
      description: 'Enable multi-range mode with dual handles.'
    },
    {
      name: 'minValue',
      type: 'number',
      default: '20',
      description: 'Minimum value for multi-range mode.'
    },
    {
      name: 'maxValue',
      type: 'number',
      default: '80',
      description: 'Maximum value for multi-range mode.'
    },
    {
      name: 'iconStart',
      type: 'string',
      default: "''",
      description: 'Icon name to display at the start of the slider.'
    },
    {
      name: 'iconEnd',
      type: 'string',
      default: "''",
      description: 'Icon name to display at the end of the slider.'
    },
    {
      name: 'handleIcon',
      type: 'string',
      default: "''",
      description: 'Icon name to display on the slider handle.'
    },
    {
      name: 'handleIconStart',
      type: 'string',
      default: "''",
      description: 'Icon for start handle in multi-range mode.'
    },
    {
      name: 'handleIconEnd',
      type: 'string',
      default: "''",
      description: 'Icon for end handle in multi-range mode.'
    },
    {
      name: 'customStyles',
      type: 'Record<string, string>',
      default: '{}',
      description: 'CSS custom properties for style overrides.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the slider is disabled.'
    }
  ];

  events = [
    {
      name: 'valueChange',
      type: 'EventEmitter<number>',
      description: 'Emitted when the slider value changes.'
    },
    {
      name: 'minValueChange',
      type: 'EventEmitter<number>',
      description: 'Emitted when the minimum value changes in multi-range mode.'
    },
    {
      name: 'maxValueChange',
      type: 'EventEmitter<number>',
      description: 'Emitted when the maximum value changes in multi-range mode.'
    }
  ];

  basicUsageExample = `<aava-slider
  [value]="50"
  [min]="0"
  [max]="100"
  [step]="1"
  (valueChange)="onSliderChange($event)">
</aava-slider>`;

  multiRangeExample = `<aava-slider
  [multiRange]="true"
  [minValue]="20"
  [maxValue]="80"
  [min]="0"
  [max]="100"
  (minValueChange)="onMinChange($event)"
  (maxValueChange)="onMaxChange($event)">
</aava-slider>`;

  iconsExample = `<aava-slider
  [value]="50"
  [min]="0"
  [max]="100"
  [iconStart]="'volume-x'"
  [iconEnd]="'volume-2'"
  [handleIcon]="'volume'"
  (valueChange)="onSliderChange($event)">
</aava-slider>`;

  inputVariantExample = `<aava-slider
  type="input"
  [value]="75"
  [min]="0"
  [max]="100"
  size="md"
  (valueChange)="onSliderChange($event)">
</aava-slider>`;

  constructor() {
    console.log('Slider API Demo Component loaded!');
  }
}
