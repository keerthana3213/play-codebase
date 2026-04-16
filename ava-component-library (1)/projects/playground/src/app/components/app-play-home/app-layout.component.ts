import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AavaSnackbarComponent } from '@aava/play-core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'ava-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaSnackbarComponent, ThemeToggleComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  customStyles = {
    '--header-background-scrollable': 'white'
  };
}
