import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSelectComponent, AavaSelectOptionComponent,AavaIconComponent } from '@aava/play-core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ava-icons-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, AavaSelectComponent, AavaSelectOptionComponent,AavaIconComponent],
  templateUrl: './icons-demo.component.html',
  styleUrls: ['./icons-demo.component.scss']
})
export class IconsDemoComponent {
  constructor() {
    console.log('Icons Demo Component loaded!');
  }
}
