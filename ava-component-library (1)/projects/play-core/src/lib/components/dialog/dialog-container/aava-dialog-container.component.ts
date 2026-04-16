import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaIconComponent } from '../../icon/aava-icon.component';

export type DialogPosition = 'center' | 'left-top' | 'right-top' | 'right-bottom' | 'left-bottom';

@Component({
  selector: 'aava-dialog-container',
  imports: [CommonModule, AavaIconComponent],
  templateUrl: './aava-dialog-container.component.html',
  styleUrl: './aava-dialog-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaDialogContainerComponent {
  @Input() overlay: true | false | 'transparent' = true;
  @Input() position: DialogPosition = 'center';
  @Input() showCloseButton = true;
  @Input() closeOnBackdropClick: boolean = true; // Controls whether clicking backdrop closes the dialog (default: true)
  @Input() customOverlayStyle: Record<string, string> = {}; // CSS custom properties override for backdrop
  @Input() customDialogStyle: Record<string, string> = {}; // CSS custom properties override for dialog content
  @Input() stackIndex: number = 0; // Position in the dialog stack for z-index calculation
  @Input() id = '';


  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @Output() closed = new EventEmitter<any>();

  get showOverlay(): boolean {
    return this.overlay !== false;
  }

  get isTransparentOverlay(): boolean {
    return this.overlay === 'transparent';
  }

  get computedOverlayStyles(): Record<string, string> {
    const baseZIndex = 1000;
    const zIndex = baseZIndex + (this.stackIndex * 10);
    
    const styles: Record<string, string> = {
      'z-index': zIndex.toString(),
      ...this.customOverlayStyle,
    };

    // Apply transparent overlay styles
    if (this.isTransparentOverlay) {
      styles['background'] = 'transparent';
      styles['backdrop-filter'] = 'none';
    }

    return styles;
  }

  get computedDialogStyles(): Record<string, string> {
    const baseZIndex = 1000;
    const zIndex = baseZIndex + (this.stackIndex * 10) + 1;
    return {
      'z-index': zIndex.toString(),
      ...this.customDialogStyle,
    };
  }

  onBackdropClick() {
    // Only close if closeOnBackdropClick is true
    if (this.closeOnBackdropClick) {
      this.closed.emit(null); // send null or any value
    }
  }

  onCloseClick() {
    this.closed.emit({ action: 'close' });
  }
}
