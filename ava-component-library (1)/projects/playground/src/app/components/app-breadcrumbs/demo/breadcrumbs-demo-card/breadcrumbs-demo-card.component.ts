import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-breadcrumbs-demo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs-demo-card.component.html',
  styleUrls: ['./breadcrumbs-demo-card.component.scss'],
})
export class BreadcrumbsDemoCardComponent {
  @Input() title = '';
  @Input() description = '';
}
