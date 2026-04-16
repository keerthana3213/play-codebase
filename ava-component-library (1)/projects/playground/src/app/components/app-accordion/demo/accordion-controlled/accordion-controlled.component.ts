import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accordion-controlled',
  standalone: true,
  imports: [CommonModule, AavaAccordionComponent],
  templateUrl: './accordion-controlled.component.html',
  styleUrls: ['./accordion-controlled.component.scss'],
})
export class AccordionControlledComponent {
  // Controlled states for multiple accordions
  controlledStates: boolean[] = [false, false, false, false];

  // Event handler for individual accordion toggle
  toggleAccordion(index: number, event?: Event): void {
    // Prevent default behavior for keyboard events
    if (event) {
      event.preventDefault();
    }

    // Create a new array to ensure change detection works properly
    const newStates = [...this.controlledStates];
    newStates[index] = !newStates[index];
    this.controlledStates = newStates;
    console.log(
      `Accordion ${index + 1} toggled to:`,
      this.controlledStates[index]
    );
  }

  // Control methods
  openAll(): void {
    this.controlledStates = [true, true, true, true];
    console.log('All accordions opened');
  }

  closeAll(): void {
    this.controlledStates = [false, false, false, false];
    console.log('All accordions closed');
  }

  openFirst(): void {
    this.controlledStates = [true, false, false, false];
    console.log('First accordion opened');
  }

  openLast(): void {
    this.controlledStates = [false, false, false, true];
    console.log('Last accordion opened');
  }

  // Get accordion content
  getAccordionContent(index: number): string {
    const contents = [
      'This accordion is controlled externally. Its state is managed by the parent component.',
      'External state management allows for complex interaction patterns and programmatic control.',
      'You can coordinate multiple accordions and implement custom logic for expansion behavior.',
      'Perfect for scenarios where you need to control accordion states based on user actions or data changes.',
    ];
    return contents[index] || 'Default content';
  }
}
