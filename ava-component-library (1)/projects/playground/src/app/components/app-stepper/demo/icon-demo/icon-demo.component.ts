import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AvaStepperComponent,
  StepperStep,
} from '@aava/play-core';

@Component({
  selector: 'ava-icon-demo',
  standalone: true,
  imports: [CommonModule, AvaStepperComponent],
  templateUrl: './icon-demo.component.html',
  styleUrls: ['./icon-demo.component.scss'],
})
export class IconDemoComponent {
  // Make Math available in template
  Math = Math;

  // E-commerce checkout flow
  checkoutSteps: StepperStep[] = [
    { label: 'Login', iconName: 'user' },
    { label: 'Shipping', iconName: 'truck' },
    { label: 'Payment', iconName: 'credit-card' },
    { label: 'Confirmation', iconName: 'check-circle' },
  ];
  checkoutStep = 0;

  // Project management workflow
  projectSteps: StepperStep[] = [
    { label: 'Research', iconName: 'search' },
    { label: 'Design', iconName: 'palette' },
    { label: 'Development', iconName: 'code' },
    { label: 'Testing', iconName: 'bug' },
    { label: 'Deploy', iconName: 'rocket' },
  ];
  projectStep = 0;

  // Document workflow
  documentSteps: StepperStep[] = [
    { label: 'Draft', iconName: 'file-text' },
    { label: 'Review', iconName: 'eye' },
    { label: 'Approve', iconName: 'check' },
    { label: 'Publish', iconName: 'share' },
  ];
  documentStep = 0;

  // Learning path
  learningSteps: StepperStep[] = [
    { label: 'Basics', iconName: 'book-open' },
    { label: 'Practice', iconName: 'play' },
    { label: 'Assessment', iconName: 'clipboard-check' },
    { label: 'Certificate', iconName: 'award' },
  ];
  learningStep = 0;

  // Vertical setup wizard
  setupSteps: StepperStep[] = [
    { label: 'Account', iconName: 'user-plus' },
    { label: 'Profile', iconName: 'settings' },
    { label: 'Preferences', iconName: 'sliders' },
    { label: 'Complete', iconName: 'flag' },
  ];
  setupStep = 0;

  onCheckoutStepChange(step: number) {
    this.checkoutStep = step;
  }

  onProjectStepChange(step: number) {
    this.projectStep = step;
  }

  onDocumentStepChange(step: number) {
    this.documentStep = step;
  }

  onLearningStepChange(step: number) {
    this.learningStep = step;
  }

  onSetupStepChange(step: number) {
    this.setupStep = step;
  }
}
