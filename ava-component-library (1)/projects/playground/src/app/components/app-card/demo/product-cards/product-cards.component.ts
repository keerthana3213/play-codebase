import { Component } from '@angular/core';
import { AavaProductCardComponent } from '@aava/play-core';

@Component({
  selector: 'app-product-cards',
  standalone: true,
  imports: [AavaProductCardComponent],
  templateUrl: './product-cards.component.html',
  styleUrl: './product-cards.component.scss'
})
export class ProductCardsComponent {
  problemIcon = '../../../../../assets/problem.svg';
}
