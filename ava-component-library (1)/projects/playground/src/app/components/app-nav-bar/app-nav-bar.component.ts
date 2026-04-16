import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AavaButtonComponent,
} from '@aava/play-core';

@Component({
  selector: 'ava-nav-bar-demo',
  standalone: true,
  imports: [AavaButtonComponent],
  templateUrl: './app-nav-bar.component.html',
  styleUrl: './app-nav-bar.component.scss',
})
export class AppNavBarComponent {
  constructor(private router: Router) { }

  navigateToDemo(route: string): void {
    this.router.navigate([route]);
  }
}
