import { Component } from '@angular/core';
import { AavaFlipCardComponent } from '@aava/play-core';

@Component({
  selector: 'ava-flip-card-demo',
  standalone: true,
  imports: [AavaFlipCardComponent],
  templateUrl: './app-flip-card.component.html',
  styleUrl: './app-flip-card.component.scss',
})
export class AppFlipCardComponent { }
