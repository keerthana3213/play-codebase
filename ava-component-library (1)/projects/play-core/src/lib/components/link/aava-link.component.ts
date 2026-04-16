import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AavaIconComponent } from '../icon/aava-icon.component';

@Component({
  selector: 'aava-link',
  standalone: true,
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-link.component.html',
  styleUrls: ['./aava-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaLinkComponent {
  @Input() label = 'Action Link';
  @Input() color: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'primary' | string = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() underline: boolean = false;
  @Input() href: string = '';
  @Input() addIcon: boolean = false;
  @Input() arrowDirection: 'right' | 'left' = 'left';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
  @Output() userClick = new EventEmitter<Event>();

  separatorIcon: string = 'chevron-right';
  separatorSize: number = 18;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    this.separatorSize = { sm: 16, md: 18, lg: 20 }[this.size];
  }

  isHexColor(color: string): boolean {
    return /^#([0-9A-F]{3}){1,2}$/i.test(color);
  }
  anchorClick(event: Event) {
    this.userClick.emit(event);
  }
  get safeHref(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.href || 'javascript:void(0)');
  }

  getLinkStyles(): Record<string, string> {
    const styles: Record<string, string> = {};

    if (this.isHexColor(this.color)) {
      styles['color'] = this.color;
    }

    return { ...styles, ...this.customStyles };
  }
}

