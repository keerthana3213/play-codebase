import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaListCardComponent } from '@aava/play-core';

@Component({
  selector: 'ava-list-card-demo',
  standalone: true,
  imports: [CommonModule, AavaListCardComponent],
  templateUrl: './app-list-card.component.html',
  styleUrl: './app-list-card.component.scss',
})
export class AppListCardComponent {
  // Note: This component is currently a placeholder with no inputs or outputs defined
}
