import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AavaIconComponent } from '../../../../../play-core/src/public-api';


@Component({
  selector: 'awe-app-icons',
  standalone: true,
  imports: [CommonModule, AavaIconComponent, RouterModule],
  templateUrl: './app-icons.component.html',
  styleUrls: ['./app-icons.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppIconsComponent {
  userClick(event: Event) {
  }
}
