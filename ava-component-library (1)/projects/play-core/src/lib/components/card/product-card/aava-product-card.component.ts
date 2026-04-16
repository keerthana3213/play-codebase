import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aava-product-card',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here for *ngIf, etc.
  templateUrl: './aava-product-card.component.html',
  styleUrls: ['./aava-product-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AavaProductCardComponent {
  // REMOVED: title, icon, iconBg as header content is now fully projected.
  @Input() id ='';
  @Input() showHeader: boolean = true;
  @Input() showBody: boolean = true;
  @Input() showFooter: boolean = false;
  @Input() cardClass: string = '';
  @Input() applyHeaderPadding: boolean = true; // Still useful for the header container
  @Input() applyBodyPadding: boolean = true;
  @Input() applyFooterPadding: boolean = true;

  constructor() {}
}