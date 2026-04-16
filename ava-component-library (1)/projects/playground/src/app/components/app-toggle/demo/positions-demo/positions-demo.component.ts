import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'ava-positions-demo',
  standalone: true,
  imports: [CommonModule, AavaToggleComponent],
  templateUrl: './positions-demo.component.html',
  styleUrls: ['./positions-demo.component.scss']
})
export class PositionsDemoComponent {

}
