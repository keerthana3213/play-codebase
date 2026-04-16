import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridDemoCardComponent } from '../grid-demo-card/grid-demo-card.component';

@Component({
  selector: 'ava-grid-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, GridDemoCardComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss'],
})
export class BasicUsageDemoComponent { }
