import { Component } from '@angular/core';
import { AavaCubicalLoadingComponent } from '@aava/play-core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-cubical-loading',
  imports: [AavaCubicalLoadingComponent, RouterModule],
  templateUrl: './app-cubical-loading.component.html',
  styleUrl: './app-cubical-loading.component.scss',
})
export class AppCubicalLoadingComponent {}
