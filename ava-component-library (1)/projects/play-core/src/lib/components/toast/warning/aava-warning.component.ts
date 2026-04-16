import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';

@Component({
  selector: 'aava-toast-warning',
  standalone: true,
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-warning.component.html',
  styleUrls: ['./aava-warning.component.scss'],
})
export class AavaWarningToastComponent implements OnInit, OnDestroy {
  @Input() title?: string;
  @Input() message?: string;
  @Input() duration = 4000;
  @Input() showCloseButton = true;
  @Input() showProgress = true;
  @Input() icon?: string;
  @Input() iconColor?: string;
  @Input() customWidth?: string;
  @Input() customHeight?: string;
  @Input() showActionButton = false;
  @Input() actionButtonText?: string;
  @Input() design?: 'classic' | 'modern' = 'classic';
  @Input() size: 'lg' | 'md' | 'sm' = 'lg';
  @Input() customStyles: Record<string, string> = {};

  @Output() closeToast = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();

  private timeoutId?: number;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // Add show animation
    setTimeout(() => {
      this.elementRef.nativeElement
        .querySelector('.ava-toast')
        ?.classList.add('ava-toast-show');
    }, 10);
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  onClose() {
    this.closeToast.emit();
  }

  onAction() {
    this.actionClick.emit();
  }
  getIconSize(): number {
    switch (this.size) {
      case 'lg':
        return 24;
      case 'md':
        return 20;
      case 'sm':
        return 16;
      default:
        return 18;
    }
  }
}
