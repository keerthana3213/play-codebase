import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFilterComponent, AavaFilterOption } from '@aava/play-core';

@Component({
  selector: 'ava-basic-usage-demo',
  standalone: true,
  imports: [CommonModule, AavaFilterComponent],
  templateUrl: './basic-usage-demo.component.html',
  styleUrls: ['./basic-usage-demo.component.scss']
})
export class BasicUsageDemoComponent {
  categories: AavaFilterOption[] = [
    { id: 1, label: 'Electronics', value: 'electronics' },
    { id: 2, label: 'Clothing', value: 'clothing' },
    { id: 3, label: 'Food & Beverage', value: 'food'},
    { id: 4, label: 'Home & Garden', value: 'home' },
    { id: 5, label: 'Sports', value: 'sports' },
  ];


}
