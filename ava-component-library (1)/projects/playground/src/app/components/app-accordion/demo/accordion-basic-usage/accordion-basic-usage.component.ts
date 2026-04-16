import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accordion-basic-usage',
  standalone: true,
  imports: [CommonModule, AavaAccordionComponent],
  templateUrl: './accordion-basic-usage.component.html',
  styleUrls: ['./accordion-basic-usage.component.scss'],
})
export class AccordionBasicUsageComponent {
  // Demo data
  faqItems = [
    {
      question: 'How do I get started with the platform?',
      answer:
        'Getting started is easy! Simply create an account, complete your profile setup, and explore our comprehensive dashboard. We provide step-by-step tutorials to help you get up and running quickly.',
    },
    {
      question: 'What are the pricing plans available?',
      answer:
        'We offer several flexible pricing plans: Basic (free), Pro ($29/month), and Enterprise (custom pricing). Each plan includes different features and usage limits to suit your needs.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'Our support team is available 24/7 through multiple channels: live chat, email support, and phone support for enterprise customers. We typically respond within 2 hours.',
    },
  ];

  gettingStartedSteps = [
    'Create your account with email verification',
    'Complete your profile and preferences',
    'Explore the dashboard and key features',
    'Set up your first project or workspace',
    'Invite team members (if applicable)',
    'Start building and creating content',
  ];

  // Event handlers
  onAccordionToggle(event: Event): void {
    console.log('Accordion toggled:', event);
  }

  onAccordionClick(event: Event): void {
    console.log('Accordion clicked:', event);
  }
}
