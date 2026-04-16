import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-progressbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './app-progressbar.component.html',
  styleUrl: './app-progressbar.component.scss',
})
export class AppProgressbarComponent {}
