import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaViewsCardComponent } from '@aava/play-core';

@Component({
  selector: 'app-views-card',
  standalone: true,
  imports: [CommonModule, AavaViewsCardComponent],
  templateUrl: './app-views-card.component.html',
  styleUrl: './app-views-card.component.scss',
})
export class AppViewsCardComponent { }
