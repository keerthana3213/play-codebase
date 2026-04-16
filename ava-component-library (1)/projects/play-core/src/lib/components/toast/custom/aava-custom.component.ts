import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';
import { AavaButtonComponent } from '../../button/aava-button.component';

export interface CustomAction {
  text: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  action: string;
}

@Component({
  selector: 'aava-toast-custom',
  standalone: true,
  imports: [CommonModule, AavaIconComponent, AavaButtonComponent],
  templateUrl: './aava-custom.component.html',
  styleUrls: ['./aava-custom.component.scss']
})

export class AavaCustomToastComponent implements OnInit, OnDestroy {
  @Input() title?: string;
  @Input() message?: string;
  @Input() duration = 4000;
  @Input() showCloseButton = true;
  @Input() showProgress = true;
  @Input() icon?: string;
  @Input() iconColor?: string;
  @Input() customWidth = '400px';
  @Input() customHeight = 'auto';
  @Input() customContent?: string;
  @Input() customBackground?: string;
  @Input() customTextColor?: string;
  @Input() progressColor?: string;
  @Input() showCustomActions = false;
  @Input() customActions: CustomAction[] = [];

  @Output() closeToast = new EventEmitter<void>();
  @Output() customActionClick = new EventEmitter<CustomAction>();

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

  onCustomAction(action: CustomAction) {
    this.customActionClick.emit(action);
  }
}
