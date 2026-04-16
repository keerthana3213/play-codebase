import { Component } from '@angular/core';
import { AavaCarouselComponent, CarouselItem } from '@aava/play-core';

@Component({
  selector: 'app-basic',
  imports: [AavaCarouselComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss',
})
export class BasicComponent {
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
