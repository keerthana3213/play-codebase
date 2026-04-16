import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaProgressComponent } from '@aava/play-core';

@Component({
  selector: 'app-circular-demo',
  imports: [CommonModule, AavaProgressComponent],
  templateUrl: './circular-demo.component.html',
  styleUrl: './circular-demo.component.scss',
})
export class CircularDemoComponent {
  percentages = [25, 50, 75, 100];
  positions: ('12' | '3' | '6' | '9')[] = ['12', '3', '6', '9'];
  sizes = [100, 140, 180, 220];
  colors = ['#2E308E', '#28a745', '#dc3545', '#ffc107'];

  codeExample = `
<!-- Basic Circular Progress -->
<ava-progressbar
  [percentage]="75"
  label="Upload Progress"
  type="circular"
  color="#2E308E"
  [svgSize]="140">
</ava-progressbar>

<!-- Circular Progress with Custom Position -->
<ava-progressbar
  [percentage]="50"
  label="Processing"
  type="circular"
  position="3"
  color="#28a745"
  [svgSize]="140">
</ava-progressbar>
  `;
}
