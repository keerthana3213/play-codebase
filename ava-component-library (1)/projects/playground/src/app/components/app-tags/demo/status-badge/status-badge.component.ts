import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTagComponent } from '@aava/play-core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule, AavaTagComponent],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
onTagClick(tagName: string): void {
    console.log(`${tagName} tag clicked!`);
  }
}
