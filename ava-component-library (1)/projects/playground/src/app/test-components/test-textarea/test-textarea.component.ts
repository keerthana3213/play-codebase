import { Component } from '@angular/core';
import { AavaTextareaComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-textarea',
  standalone: true,
  imports: [AavaTextareaComponent],
  templateUrl: './test-textarea.component.html',
  styleUrl: './test-textarea.component.scss'
})
export class TestTextareaComponent {

}
