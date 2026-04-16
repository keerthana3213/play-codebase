import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaSelectComponent, AavaSelectOptionComponent } from '@aava/play-core';

@Component({
  selector: 'ava-states-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaSelectComponent, AavaSelectOptionComponent],
  templateUrl: './states-demo.component.html',
  styleUrls: ['./states-demo.component.scss']
})
export class StatesDemoComponent {

}
