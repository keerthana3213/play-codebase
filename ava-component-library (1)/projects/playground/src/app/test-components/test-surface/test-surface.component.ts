import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-surface',
  imports: [CommonModule],
  templateUrl: './test-surface.component.html',
  styleUrl: './test-surface.component.scss'
})
export class TestSurfaceComponent {

  fills = Array.from({ length: 10 }, (_, i) => i + 1); // [1..10]
  blurs = Array.from({ length: 10 }, (_, i) => i + 1); // [1..10]

}
