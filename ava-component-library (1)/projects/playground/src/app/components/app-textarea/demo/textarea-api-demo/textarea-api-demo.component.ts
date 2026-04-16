import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ava-textarea-api-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea-api-demo.component.html',
  styleUrls: ['./textarea-api-demo.component.scss'],
})
export class TextareaApiDemoComponent {
  apiProps = [
    {
      name: 'label',
      type: 'string',
      default: "''",
      description: 'Label text for the textarea',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Placeholder text shown when textarea is empty',
    },
    {
      name: 'variant',
      type: 'TextareaVariant',
      default: "'default'",
      description:
        'Visual variant: default, primary, success, error, warning, info',
    },
    {
      name: 'size',
      type: 'TextareaSize',
      default: "'md'",
      description: 'Size of the textarea: sm, md, lg',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the textarea is disabled',
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Whether the textarea is read-only',
    },
    {
      name: 'error',
      type: 'string',
      default: "''",
      description: 'Error message to display',
    },
    {
      name: 'helper',
      type: 'string',
      default: "''",
      description: 'Helper text to display below the textarea',
    },
    {
      name: 'rows',
      type: 'number',
      default: '3',
      description: 'Number of visible text lines',
    },
    {
      name: 'cols',
      type: 'number',
      default: 'undefined',
      description: 'Number of visible character columns',
    },
    {
      name: 'id',
      type: 'string',
      default: "''",
      description: 'Unique identifier for the textarea',
    },
    {
      name: 'name',
      type: 'string',
      default: "''",
      description: 'Name attribute for form submission',
    },
    {
      name: 'maxlength',
      type: 'number',
      default: 'undefined',
      description: 'Maximum number of characters allowed',
    },
    {
      name: 'minlength',
      type: 'number',
      default: 'undefined',
      description: 'Minimum number of characters required',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Whether the textarea is required',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: 'Whether the textarea should take full width',
    },
    {
      name: 'resizable',
      type: 'boolean',
      default: 'true',
      description: 'Whether the textarea can be resized by user',
    },
  ];

  events = [
    {
      name: 'textareaBlur',
      type: 'EventEmitter<Event>',
      description: 'Emitted when the textarea loses focus',
    },
    {
      name: 'textareaFocus',
      type: 'EventEmitter<Event>',
      description: 'Emitted when the textarea gains focus',
    },
    {
      name: 'textareaInput',
      type: 'EventEmitter<Event>',
      description: 'Emitted when the textarea value changes',
    },
    {
      name: 'textareaChange',
      type: 'EventEmitter<Event>',
      description: 'Emitted when the textarea content changes',
    },
    {
      name: 'valueChange',
      type: 'EventEmitter<string>',
      description: 'Emitted when the textarea value changes (with new value)',
    },
  ];
}
