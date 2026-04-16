import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, AfterContentInit, ContentChildren, QueryList, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aava-modal',
  imports: [CommonModule],
  templateUrl: './aava-modal.component.html',
  styleUrl: './aava-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaModalComponent implements AfterContentInit {
  @Input() showCloseButton = true;
  @Input() width = '400px'; 
  @Input() height?: string;
  @Input() maxWidth?: string;
  @Input() maxHeight?: string;
  @Input() minHeight?: string;
  @Input() id = '';

  @Output() closed = new EventEmitter<{ action: string }>();

  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @ContentChildren('[dialog-header]', { read: ElementRef }) headerContent!: QueryList<ElementRef>;
  @ContentChildren('[dialog-body]', { read: ElementRef }) bodyContent!: QueryList<ElementRef>;
  @ContentChildren('[dialog-footer]', { read: ElementRef }) footerContent!: QueryList<ElementRef>;

  hasHeaderContent = false;
  hasBodyContent = false;
  hasFooterContent = false;

  ngAfterContentInit() {
    this.hasHeaderContent = this.headerContent.length > 0;
    this.hasBodyContent = this.bodyContent.length > 0;
    this.hasFooterContent = this.footerContent.length > 0;
  }

  onClose() {
    this.closed.emit({ action: 'close' });
  }

  get modalStyles() {
    return {
      width: this.width,
      height: this.height,
      'max-width': this.maxWidth,
      'max-height': this.maxHeight,
      'min-height': this.minHeight
    };
  }
}
