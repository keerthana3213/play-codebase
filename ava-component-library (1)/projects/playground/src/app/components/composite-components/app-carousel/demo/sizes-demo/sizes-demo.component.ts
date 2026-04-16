import { Component } from '@angular/core';
import { AavaCarouselComponent, CarouselItem } from '@aava/play-core';

@Component({
  selector: 'app-sizes-demo',
  imports: [AavaCarouselComponent],
  templateUrl: './sizes-demo.component.html',
  styleUrl: './sizes-demo.component.scss',
})
export class SizesDemoComponent {
  carouselItems: CarouselItem[] = [
    {
      id: '1',
      imageUrl: 'assets/center.jpg',
      imageAlt: 'Image 1',
      routeUrl: '',
    },
    {
      id: '2',
      imageUrl: 'assets/right-1.jpg',
      imageAlt: 'Image 2',
      routeUrl: '',
    },
    {
      id: '3',
      imageUrl: 'assets/right-2.jpg',
      imageAlt: 'Image 3',
      routeUrl: '',
    },
    {
      id: '4',
      imageUrl: 'assets/left-2.jpg',
      imageAlt: 'Image 4',
      routeUrl: '',
    },
    {
      id: '5',
      imageUrl: 'assets/left-1.jpg',
      imageAlt: 'Image 5',
      routeUrl: '',
    },
  ];
}
