import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaToggleComponent } from '@aava/play-core';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaToggleComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrls: ['./sizes-demo.component.scss']
})
export class SizesDemoComponent {

}
