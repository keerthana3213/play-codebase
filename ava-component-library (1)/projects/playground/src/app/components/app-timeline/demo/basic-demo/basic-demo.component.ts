import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  selector: 'ava-timeline-basic-demo',
  standalone: true,
  imports: [CommonModule, AavaTimelineComponent],
  templateUrl: './basic-demo.component.html',
  styleUrl: './basic-demo.component.scss',
})
export class BasicDemoComponent {
  basicEvents: TimelineEvent[] = [
    {
      time: '10:00 AM',
      title: 'Project Kickoff Meeting',
      description: 'Initial project planning and team alignment session',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '24px',
      year: '2025',
      status: 'completed',
    },
    {
      time: '2:00 PM',
      title: 'Development Phase Started',
      description: 'Begin coding and implementation of core features',
      iconName: 'loader',
      iconColor: '#E91E63',
      iconSize: '20px',
      year: '2025',
      status: 'current',
    },
    {
      time: '4:30 PM',
      title: 'First Milestone Completed',
      description: 'Successfully completed the initial development phase',
      iconName: 'check-circle',
      iconColor: '#E91E63',
      iconSize: '16px',
      year: '2025',
      status: 'pending',
    },
  ];

  selectedEvent: TimelineEvent | null = null;

  onEventSelect(event: TimelineEvent): void {
    console.log('Timeline event selected:', event);
    this.selectedEvent = event;
  }
}
