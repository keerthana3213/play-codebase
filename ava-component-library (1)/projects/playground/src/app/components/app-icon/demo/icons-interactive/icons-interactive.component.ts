import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-icons-interactive',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './icons-interactive.component.html',
  styleUrls: ['./icons-interactive.component.scss'],
})
export class IconsInteractiveComponent {
  // Interactive icon examples
  interactiveIcons = [
    { name: 'thumbs-up', label: 'Like', cursor: true },
    { name: 'bookmark', label: 'Bookmark', cursor: true },
    { name: 'share', label: 'Share', cursor: true },
    { name: 'download', label: 'Download', cursor: true },
  ];

  onIconClick(event: Event, iconName: string): void {
    console.log(`${iconName} icon clicked:`, event);
    // Optional: Show visual feedback or perform action
  }
}
