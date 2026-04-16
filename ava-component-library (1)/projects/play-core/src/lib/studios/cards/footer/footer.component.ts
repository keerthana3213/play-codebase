import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent } from '../../../components/button/aava-button.component';

export interface FooterData {
  buttonText?: string;
}

@Component({
  selector: 'aava-studio-card-footer',
  imports: [CommonModule, AavaButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input() data: FooterData = {};
  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
