import { Component } from '@angular/core';
import { AavaButtonComponent } from '../../../../../play-core/src/public-api';


@Component({
  selector: 'app-test-button',
  standalone: true,
  imports: [AavaButtonComponent],
  templateUrl: './test-button.component.html',
  styleUrl: './test-button.component.scss'
})
export class TestButtonComponent {

}
