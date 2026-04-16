import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {

  AavaAvatarsComponent,
  AavaIconComponent,
  AavaButtonComponent,
  ListItem,
  AavaCheckboxComponent,
  ListSelectionEvent,
  ListButtonClickEvent,
  ButtonVariant,
  AavaListComponent,
  AavaListItemsComponent,
  AavaDividersComponent,
} from '@aava/play-core';


@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [
    CommonModule,
    AavaListComponent,
    AavaAvatarsComponent,
    AavaIconComponent,
    AavaListItemsComponent,
    AavaButtonComponent,
    AavaCheckboxComponent,
    AavaDividersComponent,
  ],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss',
})
export class TestListComponent {
  iconColor = 'var(--color-text-primary)';


  sampleImageUrl = 'assets/1.svg';




  // // Example 3: Documents with icons
  documentItems = [
    {
      id: 1,
      heading: 'Option',
      iconName: 'chevron-right',
      // outline: true,
    }
  ];

}
