import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartsComponent } from '../../../../../@aava/play-core/src/lib/components/charts/charts.component';
import { Component } from '@angular/core';
import { ChartOptions } from '../../../../../@aava/play-core/src/lib/components/charts/chart-options';
import * as d3 from 'd3';

@Component({
  selector: 'host-component',
  template: `<awe-charts [options]="options"></awe-charts>`
})
class HostComponent {
  options: ChartOptions = {
    width: 500,
    height: 300,
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
    data: [],
    xKey: '',
    yKey: ''
  };
}

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;

    // Basic default options
    component.options = {
      width: 800,
      height: 400,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      data: [
        { x: 1, y: 2 },
        { x: 2, y: 3 }
      ],
      xKey: 'x',
      yKey: 'y',
      type: 'line',
      axes: { showXAxis: true, showYAxis: true, xLabel: 'X Axis', yLabel: 'Y Axis' },
      tooltip: true,
      theme: { lineColor: '#000', pointColor: '#f00' },
      pointSize: 5
    };

    // Set up fake container
    const container = document.createElement('div');
    container.classList.add('chart-container');
    container.innerHTML = '<svg></svg>';
    (fixture.nativeElement as HTMLElement).appendChild(container);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default options in ngOnInit when options are missing', () => {
    component.options = undefined as any;
    component.ngOnInit();
    expect(component.options.width).toBe(800);
    expect(component.options.data).toEqual([]);
  });

  it('should call initializeChart in ngAfterViewInit', () => {
    spyOn(component as any, 'initializeChart');
    component.ngAfterViewInit();
    expect((component as any).initializeChart).toHaveBeenCalled();
  });

  it('should call updateChart on ngOnChanges', () => {
    spyOn(component as any, 'updateChart');
    component.ngOnChanges({
      options: {
        currentValue: component.options,
        previousValue: null,
        isFirstChange: () => true,
        firstChange: true
      }
    });
    expect((component as any).updateChart).toHaveBeenCalled();
  });

  it('should clean up chart on ngOnDestroy', () => {
    const dummy = document.createElement('div');
    const svg = d3.select(dummy).append('svg');
    const chart = svg.append('g');
    const container = svg.append('g');

    (component as any).svg = svg;
    (component as any).chart = chart;
    (component as any).container = container;

    component.ngOnDestroy();

    expect(document.querySelector('svg')).toBeNull();
  });

  it('should handle missing container in initializeChart', () => {
    spyOn(console, 'error');
    const el = fixture.nativeElement as HTMLElement;
    const container = el.querySelector('.chart-container');
    if (container) container.remove();
    (component as any).initializeChart();
    expect(console.error).toHaveBeenCalledWith('Chart container not found');
  });

  it('should use default linear scale', () => {
    const scale = (component as any).createScale('unknown');
    expect(typeof scale).toBe('function');
  });

  it('should render a line chart with tooltip', () => {
    fixture.detectChanges();
    component.ngAfterViewInit();
    const lines = fixture.nativeElement.querySelectorAll('.line');
    expect(lines.length).toBeGreaterThan(0);
  });

  it('should render a bar chart', () => {
    component.options.type = 'bar';
    fixture.detectChanges();
    component.ngAfterViewInit();
    const bars = fixture.nativeElement.querySelectorAll('.bar');
    expect(bars.length).toBe(component.options.data.length);
  });

  it('should render a pie chart with legend', () => {
    component.options = {
      type: 'pie',
      width: 300,
      height: 300,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      data: [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 }
      ],
      xKey: 'category',
      yKey: 'value',
      tooltip: true,
      legend: true,
      colors: ['#123456', '#654321']
    };

    fixture.detectChanges();
    component.ngAfterViewInit();

    const arcs = fixture.nativeElement.querySelectorAll('.arc');
    expect(arcs.length).toBe(2);

    const legendItems = fixture.nativeElement.querySelectorAll('.legend-item');
    expect(legendItems.length).toBe(2);
  });

  it('should render default chart if unknown type provided', () => {
    component.options.type = 'unknown' as any;
    fixture.detectChanges();
    component.ngAfterViewInit();
    const line = fixture.nativeElement.querySelector('.line');
    expect(line).toBeTruthy();
  });
});
