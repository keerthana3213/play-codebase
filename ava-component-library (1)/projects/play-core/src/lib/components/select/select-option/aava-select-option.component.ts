
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  ChangeDetectorRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'aava-select-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aava-select-option.component.html',
  styleUrls: ['./aava-select-option.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AavaSelectOptionComponent implements AfterViewInit {
  @Input() value: any;
  @Input() selected = false;
  @Input() highlighted = false; // Add highlighted state for keyboard navigation
  @Output() optionSelected = new EventEmitter<any>();
  @Output() click = new EventEmitter<any>();
  @Input() disabled = false;
  @Input() noHover = false;    // When true, disables hover highlight
  @Input() noSelected = false; // When true, disables selected background
  @Input() optionId = ''; // Unique ID for ARIA purposes

  private _visible = true;

  @Input()
  set visible(value: boolean) {
    this._visible = value;

    // Directly set the display style on the host element using Renderer2
    const displayValue = value ? 'block' : 'none';
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', displayValue);

    this.cdr.markForCheck();
  }
  get visible(): boolean {
    return this._visible;
  }

  @ViewChild('optionTpl', { static: true }) templateRef!: TemplateRef<any>;

  hasCheckbox = false;

  constructor(
    public elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    // Check if content contains a checkbox
    const hasCheckboxElement = !!this.elementRef.nativeElement.querySelector('aava-checkbox');

    // Only update if the value has changed to avoid unnecessary change detection
    if (this.hasCheckbox !== hasCheckboxElement) {
      this.hasCheckbox = hasCheckboxElement;
      // Trigger change detection to update the template
      this.cdr.detectChanges();
    }
  }

  get label(): string {
    return this.elementRef.nativeElement.textContent?.trim().toLowerCase() || '';
  }

  onClick(event: Event) {
    if (!this.disabled) {
      // Stop event propagation to prevent parent components (like flyouts) from closing
      // when an option is selected
      this.optionSelected.emit(this.value);
      this.click.emit(this.value);
      event.stopPropagation();
      
    }
  }
}
