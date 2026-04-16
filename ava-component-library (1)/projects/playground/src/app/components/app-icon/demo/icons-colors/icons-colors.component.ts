import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-icons-colors',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './icons-colors.component.html',
  styleUrls: ['./icons-colors.component.scss'],
})
export class IconsColorsComponent {
  // Color examples with different color options
  colorExamples = [
    { color: '#374151', label: 'Default Gray' },
    { color: '#3B82F6', label: 'Blue' },
    { color: '#10B981', label: 'Green' },
    { color: '#F59E0B', label: 'Orange' },
    { color: '#EF4444', label: 'Red' },
  ];

  iconName = 'star'; // Using same icon to show color differences

  onIconClick(event: Event): void {
    console.log('Icon clicked:', event);
  }
}
