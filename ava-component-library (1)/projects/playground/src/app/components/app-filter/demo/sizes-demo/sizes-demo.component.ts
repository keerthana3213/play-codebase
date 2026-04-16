import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFilterComponent, AavaFilterOption } from '@aava/play-core';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, AavaFilterComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrls: ['./sizes-demo.component.scss']
})
export class SizesDemoComponent {
  options: AavaFilterOption[] = [
    { id: 1, label: 'Small', value: 'small'},
    { id: 2, label: 'Medium', value: 'medium'},
    { id: 3, label: 'Large', value: 'large' },
  ];
}
