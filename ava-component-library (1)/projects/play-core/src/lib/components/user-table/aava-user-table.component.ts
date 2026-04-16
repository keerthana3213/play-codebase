/**
 * AavaUserTableComponent - Advanced data table with sorting, filtering, pagination, and nested table support
 *
 * Sorting Behavior:
 * - When delegateSortingToParent = false (default): Component handles sorting internally
 * - When delegateSortingToParent = true: Component emits sortChange event and parent handles sorting
 *
 * Loading State:
 * - Use isLoading input to show skeleton loading state
 * - Component handles loading state internally, preventing destruction/recreation
 * - Skeleton automatically matches table structure
 *
 * Selection Behavior:
 * - allowMultipleSelection: Controls multiple row selection via row clicks (when enableRowHighlight is true)
 * - allowMultipleCheckboxSelection: Controls multiple checkbox selection independently of row selection
 * - These properties work independently, allowing fine-grained control over selection behavior
 *
 * Nested Table Support:
 * - Use expandable = true to enable row expansion
 * - Provide expandableRows array for state management
 * - Use nestedContent template for rendering nested content
 * - Supports expand/collapse icons and inline row expansion
 *
 * Example usage with nested tables:
 * ```typescript
 * // In parent component
 * @ViewChild('userTable') userTable!: AavaUserTableComponent;
 *
 * expandableRows: ExpandableRow[] = [];
 *
 * ngOnInit() {
 *   this.initializeExpandableRows();
 * }
 *
 * initializeExpandableRows() {
 *   this.expandableRows = this.data.map(item => ({
 *     data: item,
 *     isExpanded: false,
 *     nestedContent: item.children || []
 *   }));
 * }
 *
 * onRowExpand(event: { row: any; isExpanded: boolean }) {
 * }
 *
 * // Template usage
 * <aava-user-table
 *   [columns]="columns"
 *   [data]="data"
 *   [expandable]="true"
 *   [expandableRows]="expandableRows"
 *   (rowExpand)="onRowExpand($event)"
 * >
 *   <ng-template #nestedContent let-row>
 *     <!-- Nested content here -->
 *     <div class="nested-table-wrapper">
 *       <h4>Details for {{ row.name.value }}</h4>
 *       <!-- Additional nested content -->
 *     </div>
 *   </ng-template>
 * </aava-user-table>
 * ```
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ContentChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AavaIconComponent } from '../icon/aava-icon.component';
import { AavaButtonComponent } from '../button/aava-button.component';
import { AavaTextboxComponent } from '../textbox/aava-textbox.component';
import { AavaSelectComponent } from '../select/aava-select.component';
import { AavaSelectOptionComponent } from '../select/select-option/aava-select-option.component';
import { AavaCheckboxComponent } from '../checkbox/aava-checkbox.component';
import { AavaTagComponent } from '../tags/aava-tags.component';
import { AavaSkeletonComponent } from '../skeleton/aava-skeleton.component';
import { AavaSpinnerComponent } from '../spinner/aava-spinner.component';
import { AavaAvatarsComponent } from '../avatars/aava-avatars.component';
import { AavaTooltipDirective } from '../../directives/aava-tooltip.directive';

// Separate interface for filter options to avoid conflicts
export interface FilterOption {
  name: string;
  value: string;
}

export interface ActionConfig {
  enabled?: boolean;
  label?: string;
  icon?: string;
  inline?: boolean;
}

// New interface for nested table support
export interface ExpandableRow {
  data: any;
  isExpanded: boolean;
  nestedContent?: any;
}

// Used for defining column display settings
export interface ColumnConfig {
  field: string; // allow any dynamic field, including special fields like 'actions', 'select', 'status', 'expand'
  label: string;
  sortable: boolean;
  filterable: boolean;
  sortingOrder?: number;
  visible: boolean;
  resizable?: boolean;
  cellClick?: boolean;
  defaultFilter?: boolean;
  customFilter?: boolean;
  filterOptions?: { value: string | boolean; label?: string }[];
  activeFilterIconColor?: string;
  filterIconColor?: string;
  width?: string; // e.g., '200px', '20%'
  multiple?: boolean;
  showAvatar?: boolean;
  avatarOptions?: AvatarOptions;
  customStyle?: Record<string, string>; // Custom styles for column cells (e.g., text-align, font, color, etc.)
}

export interface AvatarOptions {
  size?: 'sm' | 'md' | 'lg' | 'xs' | 'xl' | 'xxs' | 'xxl'
  shape?: 'pill' | 'square'
  initialsColor?: string;
  initialsBackground?: string;
}

export interface TotalRowCell {
  value: string;
  colspan?: number,
  style?: { [key: string]: string };
}
@Component({
  selector: 'aava-user-table',
  imports: [
    CommonModule,
    FormsModule,
    AavaIconComponent,
    AavaButtonComponent,
    AavaTextboxComponent,
    AavaSelectComponent,
    AavaSelectOptionComponent,
    AavaCheckboxComponent,
    AavaTagComponent,
    AavaSkeletonComponent,
    AavaSpinnerComponent, AavaAvatarsComponent,
    AavaTooltipDirective
  ],
  templateUrl: './aava-user-table.component.html',
  styleUrl: './aava-user-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AavaUserTableComponent implements OnInit, OnChanges {
  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() id = '';
  @Input() useDefaultFilter = false;
  @Input() enableElipses = false;
  @Input() sortAscIcon = 'arrow-up';
  @Input() sortDescIcon = 'arrow-down';
  @Input() sortDefaultIcon = 'arrow-down-up'
  @Input() filterIcon = 'list-filter';
  @Input() activeFilterIconColor: string | undefined;
  @Input() filterIconColor: string | undefined;
  @Input() showCheckbox = false;
  @Input() useCustomFilter = false;
  @Input() maxHeight = '500px';
  @Input() maxWidth = '100%';
  @Input() rowIconSize = '16'
  @Input() rowImageStyle: { [key: string]: string } = {};
  @Input() customStyle: {
    table?: Record<string, string>;
    thead?: Record<string, string>;
    tbody?: Record<string, string>;
    headtr?: Record<string, string>;
    bodytr?: Record<string, string>;
    th?: Record<string, string>;
    td?: Record<string, string>;
  } = {};
  @Input() customStyles: Record<string, string> = {};
  @Input() isSortingEnabled = false;
  @Input() enablePagination = false; // flag to enable pagination
  @Input() rowsPerPageInput = 10; // rows per page when pagination is enabled
  @Input() lazyLoad = false; // flag to enable lazy loading
  @Input() lazyLoading = false; // flag to show spinner during lazy loading
  @Input() expandable = false; // flag to enable row expansion
  @Input() expandableRows: any[] = []; // array for state management
  @Input() recursiveExpand = false; //nth level nested structure
  @Input() rowClick = false;
  @Input() enableCheckboxHighlight = false; // flag to enable background color when checkbox is selected
  @Input() enableRowHighlight = false; // flag to enable background color when row is clicked
  @Input() allowMultipleSelection = false; // flag to allow multiple rows to be selected simultaneously (row click only)
  @Input() allowMultipleCheckboxSelection = true; // flag to allow multiple checkboxes to be selected independently
  @Input() cursor = false; // flag to show pointer cursor on rows
  @Input() expandText = "";
  @Input() totalRow: TotalRowCell[] = [];
  @Input() totalRowStyle: {
    tr?: Record<string, string>;
    td?: Record<string, string>;
  } = {};
  @Input() apiFiltering = false; // default = false (UI based)
  @Output() rowExpand = new EventEmitter<{ row: any; isExpanded: boolean }>(); // event for row expansion

  @Output() apiFilterChange = new EventEmitter<
    (
      | { type: 'default'; field: string; condition: string; value: any }
      | { type: 'custom'; field: string; values: string[] }
    )[]
  >();
  @Input() delegateSortingToParent = false; // flag to delegate sorting to parent component
  @Input() isLoading = false; // flag to show skeleton loading state
  @Input() skeletonRows = 6; // number of skeleton rows to show
  @ViewChild('tableRef', { static: false }) tableRef?: ElementRef;
  @ViewChild('filterModal', { static: false }) filterModalRef?: ElementRef;



  @Output() cellClick = new EventEmitter<{ row: any; field: string }>();
  @Output() actionTriggered = new EventEmitter<{
    row: any;
    actionKey: string;
    config: ActionConfig;
  }>();
  @Output() sortChange = new EventEmitter<{
    column: string;
    direction: 'asc' | 'desc';
  }>();

  @Output() columnOrderChanged = new EventEmitter<ColumnConfig[]>();
  @Output() rowOrderChanged = new EventEmitter<any[]>();
  @Output() selectionChanged = new EventEmitter<any[]>();
  @Output() selectedRowsChange = new EventEmitter<any[]>();
  @Output() rowClicked = new EventEmitter<any>();
  @Output() loadMore = new EventEmitter<{ page: number; pageSize: number }>();
  @Output() cellClicked = new EventEmitter<{ row: any; field: string; value: any }>();

  paginatedData: any[] = [];

  //sorting
  hoveredCol: string | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';
  sortColumn: string | '' = '';
  dropdownRow: any | null = null;
  filteredData: any[] = [];
  //filter
  filterDropdownPosition: { x: number; y: number } | null = null;
  isFilterDropdownUpward = false;
  tempSelectedFilters: Record<string, Set<string>> = {};
  columnFilters: Record<string, string[]> = {};
  // Optional map for custom labels when using column.filterOptions
  columnFilterLabels: Record<string, Record<string, string>> = {};
  activeFilters: Record<string, Set<string>> = {};
  openFilterField: string | null = null;
  openFilterMode: 'default' | 'custom' | null = null; // which modal to open for current column
  defaultColumnFilters: Record<
    string,
    {
      value: string;
      type: string;
    }
  > = {};
  defaultFilterConditions: FilterOption[] = [
    { name: 'Starts With', value: 'Starts With' },
    { name: 'Ends With', value: 'Ends With' },
    { name: 'Contains', value: 'Contains' },
    { name: 'Equal', value: 'Equal' },
    { name: 'Empty', value: 'Empty' },
    { name: 'Does Not Start With', value: 'Does Not Start With' },
    { name: 'Does Not End With', value: 'Does Not End With' },
    { name: 'Does Not Contain', value: 'Does Not Contain' },
    { name: 'Not Equal', value: 'Not Equal' },
    { name: 'Not Empty', value: 'Not Empty' },
  ];

  //drag and drop
  page = 0;
  rowsPerPage = 10;
  loading = false; // internal loading state for lazy loading
  dragStartRowIndex: number | null = null;
  dragOverRowIndex: number | null = null;

  //checkbox
  parentChecked = false;
  indeterminate = false;

  selectedRows: any[] = [];
  indeterminateStates: Record<string, boolean> = {};
  static totalInstances = 0;
  instanceId = 0;

  // nested 
  //expandedRowIds = new Set<string>();

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    AavaUserTableComponent.totalInstances++;
    this.instanceId = AavaUserTableComponent.totalInstances;
  }
  ngOnInit() {
    this.updateTableData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.updateTableData();
    }
  }

  private updateTableData() {
    // When lazyLoad is enabled, show all rows instead of paginating

    if (this.lazyLoad && this.enablePagination) {
      this.paginatedData = this.data;
    } else if (this.enablePagination) {
      // Set rowsPerPage from input for normal pagination
      this.rowsPerPage = this.rowsPerPageInput;

      if (Object.keys(this.defaultColumnFilters).length > 0) {
        this.applyDefaultFilter();
      } else {
        this.applyPagination(this.data);
      }
    } else {
      // Show all data without pagination
      this.paginatedData = this.data;
    }
    if (this.data && this.data.length > 0 && this.expandableRows.length === 0) {
      this.expandableRows = this.data.map(() => ({ isExpanded: false }));
    }



    this.extractColumnFilterOptions(this.data);
    
    // Update header checkbox state based on current row selections
    if (this.showCheckbox && this.paginatedData.length > 0) {
      this.updateSelectAllState();
    }
    
    // Trigger change detection for OnPush strategy
    this.updateSelectAllState();
    this.cdr.detectChanges();
  }
  //Sorting
  onSort(col: ColumnConfig): void {
    if (!col.sortable || col.field === 'actions') return;
    // toggle direction
    const currentDepth = 0;
    this.data.forEach((row) => {
      row.depth = currentDepth;
      row.expanded = false;
      if (row.children && row.children.length > 0) {
        this.assignDepths(row.children, currentDepth + 1);
      }
    });
    if (this.sortColumn === col.field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col.field;
      this.sortDirection = 'asc';
    }

    // emit to parent first
    this.sortChange.emit({
      column: col.field,
      direction: this.sortDirection,
    });

    // Only apply internal sorting if parent is not handling it
    if (!this.delegateSortingToParent) {
      this.applySortingAndPagination();
    }
  }

  applySortingAndPagination(): void {
    const baseData =
      this.filteredData.length > 0 ||
        Object.keys(this.defaultColumnFilters).length > 0
        ? this.filteredData
        : this.data;
    const sortedData = [...baseData];

    // Only apply sorting if parent is not handling it
    if (
      !this.delegateSortingToParent &&
      this.sortDirection &&
      this.sortColumn
    ) {
      const key = this.sortColumn as string;
      sortedData.sort((a, b) => {
        const aVal = this.getFieldValue(this.getDynamicField(a, key));
        const bVal = this.getFieldValue(this.getDynamicField(b, key));
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        return this.sortDirection === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    // Flatten with expand/collapse
    const flattened: any[] = [];
    baseData.forEach((row) => this.flattenRow(row, flattened));

    const start = this.page * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedData = flattened.slice(start, end);
    this.applyPagination(sortedData);
  }

  private flattenRow(row: any, output: any[], depth = 0): void {
    row.depth = depth; // Assign depth dynamically

    output.push(row);

    if (row.expanded && row.children && row.children.length > 0) {
      row.children.forEach((child: any) =>
        this.flattenRow(child, output, depth + 1)
      );
    }
  }
  applyPagination(data: any[]): void {
    const start = this.page * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.paginatedData = data.slice(start, end);
    
    // Update header checkbox state after pagination
    if (this.showCheckbox && this.paginatedData.length > 0) {
      this.updateSelectAllState();
    }
    
    // Trigger change detection for OnPush strategy
    this.cdr.detectChanges();
  }

  /**
   * Method to be called by parent component when it handles sorting externally
   * This updates the component's data and applies pagination
   */
  updateDataWithSorting(sortedData: any[]): void {
    this.data = sortedData;
    this.applySortingAndPagination();
    // Trigger change detection for OnPush strategy
    this.cdr.detectChanges();
  }

  /**
   * Method to update sort state when parent handles sorting
   * This allows the parent to sync the component's sort indicators
   */
  updateSortState(column: string, direction: 'asc' | 'desc'): void {
    this.sortColumn = column;
    this.sortDirection = direction;
  }

  // Handle scroll events for lazy loading
  onTableScroll(event: Event): void {
    if (
      !this.lazyLoad ||
      this.loading ||
      !this.enablePagination ||
      this.lazyLoading
    ) {
      return;
    }

    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    // Check if we're near the bottom (within 50px)
    const nearBottom = scrollHeight - scrollTop - clientHeight <= 50;

    if (nearBottom) {
      this.loadMore.emit({ page: this.page + 1, pageSize: this.rowsPerPage });
    }
  }

  getFieldValue(field: unknown): string {
    if (field && typeof field === 'object' && 'value' in (field as Record<string, unknown>)) {
      return String((field as Record<string, unknown>)['value']);
    }
    return String(field ?? '');
  }

  private getDynamicField(row: any, field: string): unknown {
    return (row as unknown as Record<string, unknown>)[field];
  }

  //Start Filtering

  applyDefaultFilter(): void {
    const activeFields = Object.keys(this.defaultColumnFilters).filter(
      (field) => {
        const filter = this.defaultColumnFilters[field];
        return (
          filter.value.trim() !== '' || this.isFilterTypeEmpty(filter.type)
        );
      }
    );

    this.filteredData = this.data.filter((row) => {
      return activeFields.every((field) => {
        const { type, value } = this.defaultColumnFilters[field];
        const val = value.toLowerCase().trim();
        const rawCell = this.getDynamicField(row, field);

        if (
          rawCell &&
          typeof rawCell === 'object' &&
          'value' in rawCell &&
          typeof rawCell.value === 'string'
        ) {
          const cell = rawCell.value.toLowerCase();

          switch (type) {
            case 'Starts With':
              return cell.startsWith(val);
            case 'Ends With':
              return cell.endsWith(val);
            case 'Contains':
              return cell.includes(val);
            case 'Equal':
              return cell === val;
            case 'Empty':
              return cell === '';
            case 'Does Not Start With':
              return !cell.startsWith(val);
            case 'Does Not End With':
              return !cell.endsWith(val);
            case 'Does Not Contain':
              return !cell.includes(val);
            case 'Not Equal':
              return cell !== val;
            case 'Not Empty':
              return cell !== '';
            default:
              return true;
          }
        }

        return false;
      });
    });

    this.page = 0;
    this.applyPagination(this.filteredData);
  }

  applyAndCloseFilter(): void {
    const filter = this.defaultColumnFilters[this.openFilterField!];

    if (this.apiFiltering) {
      // 🔹 API-based filtering → upsert and emit consolidated filters
      const newFilter = {
        type: 'default' as const,
        field: this.openFilterField!,
        condition: filter.type,
        value: filter.value,
      };
      this.upsertApiFilter(newFilter);
      this.apiFilterChange.emit([...this.apiFilters]);
    } else {
      // 🔹 Keep your existing local filter logic
      this.applyDefaultFilter();
    }
    this.openFilterField = null;
    this.filterDropdownPosition = null;
    this.isFilterDropdownUpward = false; // Reset direction flag
  }

  isFilterTypeEmpty(type: string): boolean {
    return type.toLowerCase() === 'empty' || type.toLowerCase() === 'not empty';
  }

  clearDefaultFilter(): void {
    if (!this.openFilterField) return;

    // Reset this column's filter values
    this.defaultColumnFilters[this.openFilterField] = {
      value: '',
      type: 'Starts With',
    };
    if (this.apiFiltering) {
      // Remove any default/custom filters for this field when clearing
      const field = this.openFilterField;
      this.apiFilters = this.apiFilters.filter((f) => f.field !== field);
      this.apiFilterChange.emit([...this.apiFilters]);
    }
    // Reset full data
    this.filteredData = [...this.data];
    // Close modal
    this.openFilterField = null;
    // Refresh view
    this.page = 0;
    this.applySortingAndPagination();
  }

  clearCustomFilter(): void {
    if (!this.openFilterField) return;

    const field = this.openFilterField;

    const allValues = this.columnFilters[field] || [];
    this.tempSelectedFilters[field] = new Set(allValues);
    this.activeFilters[field] = new Set(allValues);


    // Reset selections for this field
    if (!this.tempSelectedFilters[field]) {
      this.tempSelectedFilters[field] = new Set();
    } else {
      this.tempSelectedFilters[field].clear();
    }
    this.activeFilters[field] = new Set();

    // Reset indeterminate state for this field
    this.updateIndeterminateState(field);

    if (this.apiFiltering) {
      // Remove any API filters for this field and emit consolidated set
      this.apiFilters = this.apiFilters.filter((f) => f.field !== field);
      if (allValues.length > 0) {
        this.apiFilters.push({
          field,
          values: [...allValues],
          type: 'custom'
        });
      }
      this.apiFilterChange.emit([...this.apiFilters]);
      this.apiFilters = [];
    } else {
      // UI-based filtering: re-apply with cleared state
      this.applyActiveFilters();
      this.extractColumnFilterOptions(this.filteredData);
      this.page = 0;
      this.applySortingAndPagination();
    }

    // Close the dropdown
    this.openFilterField = null;
  }

  onFilterIconClick(event: MouseEvent, col: ColumnConfig) {
    event.stopPropagation();
    this.extractColumnFilterOptions(this.data);

    //Initialize default filter config if not exists
    if (!this.defaultColumnFilters[col.field]) {
      this.defaultColumnFilters[col.field] = { type: 'Starts With', value: '' };
    }

    // Prepare options for this column
    if (col.customFilter && col.filterOptions && col.filterOptions.length > 0) {
      // Use only provided options; ignore API-derived values for this column
      const values = col.filterOptions.map(opt => String(opt.value));
      this.columnFilters[col.field] = Array.from(new Set(values));
      // Build label map
      this.columnFilterLabels[col.field] = (col.filterOptions || []).reduce((acc, opt) => {
        acc[String(opt.value)] = opt.label ?? String(opt.value);
        return acc;
      }, {} as Record<string, string>);
    } else {
      // Extract filter options from data
      if (!this.columnFilters[col.field] || this.columnFilters[col.field].length === 0) {
        this.extractColumnFilterOptions(this.data);
      }
    }

    // Ensure tempSelectedFilters initialized
    if (!this.tempSelectedFilters[col.field]) {
      this.tempSelectedFilters[col.field] = new Set();
    }

    //  Sync temp with active filters
    if (!this.activeFilters[col.field]) {
      this.activeFilters[col.field] = new Set();
    }
    this.tempSelectedFilters[col.field] = new Set(this.activeFilters[col.field]);

    //Set open field
    this.openFilterField = String(col.field);

    // Decide which filter mode to open: column override > global default > global custom
    if (col.defaultFilter) {
      this.openFilterMode = 'default';
    } else if (col.customFilter) {
      this.openFilterMode = 'custom';
    } else if (this.useDefaultFilter) {
      this.openFilterMode = 'default';
    } else if (this.useCustomFilter) {
      this.openFilterMode = 'custom';
    } else {
      this.openFilterMode = null;
    }

    if (this.openFilterMode === 'custom' && this.openFilterField) {
      const allValues = this.columnFilters[this.openFilterField] || [];
      if (!this.tempSelectedFilters[this.openFilterField] || this.tempSelectedFilters[this.openFilterField].size === 0) {
        this.tempSelectedFilters[this.openFilterField] = new Set(allValues);
      }
    }

    // Position modal
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const dropdownWidth = 240; // min-width from CSS
    const dropdownHeight = 200; // estimated height

    // Calculate available space in all directions
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;

    // Determine if dropdown should open upward or downward
    // Open upward if:
    // 1. Not enough space below AND enough space above, OR
    // 2. More space above than below (prefer upward if it's significantly better)
    const shouldOpenUpward =
      (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) ||
      (spaceAbove > spaceBelow && spaceAbove > dropdownHeight + 50); // 50px buffer

    // Set the direction flag for styling
    this.isFilterDropdownUpward = shouldOpenUpward;

    // Calculate initial position
    let x: number;
    let y: number;

    // Vertical positioning
    if (shouldOpenUpward) {
      // Open upward - position above the trigger element
      y = rect.top - dropdownHeight;
    } else {
      // Open downward - position below the trigger element
      y = rect.bottom;
    }

    // Horizontal positioning - prefer right alignment, fallback to left
    if (spaceRight >= dropdownWidth) {
      // Enough space on the right - align to left edge of trigger
      x = rect.left;
    } else if (spaceLeft >= dropdownWidth) {
      // Enough space on the left - align to right edge of trigger
      x = rect.right - dropdownWidth;
    } else {
      // Not enough space on either side - center it
      x = Math.max(10, (window.innerWidth - dropdownWidth) / 2);
    }

    // Final boundary checks and adjustments
    x = Math.max(10, Math.min(x, window.innerWidth - dropdownWidth - 10));
    y = Math.max(10, Math.min(y, window.innerHeight - dropdownHeight - 10));

    this.filterDropdownPosition = { x, y };
  }

  isFilterActive(field: string): boolean {
    const filter = this.defaultColumnFilters[field];
    return !!(filter && filter.value.trim().length > 0);
  }

  isCustomFilterActive(field: string): boolean {
    const set = this.activeFilters[field];
    return !!(set && set.size > 0);
  }

  isAnyFilterActive(field: string): boolean {
    return this.isFilterActive(field) || this.isCustomFilterActive(field);
  }
  //End Filtering

  //Start Icon
  getIcon(url: string | undefined): SafeHtml {
    if (!url) return '';
    const size = this.rowIconSize || 16;
    const imgHTML = `<img src="${url}" width="${size}" height="${size}"
     style="
        border-radius: 50%; 
        margin-right: 8px; 
        object-fit: cover; 
        display: inline-block; 
        vertical-align: middle;
      " />`;
    return this.sanitizer.bypassSecurityTrustHtml(imgHTML);
  }

  getActionIconHtml(iconUrl: string | undefined): SafeHtml {
    if (!iconUrl) return '';
    const html = `<img src="${iconUrl}" width="16" height="16" style="vertical-align: middle;" />`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // End Icon

  //Table cell Click
  handleCellClick(row: any, field: string) {
    this.cellClick.emit({ row, field });
  }

  getCellValue(row: any, field: string): string {
    if (field === 'action' || field === 'select') return ''; // return empty for select field
    return row[field]?.value || '';
  }

  getInlineActions(row: any): [string, ActionConfig][] {
    return (Object.entries(row.action || {}) as [string, ActionConfig][])
      .filter(([_, config]) => config.enabled && config.inline);
  }

  handleAction(row: any, actionKey: string): void {
    if (!row.action) return;
    const config = row.action[actionKey];
    this.dropdownRow = null;
    this.actionTriggered.emit({ row, actionKey, config });
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideTable = this.tableRef?.nativeElement.contains(target);
    const clickedInsideFilterModal = this.filterModalRef?.nativeElement?.contains(target);
    const clickedInsideSelectPanel = target.closest('.aava-select-panel') ||
                                     target.closest('.select-option-container') ||
                                     target.closest('.aava-select-option');
    
    if (!clickedInsideTable && !clickedInsideFilterModal && !clickedInsideSelectPanel) {
      this.dropdownRow = null;
      this.openFilterField = null;
      this.filterDropdownPosition = null;
      this.isFilterDropdownUpward = false; // Reset direction flag
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(): void {
    this.dropdownRow = null;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    // Close filter dropdown on scroll to prevent positioning issues
    if (this.openFilterField) {
      this.openFilterField = null;
      this.filterDropdownPosition = null;
      this.isFilterDropdownUpward = false; // Reset direction flag
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    // Close filter dropdown on resize to prevent positioning issues
    if (this.openFilterField) {
      this.openFilterField = null;
      this.filterDropdownPosition = null;
      this.isFilterDropdownUpward = false; // Reset direction flag
    }
  }

  shouldShowDropdown(row: any): boolean {
    return this.getDropdownActions(row).length > 0;
  }

  getDropdownActions(row: any): [string, ActionConfig][] {
    return (Object.entries(row.action || {}) as [string, ActionConfig][])
      .filter(([_, config]) => config.enabled && !config.inline);
  }

  toggleDropdown(row: any): void {
    this.dropdownRow = this.dropdownRow === row ? null : row;
  }

  isUrl(icon: string): boolean {
    return icon?.startsWith('http://') || icon?.startsWith('https://');
  }

  getSelectedFilterLabel(field: string): string {
    const type = this.defaultColumnFilters[field]?.type;
    const match = this.defaultFilterConditions.find(
      (option) => option.value === type
    );
    return match?.name || 'Filter Type';
  }
  //cell clicked
  onCellClick(row: any, field: string) {
    const value = this.getCellClickValue(row, field);
    this.cellClicked.emit({ row, field, value });
  }
  getCellClickValue(row: any, field: string): any {
    return row[field]?.value ?? row[field];
  }

  // Merge global td styles with column-specific custom styles
  getColumnTdStyle(col: ColumnConfig): Record<string, string> {
    return {
      ...(this.customStyle.td || {}),
      ...(col.customStyle || {})
    };
  }

  // Merge global th styles with column-specific custom styles
  getColumnThStyle(col: ColumnConfig): Record<string, string> {
    return {
      ...(this.customStyle.th || {}),
      ...(col.customStyle || {})
    };
  }

  // Get styles for inner cell wrapper divs (converts text-align to flex properties)
  getColumnCellWrapperStyle(col: ColumnConfig): Record<string, string> {
    if (!col.customStyle) return {};
    
    const styles: Record<string, string> = { ...col.customStyle };
    
    // Convert text-align to flex justify-content for flex containers
    if (col.customStyle['text-align']) {
      const textAlign = col.customStyle['text-align'];
      if (textAlign === 'center') {
        styles['justify-content'] = 'center';
        styles['align-items'] = 'center';
      } else if (textAlign === 'right') {
        styles['justify-content'] = 'flex-end';
      } else if (textAlign === 'left') {
        styles['justify-content'] = 'flex-start';
      }
      // Keep text-align for non-flex children
    }
    
    return styles;
  }

  // Get styles for .line1 div (merges with font-weight)
  getLine1Style(col: ColumnConfig, row: any, field: string): Record<string, string> {
    const baseStyle: Record<string, string> = {
      'font-weight': row[field]?.value && row[field]?.subValue ? '600' : 'normal'
    };
    
    return {
      ...baseStyle,
      ...this.getColumnCellWrapperStyle(col)
    };
  }

  // Get styles for table row (merges custom styles with cursor)
  getRowStyle(): Record<string, string> {
    const styles = { ...(this.customStyle.bodytr || {}) };
    
    // Show pointer cursor if cursor flag is enabled OR if row highlight is enabled
    if (this.cursor || (this.rowClick && this.enableRowHighlight)) {
      styles['cursor'] = 'pointer';
    }
    
    return styles;
  }

  //row clicked
  onRowClicked(row: any) {
    this.rowClicked.emit(row);
  }

  // Handle row click selection with background color change
  handleRowClickSelection(row: any, event: MouseEvent): void {
    // Prevent selection toggle if clicking on interactive elements
    const target = event.target as HTMLElement;
    const isInteractiveElement = target.closest('aava-checkbox, aava-button, aava-icon, .expand-cell, .actions-cell, a, button, input');
    
    if (isInteractiveElement) {
      return; // Don't toggle selection for interactive elements
    }

    // If rowClick and enableRowHighlight are both enabled, toggle selection using isClickSelected
    if (this.rowClick && this.enableRowHighlight) {
      // If multiple selection is not allowed, clear other row click selections first
      if (!this.allowMultipleSelection && !row.isClickSelected) {
        this.clearAllSelections();
      }
      
      row.isClickSelected = !row.isClickSelected;
      
      // Trigger change detection for OnPush strategy
      this.cdr.detectChanges();
    }

    // Always emit rowClicked if rowClick is enabled
    if (this.rowClick) {
      this.onRowClicked(row);
    }
  }

  // Centralized function to determine if selection background should be shown
  // This function contains all the logic for when to highlight a row
  shouldShowSelectionBackground(row: any): boolean {
    // Check if row is selected via checkbox (only if checkbox highlight is enabled)
    const isCheckboxSelected = this.enableCheckboxHighlight && this.showCheckbox && this.getCheckboxState(row, 'isSelected') === true;
    
    // Check if row is selected via row click (only if row highlight is enabled)
    const isRowClickSelected = this.enableRowHighlight && this.rowClick && row.isClickSelected === true;
    
    // Show background if either checkbox or row click selection is active
    return isCheckboxSelected || isRowClickSelected;
  }

  // Clear all row click selections (used when allowMultipleSelection is false)
  private clearAllSelections(): void {
    this.paginatedData.forEach((row) => {
      row.isClickSelected = false;
    });
  }

  // Clear all checkbox selections (used when allowMultipleCheckboxSelection is false)
  private clearAllCheckboxSelections(): void {
    this.paginatedData.forEach((row) => {
      row.isSelected = false;
      if (row.checkbox) {
        row.checkbox.isSelected = false;
      }
    });
  }

  // method to get checkbox state - checks checkbox.isSelected first, then falls back to row.isSelected
  getCheckboxState(row: any, stateType: 'isSelected' | 'disable'): boolean {
    if (stateType === 'isSelected') {
      // Priority: checkbox.isSelected, Fallback: row.isSelected
      // This allows row.isSelected to control checkbox when checkbox.isSelected is not set
      if (row.checkbox && row.checkbox.isSelected !== undefined) {
        return row.checkbox.isSelected;
      }
      return row.isSelected ?? false;
    } else if (stateType === 'disable') {
      return row.checkbox?.disable ?? false;
    }
    return false;
  }

  //checkbox
  onSelectAllChange(checked: boolean): void {
    this.parentChecked = checked;
    this.indeterminate = false;
    this.paginatedData.forEach((row) => {
      if (!this.getCheckboxState(row, 'disable')) {
        // Update both row.isSelected and checkbox.isSelected for consistency
        row.isSelected = checked;
        if (!row.checkbox) {
          row.checkbox = {};
        }
        row.checkbox.isSelected = checked;
      }
    });
    this.emitSelectedRows();
  }

  onRowCheckboxChange(row: any, checked: boolean): void {
    if (this.getCheckboxState(row, 'disable')) {
      return;
    }
    
    // Only enforce single checkbox selection if multiple checkbox selection is not allowed
    if (this.enableCheckboxHighlight && !this.allowMultipleCheckboxSelection && checked) {
      this.clearAllCheckboxSelections();
    }
    
    // Update both row.isSelected and checkbox.isSelected for consistency
    row.isSelected = checked;
    if (!row.checkbox) {
      row.checkbox = {};
    }
    row.checkbox.isSelected = checked;
    this.updateSelectAllState();
    this.emitSelectedRows();
  }

  updateSelectAllState(): void {
    const selectableRows = this.paginatedData.filter((r) => !this.getCheckboxState(r, 'disable'));
    const checkedCount = selectableRows.filter((r) => this.getCheckboxState(r, 'isSelected')).length;

    if (selectableRows.length === 0) {
      this.parentChecked = false;
      this.indeterminate = false;
    } else if (checkedCount === selectableRows.length) {
      this.parentChecked = true;
      this.indeterminate = false;
    } else if (checkedCount === 0) {
      this.parentChecked = false;
      this.indeterminate = false;
    } else {
      this.parentChecked = false;
      this.indeterminate = true;
    }
    
    // Trigger change detection for OnPush strategy
    this.cdr.detectChanges();
  }

  emitSelectedRows(): void {
    const selectedRows = this.paginatedData.filter((row) => this.getCheckboxState(row, 'isSelected'));
    this.selectedRowsChange.emit(selectedRows);
  }

  // //custom filter
  // custom filter
  updateFilter(): void {
    // Persist UI selections so they are retained when reopening the filter
    const field = this.openFilterField!;
    this.activeFilters[field] = new Set(this.tempSelectedFilters[field]);

    if (this.apiFiltering) {
      // 🔹 API-based filtering → upsert and emit consolidated filters
      const selectedValues = [...this.tempSelectedFilters[field]];
      if (selectedValues.length === 0) {
        // remove existing custom filter for this field if no values selected
        this.apiFilters = this.apiFilters.filter(
          (f) => !(f.type === 'custom' && f.field === field)
        );
      } else {
        const newFilter = {
          type: 'custom' as const,
          field,
          values: selectedValues,
        };
        this.upsertApiFilter(newFilter);
      }
      this.apiFilterChange.emit([...this.apiFilters]);
    } else {
      // 🔹 Existing UI-based filtering
      // 1. Sync temp → active
      Object.keys(this.tempSelectedFilters).forEach((field) => {
        this.activeFilters[field] = new Set(this.tempSelectedFilters[field]);
      });

      // 2. Apply filters
      this.applyActiveFilters(); // sets this.filteredData
      this.extractColumnFilterOptions(this.filteredData);

      // 3. Reset page and apply sorting/pagination
      this.page = 0;
      this.applySortingAndPagination();
    }

    // 4. Close the dropdown
    this.openFilterField = null;
  }


  applyActiveFilters(): void {
    this.filteredData = this.data.filter((row) =>
      Object.entries(this.activeFilters).every(([field, selectedValues]) => {
        if (!selectedValues || selectedValues.size === 0) return true;

        const cell = this.getDynamicField(row, field);

        // Handle nested objects with a `value` key
        if (cell && typeof cell === 'object' && 'value' in cell) {
          const nestedValue = (cell as { value: unknown }).value;
          if (typeof nestedValue === 'string') {
            return selectedValues.has(nestedValue);
          }
          if (typeof nestedValue === 'boolean') {
            return selectedValues.has(String(nestedValue));
          }
          return false;
        }

        // Handle primitive string and boolean values
        if (typeof cell === 'string') {
          return selectedValues.has(cell);
        }
        if (typeof cell === 'boolean') {
          return selectedValues.has(String(cell));
        }

        return false;
      })
    );
  }

  extractColumnFilterOptions(sourceData: any[]) {
    if (sourceData && sourceData.length > 0) {
      this.columns.forEach((col) => {
        if (col.filterable) {
          // If column has custom filterOptions and customFilter is true, use them exclusively
          if (col.customFilter && col.filterOptions && col.filterOptions.length > 0) {
            const values = col.filterOptions.map(opt => String(opt.value));
            this.columnFilters[col.field] = Array.from(new Set(values));
            this.columnFilterLabels[col.field] = (col.filterOptions || []).reduce((acc, opt) => {
              acc[String(opt.value)] = opt.label ?? String(opt.value);
              return acc;
            }, {} as Record<string, string>);

            if (!this.activeFilters[col.field]) {
              this.activeFilters[col.field] = new Set();
            }
            this.tempSelectedFilters[col.field] = new Set(
              this.activeFilters[col.field]
            );
            return; // skip API/data-derived extraction for this column
          }

          const values: string[] = sourceData
            .map((row) => {
              const fieldValue = this.getDynamicField(row, String(col.field));

              if (fieldValue) {
                if (Array.isArray(fieldValue)) {
                  const arrayVals: string[] = [];
                  fieldValue.forEach((item: unknown) => {
                    if (item && typeof item === 'object' && 'label' in (item as Record<string, unknown>)) {
                      const lbl = (item as { label?: unknown }).label;
                      if (typeof lbl === 'string') {
                        arrayVals.push(lbl);
                      }
                    } else if (typeof item === 'string') {
                      arrayVals.push(item);
                    }
                  });
                  return arrayVals.length > 0 ? arrayVals : null;
                }
                if (
                  typeof fieldValue === 'object' &&
                  'value' in fieldValue &&
                  (typeof fieldValue.value === 'string' || typeof fieldValue.value === 'boolean')
                ) {
                  return String((fieldValue as { value: unknown }).value);
                } else if (typeof fieldValue === 'string') {
                  return fieldValue;
                } else if (typeof fieldValue === 'boolean') {
                  return String(fieldValue);
                }
              }
              return null;
            })
            .flat()
            .filter((val): val is string => Boolean(val)); // filter out nulls

          const unique = Array.from(new Set(values));
          this.columnFilters[col.field] = unique;
          // reset labels for non-custom columns
          this.columnFilterLabels[col.field] = {};

          if (!this.activeFilters[col.field]) {
            this.activeFilters[col.field] = new Set();
          }

          this.tempSelectedFilters[col.field] = new Set(
            this.activeFilters[col.field]
          );
        }
      });
    }

  }

  isObjectWithSubValue(cellData: any): boolean {
    return (
      cellData &&
      typeof cellData === 'object' && 'value' in cellData &&
      (cellData.value || cellData.subValue || cellData.iconName)
    );
  }
  isArray(value: any) { return Array.isArray(value); }

  //

  toggleFilterValue(field: string, value: string, isChecked: boolean): void {
    const selectedSet = this.tempSelectedFilters[field];
    if (isChecked) {
      selectedSet.add(value);
    } else {
      selectedSet.delete(value);
    }
    this.updateIndeterminateState(field);
    // Keep active filters in sync during API mode so reopening retains state
    if (this.apiFiltering) {
      this.activeFilters[field] = new Set(this.tempSelectedFilters[field]);
    }
  }

  toggleAllFilterValues(field: string, isChecked: boolean): void {
    const allValues = this.columnFilters[field];
    if (isChecked) {
      allValues.forEach((val) => this.tempSelectedFilters[field].add(val));
    } else {
      this.tempSelectedFilters[field].clear();
    }
    this.updateIndeterminateState(field);
    // Keep active filters in sync during API mode so reopening retains state
    if (this.apiFiltering) {
      this.activeFilters[field] = new Set(this.tempSelectedFilters[field]);
    }
  }

  isAllFilterSelected(field: string): boolean {
    return (
      this.columnFilters[field].length > 0 &&
      this.tempSelectedFilters[field].size === this.columnFilters[field].length
    );
  }
  isIndeterminate(field: string): boolean {
    const total = this.columnFilters[field].length;
    const selected = this.tempSelectedFilters[field].size;
    return selected > 0 && selected < total;
  }
  updateIndeterminateState(field: string): void {
    const total = this.columnFilters[field]?.length || 0;
    const selected = this.tempSelectedFilters[field]?.size || 0;

    // Set indeterminate to true if some but not all are selected
    this.indeterminateStates = this.indeterminateStates || {};
    this.indeterminateStates[field] = selected > 0 && selected < total;
  }

  // ===== NESTED TABLE METHODS =====

  /**
   * Get expandable row data for a specific row
   */
  getExpandableRow(index: number, row: any): any | undefined {
    // return this.expandableRows.find(er => {
    //   // Try to match by id first, then by object reference
    //   if (er.data.id && row.id && er.data.id === row.id) {
    //     return true;
    //   }
    //   if (er.data.parentId && row.parentId && er.data.parentId === row.parentId) {
    //     return true;
    //   }
    //   // Fallback to object reference comparison
    //   return er.data === row;
    // });
    return this.expandableRows[index];
  }

  /**
   * Check if a row is currently expanded
   */
  isRowExpanded(index: number, row: any): boolean {
    const expandableRow = this.getExpandableRow(index, row);
    return expandableRow ? expandableRow.isExpanded : false;
  }

  addClassExpandedBelow(index: number): boolean {
    if (index === 0) return false;
    const expandableRow = this.getExpandableRow(index - 1, {});
    if (expandableRow.isExpanded) {
      return true;
    }
    return false;
  }

  addClassAboveExpanded(index: number): boolean {
    const nextRow = this.getExpandableRow(index + 1, {});
    return !!nextRow?.isExpanded;
  }

  /**
   * Toggle row expansion state
   */
  toggleRowExpansion(row: any, rowIndex: number): void {
    const expandableRow = this.getExpandableRow(rowIndex, row);
    if (expandableRow) {
      expandableRow.isExpanded = !expandableRow.isExpanded;
      //Need to check for emit
      this.rowExpand.emit({
        row: row,
        isExpanded: expandableRow.isExpanded
      });
      // Trigger change detection for OnPush strategy
      this.cdr.detectChanges();
    }
  }

  /**
   * Expand a specific row
   */
  expandRow(row: any, index: number): void {
    const expandableRow = this.getExpandableRow(row, index);
    if (expandableRow && !expandableRow.isExpanded) {
      expandableRow.isExpanded = true;
      //need to checkfor emit
      // this.rowExpand.emit({
      //   row: expandableRow.data,
      //   isExpanded: true
      // });
      this.cdr.detectChanges();
    }
  }

  /**
   * Collapse a specific row
   */
  collapseRow(row: any, index: number): void {
    const expandableRow = this.getExpandableRow(index, row);
    if (expandableRow && expandableRow.isExpanded) {
      expandableRow.isExpanded = false;
      this.rowExpand.emit({
        row: expandableRow.data,
        isExpanded: false
      });
      this.cdr.detectChanges();
    }
  }

  /**
   * Expand all rows
   */
  expandAllRows(): void {
    this.expandableRows.forEach(er => {
      if (!er.isExpanded) {
        er.isExpanded = true;
        this.rowExpand.emit({
          row: er.data,
          isExpanded: true
        });
      }
    });
    this.cdr.detectChanges();
  }

  /**
   * Collapse all rows
   */
  collapseAllRows(): void {
    this.expandableRows.forEach(er => {
      if (er.isExpanded) {
        er.isExpanded = false;
        this.rowExpand.emit({
          row: er.data,
          isExpanded: false
        });
      }
    });
    this.cdr.detectChanges();
  }

  /**
   * Get the number of expanded rows
   */
  getExpandedRowsCount(): number {
    return this.expandableRows.filter(er => er.isExpanded).length;
  }

  /**
   * Check if all rows are expanded
   */
  areAllRowsExpanded(): boolean {
    return this.expandableRows.length > 0 &&
      this.expandableRows.every(er => er.isExpanded);
  }

  /**
   * Check if any rows are expanded
   */
  areAnyRowsExpanded(): boolean {
    return this.expandableRows.some(er => er.isExpanded);
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByFn(index: number, item: any): any {
    return item.id || item.parentId || index;
  }

  /**
   * Calculate colspan for nested content row
   */
  getNestedContentColspan(): number {
    const expandColumnCount = this.expandable ? 1 : 0;
    const visibleColumnsCount = this.columns.filter(col => col.visible).length;
    return expandColumnCount + visibleColumnsCount;
  }

  //childer table

  get hasExpandableRows(): boolean {
    return this.data.some(row => row.children && row.children.length > 0);
  }

  toggleExpand(row: any, index: number) {
    if (!row.children) return;

    if (row.expanded) {
      // Collapse
      row.expanded = false;
      const i = index + 1;
      while (
        i < this.paginatedData.length &&
        (this.paginatedData[i].depth || 0) > (row.depth || 0)
      ) {
        this.paginatedData.splice(i, 1);
        // No i++ because after splice, next item shifts to same index
      }
    } else {
      // Expand
      row.expanded = true;
      const childrenWithDepth = row.children.map((child: any) => ({
        ...child,
        depth: (row.depth || 0) + 1,
        expanded: false,
      }));
      this.paginatedData.splice(index + 1, 0, ...childrenWithDepth);
    }
  }

  flattenData(data: any[], depth = 0): any[] {
    let result: any[] = [];

    data.forEach((row) => {
      row.depth = depth;
      result.push(row);

      if (row.expanded && row.children && row.children.length > 0) {
        result = result.concat(this.flattenData(row.children, depth + 1));
      }
    });

    return result;
  }

  assignDepths(data: any[], currentDepth = 0): void {
    data.forEach((row) => {
      row.depth = currentDepth;
      row.expanded = false;
      if (row.children && row.children.length > 0) {
        this.assignDepths(row.children, currentDepth + 1);
      }
    });
  }

  // Maintains merged list of API filters to emit cumulatively
  private apiFilters: (
    | { type: 'default'; field: string; condition: string; value: any }
    | { type: 'custom'; field: string; values: string[] }
  )[] = [];

  private upsertApiFilter(
    newFilter:
      | { type: 'default'; field: string; condition: string; value: any }
      | { type: 'custom'; field: string; values: string[] }
  ): void {
    if (newFilter.type === 'default') {
      const index = this.apiFilters.findIndex(
        (f) => f.type === 'default' && f.field === newFilter.field 
      );
      if (index > -1) {
        this.apiFilters[index] = newFilter;
      } else {
        this.apiFilters.push(newFilter);
      }
    } else {
      const index = this.apiFilters.findIndex(
        (f) => f.type === 'custom' && f.field === newFilter.field
      );
      if (index > -1) {
        this.apiFilters[index] = newFilter;
      } else {
        this.apiFilters.push(newFilter);
      }
    }
  }

  //Tags 
  parseTags(value: any): string[] {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    try {
      return JSON.parse(value.replace(/'/g, '"'));
    } catch {
      return [value];
    }
  }

  //avatar image 
  isImagePath(value: string | undefined | null): boolean {
    if (!value) return false;
    const lower = value.toLowerCase();
    return lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.svg');
  }

  //handle nested event
  handleNestedAction(event: any) {
    this.actionTriggered.emit(event);
  }
  handleNestedApiFilter(event: any) {
    this.apiFilterChange.emit(event);
  }
  handleNestedMore(event: any) {
    this.loadMore.emit(event);
  }
  handleNestedTableCell(event: any) {
    this.cellClick.emit(event);
  }
  handleNestedColumnOrder(event: any) {
    this.columnOrderChanged.emit(event);
  }
  handleNestedRowOrder(event: any) {
    this.rowOrderChanged.emit(event);
  }
  handleNestedSelectedRows(event: any) {
    this.selectedRowsChange.emit(event);
  }
  handleNestedSort(event: any) {
    this.sortChange.emit(event);
  }
  handleNestedRow(event: any) {
    this.rowClicked.emit(event);
  }
  handleNestedCell(event: any) {
    this.cellClicked.emit(event);
  }
  handleNestedRowExpand(event: any) {
    this.rowExpand.emit(event);
  }



  getValuesArray(value: any): any[] {
    if (!value) return [];

    // Case 1: Already an array of tag objects → return as-is
    if (Array.isArray(value) && typeof value[0] === 'object') {
      return value.map(v => ({
        value: v.value ?? '',
        subValue: v.subValue ?? '',
        customStyle: v.tagStyle ?? v.customStyle ?? {}
      }));
    }

    // Case 2: Object with an array of values → expand each into separate object
    if (typeof value === 'object' && Array.isArray(value.value)) {
      return value.value.map((v: any) => ({
        value: v,
        subValue: value.subValue ?? '',
        customStyle: value.customStyle ?? {}
      }));
    }

    // Case 3: Object with single value → single tag object
    if (typeof value === 'object' && value.value) {
      return [{
        value: value.value,
        subValue: value.subValue ?? '',
        customStyle: value.customStyle ?? value.customStyle ?? {}
      }];
    }

    // Case 4: Array of primitive values → map to tag objects
    if (Array.isArray(value)) {
      return value.map(v => ({
        value: v,
        subValue: '',
        customStyle: {}
      }));
    }

    // Case 5: Single primitive value
    return [{
      value: value,
      subValue: '',
      customStyle: {}
    }];
  }

  // value  truncated and tooltips
  defaultTooltip = {
    count: 16,
    position: 'top' as 'top' | 'bottom' | 'left' | 'right',
  };

  hasTooltip(row: any, col: any): boolean {
    return !!(row?.[col.field]?.tooltip || col?.tooltip);
  }

  shouldShowTooltip(row: any, col: any): boolean {
    return this.hasTooltip(row, col) && this.isTruncated(row, col);
  }

  getFullText(row: any, field: string): string {
    const v = row?.[field]?.value ?? row?.[field] ?? '';
    return typeof v === 'string' ? v : String(v ?? '');
  }

  getTooltipCount(row: any, col: any): number {
    const raw = row?.[col.field]?.tooltip?.count
      ?? col?.tooltip?.count
      ?? this.defaultTooltip.count;
    const n = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
    return Number.isFinite(n) && n > 0 ? n : this.defaultTooltip.count;
  }

  getTooltipPosition(row: any, col: any): 'top' | 'bottom' | 'left' | 'right' {
    const pos = (row?.[col.field]?.tooltip?.position
      ?? col?.tooltip?.position
      ?? this.defaultTooltip.position) as string;
    return (['top', 'bottom', 'left', 'right'] as const).includes(pos as any)
      ? (pos as any)
      : this.defaultTooltip.position;
  }

  getTruncatedText(row: any, field: string, limit?: number): string {
    const text = this.getFullText(row, field);
    if (this.enableElipses) {
      const n = Number(limit ?? this.defaultTooltip.count) || this.defaultTooltip.count;
      return text.length > n ? text.slice(0, n) + '…' : text;
    }
    return text;

  }

  isTruncated(row: any, col: any): boolean {
    const text = this.getFullText(row, col.field);
    const n = this.getTooltipCount(row, col);
    return text.length > n;
  }


}