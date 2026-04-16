import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaBadgesComponent } from '@aava/play-core';

@Component({
  selector: 'ava-badges-variants',
  standalone: true,
  imports: [CommonModule, AavaBadgesComponent],
  templateUrl: './badges-variants.component.html',
  styleUrls: ['./badges-variants.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BadgesVariantsComponent {
  // Component logic can be added here if needed
}
