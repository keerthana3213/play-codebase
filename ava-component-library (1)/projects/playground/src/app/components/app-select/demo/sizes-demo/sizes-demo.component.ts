import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaSelectComponent, AavaSelectOptionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-sizes-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaSelectComponent, AavaSelectOptionComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrls: ['./sizes-demo.component.scss']
})
export class SizesDemoComponent {

}
