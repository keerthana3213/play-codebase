import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent, AavaDefaultCardComponent, AavaIconComponent, AavaTagComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-basic-card',
  imports: [
    CommonModule,
    AavaDefaultCardComponent,
    AavaIconComponent,
    AavaTagComponent,
    AavaButtonComponent
  ],
  templateUrl: './test-basic-card.component.html',
  styleUrl: './test-basic-card.component.scss'
})
export class TestBasicCardComponent {

}
