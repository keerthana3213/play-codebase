import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ElementRef,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  output,
  EventEmitter,
  Output,
  TemplateRef,
  AfterViewInit,
  ViewChildren,
  ViewContainerRef,
  OnInit,
  SimpleChanges,
  OnChanges,
  ViewChild,
  ContentChild,
} from '@angular/core';
import { CommonModule, NgFor, NgTemplateOutlet } from '@angular/common';
import { AavaColumnDefDirective } from './directives/aava-column-def.directive';
import { AavaHeaderRowDefDirective } from './directives/aava-header-row-def.directive';
import { AavaRowDefDirective } from './directives/aava-row-def.directive';
import { AavaRowDetailDirective } from './directives/aava-row-detail.directive';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaSkeletonComponent } from '../skeleton/aava-skeleton.component';
import { AavaFlyoutComponent, FlyoutAlignment } from '../flyout/aava-flyout.component';
import { AavaTextboxComponent } from '../textbox/aava-textbox.component';
import { AavaSelectComponent } from '../select/aava-select.component';
import { AavaButtonComponent } from '../button/aava-button.component';
import { AavaSelectOptionComponent } from '../select/select-option/aava-select-option.component';
import { FormsModule } from '@angular/forms';

export interface AavaSortEvent {
  column: string;
  direction: 'asc' | 'desc' | '';
}

export interface FilterCondition {
  label: string;
  value: string;
}

export interface TableFilter {
  column: string;
  operator: string;
  value: any;
}

import { AavaNoDataRowDirective } from './directives/aava-no-data-row.directive';

@Component({
  selector: 'aava-table',
  imports: [CommonModule, FormsModule, NgFor, NgTemplateOutlet, AavaSkeletonComponent, AavaIconComponent,
    AavaButtonComponent, AavaSelectOptionComponent, AavaSelectComponent, AavaTextboxComponent, AavaFlyoutComponent],
  standalone: true,
  templateUrl: './aava-table.component.html',
  styleUrls: ['./aava-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaTableComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() sortAscIcon = 'move-up';
  @Input() sortDescIcon = 'move-down';
  @Input() sortDefaultIcon = 'arrow-down-up';
  @Input() filterIcon = 'list-filter';
  @Input() activeFilterIconColor = '#FFFFFF';

  @Input() showHeader = true;
  @Input() loading = false;
  @Input() infiniteScrollLoading = false;
  @Input() skeletonRows = 3;
  @Input() displayedColumns: any[] = [];
  @Input() dataSource: any[] = [];
  @Input() expandOnColumns: string[] = [];

  @Input() dataHandling: 'ui' | 'api' = 'ui';
  @Input() tdStyle: Record<string, string> = {};
  @Input() thStyle: Record<string, string> = {};
  @Input() customStyle: Record<string, string> = {};
  @Input() zebraLine = false;
  @Input() height?: number | string;
  @Input() minHeight?: string;
  @Input() maxHeight?: string;
  @Input() stickyHeader = false;
  @Input() enableInfiniteScroll = false;
  @Input() scrollThreshold = 200;
  @Input() flyoutWidth = 250
  @Input() noDataLabel = 'No data available';
  @Input() classNames?: string;

  flyoutAlignment: FlyoutAlignment = 'left';


  @Output() sortChange = new EventEmitter<AavaSortEvent>();
  @Output() filterChange = new EventEmitter<TableFilter[]>();
  @Output() toggleExpand = new EventEmitter<{ row: any, index: number, column?: string }>();
  @Output() loadMore = new EventEmitter<void>();


  @ContentChildren(AavaColumnDefDirective)
  columnDefs!: QueryList<AavaColumnDefDirective>;

  @ContentChildren(AavaHeaderRowDefDirective)
  headerRowDefs!: QueryList<AavaHeaderRowDefDirective>;

  @ContentChildren(AavaRowDefDirective)
  rowDefs!: QueryList<AavaRowDefDirective>;

  @ContentChildren(AavaRowDetailDirective)
  rowDetailDefs!: QueryList<AavaRowDetailDirective>;

  @ContentChild(AavaNoDataRowDirective)
  noDataRow?: AavaNoDataRowDirective;


  @ViewChildren('headerCell', { read: ViewContainerRef }) headerCells!: QueryList<ViewContainerRef>;
  @ViewChildren('cellContainer', { read: ViewContainerRef }) cellContainers!: QueryList<ViewContainerRef>;
  @ViewChild('filterFlyout') filterFlyout!: AavaFlyoutComponent;
  @ViewChild('tableContainer') tableContainer!: ElementRef<HTMLElement>;
  displayedData: any[] = [];
  filteredData: any[] = [];
  expandedRow: any = null;
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';
  loadingMore = false;
  target: any;

  //Filter
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
  selectedOperator = 'Starts With';
  selectedValue = '';
  activefilterColumn: string = '';
  filters: TableFilter[] = [];
  uiDataEmpty = false;
  clearClick = false;



  private viewInitialized = false;
  private needsRebuild = false;
  private scrollTimeout: any;
  private programmaticScrollInProgress = false;

  constructor(private cdr: ChangeDetectorRef) {

  }

  /**
   * Gets the container styles including height, minHeight, maxHeight, and customStyle.
   * Only includes properties if values are provided.
   * @returns Object with style properties
   */
  getContainerStyles(): Record<string, string> {
    const styles: Record<string, string> = { ...this.customStyle };

    if (this.height !== undefined && this.height !== null) {
      // Convert number to px string, keep string as-is
      styles['height'] = typeof this.height === 'number' ? `${this.height}px` : this.height;
    }

    if (this.minHeight) {
      styles['min-height'] = this.minHeight;
    }

    if (this.maxHeight) {
      styles['max-height'] = this.maxHeight;
    }

    return styles;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      if (this.viewInitialized) {
        this.filteredData = [...this.dataSource];
        this.displayedData = [...this.filteredData];
        
        // Always favor the delayed call to ensure DOM and content are ready
        setTimeout(() => {
          this.buildTable();
        }, 100);
      } else {
        // View not ready yet → mark for later
        this.needsRebuild = true;
      }
    }
    if (changes['loading']) {
      if (!this.loading) {
        this.buildTable();
      }
    }
  }



  ngOnInit() {
    // Initialize
    this.filteredData = [...this.dataSource];
    this.displayedData = [...this.filteredData];
  }
  ngAfterViewInit() {
    this.viewInitialized = true;

    if (this.needsRebuild) {
      // Delay slightly to ensure content projection completes
      Promise.resolve().then(() => this.buildTable());
      this.needsRebuild = false;
    }
    this.cdr.detectChanges();
  }
  buildTable() {
    if (!this.headerRowDefs || !this.viewInitialized) return;

    const headerDef = this.headerRowDefs.first;
    if (headerDef) {
      this.displayedColumns = headerDef.columns;
    }

    this.renderHeaders();
    this.renderCells();
    if (this.target && this.enableInfiniteScroll) {
      this.programmaticScrollInProgress = true;
      this.target.scrollTop = this.target.scrollHeight;
      setTimeout(() => {
        this.programmaticScrollInProgress = false;
      }, 200);
    }

    this.cdr.detectChanges();
  }


  getColumnDef(name: string): AavaColumnDefDirective | undefined {
    if (!this.columnDefs) return undefined;
    return this.columnDefs.find(col => col.name === name);
  }

  getHeaderTemplateForColumn(name: string) {
    const col = this.getColumnDef(name);
    return col?.headerCellDef?.template ?? null;
  }

  getCellTemplateForColumn(name: string) {
    const col = this.getColumnDef(name);
    return col?.cellDef?.template ?? null;
  }

  _toggleExpand(row: any, index: number, column: string) {
    if (this.expandOnColumns.length === 0 || this.expandOnColumns.includes(column)) {
      this.expandedRow = this.expandedRow === row ? null : row;
      this.toggleExpand.emit({ row: this.expandedRow === row ? null : row, index, column })
    }

  }

  isExpanded(row: any) {
    return this.expandedRow === row;
  }

  get detailTemplate() {
    if (!this.rowDetailDefs) return null;
    return this.rowDetailDefs.first?.template ?? null;
  }




  /** Render headers projecting only child nodes of consumer template */
  private renderHeaders() {
    if (!this.headerCells) return;
    
    this.displayedColumns.forEach((colName, index) => {
      const headerCellVC = this.headerCells.toArray()[index];
      const template = this.getHeaderTemplateForColumn(colName);
      if (template) {
        this.projectHeaderContent(headerCellVC, template);
      }
    });
    this.cdr.detectChanges();
  }

  private projectHeaderContent(container: ViewContainerRef, template: TemplateRef<any>) {
    if (!container || !template) return;
    // Clear any existing views - ViewContainerRef.clear() automatically destroys all views
    container.clear();
    const viewRef = container.createEmbeddedView(template);

    viewRef.rootNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'TH') {
        const parentEl = container.element.nativeElement as HTMLElement;
        const consumerTh = node as HTMLElement;
        const tableTh = parentEl as HTMLElement;

        consumerTh.classList.forEach(cls => tableTh.classList.add(cls));

        if (consumerTh.getAttribute('style')) {
          tableTh.setAttribute('style', consumerTh.getAttribute('style')!);
        }

        Array.from(consumerTh.attributes).forEach(attr => {
          if (attr.name !== 'class' && attr.name !== 'style') {
            tableTh.setAttribute(attr.name, attr.value);
          }
        });
        tableTh.innerHTML = '';
        while (consumerTh.firstChild) {
          tableTh.appendChild(consumerTh.firstChild);
        }

        consumerTh.remove();
      }
    });

    // Keep the view alive for Angular change detection to work with bindings like {{dynamicTitle}}
    // ViewContainerRef.clear() (called at the start of this method on next render) will automatically:
    // 1. Destroy all views in the container
    // 2. Remove them from Angular's change detection tree
    // 3. Clean up all resources
    // No manual cleanup needed - Angular handles it automatically
  }


  private renderCells() {
    if (!this.cellContainers) return;

    const rows = this.dataSource || [];
    const cols = this.displayedColumns || [];

    const containers = this.cellContainers.toArray();
    let containerIndex = 0;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      for (let colIndex = 0; colIndex < cols.length; colIndex++) {
        const container = containers[containerIndex++];
        if (!container) continue;

        const template = this.getCellTemplateForColumn(cols[colIndex]);
        if (template) {
          const context = this.getContext(rows[rowIndex], rowIndex, cols[colIndex]);
          this.projectCellContent(container, template, context);
        } else {
          container.clear();
        }
      }
    }
  }

  /**
   * Projects consumer <td> content into the table’s internal <td>,
   * while preserving classes, styles, and attributes.
   */
  private projectCellContent(
    container: ViewContainerRef,
    template: TemplateRef<any>,
    context: any
  ) {
    container.clear();

    const viewRef = container.createEmbeddedView(template, context);

    viewRef.rootNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'TD') {
        const parentEl = container.element.nativeElement as HTMLElement;
        const consumerTd = node as HTMLElement;
        const tableTd = parentEl as HTMLElement;

        consumerTd.classList.forEach(cls => tableTd.classList.add(cls));

        const style = consumerTd.getAttribute('style');
        if (style) {
          tableTd.style.cssText += style;
        }

        for (const attr of Array.from(consumerTd.attributes)) {
          if (attr.name !== 'class' && attr.name !== 'style') {
            tableTd.setAttribute(attr.name, attr.value);
          }
        }
        tableTd.innerHTML = '';
        while (consumerTd.firstChild) {
          tableTd.appendChild(consumerTd.firstChild);
        }

        consumerTd.remove();
      }
    });


  }

  getContext(row: any, index: number, column: string) {
    return {
      $implicit: row,
      index,
      column
    };
  }

  isColumnSortable(colName: string): boolean {
    const col = this.getColumnDef(colName);
    return !!col?.sortable;
  }

  isColumnFilterable(colName: string): boolean {
    const col = this.getColumnDef(colName);
    return !!col?.filterable;
  }

  //Sorting
  sort(col: string): void {
    if (!this.isColumnSortable(col)) return;
    clearTimeout(this.scrollTimeout);
    this.loading = true;

    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    if (this.dataHandling === 'ui') {
      this.displayedData = [...this.dataSource].sort((a, b) => {
        const valA = (a[col] || '').toString().toLowerCase();
        const valB = (b[col] || '').toString().toLowerCase();
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      this.loading = false;
    } else {
      this.sortChange.emit({
        column: this.sortColumn,
        direction: this.sortDirection
      });
    }
    this.cdr.detectChanges();



  }

  //Infinite scroll
  onTableScroll(event: Event): void {
    if (this.programmaticScrollInProgress) {
      this.programmaticScrollInProgress = false;
      return;
    }

    let distanceFromBottom: number;
    if (this.enableInfiniteScroll) {
      const target = event.target as HTMLElement;
      const scrollTop = target.scrollTop;
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;
      distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      this.target = target;

    }

    if (!this.enableInfiniteScroll || this.loadingMore || this.loading) return;

    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      if (this.loading) return;

      if (distanceFromBottom < this.scrollThreshold) {
        this.target.scrollTop = this.target.scrollHeight;
        this.triggerLoadMore();
      }
    }, 150);
  }
  private triggerLoadMore() {
    this.loadingMore = true;

    this.loadMore.emit();
    setTimeout(() => {
      this.loadingMore = false;
    }, 1000);

  }
  //Filter
  selectFilter(filter: string): void {
    this.selectedOperator = filter;
  }
  selectValue(event: any): void {
    const target = event.target as HTMLTextAreaElement;
    this.selectedValue = target.value;
  }

  clearFilter(event: Event): void {
    this.loading = true;
    event.stopPropagation();
    const column = this.activefilterColumn;
    const activeFilter: TableFilter | undefined = this.filters.find(x => x.column === column);

    if (activeFilter) {
      // remove the filter for that column
      this.filters = this.filters.filter(f => f.column !== column);
      this.selectedValue = '';
    }
    if (this.dataHandling === 'ui') {
      this.updateFilterData();
    }
    this.clearClick = true;
    this.filterChange.emit(this.filters);
    this.filterFlyout.close();


  }
  toggleFilterFlyout(colName: string, triggerElement: HTMLElement): void {
    // If flyout is already open for the same column, close it
    if (this.filterFlyout.isOpen && this.activefilterColumn === colName) {
      this.filterFlyout.close();
      return;
    }

    // If flyout is open for a different column, or closed, set up the filter and open/switch to new column
    this.setActiveFilter(colName);
    this.filterFlyout.open(triggerElement);
  }

  setActiveFilter(colName: string): void {

    const checkForLastColumn = this.displayedColumns.findIndex(x => x === colName) === this.displayedColumns.length - 1;
    if (checkForLastColumn) {
      this.flyoutAlignment = 'right';
    } else {
      this.flyoutAlignment = 'left';
    }
    this.clearClick = false;

    this.activefilterColumn = colName;
    const activeFilter: TableFilter | undefined = this.filters.find(x => x.column === colName);

    if (activeFilter) {
      this.selectedValue = activeFilter.value;
      this.selectedOperator = activeFilter.operator;
    } else {
      this.selectedValue = '';
      this.selectedOperator = 'Starts With';
    }

  }
  applyFilter(): void {
    let isSearchable = true;
    const column = this.activefilterColumn;
    const operator = this.selectedOperator;
    const value = this.selectedValue;

    if (!column) return;
    this.loading = true;

    const existing = this.filters.find(f => f.column === column);
    if (existing) {
      if (existing.operator === this.selectedOperator && existing.value === this.selectedValue) {
        isSearchable = false;
      } else {
        Object.assign(existing, { operator, value });
      }

    } else {
      if (this.selectedOperator === 'Starts With' && this.selectedValue === '') {
        isSearchable = false;
      } else {
        this.filters.push({ column, operator, value });
      }

    }


    if (isSearchable) {
      if (this.dataHandling === 'ui') {
        this.updateFilterData();
      } else {
        this.filterChange.emit(this.filters);
      }


    } else {
      this.loading = false;
    }


    this.selectedValue = '';
    this.selectedOperator = 'Starts With';
    this.filterFlyout.close();
    this.cdr.detectChanges();


  }

  isFilterActive(colName: string): boolean {
    return this.filters.some(f => f.column === colName);
  }


  updateFilterData(): void {
    this.dataSource.forEach((x: any) => {
      x.show = true;
    })
    this.dataSource.forEach((item: any) => {
      let isMatch = this.filters.every((f) => {
        const cellValue = (item[f.column]?.toString().toLowerCase() ?? '');
        const val = (f.value ?? '').toLowerCase();

        switch (f.operator) {
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

      item.show = isMatch;
    });
    const hiddenCount = this.dataSource.filter((x: any) => !x.show).length;
    if (hiddenCount === this.dataSource.length) {
      this.uiDataEmpty = true;
    } else {
      this.uiDataEmpty = false;
    }
    this.loading = false;

  }

}