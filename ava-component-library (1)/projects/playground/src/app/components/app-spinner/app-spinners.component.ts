import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaSpinnerComponent } from '@aava/play-core';

@Component({
  selector: 'ava-app-spinners',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaSpinnerComponent],
  templateUrl: './app-spinners.component.html',
  styleUrls: ['./app-spinners.component.scss'],
})
export class AppSpinnersComponent {
  // Simplified component for the main spinner demo page
  // Individual demo components handle their own functionality
}
