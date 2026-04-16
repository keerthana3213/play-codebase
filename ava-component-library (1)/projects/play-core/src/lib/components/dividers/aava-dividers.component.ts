import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'aava-dividers',
  standalone: true, // Mark as standalone
  imports: [CommonModule],
  templateUrl: './aava-dividers.component.html',
  styleUrls: ['./aava-dividers.component.scss'], // Corrected from styleUrl to styleUrls
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaDividersComponent {
  @Input() variant: 'solid' | 'dashed' | 'dotted' | 'gradient' = 'solid';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() color: string = '#000000';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  
}
