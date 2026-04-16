import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTextCardComponent } from '@aava/play-core';

@Component({
  selector: 'ava-text-card-demo',
  standalone: true,
  imports: [CommonModule, AavaTextCardComponent],
  templateUrl: './app-text-card.component.html',
  styleUrl: './app-text-card.component.scss',
})
export class AppTextCardComponent {
  defaultCardData = {
    title: 'Total Users',
    value: '1,234',
    description: 'Active users this month',
    iconName: 'users',
  };

  createCardData = {
    title: 'Create New Project',
    iconColor: '#007bff',
  };

  promptCardData = {
    title: 'AI Assistant',
    description:
      'Get help with your questions and tasks using our AI assistant.',
    headerIcons: [
      { iconName: 'ai', title: 'AI', iconColor: '#007bff' },
      { iconName: 'chat', title: 'Chat', iconColor: '#28a745' },
    ],
    footerIcons: [
      { iconName: 'clock', title: '2 min ago' },
      { iconName: 'star', title: '4.5 stars' },
    ],
    iconList: [
      { iconName: 'play', name: 'play', cursor: 'pointer' },
      { iconName: 'bookmark', cursor: 'pointer' },
      { iconName: 'share', cursor: 'pointer' },
      { iconName: 'more', cursor: 'pointer' },
    ],
  };

  onCardClick() {
    console.log('Card clicked!');
  }

  iconClicked(icon: any) {
    console.log('Icon clicked:', icon);
  }
}
