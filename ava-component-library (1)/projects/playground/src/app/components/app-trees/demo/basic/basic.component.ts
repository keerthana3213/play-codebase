import { Component } from '@angular/core';
import { AavaTreesComponent } from '@aava/play-core';

@Component({
  selector: 'app-basic',
  imports: [AavaTreesComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss',
})
export class BasicComponent {
  treeData1 = [
    {
      name: 'Documents',
      isExpanded: false,
      children: [
        {
          name: 'Work',
          isExpanded: false,
          children: [{ name: 'Expenses.doc' }, { name: 'Resume.doc' }],
        },
      ],
    },
    {
      name: 'Events',
      isExpanded: false,
      children: [{ name: 'Meeting' }, { name: 'Conference' }],
    },
    {
      name: 'Movies',
      isExpanded: false,
      children: [{ name: 'The Matrix' }, { name: 'Inception' }],
    },
  ];
}
