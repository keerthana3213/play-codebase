import { Component } from '@angular/core';
import { AavaCubicalLoadingComponent } from '@aava/play-core';

@Component({
  selector: 'app-custom',
  imports: [AavaCubicalLoadingComponent],
  templateUrl: './custom.component.html',
  styleUrl: './custom.component.scss',
})
export class CustomComponent {}
