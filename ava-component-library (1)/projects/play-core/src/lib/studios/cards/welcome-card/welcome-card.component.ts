import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent } from '../../../components/card/default-card/aava-default-card.component';

export interface WelcomeCardData {
  greetingText: string;
  greetingEmoji?: string;
  subtitle?: string;
  heroImage: string;
  backgroundImage: string;
}

@Component({
  selector: 'aava-welcome-card',
  imports: [CommonModule, AavaDefaultCardComponent],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeCardComponent {
  @Input() data!: WelcomeCardData;
}
