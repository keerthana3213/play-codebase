import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-grid-demo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-demo-card.component.html',
  styleUrls: ['./grid-demo-card.component.scss'],
})
export class GridDemoCardComponent {
  @Input() title = '';
  @Input() description = '';
}
