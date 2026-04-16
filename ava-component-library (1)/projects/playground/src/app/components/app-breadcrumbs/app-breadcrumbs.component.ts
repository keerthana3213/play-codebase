import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-breadcrumbs.component.html',
  styleUrls: ['./app-breadcrumbs.component.scss'],
})
export class AppBreadcrumbsComponent {}
