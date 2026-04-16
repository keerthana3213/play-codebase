import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-icons-accessibility',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './icons-accessibility.component.html',
  styleUrls: ['./icons-accessibility.component.scss'],
})
export class IconsAccessibilityComponent {
  // Accessibility-focused icon examples
  accessibilityIcons = [
    { name: 'eye', label: 'View details', cursor: true, role: 'button' },
    { name: 'edit', label: 'Edit item', cursor: true, role: 'button' },
    { name: 'trash-2', label: 'Delete item', cursor: true, role: 'button' },
    { name: 'info', label: 'Information', cursor: false, role: 'img' },
  ];

  onIconClick(event: Event, action: string): void {
    console.log(`Accessibility action: ${action}`, event);
    // Announce to screen readers
    this.announceAction(action);
  }

  private announceAction(action: string): void {
    // Create temporary element for screen reader announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Action performed: ${action}`;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}
