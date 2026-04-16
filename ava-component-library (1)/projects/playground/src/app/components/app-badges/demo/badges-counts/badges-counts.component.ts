import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaBadgesComponent } from '@aava/play-core';

@Component({
  selector: 'ava-badges-counts',
  standalone: true,
  imports: [CommonModule, AavaBadgesComponent],
  templateUrl: './badges-counts.component.html',
  styleUrls: ['./badges-counts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BadgesCountsComponent {
  // Component logic can be added here if needed
}
