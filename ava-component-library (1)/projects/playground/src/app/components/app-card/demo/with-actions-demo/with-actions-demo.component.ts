import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent, AavaDefaultCardComponent, AavaCardHeaderComponent, AavaCardContentComponent, AavaCardFooterComponent } from '@aava/play-core'

@Component({
  selector: 'ava-card-with-actions-demo',
  standalone: true,
  imports: [
    CommonModule,
    AavaButtonComponent,
    AavaDefaultCardComponent,
    AavaCardHeaderComponent,
    AavaCardContentComponent,
    AavaCardFooterComponent,
  ],
  templateUrl: './with-actions-demo.component.html',
  styleUrl: './with-actions-demo.component.scss',
})
export class WithActionsDemoComponent {
  onPrimaryAction(action: string) {
    console.log(`Primary action: ${action}`);
  }

  onSecondaryAction(action: string) {
    console.log(`Secondary action: ${action}`);
  }

  onActionClick(action: string) {
    console.log(`Action clicked: ${action}`);
  }
}
