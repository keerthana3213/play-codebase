import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaProgressComponent } from '@aava/play-core';

@Component({
  selector: 'app-linear-demo',
  imports: [CommonModule, AavaProgressComponent],
  templateUrl: './linear-demo.component.html',
  styleUrl: './linear-demo.component.scss',
})
export class LinearDemoComponent {
  percentages = [25, 50, 75, 100];
  bufferValues = [40, 60, 80, 90];
  colors = ['#2E308E', '#28a745', '#dc3545', '#ffc107'];
  modes = ['determinate', 'indeterminate', 'buffer', 'query'];

  codeExample = `
<!-- Basic Linear Progress -->
<ava-progressbar
  [percentage]="60"
  label="Download Progress"
  type="linear"
  color="#2E308E"
  mode="determinate">
</ava-progressbar>

<!-- Linear Progress with Buffer -->
<ava-progressbar
  [percentage]="40"
  [bufferValue]="80"
  label="Video Loading"
  type="linear"
  color="#28a745"
  mode="buffer">
</ava-progressbar>

<!-- Indeterminate Progress -->
<ava-progressbar
  label="Loading..."
  type="linear"
  color="#dc3545"
  mode="indeterminate">
</ava-progressbar>
  `;
}
