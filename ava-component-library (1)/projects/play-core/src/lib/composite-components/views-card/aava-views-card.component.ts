import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCardContentComponent } from '../../components/card/card-content/aava-card-content.component';

interface ViewsCardColors {
  outerGradient: { start: string; end: string };
  cardGradient: { start: string; end: string };
  textGradient: { start: string; middle: string; end: string };
  topLineGradient: { start: string; end: string };
  leftLineGradient: { start: string; end: string };
  dot: string;
  dotShadow: string;
  ray: string;
  rayShadow: string;
  line: string;
}

@Component({
  selector: 'aava-views-card',
  standalone: true,
  imports: [CommonModule, AavaCardContentComponent],
  templateUrl: './aava-views-card.component.html',
  styleUrl: './aava-views-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaViewsCardComponent {
  @Input() value = '750k';
  @Input() label = 'Views';
  @Input() width = '300px';
  @Input() height = '250px';

  @Input() colors: ViewsCardColors = {
    outerGradient: { start: '#ffffff', end: '#0c0d0d' },
    cardGradient: { start: '#444444', end: '#0c0d0d' },
    textGradient: { start: '#000000', middle: '#fff', end: '#000' },
    topLineGradient: { start: '#888888', end: '#1d1f1f' },
    leftLineGradient: { start: '#747474', end: '#222424' },
    dot: '#fff',
    dotShadow: '#ffffff',
    ray: '#c7c7c7',
    rayShadow: '#fff',
    line: '#2c2c2c',
  };

  get cssVariables() {
    return {
      '--outer-gradient-start': this.colors.outerGradient.start,
      '--outer-gradient-end': this.colors.outerGradient.end,
      '--card-gradient-start': this.colors.cardGradient.start,
      '--card-gradient-end': this.colors.cardGradient.end,
      '--text-gradient-start': this.colors.textGradient.start,
      '--text-gradient-middle': this.colors.textGradient.middle,
      '--text-gradient-end': this.colors.textGradient.end,
      '--top-line-gradient-start': this.colors.topLineGradient.start,
      '--top-line-gradient-end': this.colors.topLineGradient.end,
      '--left-line-gradient-start': this.colors.leftLineGradient.start,
      '--left-line-gradient-end': this.colors.leftLineGradient.end,
      '--dot-color': this.colors.dot,
      '--dot-shadow-color': this.colors.dotShadow,
      '--ray-color': this.colors.ray,
      '--ray-shadow-color': this.colors.rayShadow,
      '--line-color': this.colors.line,
      '--card-width': this.width,
      '--card-height': this.height,
    };
  }
}
