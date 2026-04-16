import { Component } from '@angular/core';
import { AavaIconComponent, AavaListComponent, AavaListItemsComponent } from "@aava/play-core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-list-console',
  imports: [CommonModule, AavaListItemsComponent, AavaIconComponent, AavaListComponent],
  templateUrl: './test-list-console.component.html',
  styleUrl: './test-list-console.component.scss'
})
export class TestListConsoleComponent {
  selectedItemIndex: number | null = null;

  items = [
    { heading: 'Quick', subHeading: 'General text chunking, the chunks retrieved and recalled are same. ', iconName: 'user' },
    { heading: 'Deep Context', subHeading: 'When using the Deep Context -  Parent-child mode, the child -chunk is used for retrieval and the Parent chunk is used for recall as context', iconName: 'user' }
  ];

  onItemClick(index: number): void {
    this.selectedItemIndex = index;
    console.log('Item clicked:', index);
  }

  isItemSelected(index: number): boolean {
    return this.selectedItemIndex === index;
  }

}
