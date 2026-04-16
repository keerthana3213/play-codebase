import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'ava-accessibility-demo',
  standalone: true,
  imports: [CommonModule, AavaToggleComponent],
  templateUrl: './accessibility-demo.component.html',
  styleUrls: ['./accessibility-demo.component.scss']
})
export class AccessibilityDemoComponent {

}
