import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridDemoCardComponent } from '../grid-demo-card/grid-demo-card.component';
import { AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'ava-grid-nested-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, AavaIconComponent, GridDemoCardComponent],
  templateUrl: './nested-demo.component.html',
  styleUrls: ['./nested-demo.component.scss'],
})
export class NestedDemoComponent { }
