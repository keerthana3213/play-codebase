import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-icons-basic-usage',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './icons-basic-usage.component.html',
  styleUrls: ['./icons-basic-usage.component.scss'],
})
export class IconsBasicUsageComponent {
  // Basic icon examples
  basicIcons = [
    { name: 'home', label: 'Home' },
    { name: 'user', label: 'User' },
    { name: 'settings', label: 'Settings' },
    { name: 'heart', label: 'Heart' },
    { name: 'star', label: 'Star' },
  ];

  onIconClick(event: Event): void {
    console.log('Icon clicked:', event);
  }
}
