import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridDemoCardComponent } from '../grid-demo-card/grid-demo-card.component';

@Component({
  selector: 'ava-grid-flexbox-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, GridDemoCardComponent],
  templateUrl: './flexbox-demo.component.html',
  styleUrls: ['./flexbox-demo.component.scss'],
})
export class FlexboxDemoComponent { }
