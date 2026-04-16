import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaBadgesComponent } from '@aava/play-core';

@Component({
  selector: 'ava-badges-states',
  standalone: true,
  imports: [CommonModule, AavaBadgesComponent],
  templateUrl: './badges-states.component.html',
  styleUrls: ['./badges-states.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BadgesStatesComponent {
  // Component logic can be added here if needed
}
