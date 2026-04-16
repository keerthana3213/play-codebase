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
  selector: 'aava-toast-success',
  standalone: true,
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-success.component.html',
  styleUrls: ['./aava-success.component.scss'],
})
export class AavaSuccessToastComponent implements OnInit, OnDestroy {
  @Input() title?: string;
  @Input() message?: string;
  @Input() duration = 4000;
  @Input() showCloseButton = true;
  @Input() showProgress = true;
  @Input() icon?: string;
  @Input() iconColor?: string;
  @Input() customWidth?: string;
  @Input() customHeight?: string;
  @Input() design?: 'classic' | 'modern' = 'classic';
  @Output() closeToast = new EventEmitter<void>();
  @Input() size: 'large' | 'medium' | 'small' | 'lg' | 'md' | 'sm' = 'lg';
   @Input() customStyles: Record<string, string> = {};
   
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

  getIconSize(): number {
    switch (this.size) {
      case 'large':
      case 'lg':
        return 24;
      case 'medium':
      case 'md':
        return 20;
      case 'small':
      case 'sm':
        return 16;
      default:
        return 18;
    }
  }

  getSizeClass(): string {
    switch (this.size) {
      case 'lg':
        return 'large';
      case 'md':
        return 'medium';
      case 'sm':
        return 'small';
      default:
        return this.size;
    }
  }
}
