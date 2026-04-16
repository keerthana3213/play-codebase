import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'ava-menu-demo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss',
})
export class AppMenuComponent {
  constructor(private router: Router) { }
}
