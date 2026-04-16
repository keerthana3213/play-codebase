import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaSelectComponent, AavaSelectOptionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-multiple-selection-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaSelectComponent, AavaSelectOptionComponent],
  templateUrl: './multiple-selection-demo.component.html',
  styleUrls: ['./multiple-selection-demo.component.scss']
})
export class MultipleSelectionDemoComponent {}
