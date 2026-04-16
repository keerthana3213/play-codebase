import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AavaDrawerComponent,
  AavaButtonComponent,
  AavaTagComponent,
} from '@aava/play-core';

@Component({
  selector: 'app-agent-details-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaDrawerComponent,
    AavaButtonComponent,
    AavaTagComponent,
  ],
  templateUrl: './agent-details-demo.component.html',
  styleUrls: ['./agent-details-demo.component.scss']
})
export class AgentDetailsDemoComponent {
  // Drawer state
  isDrawerOpen = false;

  // Agent data matching Figma design
  agentData = {
    title: 'Heading',
    subtitle: 'Effortlessly convert Ruby code to Spring Boot with optimised migration',
    tags: [
      { label: '#1 in Agents', color: 'default' as const, variant: 'outlined' as const },
      { label: 'Code Migration', color: 'default' as const, variant: 'outlined' as const },
      { label: 'Development', color: 'default' as const, variant: 'outlined' as const },
      { label: 'Backend', color: 'default' as const, variant: 'outlined' as const }
    ],
    stats: {
      category: 'Type',
      developedBy: 'Name',
      relevancy: '9.5/10',
      rating: '4.5',
      relevancyScore: 'Score',
      ratingOutOf: 'Out of 5'
    },
    whatItsFor: `A agent that converts Ruby code to Spring Boot can be highly beneficial for organisation's migrating from Ruby on Rails to Java Spring Boot. However, the effectiveness depends on several factors, including the complexity of the application, language differences, and the capabilities of the conversion agent.`
  };

  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

  onTagClick(tagLabel: string) {
    console.log('Tag clicked:', tagLabel);
    // Add your tag click logic here
  }
}
