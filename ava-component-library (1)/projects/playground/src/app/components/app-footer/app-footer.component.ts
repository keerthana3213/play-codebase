import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.scss'
})
export class AppFooterComponent {
  sections = [
    {
      title: 'Basic Usage',
      description: 'Simple footer with logo, social icons, and navigation columns',
      route: '/footer/basic',
      icon: '📱',
    },
  ];
}
