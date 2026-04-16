import { Component, ViewEncapsulation } from '@angular/core';
import { AvaStepperComponent } from '@aava/play-core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface StepperDocSection {
  title: string;
  description: string;
  showCode: boolean;
}

interface ApiProperty {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'ava-stepper-documentation',
  standalone: true,
  imports: [AvaStepperComponent, CommonModule, RouterModule],
  templateUrl: './app-stepper.component.html',
  styleUrls: ['./app-stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppStepperComponent {
  // Documentation Sections
  sections: StepperDocSection[] = [
    {
      title: 'Basic Stepper',
      description: 'A basic horizontal stepper with navigation controls.',
      showCode: false,
    },
    {
      title: 'Stepper Sizes',
      description: 'Different sizes for the stepper: large, medium, and small.',
      showCode: false,
    },
    {
      title: 'Vertical Stepper',
      description: 'Vertical orientation for the stepper component.',
      showCode: false,
    },
    {
      title: 'Stepper with Icons',
      description: 'Stepper variant with Lucide icons in each step.',
      showCode: false,
    },
  ];

  // API Documentation
  apiProps: ApiProperty[] = [
    {
      name: 'steps',
      type: 'string[]',
      default: '[]',
      description: 'Array of step labels.',
    },
    {
      name: 'currentStep',
      type: 'number',
      default: '0',
      description: 'Index of the current step.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Orientation of the stepper.',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: "'medium'",
      description: 'Size of the stepper.',
    },
    {
      name: 'showNavigation',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show navigation controls.',
    },
  ];

  // Events
  events = [
    {
      name: 'stepChange',
      type: 'EventEmitter<number>',
      description: 'Emitted when the current step changes.',
    },
  ];

  // Horizontal Stepper Labels
  basicLabels = [
    'Understanding',
    'User Persona',
    'Features List',
    'SWOT Analysis',
    'Product Roadmap',
  ];
  largeLabels = ['Research', 'Define', 'Ideate', 'Prototype', 'Test'];
  mediumLabels = ['Goal', 'Steps', 'Progress', 'Review', 'Finish'];
  smallLabels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  // Vertical Stepper Labels — 3 different sets
  verticalLabelSet1 = ['Login', 'Profile', 'Settings', 'Review', 'Complete'];
  verticalLabelSet2 = ['Discover', 'Plan', 'Execute', 'Validate', 'Launch', 'complete'];
  verticalLabelSet3 = ['1', '2', '3', '4', '5', '6'];

  // Step Indexes
  basicStep = 0;
  largeStep = 0;
  mediumStep = 0;
  smallStep = 0;
  verticalStep1 = 0;
  verticalStep2 = 0;
  verticalStep3 = 0;

  // Handlers
  onBasicStepChange(step: number) {
    this.basicStep = step;
  }
  onLargeStepChange(step: number) {
    this.largeStep = step;
  }
  onMediumStepChange(step: number) {
    this.mediumStep = step;
  }
  onSmallStepChange(step: number) {
    this.smallStep = step;
  }
  onVerticalStep1Change(step: number) {
    this.verticalStep1 = step;
  }
  onVerticalStep2Change(step: number) {
    this.verticalStep2 = step;
  }
  onVerticalStep3Change(step: number) {
    this.verticalStep3 = step;
  }

  // Stepper with Icons
  iconSteps = [
    { label: 'Login', iconName: 'user' },
    { label: 'Shipping', iconName: 'truck' },
    { label: 'Payment', iconName: 'credit-card' },
    { label: 'Done', iconName: 'check-circle' },
  ];
  iconStep = 0;
  onIconStepChange(step: number) {
    this.iconStep = step;
  }

  // Section Management
  toggleCodeVisibility(index: number, event: Event): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Example Code Generator
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic stepper': `<aava-stepper
  [steps]="basicLabels"
  [currentStep]="basicStep"
  [iconColor]="'#ffff'"
  [iconSize]="'20'"
  orientation="horizontal"
  size="medium"
  [showNavigation]="true"
  (stepChange)="onBasicStepChange($event)">
</aava-stepper>`,

      'stepper sizes': `<!-- Large Stepper -->
<aava-stepper
  [steps]="largeLabels"
  [currentStep]="largeStep"
  [iconColor]="'#ffff'"
  [iconSize]="'24'"
  orientation="horizontal"
  size="large"
  [showNavigation]="true"
  (stepChange)="onLargeStepChange($event)">
</aava-stepper>

<!-- Medium Stepper -->
<aava-stepper
  [steps]="mediumLabels"
  [currentStep]="mediumStep"
  [iconColor]="'#ffff'"
  [iconSize]="'20'"
  orientation="horizontal"
  size="medium"
  [showNavigation]="true"
  (stepChange)="onMediumStepChange($event)">
</aava-stepper>

<!-- Small Stepper -->
<aava-stepper
  [steps]="smallLabels"
  [currentStep]="smallStep"
  [iconColor]="'#ffff'"
  [iconSize]="'16'"
  orientation="horizontal"
  size="small"
  [showNavigation]="true"
  (stepChange)="onSmallStepChange($event)">
</aava-stepper>`,

      'vertical stepper': `<!-- Large Vertical Stepper -->
<aava-stepper
  [steps]="verticalLabelSet1"
  [currentStep]="verticalStep1"
  [iconColor]="'#ffff'"
  [iconSize]="'24'"
  orientation="vertical"
  size="large"
  [showNavigation]="true"
  (stepChange)="onVerticalStep1Change($event)">
</aava-stepper>

<!-- Medium Vertical Stepper -->
<aava-stepper
  [steps]="verticalLabelSet2"
  [currentStep]="verticalStep2"
  [iconColor]="'#ffff'"
  [iconSize]="'20'"
  orientation="vertical"
  size="medium"
  [showNavigation]="true"
  (stepChange)="onVerticalStep2Change($event)">
</aava-stepper>

<!-- Small Vertical Stepper -->
<aava-stepper
  [steps]="verticalLabelSet3"
  [currentStep]="verticalStep3"
  [iconColor]="'#ffff'"
  [iconSize]="'16'"
  orientation="vertical"
  size="small"
  [showNavigation]="true"
  (stepChange)="onVerticalStep3Change($event)">
</aava-stepper>`,
    };
    return examples[section] || '';
  }

  // Copy Code to Clipboard
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }
}
