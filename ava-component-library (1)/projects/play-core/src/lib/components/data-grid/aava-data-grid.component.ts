import { CommonModule, NgFor, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  OnChanges,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation,
  SimpleChanges,
} from '@angular/core';
import { AvaColumnDefDirective } from './directive/ava-column-def.directive';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaTextboxComponent } from '../textbox/aava-textbox.component';
import { AavaButtonComponent } from '../button/aava-button.component';
import { AavaSelectComponent } from '../select/aava-select.component';
import { AavaSelectOptionComponent } from '../select/select-option/aava-select-option.component';
import { AavaCubicalLoadingComponent } from '../../composite-components/cubical-loading/aava-cubical-loading.component';
import { AavaSkeletonComponent } from '../skeleton/aava-skeleton.component';

export interface FilterCondition {
  label: string;
  value: string;
}
@Component({
  selector: 'aava-data-grid',
  imports: [
    CommonModule,
    AavaTextboxComponent,
    AavaSelectComponent,
    AavaSelectOptionComponent,
    AavaCubicalLoadingComponent,
    AavaSkeletonComponent,
    AavaButtonComponent,
    NgTemplateOutlet,
    NgFor,
    AavaIconComponent,
  ],
  templateUrl: './aava-data-grid.component.html',
  styleUrl: './aava-data-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaDataGridComponent implements OnInit, OnChanges, AfterContentInit {
  @ViewChildren('filterWrapper') filterWrapperRefs!: QueryList<ElementRef>;
  isFilterOpen = false;
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() zerbaLine = false;
  @Input() isLoading = true;
  @Input() loadingType: 'skeleton' | 'cubical' = 'cubical';
  @Input() customStyles: Record<string, string> = {};
  @Input() id = '';
  @ViewChildren('textboxRef') textboxes!: QueryList<AavaTextboxComponent>;

  @ContentChildren(AvaColumnDefDirective)
  columnDefs!: QueryList<AvaColumnDefDirective>;
  columns: AvaColumnDefDirective[] = [];
  animationState = 'default';
  //drag & drop

  draggingIndex: number | null = null;
  dragOverIndex: number | null = null;
  @Output() rowDrop = new EventEmitter<any[]>();
  //sorting
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';
  sortedData: any[] = [];
  filterColumn: {
    column: string;
    type: string;
    value: any;
    open: boolean;
    filter: boolean;
  }[] = [];
  defaultFilterConditions: FilterCondition[] = [
    { label: 'Starts With', value: 'Starts With' },
    { label: 'Ends With', value: 'Ends With' },
    { label: 'Contains', value: 'Contains' },
    { label: 'Equal', value: 'Equal' },
    { label: 'Empty', value: 'Empty' },
    { label: 'Does Not Start With', value: 'Does Not Start With' },
    { label: 'Does Not End With', value: 'Does Not End With' },
    { label: 'Does Not Contain', value: 'Does Not Contain' },
    { label: 'Not Equal', value: 'Not Equal' },
    { label: 'Not Empty', value: 'Not Empty' },
  ];
  selectedFilter = 'Starts With';
  hoveringFilter = false;
  @Output() dataSorted = new EventEmitter<any[]>();
  @Output() datafiltered = new EventEmitter<any>();
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isFilterOpen && this.filterWrapperRefs) {
      const clickedInside = this.filterWrapperRefs.some((ref) =>
        ref.nativeElement.contains(event.target)
      );

      if (!clickedInside) {
        this.filterColumn.forEach((f) => (f.open = false));
        this.isFilterOpen = false;
      }
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.sortedData = [...this.dataSource];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      // Force complete re-initialization
      this.sortedData = [...this.dataSource];

      // Reset any sorting/filtering state
      this.sortColumn = null;
      this.sortDirection = '';

      // Force change detection
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    }
  }
  ngAfterContentInit() {
    this.columns = this.displayedColumns
      .map((colName) => {
        const col = this.columnDefs.find((col) => col.name === colName);
        return col;
      })
      .filter((col): col is AvaColumnDefDirective => !!col);
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 100);
  }

  get debugColumns() {
    return this.columns.map((col) => ({
      name: col.name,
      hasHeader: !!col.headerCellDef,
      hasCell: !!col.cellDef,
    }));
  }

  onSort(column: AvaColumnDefDirective) {
    if (!column.sortable) return;

    this.isLoading = true;
    this.animationState = 'void';

    const columnName = column.name;
    if (this.sortColumn !== columnName) {
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    } else {
      switch (this.sortDirection) {
        case 'asc':
          this.sortDirection = 'desc';
          break;
        case 'desc':
          this.sortDirection = 'asc';
          break;
        default:
          this.sortDirection = 'asc';
      }
    }
    Promise.resolve().then(() => {
      this.applySort();
      this.animationState = 'default'; // trigger the animation
    });
  }

  applySort() {
    if (!this.sortColumn || !this.sortDirection) {
      this.sortedData = [...this.dataSource];
    } else {
      if (this.sortedData.length > 0) {
        this.sortedData = this.sortFn(this.sortedData);
      } else {
        this.sortedData = this.sortFn(this.dataSource);
      }
      this.animationState = 'default';
    }
    //this.dataSource = this.sortedData;
    this.dataSorted.emit(this.sortedData);
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 100);
  }

  sortFn(dataSource: any) {
    return [...dataSource].sort((a, b) => {
      const valueA = a[this.sortColumn!];
      const valueB = b[this.sortColumn!];

      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return -1;
      if (valueB == null) return 1;

      const result =
        typeof valueA === 'string' && typeof valueB === 'string'
          ? valueA.localeCompare(valueB)
          : valueA > valueB
            ? 1
            : valueA < valueB
              ? -1
              : 0;

      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  applyFilter(columnName: string, event: Event) {
    this.isLoading = true;
    event?.stopPropagation();
    const textboxCmp = this.textboxes.find((cmp) => cmp?.mapper === columnName);
    const searchText = textboxCmp?.value?.trim().toLowerCase() ?? '';
    this.filterColumn = this.filterColumn.filter(
      (f) => f.column !== columnName
    );
    const filterObj = {
      column: columnName,
      type: this.selectedFilter,
      value: searchText,
      open: false,
      filter: true,
    };
    this.filterColumn.push(filterObj);
    this.sortedData = this.dataSource.filter((item) => {
      return this.filterColumn.every((f) => {
        const cellValue = item[f.column]?.toString().toLowerCase();
        switch (this.selectedFilter) {
          case 'Starts With':
            return cellValue.startsWith(f.value);
          case 'Ends With':
            return cellValue.endsWith(f.value);
          case 'Contains':
            return cellValue.includes(f.value);
          case 'Equal':
            return cellValue === f.value;
          case 'Empty':
            return cellValue === '';
          case 'Does Not Start With':
            return !cellValue.startsWith(f.value);
          case 'Does Not End With':
            return !cellValue.endsWith(f.value);
          case 'Does Not Contain':
            return !cellValue.includes(f.value);
          case 'Not Equal':
            return cellValue !== f.value;
          case 'Not Empty':
            return cellValue !== '';
          default:
            return true;
        }
      });
    });
    this.datafiltered.emit(filterObj);
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.markForCheck();
    }, 100);
    this.cdr.markForCheck();
  }

  clearFilter(columnName: string, event: any) {
    event?.stopPropagation();
    const existingFilter = this.filterColumn.find(
      (f) => f.column === columnName
    );
    if (existingFilter) {
      existingFilter.open = false;
      existingFilter.value = '';
      existingFilter.type = '';
      existingFilter.filter = false;
    } else {
      this.filterColumn.push({
        column: columnName,
        type: this.selectedFilter,
        value: '',
        open: false,
        filter: false,
      });
    }

    if (this.filterColumn.length > 0) {
      this.sortedData = this.dataSource.filter((item) => {
        return this.filterColumn.every((f) => {
          const cellValue = item[f.column]?.toString().toLowerCase() ?? '';
          const val = (f.value ?? '').toLowerCase();

          switch (f.type) {
            case 'Starts With':
              return cellValue.startsWith(val);
            case 'Ends With':
              return cellValue.endsWith(val);
            case 'Contains':
              return cellValue.includes(val);
            case 'Equal':
              return cellValue === val;
            case 'Empty':
              return cellValue === '';
            case 'Does Not Start With':
              return !cellValue.startsWith(val);
            case 'Does Not End With':
              return !cellValue.endsWith(val);
            case 'Does Not Contain':
              return !cellValue.includes(val);
            case 'Not Equal':
              return cellValue !== val;
            case 'Not Empty':
              return cellValue !== '';
            default:
              return true;
          }
        });
      });
    } else {
      this.sortedData = this.dataSource;
    }
  }

  checkForOpen(columnName: string) {
    const isOpen = this.filterColumn.some(
      (f) => f.column === columnName && f.open === true
    );

    return isOpen;
  }

  openPanel(columnName: string, event: any) {
    this.isFilterOpen = true;
    const existing = this.filterColumn.find((f) => f.column === columnName);
    this.filterColumn.forEach((f) => (f.open = false));
    if (existing) {
      existing.open = true;
    } else {
      this.filterColumn.push({
        column: columnName,
        type: '',
        value: '',
        open: true,
        filter: false,
      });
    }
    const filterItem = this.filterColumn.find((f) => f.column === columnName);
    setTimeout(() => {
      const textboxCmp = this.textboxes.find(
        (cmp) => cmp?.mapper === columnName
      );
      if (textboxCmp) {
        if (filterItem) {
          textboxCmp.value = filterItem.value;
        }
      }
    });
    event?.stopPropagation();
    this.cdr.detectChanges();
  }

  selectFilter(event: any) {
    this.selectedFilter = event;
  }
  stopPropagation(event: any) {
    event.stopPropagation();
  }

  clearAll(event: Event) {
    event.stopPropagation();
    this.filterColumn = [];
    this.sortedData = [...this.dataSource];
  }

  isFilterActive(columnName: string) {
    const existing = this.filterColumn.find((f) => f.column === columnName);
    return existing?.filter;
  }
  trackById(index: number, item: any) {
    return item.id ?? index;
  }

  //Drag and Drop

  onDragStart(event: DragEvent, index: number) {
    this.draggingIndex = index;

    const rowElement = (event.target as HTMLElement).closest('tr');
    if (!rowElement) return;
    const ghostRow = rowElement.cloneNode(true) as HTMLElement;
    ghostRow.style.position = 'absolute';
    ghostRow.style.top = '-9999px';
    ghostRow.style.left = '-9999px';
    ghostRow.style.width = `${rowElement.offsetWidth}px`;
    ghostRow.classList.add('floating-drag-preview');
    document.body.appendChild(ghostRow);
    event.dataTransfer?.setDragImage(ghostRow, 0, 0);
    setTimeout(() => document.body.removeChild(ghostRow), 0);
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    this.dragOverIndex = index;
  }

  onDrop(event: DragEvent, dropIndex: number) {
    event.preventDefault();
    const dragIndex = this.draggingIndex;

    if (dragIndex === null || dragIndex === dropIndex) return;

    const reordered = [...this.sortedData];
    const [movedItem] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, movedItem);

    this.sortedData = reordered;

    this.draggingIndex = null;
    this.dragOverIndex = null;
    //emit the row
    this.rowDrop.emit(this.sortedData);
  }

  onDragEnd() {
    this.draggingIndex = null;
    this.dragOverIndex = null;
  }
}
