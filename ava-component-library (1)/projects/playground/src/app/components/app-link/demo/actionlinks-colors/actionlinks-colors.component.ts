import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLinkComponent } from '@aava/play-core';

@Component({
  selector: 'ava-actionlinks-colors',
  standalone: true,
  imports: [CommonModule, AavaLinkComponent],
  templateUrl: './actionlinks-colors.component.html',
  styleUrls: ['./actionlinks-colors.component.scss'],
})
export class ActionlinksColorsComponent {}
