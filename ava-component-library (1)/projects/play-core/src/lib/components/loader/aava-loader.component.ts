import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aava-loader',
  imports: [CommonModule],
  templateUrl: './aava-loader.component.html',
  styleUrl: './aava-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaLoaderComponent {
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
}
