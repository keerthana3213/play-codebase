import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridDemoCardComponent } from '../grid-demo-card/grid-demo-card.component';

@Component({
  selector: 'ava-grid-responsive-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, GridDemoCardComponent],
  templateUrl: './responsive-demo.component.html',
  styleUrls: ['./responsive-demo.component.scss'],
})
export class ResponsiveDemoComponent { }
