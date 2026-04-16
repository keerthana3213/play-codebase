import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaTimelineComponent } from '@aava/play-core';

interface TimelineEvent {
  time?: string;
  text?: string;
  iconName?: string;
  iconColor?: string;
  iconSize?: string;
  imageUrl?: string;
  imageSize?: string;
  year?: string;
  title?: string;
  description?: string;
  status?: 'completed' | 'current' | 'pending' | 'unreached';
  customClass?: string;
  data?: unknown;
}

@Component({
  selector: 'ava-timeline-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaTimelineComponent],
  templateUrl: './app-timeline.component.html',
  styleUrl: './app-timeline.component.scss',
})
export class AppTimelineComponent {
  // Showcase timeline events
  showcaseEvents: TimelineEvent[] = [
    {
      time: '10:00 AM',
      title: 'Project Kickoff',
      description: 'Initial project planning and team alignment',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '24px',
      year: '2025',
      status: 'completed',
    },
    {
      time: '2:00 PM',
      title: 'Development Phase',
      description: 'Core feature development and implementation',
      iconName: 'loader',
      iconColor: '#E91E63',
      iconSize: '20px',
      year: '2025',
      status: 'current',
    },
    {
      time: '4:30 PM',
      title: 'Testing & QA',
      description: 'Quality assurance and testing phase',
      iconName: 'check-circle',
      iconColor: '#E91E63',
      iconSize: '16px',
      year: '2025',
      status: 'pending',
    },
    {
      time: '6:00 PM',
      title: 'Deployment',
      description: 'Production deployment and launch',
      iconName: 'rocket',
      iconColor: '#E91E63',
      iconSize: '18px',
      year: '2025',
      status: 'unreached',
    },
  ];

  selectedEvent: TimelineEvent | null = null;

  onEventSelect(event: TimelineEvent): void {
    console.log('Timeline event selected:', event);
    this.selectedEvent = event;
  }
}
