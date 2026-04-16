import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aava-option',
  imports: [CommonModule],
  templateUrl: './aava-option.component.html',
  styleUrl: './aava-option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaOptionComponent {
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
}
