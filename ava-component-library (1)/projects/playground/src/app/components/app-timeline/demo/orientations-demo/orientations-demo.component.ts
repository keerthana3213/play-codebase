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
  selector: 'ava-timeline-orientations-demo',
  standalone: true,
  imports: [CommonModule, AavaTimelineComponent],
  templateUrl: './orientations-demo.component.html',
  styleUrl: './orientations-demo.component.scss',
})
export class OrientationsDemoComponent {
  verticalEvents: TimelineEvent[] = [
    {
      time: '10:00 AM',
      title: 'Project Planning',
      description: 'Requirements gathering and project scope definition',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '24px',
      year: '2025',
      status: 'completed',
    },
    {
      time: '2:00 PM',
      title: 'Development',
      description: 'Core feature development and implementation',
      iconName: 'loader',
      iconColor: '#E91E63',
      iconSize: '20px',
      year: '2025',
      status: 'current',
    },
    {
      time: '4:30 PM',
      title: 'Testing',
      description: 'Quality assurance and testing phase',
      iconName: 'check-circle',
      iconColor: '#E91E63',
      iconSize: '16px',
      year: '2025',
      status: 'pending',
    },
  ];

  horizontalEvents: TimelineEvent[] = [
    {
      time: '9:00 AM',
      title: 'Start',
      description: 'Project initiation and setup',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '20px',
      year: '2025',
      status: 'completed',
    },
    {
      time: '12:00 PM',
      title: 'Progress',
      description: 'Mid-day progress review',
      iconName: 'loader',
      iconColor: '#E91E63',
      iconSize: '18px',
      year: '2025',
      status: 'current',
    },
    {
      time: '3:00 PM',
      title: 'Complete',
      description: 'Project completion and delivery',
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
