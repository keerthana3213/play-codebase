import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridDemoCardComponent } from '../grid-demo-card/grid-demo-card.component';

@Component({
  selector: 'ava-grid-ordering-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, GridDemoCardComponent],
  templateUrl: './ordering-demo.component.html',
  styleUrls: ['./ordering-demo.component.scss'],
})
export class OrderingDemoComponent { }
