import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridDemoCardComponent } from '../grid-demo-card/grid-demo-card.component';

@Component({
  selector: 'ava-grid-alignment-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, GridDemoCardComponent],
  templateUrl: './alignment-demo.component.html',
  styleUrls: ['./alignment-demo.component.scss'],
})
export class AlignmentDemoComponent { }
