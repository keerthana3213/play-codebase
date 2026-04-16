import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accordion-animation',
  standalone: true,
  imports: [CommonModule, AavaAccordionComponent],
  templateUrl: './accordion-animation.component.html',
  styleUrls: ['./accordion-animation.component.scss'],
})
export class AccordionAnimationComponent {
  // Animation examples
  animationExamples = [
    {
      title: 'Smooth Animation (Default)',
      animation: true,
      description:
        'Height-based transitions with calculated content dimensions',
      content:
        'This accordion uses smooth height-based animations that calculate the actual content height for precise transitions. The animation provides a natural, fluid experience that feels responsive and polished.',
    },
    {
      title: 'Instant Expansion',
      animation: false,
      description: 'No animation for immediate content display',
      content:
        'This accordion has animations disabled for instant expansion. Useful for performance-critical applications or when you prefer immediate content visibility without transition effects.',
    },
  ];

  // Performance comparison
  performanceContent = `
    <h4>Animation Performance</h4>
    <p>The accordion uses optimized animations for smooth performance:</p>
    <ul>
      <li><strong>Height-based transitions:</strong> Calculated from actual content dimensions</li>
      <li><strong>Hardware acceleration:</strong> CSS transforms for smooth rendering</li>
      <li><strong>Easing functions:</strong> Natural motion with cubic-bezier timing</li>
      <li><strong>Performance optimized:</strong> Minimal DOM manipulation during animations</li>
    </ul>
  `;

  // Event handlers
  onAccordionToggle(event: Event): void {
    console.log('Accordion toggled:', event);
  }

  onAnimationChange(animation: boolean): void {
    console.log('Animation setting changed:', animation);
  }
}
