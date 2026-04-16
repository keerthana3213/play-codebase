import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent, AavaDrawerComponent, AavaIconComponent, AavaTagComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-drawer',
  standalone: true,
  imports: [
    CommonModule,
    AavaDrawerComponent,
    AavaButtonComponent,
    AavaTagComponent,
    AavaIconComponent
  ],
  templateUrl: './test-drawer.component.html',
  styleUrls: ['./test-drawer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestDrawerComponent {
  // Drawer state
  isAgentDetailsDrawerOpen = false;

  get goToPlaygroundButtonColor(){
    return "linear-gradient(to right, #E91E63, #D41B5A)";
  }

  // Agent data matching the design
  agentData = {
    title: 'Create Angular Component',
    subtitle: 'Effortlessly convert Ruby code to Spring Boot with optimised migration',
    tags: [
      { label: 'Development', color: 'default' as const, variant: 'filled' as const },
      { label: 'Front End', color: 'default' as const, variant: 'filled' as const },
      { label: 'Framework', color: 'default' as const, variant: 'filled' as const },
      { label: '98% Accuracy', color: 'default' as const, variant: 'filled' as const },
      { label: '#4 in agents', color: 'default' as const, variant: 'filled' as const }
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

  // Demo methods
  openAgentDetailsDrawer() {
    this.isAgentDetailsDrawerOpen = true;
  }

  closeAgentDetailsDrawer() {
    this.isAgentDetailsDrawerOpen = false;
  }

  onTagClick(tagLabel: string) {
    console.log('Tag clicked:', tagLabel);
  }

  onAddToList() {
    console.log('Add to list clicked');
  }

  onGoToPlayground() {
    console.log('Go to Playground clicked');
  }
}
