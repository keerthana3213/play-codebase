import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';

@Component({
  selector: 'aava-toast-default',
  standalone: true,
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-default.component.html',
  styleUrls: ['./aava-default.component.scss']
})
export class AavaDefaultToastComponent implements OnInit, OnDestroy {
  @Input() title?: string;
  @Input() message?: string;
  @Input() duration = 4000;
  @Input() showCloseButton = true;
  @Input() showProgress = true;
  @Input() icon?: string;
  @Input() iconColor?: string;
  @Input() customWidth?: string;
  @Input() customHeight?: string;
  @Input() customStyles: Record<string, string> = {};

  @Output() closeToast = new EventEmitter<void>();

  private timeoutId?: number;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // Add show animation
    setTimeout(() => {
      this.elementRef.nativeElement.querySelector('.ava-toast')?.classList.add('ava-toast-show');
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
}
