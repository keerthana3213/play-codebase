import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaSelectComponent, AavaSelectOptionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-search-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaSelectComponent, AavaSelectOptionComponent],
  templateUrl: './search-demo.component.html',
  styleUrls: ['./search-demo.component.scss']
})
export class SearchDemoComponent {
  largeDataset = this.generateLargeDataset(100);


  private generateLargeDataset(count: number) {
    const items = [];
    for (let i = 1; i <= count; i++) {
      items.push({
        value: `item-${i}`,
        label: `Item ${i} - Sample Data Entry`
      });
    }
    return items;
  }
}
