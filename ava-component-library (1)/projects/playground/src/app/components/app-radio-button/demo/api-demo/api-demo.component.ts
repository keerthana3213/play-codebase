import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ava-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-demo.component.html',
  styleUrl: './api-demo.component.scss',
})
export class ApiDemoComponent {
  // This component is purely for documentation display
  // No interactive functionality needed
}
