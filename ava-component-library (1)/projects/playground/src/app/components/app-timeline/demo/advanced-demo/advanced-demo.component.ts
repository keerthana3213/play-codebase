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
  selector: 'ava-timeline-advanced-demo',
  standalone: true,
  imports: [CommonModule, AavaTimelineComponent],
  templateUrl: './advanced-demo.component.html',
  styleUrl: './advanced-demo.component.scss',
})
export class AdvancedDemoComponent {
  advancedEvents: TimelineEvent[] = [
    {
      time: '9:00 AM',
      title: 'Project Planning',
      description: 'Initial project scope and requirements definition',
      iconName: 'target',
      iconColor: '#4CAF50',
      iconSize: '24px',
      year: '2025',
      status: 'completed',
      customClass: 'planning-event',
      data: { priority: 'high', team: 'Planning', budget: '$50,000' },
    },
    {
      time: '11:30 AM',
      title: 'Design Phase',
      description: 'UI/UX design and wireframe creation',
      iconName: 'palette',
      iconColor: '#2196F3',
      iconSize: '20px',
      year: '2025',
      status: 'current',
      customClass: 'design-event',
      data: { designer: 'Sarah', tools: ['Figma', 'Sketch'], iterations: 3 },
    },
    {
      time: '2:00 PM',
      title: 'Development Sprint',
      description: 'Agile development with daily standups',
      iconName: 'code',
      iconColor: '#FF9800',
      iconSize: '18px',
      year: '2025',
      status: 'pending',
      customClass: 'development-event',
      data: { sprint: 'Sprint 1', duration: '2 weeks', teamSize: 5 },
    },
    {
      time: '4:30 PM',
      title: 'Testing & QA',
      description: 'Comprehensive testing and quality assurance',
      iconName: 'test-tube',
      iconColor: '#9C27B0',
      iconSize: '22px',
      year: '2025',
      status: 'unreached',
      customClass: 'testing-event',
      data: { testTypes: ['Unit', 'Integration', 'E2E'], coverage: '85%' },
    },
    {
      time: '6:00 PM',
      title: 'Deployment',
      description: 'Production deployment and monitoring setup',
      iconName: 'rocket',
      iconColor: '#E91E63',
      iconSize: '26px',
      year: '2025',
      status: 'unreached',
      customClass: 'deployment-event',
      data: {
        environment: 'Production',
        rollback: true,
        monitoring: 'New Relic',
      },
    },
  ];

  customSortedEvents: TimelineEvent[] = [...this.advancedEvents];
  selectedEvent: TimelineEvent | null = null;

  onEventSelect(event: TimelineEvent): void {
    console.log('Advanced timeline event selected:', event);
    this.selectedEvent = event;
  }

  sortByTime(): void {
    this.customSortedEvents = [...this.advancedEvents].sort((a, b) => {
      const timeA = a.time || '';
      const timeB = b.time || '';
      return timeA.localeCompare(timeB);
    });
  }

  sortByStatus(): void {
    const statusOrder = { completed: 1, current: 2, pending: 3, unreached: 4 };
    this.customSortedEvents = [...this.advancedEvents].sort((a, b) => {
      const statusA = a.status || 'unreached';
      const statusB = b.status || 'unreached';
      return (
        (statusOrder[statusA as keyof typeof statusOrder] || 5) -
        (statusOrder[statusB as keyof typeof statusOrder] || 5)
      );
    });
  }

  sortByTitle(): void {
    this.customSortedEvents = [...this.advancedEvents].sort((a, b) => {
      const titleA = a.title || '';
      const titleB = b.title || '';
      return titleA.localeCompare(titleB);
    });
  }

  resetSort(): void {
    this.customSortedEvents = [...this.advancedEvents];
  }

  getEventData(event: TimelineEvent): string {
    if (!event.data) return 'No additional data';

    try {
      return JSON.stringify(event.data, null, 2);
    } catch {
      return 'Data available but not serializable';
    }
  }

  getStatusColor(status: string | undefined): string {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'current':
        return '#2196F3';
      case 'pending':
        return '#FF9800';
      case 'unreached':
        return '#9E9E9E';
      default:
        return '#757575';
    }
  }
}
