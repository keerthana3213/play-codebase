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
  selector: 'ava-timeline-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaTimelineComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrl: './sizes-demo.component.scss',
})
export class SizesDemoComponent {
  sizeEvents: TimelineEvent[] = [
    {
      time: '9:00 AM',
      title: 'Morning Standup',
      description: 'Daily team synchronization meeting',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '24px',
      year: '2025',
      status: 'completed',
    },
    {
      time: '11:30 AM',
      title: 'Code Review',
      description: 'Peer review of new feature implementation',
      iconName: 'check',
      iconColor: '#E91E63',
      iconSize: '20px',
      year: '2025',
      status: 'current',
    },
    {
      time: '2:00 PM',
      title: 'Testing Phase',
      description: 'Quality assurance and bug testing',
      iconName: 'circle-check',
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
