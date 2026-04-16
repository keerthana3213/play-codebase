import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'ava-animation-demo',
  standalone: true,
  imports: [CommonModule, AavaToggleComponent],
  templateUrl: './animation-demo.component.html',
  styleUrls: ['./animation-demo.component.scss']
})
export class AnimationDemoComponent {
 
}
