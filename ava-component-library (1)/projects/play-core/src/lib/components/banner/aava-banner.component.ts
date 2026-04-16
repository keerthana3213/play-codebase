import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaButtonComponent } from '../button/aava-button.component';

export type BannerButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'aava-banner',
  standalone: true,
  imports: [CommonModule, AavaButtonComponent, AavaIconComponent],
  templateUrl: './aava-banner.component.html',
  styleUrls: ['./aava-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class AavaBannerComponent {
  @Input() variant: 'row' | 'stacked' = 'row';
  @Input() bannerActions: boolean = true;   // default true
  @Input() imageUrl: string = '';
  @Input() imageWidth: string = 'auto';
  @Input() imageHeight: string = 'auto';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() primaryBtnText: string = 'Primary';
  @Input() secondaryBtnText: string = 'Secondary';
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
  @Input() rowBgColor: string = 'transparent';
  @Input() stackedBgColor: string = 'transparent';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';

  @Output() onPrimary = new EventEmitter<void>();
  @Output() onSecondary = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  isVisible: boolean = true;
  screenWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  /** Map screen width to button size */
  get buttonSize(): BannerButtonSize {
    if (this.screenWidth <= 480) return 'xs'; // small phones
    if (this.screenWidth <= 768) return 'sm';  // tablets / larger phones
    return 'lg';                               // desktop
  }

  handlePrimary() {
    this.onPrimary.emit();

  }
  handleSecondary() {
    this.onSecondary.emit();
  }
  onCloseClick() {
    this.isVisible = false;
    this.onClose.emit();
  }
}
