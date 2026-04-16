import { Component, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-inputgroups',
  imports: [CommonModule],
  templateUrl: './app-inputgroups.component.html',
  styleUrl: './app-inputgroups.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppInputgroupsComponent {
  // for input group
  handleIconClick(event: { inputIndex: number; iconIndex: number }) {
    console.log(`Icon ${event.iconIndex} clicked in input field ${event.inputIndex}`);
  }

  handleButtonClick(event: { event: Event; button: any }) {
    console.log(`Button clicked: ${event.button.label}`);
  }

  volumeSignal: WritableSignal<number> = signal(50);

  toggleBeforeSignal: WritableSignal<boolean> = signal(true);
  toggleAfterSignal: WritableSignal<boolean> = signal(false);

  // for documentation

  sections = [
    {
      title: 'Basic Input Group',
      description: 'A complete input group setup with inputs, buttons, checkboxes, sliders, and toggles.',
      showCode: false
    }
  ];

  apiProps = [
    { name: 'inputs', type: 'InputFieldConfig[]', default: '[]', description: 'List of text input configurations.' },
    { name: 'buttons', type: 'ButtonConfig[]', default: '[]', description: 'List of buttons for interaction.' },
    { name: 'checkboxes', type: 'CheckboxConfig[]', default: '[]', description: 'Checkbox options included in the group.' },
    { name: 'sliders', type: 'SliderConfig[]', default: '[]', description: 'Slider controls for numeric input.' },
    { name: 'toggles', type: 'ToggleConfig[]', default: '[]', description: 'Toggle switches bound to signals.' }
  ];

  events = [
    { name: 'iconClickEvent', type: 'EventEmitter<{ inputIndex: number; iconIndex: number }>', description: 'Triggered when an icon inside an input is clicked.' },
    { name: 'buttonClick', type: 'EventEmitter<{ event: Event; button: any }>', description: 'Triggered when a button is clicked.' }
  ];

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  getExampleCode(section: string): string {
    return `import { Component } from '@angular/core';
  import { InputGroupsComponent } from '@awe/@aava/play-core';
  import { IconsComponent } from '@awe/@aava/play-core';
  import { CommonModule } from '@angular/common';
  
  @Component({
    selector: 'app-basic-input-group',
    standalone: true,
    imports: [InputGroupsComponent, IconsComponent, CommonModule],
    template: \`
      <awe-input-groups
            [inputs]="[
              { label: 'Input ', placeholder: 'Enter text here', status: 'white', icons: ['awe_send', 'awe_mic', 'awe_close'] },
              { label: 'Disabled Input', disabled:true ,placeholder: 'Enter text here', status: 'white', icons: ['awe_send', 'awe_mic', 'awe_close'] },
              { label: 'Input with errorMessage ', placeholder: 'Enter more text', status: 'red', required: true, errorMessage: 'Error: Field required', icons: ['awe_send', 'awe_mic', 'awe_close'] }
            ]"
            [buttons]="[
              { label: 'Default Button', variant: 'primary', size: 'medium', state: 'default', iconPosition: 'right', pill: 'false', iconName:'awe_tick', iconColor:'whiteIcon' },
              { label: 'Active Button', variant: 'secondary', size: 'medium', state: 'active', iconPosition: 'left', pill: 'false', iconName:'awe_tick', iconColor:'action' }
            ]"
            [checkboxes]="[
              { label: 'Active Checkbox', size: 'medium', isChecked:true , indeterminate: false },
              { label: 'Inactive Checkbox', size: 'medium', isChecked:false , indeterminate: false },
              { label: 'Indeterminate Checkbox', size: 'medium', ariaChecked: false, indeterminate: true }
            ]"
            [sliders]="[{ step: 1, label: 'Slider', value: volumeSignal }]"

            [toggles]="[
              { size: 'small', textPosition: 'after', label: ' Active Toggle', value: toggleBeforeSignal },
              { size: 'small', textPosition: 'after', label: 'Inactive Toggle', value: toggleAfterSignal }
            ]"
            (iconClickEvent)="handleIconClick($event)"
            (buttonClick)="handleButtonClick($event)">
      </awe-input-groups>
    \`
  })
  export class BasicInputGroupComponent {
    volumeSignal = 50;
    toggleBeforeSignal = true;
    toggleAfterSignal = false;

    handleIconClick(event: { inputIndex: number; iconIndex: number }) {
      console.log(\`Icon \${event.iconIndex} clicked in input field \${event.inputIndex}\`);
    }

    handleButtonClick(event: { event: Event; button: any }) {
      console.log(\`Button clicked: \${event.button.label}\`);
    }
  }
    
`;
  }

  copyCode(section: string): void {
    navigator.clipboard.writeText(this.getExampleCode(section)).then(() => {
      console.log('Code copied to clipboard');
    });
  }
}
