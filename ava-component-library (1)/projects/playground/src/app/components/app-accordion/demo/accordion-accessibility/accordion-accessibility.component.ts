import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accordion-accessibility',
  standalone: true,
  imports: [CommonModule, AavaAccordionComponent],
  templateUrl: './accordion-accessibility.component.html',
  styleUrls: ['./accordion-accessibility.component.scss'],
})
export class AccordionAccessibilityComponent {
  // Accessibility examples
  accessibilityExamples = [
    {
      title: 'Keyboard Navigation',
      description: 'Use Tab to focus, Enter/Space to toggle',
      content:
        'This accordion supports full keyboard navigation. Users can tab to focus the accordion header and use Enter or Space to expand/collapse the content. The component automatically manages focus states and provides appropriate ARIA attributes.',
    },
    {
      title: 'Screen Reader Support',
      description: 'ARIA attributes and semantic markup',
      content:
        'The accordion includes proper ARIA attributes for screen readers, including aria-expanded, aria-controls, and role attributes. The content is semantically structured to provide clear context to assistive technologies.',
    },
    {
      title: 'Focus Management',
      description: 'Automatic focus handling and visual indicators',
      content:
        'Focus is properly managed when accordions expand and collapse. Visual focus indicators are provided for keyboard users, and the component ensures that focus remains accessible throughout the interaction.',
    },
  ];

  // Best practices content
  bestPracticesContent = `
    <h4>Accessibility Best Practices</h4>
    <ul>
      <li><strong>Keyboard Navigation:</strong> All interactive elements are keyboard accessible</li>
      <li><strong>ARIA Attributes:</strong> Proper ARIA roles and states are automatically applied</li>
      <li><strong>Focus Management:</strong> Focus is maintained and visible during interactions</li>
      <li><strong>Screen Reader Support:</strong> Content is properly announced to assistive technologies</li>
      <li><strong>Color Contrast:</strong> Meets WCAG AA standards for color contrast</li>
      <li><strong>Semantic HTML:</strong> Uses appropriate HTML elements for structure</li>
    </ul>
  `;

  // Event handlers
  onAccordionToggle(event: Event): void {
    console.log('Accordion toggled:', event);
  }
}
