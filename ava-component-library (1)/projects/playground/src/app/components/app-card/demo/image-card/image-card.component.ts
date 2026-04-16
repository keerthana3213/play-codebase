import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AavaImageCardComponent, AavaTagComponent, AavaIconComponent, AavaCardHeaderComponent, AavaCardContentComponent, AavaCardFooterComponent } from '@aava/play-core';


@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [RouterModule, AavaImageCardComponent, AavaTagComponent, AavaIconComponent,
    AavaCardHeaderComponent, AavaCardContentComponent, AavaCardFooterComponent],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss',
})
export class AppImageCardComponent { }
