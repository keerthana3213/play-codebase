import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaFilterComponent, AavaFilterOption } from '@aava/play-core';

@Component({
  selector: 'ava-single-group-demo',
  standalone: true,
  imports: [CommonModule, AavaFilterComponent],
  templateUrl: './single-group-demo.component.html',
  styleUrls: ['./single-group-demo.component.scss']
})
export class SingleGroupDemoComponent {
  checkboxOptions: AavaFilterOption[] = [
    { id: 1, label: 'Option 1', value: 'opt1', selected: true },
    { id: 2, label: 'Option 2', value: 'opt2', selected: false },
    { id: 3, label: 'Option 3', value: 'opt3', selected: false },
  ];

  radioOptions: AavaFilterOption[] = [
    { id: 1, label: 'Option A', value: 'optA', selected: true },
    { id: 2, label: 'Option B', value: 'optB', selected: false },
    { id: 3, label: 'Option C', value: 'optC', selected: false },
  ];

}
