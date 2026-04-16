import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaCardComponent } from '../../components/card/aava-card.component';
import { AavaButtonComponent } from '../../components/button/aava-button.component';
import { AavaIconComponent } from '../../components/icon/aava-icon.component';

export interface WidgetConfig {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'list' | 'custom';
  size: 'sm' | 'md' | 'lg' | 'xl';
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  content?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  refreshInterval?: number;
  loading?: boolean;
  error?: string;
}

export interface DashboardConfig {
  title: string;
  description?: string;
  editable?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  maxColumns?: number;
  widgetSpacing?: number;
  showGrid?: boolean;
  showWidgetControls?: boolean;
  allowWidgetTypes?: string[];
  defaultWidgetSize?: { width: number; height: number };
}

export interface DashboardEvent {
  type:
  | 'widget-add'
  | 'widget-remove'
  | 'widget-move'
  | 'widget-resize'
  | 'widget-edit'
  | 'widget-refresh'
  | 'layout-save'
  | 'layout-reset';
  data: unknown;
  widgetId?: string;
  position?: { x: number; y: number };
  dimensions?: { width: number; height: number };
}

@Component({
  selector: 'aava-dashboard-widget-grid',
  standalone: true,
  imports: [
    CommonModule,
    AavaCardComponent,
    AavaButtonComponent,
    AavaIconComponent,
  ],
  templateUrl: './aava-dashboard-widget-grid.component.html',
  styleUrl: './aava-dashboard-widget-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AavaDashboardWidgetGridComponent {
  @Input() config: DashboardConfig = {
    title: 'Dashboard',
    editable: true,
    resizable: true,
    draggable: true,
    maxColumns: 12,
    widgetSpacing: 16,
    showGrid: true,
    showWidgetControls: true,
    allowWidgetTypes: ['metric', 'chart', 'table', 'list', 'custom'],
    defaultWidgetSize: { width: 4, height: 3 },
  };

  @Input() widgets: WidgetConfig[] = [];
  @Input() loading = false;
  @Input() disabled = false;

  @Output() widgetAdd = new EventEmitter<{
    type: string;
    position: { x: number; y: number };
  }>();
  @Output() widgetRemove = new EventEmitter<string>();
  @Output() widgetMove = new EventEmitter<{
    widgetId: string;
    position: { x: number; y: number };
  }>();
  @Output() widgetResize = new EventEmitter<{
    widgetId: string;
    dimensions: { width: number; height: number };
  }>();
  @Output() widgetEdit = new EventEmitter<string>();
  @Output() widgetRefresh = new EventEmitter<string>();
  @Output() layoutSave = new EventEmitter<WidgetConfig[]>();
  @Output() layoutReset = new EventEmitter<void>();
  @Output() dashboardEvent = new EventEmitter<DashboardEvent>();

  isEditMode = false;
  selectedWidget: string | null = null;
  draggedWidget: string | null = null;

  get gridStyle(): Record<string, string> {
    return {
      'grid-template-columns': `repeat(${this.config.maxColumns}, 1fr)`,
      gap: `${this.config.widgetSpacing}px`,
    };
  }

  get widgetTypes(): { id: string; label: string; icon: string }[] {
    return [
      { id: 'metric', label: 'Metric Card', icon: 'trending-up' },
      { id: 'chart', label: 'Chart Widget', icon: 'chart-bar' },
      { id: 'table', label: 'Data Table', icon: 'table' },
      { id: 'list', label: 'List Widget', icon: 'list' },
      { id: 'custom', label: 'Custom Widget', icon: 'code' },
    ].filter((type) => this.config.allowWidgetTypes?.includes(type.id));
  }

  getWidgetStyle(widget: WidgetConfig): Record<string, string> {
    return {
      'grid-column': `${widget.position.x + 1} / span ${widget.dimensions.width
        }`,
      'grid-row': `${widget.position.y + 1} / span ${widget.dimensions.height}`,
      cursor: this.isDragging(widget.id) ? 'grabbing' : 'grab',
    };
  }

  onAddWidget(type: string) {
    const position = this.findNextPosition();
    this.widgetAdd.emit({ type, position });
    this.emitDashboardEvent('widget-add', { type, position });
  }

  onRemoveWidget(widgetId: string) {
    this.widgetRemove.emit(widgetId);
    this.emitDashboardEvent('widget-remove', { widgetId });
  }

  onMoveWidget(widgetId: string, position: { x: number; y: number }) {
    this.widgetMove.emit({ widgetId, position });
    this.emitDashboardEvent('widget-move', { widgetId, position });
  }

  onResizeWidget(
    widgetId: string,
    dimensions: { width: number; height: number }
  ) {
    this.widgetResize.emit({ widgetId, dimensions });
    this.emitDashboardEvent('widget-resize', { widgetId, dimensions });
  }

  onEditWidget(widgetId: string) {
    this.widgetEdit.emit(widgetId);
    this.emitDashboardEvent('widget-edit', { widgetId });
  }

  onRefreshWidget(widgetId: string) {
    this.widgetRefresh.emit(widgetId);
    this.emitDashboardEvent('widget-refresh', { widgetId });
  }

  onSaveLayout() {
    this.layoutSave.emit(this.widgets);
    this.emitDashboardEvent('layout-save', this.widgets);
  }

  onResetLayout() {
    this.layoutReset.emit();
    this.emitDashboardEvent('layout-reset', {});
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.selectedWidget = null;
      this.draggedWidget = null;
    }
  }

  selectWidget(widgetId: string) {
    if (this.isEditMode) {
      this.selectedWidget = this.selectedWidget === widgetId ? null : widgetId;
    }
  }

  startDrag(widgetId: string) {
    if (this.isEditMode && this.config.draggable) {
      this.draggedWidget = widgetId;
    }
  }

  endDrag() {
    this.draggedWidget = null;
  }

  isDragging(widgetId: string): boolean {
    return this.draggedWidget === widgetId;
  }

  isSelected(widgetId: string): boolean {
    return this.selectedWidget === widgetId;
  }

  trackByWidget(index: number, widget: WidgetConfig): string {
    return widget.id;
  }

  getWidgetIcon(type: string): string {
    switch (type) {
      case 'metric':
        return 'trending-up';
      case 'chart':
        return 'chart-bar';
      case 'table':
        return 'table';
      case 'list':
        return 'list';
      case 'custom':
        return 'code';
      default:
        return 'square';
    }
  }

  getWidgetContent(widget: WidgetConfig): string {
    switch (widget.type) {
      case 'metric':
        return this.renderMetricWidget(widget);
      case 'chart':
        return this.renderChartWidget();
      case 'table':
        return this.renderTableWidget();
      case 'list':
        return this.renderListWidget();
      case 'custom':
        return this.renderCustomWidget();
      default:
        return 'Unknown widget type';
    }
  }

  private renderMetricWidget(widget: WidgetConfig): string {
    const content = widget.content || {};
    return `
      <div class="metric-widget">
        <div class="metric-value">${content['value'] || '0'}</div>
        <div class="metric-label">${content['label'] || 'Metric'}</div>
        <div class="metric-change ${content['trend'] || 'neutral'}">
          ${content['change'] || '0%'}
        </div>
      </div>
    `;
  }

  private renderChartWidget(): string {
    return `
      <div class="chart-widget">
        <div class="chart-placeholder">
          <aava-icon iconName="cahrt-bar" [iconSize]="48" iconColor="#007bff"></aava-icon>
          <p>Chart Widget</p>
        </div>
      </div>
    `;
  }

  private renderTableWidget(): string {
    return `
      <div class="table-widget">
        <div class="table-placeholder">
          <aava-icon iconName="table" [iconSize]="48" iconColor="#28a745"></aava-icon>
          <p>Data Table</p>
        </div>
      </div>
    `;
  }

  private renderListWidget(): string {
    return `
      <div class="list-widget">
        <div class="list-placeholder">
          <aava-icon iconName="list" [iconSize]="48" iconColor="#ffc107"></aava-icon>
          <p>List Widget</p>
        </div>
      </div>
    `;
  }

  private renderCustomWidget(): string {
    return `
      <div class="custom-widget">
        <div class="custom-placeholder">
          <aava-icon iconName="code" [iconSize]="48" iconColor="#6c757d"></aava-icon>
          <p>Custom Widget</p>
        </div>
      </div>
    `;
  }

  private findNextPosition(): { x: number; y: number } {
    // Simple algorithm to find next available position
    let x = 0;
    let y = 0;

    while (this.isPositionOccupied(x, y)) {
      x += this.config.defaultWidgetSize?.width || 4;
      if (x >= (this.config.maxColumns || 12)) {
        x = 0;
        y += this.config.defaultWidgetSize?.height || 3;
      }
    }

    return { x, y };
  }

  private isPositionOccupied(x: number, y: number): boolean {
    return this.widgets.some(
      (widget) => widget.position.x === x && widget.position.y === y
    );
  }

  private emitDashboardEvent(type: DashboardEvent['type'], data: unknown) {
    const event: DashboardEvent = {
      type,
      data,
    };
    this.dashboardEvent.emit(event);
  }
}
