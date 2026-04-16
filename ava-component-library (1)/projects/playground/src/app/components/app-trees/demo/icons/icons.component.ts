import { Component } from '@angular/core';
import { AavaTreesComponent } from '@aava/play-core';

@Component({
  selector: 'app-icons',
  imports: [AavaTreesComponent],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
})
export class IconsComponent {
  treeData2 = [
    {
      name: 'Documents',
      icon: 'file-text',
      isExpanded: false,
      children: [
        {
          name: 'Work',
          icon: 'briefcase',
          isExpanded: false,
          children: [
            { name: 'Expenses.doc', icon: null },
            { name: 'Resume.doc', icon: 'file-text' },
          ],
        },
      ],
    },
    {
      name: 'Events',
      icon: 'calendar',
      isExpanded: false,
      children: [
        { name: 'Meeting', icon: 'calendar' },
        { name: 'Conference', icon: 'calendar' },
      ],
    },
  ];
}
