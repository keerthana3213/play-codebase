import { Component } from '@angular/core';
import { AavaCarouselComponent, CarouselItem } from '../../../../../play-core/src/lib/composite-components/carousel/aava-carousel.component';

@Component({
  selector: 'app-test-carousel',
  imports: [AavaCarouselComponent],
  templateUrl: './test-carousel.component.html',
  styleUrl: './test-carousel.component.scss'
})
export class TestCarouselComponent {
  carouselItems: CarouselItem[] = [
    {
      id: '1', imageUrl: 'assets/center.jpg', imageAlt: 'Image 1',
      routeUrl: '/autocomplete'
    },
    {
      id: '2', imageUrl: 'assets/right-1.jpg', imageAlt: 'Image 2',
      routeUrl: '/app-button'
    },
    {
      id: '3', imageUrl: 'assets/right-2.jpg', imageAlt: 'Image 3',
      routeUrl: '/app-date-input'
    },
    {
      id: '4', imageUrl: 'assets/left-2.jpg', imageAlt: 'Image 4',
      routeUrl: '/app-calendar-demo'
    },
    {
      id: '5', imageUrl: 'assets/left-1.jpg', imageAlt: 'Image 5',
      routeUrl: '/app-checkbox'
    },
  ];
  carouselItemsWithTitles: CarouselItem[] = [
    {
      id: '1', imageUrl: 'assets/center.jpg', imageAlt: 'Image 1',
      routeUrl: '/autocomplete',
      title: 'Image-1'
    },
    {
      id: '2', imageUrl: 'assets/right-1.jpg', imageAlt: 'Image 2',
      routeUrl: '/app-button',
      title: 'Image-2'
    },
    {
      id: '3', imageUrl: 'assets/right-2.jpg', imageAlt: 'Image 3',
      routeUrl: '/app-date-input',
      title: 'Image-3'
    },
    {
      id: '4', imageUrl: 'assets/left-2.jpg', imageAlt: 'Image 4',
      routeUrl: '/app-calendar-demo',
      title: 'Image-4'
    },
    {
      id: '5', imageUrl: 'assets/left-1.jpg', imageAlt: 'Image 5',
      routeUrl: '/app-checkbox',
      title: 'Image-5'
    },
  ];
}
