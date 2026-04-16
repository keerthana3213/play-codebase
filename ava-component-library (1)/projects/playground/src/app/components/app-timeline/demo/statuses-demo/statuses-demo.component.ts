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
  selector: 'ava-timeline-statuses-demo',
  standalone: true,
  imports: [CommonModule, AavaTimelineComponent],
  templateUrl: './statuses-demo.component.html',
  styleUrl: './statuses-demo.component.scss',
})
export class StatusesDemoComponent {
  statusEvents: TimelineEvent[] = [
    {
      time: '9:00 AM',
      title: 'Project Planning',
      description: 'Requirements gathering and project scope definition',
      iconName: 'circle-check',
      iconColor: '#4CAF50',
      iconSize: '24px',
      year: '2025',
      status: 'completed',
    },
    {
      time: '11:00 AM',
      title: 'Design Phase',
      description: 'UI/UX design and wireframe creation',
      iconName: 'loader',
      iconColor: '#2196F3',
      iconSize: '24px',
      year: '2025',
      status: 'current',
    },
    {
      time: '2:00 PM',
      title: 'Development',
      description: 'Core feature development and implementation',
      iconName: 'clock',
      iconColor: '#FF9800',
      iconSize: '24px',
      year: '2025',
      status: 'pending',
    },
    {
      time: '4:00 PM',
      title: 'Testing & QA',
      description: 'Quality assurance and testing phase',
      iconName: 'help-circle',
      iconColor: '#9E9E9E',
      iconSize: '24px',
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
