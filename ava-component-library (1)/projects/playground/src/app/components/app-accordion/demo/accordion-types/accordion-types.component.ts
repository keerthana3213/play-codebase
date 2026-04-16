import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAccordionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accordion-types',
  standalone: true,
  imports: [CommonModule, AavaAccordionComponent],
  templateUrl: './accordion-types.component.html',
  styleUrls: ['./accordion-types.component.scss'],
})
export class AccordionTypesComponent {
  // Demo data
  settingsContent = `
    <h4>Account Settings</h4>
    <p>Manage your account preferences and security settings.</p>
    <ul>
      <li>Profile information</li>
      <li>Security settings</li>
      <li>Notification preferences</li>
      <li>Privacy controls</li>
    </ul>
  `;

  projectContent = `
    <h4>Project Management</h4>
    <p>Organize and manage your projects effectively.</p>
    <ul>
      <li>Create new projects</li>
      <li>Assign team members</li>
      <li>Set deadlines</li>
      <li>Track progress</li>
    </ul>
  `;

  // Event handlers
  onAccordionToggle(event: Event): void {
    console.log('Accordion toggled:', event);
  }
}
