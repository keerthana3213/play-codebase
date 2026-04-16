import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'aava-toggle-icon-demo',
  standalone: true,
  imports: [CommonModule, AavaToggleComponent],
  templateUrl: './icon-demo.component.html',
  styleUrls: ['./icon-demo.component.scss']
})
export class IconDemoComponent {

}
