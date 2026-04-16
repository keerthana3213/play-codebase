import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCardContentComponent } from '../../components/card/card-content/aava-card-content.component';

interface FlipCardColors {
  frontGradient: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
  };
  backGradient: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
  };
  frontText: string;
  backText: string;
  border: string;
}

@Component({
  selector: 'aava-flip-card',
  standalone: true,
  imports: [CommonModule, AavaCardContentComponent],
  templateUrl: './aava-flip-card.component.html',
  styleUrl: './aava-flip-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaFlipCardComponent {
  @Input() frontTitle = 'FLIP CARD';
  @Input() frontText = 'Hover Me';
  @Input() backTitle = 'BACK';
  @Input() backText = 'Leave Me';
  @Input() width = '190px';
  @Input() height = '254px';

  @Input() colors: FlipCardColors = {
    frontGradient: {
      color1: 'bisque',
      color2: 'rgb(255, 231, 222)',
      color3: 'rgb(255, 211, 195)',
      color4: 'rgba(255, 127, 80, 0.603)',
    },
    backGradient: {
      color1: 'rgb(255, 174, 145)',
      color2: 'coral',
      color3: 'bisque',
      color4: 'rgb(255, 185, 160)',
    },
    frontText: 'coral',
    backText: 'white',
    border: 'coral',
  };

  get cssVariables() {
    return {
      '--front-gradient-color1': this.colors.frontGradient.color1,
      '--front-gradient-color2': this.colors.frontGradient.color2,
      '--front-gradient-color3': this.colors.frontGradient.color3,
      '--front-gradient-color4': this.colors.frontGradient.color4,
      '--back-gradient-color1': this.colors.backGradient.color1,
      '--back-gradient-color2': this.colors.backGradient.color2,
      '--back-gradient-color3': this.colors.backGradient.color3,
      '--back-gradient-color4': this.colors.backGradient.color4,
      '--front-text-color': this.colors.frontText,
      '--back-text-color': this.colors.backText,
      '--border-color': this.colors.border,
      '--card-width': this.width,
      '--card-height': this.height,
    };
  }
}
