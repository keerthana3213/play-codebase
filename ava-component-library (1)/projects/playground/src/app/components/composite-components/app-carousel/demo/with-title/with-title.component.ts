import { Component } from '@angular/core';
import { AavaCarouselComponent, CarouselItem } from '@aava/play-core';

@Component({
  selector: 'app-with-title',
  imports: [AavaCarouselComponent],
  templateUrl: './with-title.component.html',
  styleUrl: './with-title.component.scss',
})
export class WithTitleComponent {
  carouselItemsWithTitles: CarouselItem[] = [
    {
      id: '1',
      imageUrl: 'assets/center.jpg',
      imageAlt: 'Image 1',
      routeUrl: '',
      title: 'Image-1',
    },
    {
      id: '2',
      imageUrl: 'assets/right-1.jpg',
      imageAlt: 'Image 2',
      routeUrl: '',
      title: 'Image-2',
    },
    {
      id: '3',
      imageUrl: 'assets/right-2.jpg',
      imageAlt: 'Image 3',
      routeUrl: '',
      title: 'Image-3',
    },
    {
      id: '4',
      imageUrl: 'assets/left-2.jpg',
      imageAlt: 'Image 4',
      routeUrl: '',
      title: 'Image-4',
    },
    {
      id: '5',
      imageUrl: 'assets/left-1.jpg',
      imageAlt: 'Image 5',
      routeUrl: '',
      title: 'Image-5',
    },
  ];
}
