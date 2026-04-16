import { Component } from '@angular/core';
import { AavaCarouselComponent, CarouselItem } from '@aava/play-core';

@Component({
  selector: 'app-test-carousel-demo',
  imports: [AavaCarouselComponent],
  templateUrl: './test-carousel.component.html',
  styleUrl: './test-carousel.component.scss',
})
export class TestCarouselDemoComponent {
  carouselItems: CarouselItem[] = [
    { id: '1', imageUrl: 'assets/left-2.jpg', imageAlt: 'Image 1' },
    { id: '2', imageUrl: 'assets/left-1.jpg', imageAlt: 'Image 2' },
    { id: '3', imageUrl: 'assets/center.jpg', imageAlt: 'Image 3' },
    { id: '5', imageUrl: 'assets/right-1.jpg', imageAlt: 'Image 4' },
    { id: '4', imageUrl: 'assets/right-2.jpg', imageAlt: 'Image 5' },
  ];
}
