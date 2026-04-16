import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent, AavaCardContentComponent, AavaCardFooterComponent, AavaCardHeaderComponent, AavaDefaultCardComponent, AavaIconComponent, AavaTagComponent } from '@aava/play-core'

@Component({
  selector: 'ava-card-complex-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaButtonComponent,
    AavaIconComponent,
    AavaDefaultCardComponent,
    AavaCardHeaderComponent,
    AavaCardContentComponent,
    AavaCardFooterComponent,
    AavaTagComponent,
  ],
  templateUrl: './complex-demo.component.html',
  styleUrl: './complex-demo.component.scss',
})
export class ComplexDemoComponent {
  onAction(action: string) {
    console.log(`Action: ${action}`);
  }

  onProductAction(product: string, action: string) {
    console.log(`Product: ${product}, Action: ${action}`);
  }

  onDashboardAction(action: string) {
    console.log(`Dashboard action: ${action}`);
  }
}
