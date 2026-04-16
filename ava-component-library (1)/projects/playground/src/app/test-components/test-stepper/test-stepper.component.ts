import { Component } from '@angular/core';
import { AvaStepperComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-stepper',
  imports: [AvaStepperComponent],
  templateUrl: './test-stepper.component.html',
  styleUrl: './test-stepper.component.scss'
})
export class TestStepperComponent {
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
}
