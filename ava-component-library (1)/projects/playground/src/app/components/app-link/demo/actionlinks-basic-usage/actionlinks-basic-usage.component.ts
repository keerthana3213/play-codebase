import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaLinkComponent } from '@aava/play-core';

@Component({
  selector: 'ava-actionlinks-basic-usage',
  standalone: true,
  imports: [CommonModule, AavaLinkComponent],
  templateUrl: './actionlinks-basic-usage.component.html',
  styleUrls: ['./actionlinks-basic-usage.component.scss'],
})
export class ActionlinksBasicUsageComponent {}
