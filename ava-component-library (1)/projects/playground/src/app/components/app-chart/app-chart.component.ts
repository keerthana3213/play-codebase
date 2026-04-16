import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ChartsComponent } from '../../../../../@aava/play-core/src/lib/components/charts/charts.component';
import { ChartOptions } from '../../../../../@aava/play-core/src/lib/components/charts/chart-options';
import { IconsComponent } from '../../../../../@aava/play-core/src/public-api';

@Component({
  selector: 'app-app-chart',
  imports: [CommonModule, ChartsComponent, IconsComponent],
  templateUrl: './app-chart.component.html',
  styleUrl: './app-chart.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppChartComponent {
  sections = [
    {
      title: 'Line Chart with Time Scale and Grid',
      description: 'Demonstrates Line Chart with Time Scale and Grid.',
      showCode: false,
    },
    {
      title: 'Bar Chart with Linear Scale and Custom Styles',
      description:
        'Demonstrates Bar Chart with Linear Scale and Custom Styles.',
      showCode: false,
    },
    {
      title: 'Scatter Plot with Log Scale and Dashed Line',
      description: 'Demonstrates Scatter Plot with Log Scale and Dashed Line.',
      showCode: false,
    },
    {
      title: 'Pie Chart',
      description:
        'Demonstrates Pie Chart with custom colors, labels, and tooltips.',
      showCode: false,
    },
  ];

  apiProps = [
    {
      name: 'options',
      type: 'ChartOptions',
      default: 'null',
      description: 'The options for the chart.',
    },
    {
      name: 'width',
      type: 'number',
      default: 'null',
      description: 'The width of the chart.',
    },
    {
      name: 'height',
      type: 'number',
      default: 'null',
      description: 'The height of the chart.',
    },
    {
      name: 'theme',
      type: '"light" | "dark"',
      default: '"light"',
      description: 'The theme of the chart.',
    },
    {
      name: 'showContent',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the content of the chart.',
    },
    {
      name: 'type',
      type: '"line" | "bar" | "scatter" | "pie"',
      default: '"line"',
      description: 'The type of the chart.',
    },
    {
      name: 'data',
      type: 'any[]',
      default: 'null',
      description: 'The data for the chart.',
    },
    {
      name: 'xKey',
      type: 'string',
      default: 'null',
      description: 'The key for the x-axis.',
    },
    {
      name: 'yKey',
      type: 'string',
      default: 'null',
      description: 'The key for the y-axis.',
    },
    {
      name: 'xScaleType',
      type: '"linear" | "log" | "time" | "ordinal"',
      default: '"linear"',
      description: 'The scale type for the x-axis.',
    },
    {
      name: 'yScaleType',
      type: '"linear" | "log" | "time" | "ordinal"',
      default: '"linear"',
      description: 'The scale type for the y-axis.',
    },
    {
      name: 'axes',
      type: 'ChartAxes',
      default: 'null',
      description: 'The axes configuration for the chart.',
    },
    {
      name: 'gridLines',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show grid lines.',
    },
    {
      name: 'tooltip',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show tooltips.',
    },
    {
      name: 'tooltipContent',
      type: 'Function',
      default: 'null',
      description: 'The content for tooltips.',
    },
    {
      name: 'onClick',
      type: 'Function',
      default: 'null',
      description: 'The click handler for the chart.',
    },
    {
      name: 'onMouseOver',
      type: 'Function',
      default: 'null',
      description: 'The mouse over handler for the chart.',
    },
    {
      name: 'onMouseOut',
      type: 'Function',
      default: 'null',
      description: 'The mouse out handler for the chart.',
    },
    {
      name: 'showDots',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show dots.',
    },
    {
      name: 'dotSize',
      type: 'number',
      default: 'null',
      description: 'The size of the dots.',
    },
    {
      name: 'dashed',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show dashed lines.',
    },
    {
      name: 'lineWidth',
      type: 'number',
      default: '1',
      description: 'The width of the lines.',
    },
    {
      name: 'colors',
      type: 'string[]',
      default: '[]',
      description: 'The colors for the chart.',
    },
    {
      name: 'customStyles',
      type: 'Record<string, string>',
      default: '{}',
      description: 'The custom styles for the chart.',
    },
    {
      name: 'tooltipBackground',
      type: 'string',
      default: 'null',
      description: 'The background color for tooltips.',
    },
    {
      name: 'tooltipTextColor',
      type: 'string',
      default: 'null',
      description: 'The text color for tooltips.',
    },
    {
      name: 'tooltipPadding',
      type: 'number',
      default: 'null',
      description: 'The padding for tooltips.',
    },
    {
      name: 'tooltipBorderRadius',
      type: 'number',
      default: 'null',
      description: 'The border radius for tooltips.',
    },
    {
      name: 'tooltipZIndex',
      type: 'number',
      default: 'null',
      description: 'The z-index for tooltips.',
    },
    {
      name: 'barOpacity',
      type: 'number',
      default: 'null',
      description: 'The opacity for bars.',
    },
    {
      name: 'barStrokeColor',
      type: 'string',
      default: 'null',
      description: 'The stroke color for bars.',
    },
    {
      name: 'barStrokeWidth',
      type: 'number',
      default: 'null',
      description: 'The stroke width for bars.',
    },
    {
      name: 'lineColor',
      type: 'string',
      default: 'null',
      description: 'The color for line charts.',
    },
    {
      name: 'pointOpacity',
      type: 'number',
      default: 'null',
      description: 'The opacity for scatter points.',
    },
    {
      name: 'pointStrokeColor',
      type: 'string',
      default: 'null',
      description: 'The stroke color for scatter points.',
    },
  ];

  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Line Chart with Time Scale and Grid
  lineChartOptions: ChartOptions = {
    type: 'line',
    data: [
      { date: new Date('2023-01-01'), value: 10 },
      { date: new Date('2023-01-02'), value: 15 },
      { date: new Date('2023-01-03'), value: 12 },
      { date: new Date('2023-01-04'), value: 18 },
      { date: new Date('2023-01-05'), value: 20 },
      { date: new Date('2023-01-06'), value: 22 },
      { date: new Date('2023-01-07'), value: 25 },
    ],
    xKey: 'date',
    yKey: 'value',
    width: 800,
    height: 300,
    colors: ['var(--chart-color-2)'],
    xScaleType: 'time',
    yScaleType: 'linear',
    axes: {
      showXAxis: true,
      showYAxis: true,
      xLabel: 'Date',
      yLabel: 'Value',
    },
    gridLines: true,
    tooltip: true,
    legend: true,
    tooltipContent: (data: any) => `
      <div class="tooltip-header">
        <span class="label">Value:</span>
        <span class="value">${data.value}</span>
      </div>
      <div class="tooltip-body">
        <span class="label">Date:</span>
        <span class="value">${new Date(data.date).toLocaleDateString()}</span>
      </div>
    `,
    onClick: (data: any) => {
      console.log('Clicked:', data);
    },
  };

  // Bar Chart with Linear Scale and Custom Styles
  barChartOptions: ChartOptions = {
    type: 'bar',
    data: [
      { category: 'A', value: 10 },
      { category: 'B', value: 15 },
      { category: 'C', value: 12 },
      { category: 'D', value: 18 },
      { category: 'E', value: 20 },
      { category: 'F', value: 22 },
      { category: 'G', value: 25 },
    ],
    xKey: 'category',
    yKey: 'value',
    width: 800,
    height: 300,
    colors: [
      'var(--chart-color-1)',
      'var(--chart-color-2)',
      'var(--chart-color-3)',
      'var(--chart-color-4)',
      'var(--chart-color-5)',
      'var(--chart-color-6)',
      'var(--chart-color-7)',
    ],
    xScaleType: 'ordinal',
    yScaleType: 'linear',
    axes: {
      showXAxis: true,
      showYAxis: true,
      xLabel: 'Category',
      yLabel: 'Value',
    },
    customStyles: {
      line: 'stroke-width: 4',
      dot: 'fill-opacity: 0.8',
      'axis-label': 'font-weight: bold',
    },
    legend: true,
    showDots: true,
    dotSize: 8,
    onMouseOver: (data: any) => {
      console.log('Mouse over:', data.category);
    },
    onMouseOut: (data: any) => {
      console.log('Mouse out:', data.category);
    },
  };

  // Scatter Plot with Log Scale and Dashed Line
  scatterPlotOptions: ChartOptions = {
    type: 'scatter',
    data: [
      { x: 1, y: 5 },
      { x: 2, y: 15 },
      { x: 3, y: 45 },
      { x: 4, y: 125 },
      { x: 5, y: 280 },
      { x: 6, y: 700 },
      { x: 7, y: 1500 },
    ],
    xKey: 'x',
    yKey: 'y',
    width: 800,
    height: 300,
    colors: ['var(--chart-color-3)'],
    xScaleType: 'linear',
    yScaleType: 'log',
    axes: {
      showXAxis: true,
      showYAxis: true,
      xLabel: 'X Value',
      yLabel: 'Y Value',
    },
    dashed: true,
    lineWidth: 3,
    showDots: true,
    dotSize: 6,
    legend: true,
    tooltipContent: (data: any) => `
      <div class="tooltip-header">
        <span class="label">Y Value:</span>
        <span class="value">${data.y}</span>
      </div>
      <div class="tooltip-body">
        <span class="label">X Value:</span>
        <span class="value">${data.x}</span>
      </div>
    `,
  };

  // Pie Chart with Custom Colors and  Labels
  pieChartOptions: ChartOptions = {
    type: 'pie',
    data: [
      { category: 'A', value: 10 },
      { category: 'B', value: 15 },
      { category: 'C', value: 12 },
      { category: 'D', value: 18 },
      { category: 'E', value: 20 },
      { category: 'F', value: 22 },
      { category: 'G', value: 25 },
    ],
    xKey: 'category',
    yKey: 'value',
    legend: true,
    width: 400,
    height: 400,
    colors: [
      getComputedStyle(document.documentElement).getPropertyValue(
        '--primary-color'
      ),
      getComputedStyle(document.documentElement).getPropertyValue(
        '--secondary-color'
      ),
      '#ffc107',
      '#17a2b8',
      getComputedStyle(document.documentElement).getPropertyValue(
        '--text-color-secondary'
      ),
      getComputedStyle(document.documentElement).getPropertyValue(
        '--primary-color'
      ),
      '#e83e8c',
    ],
    tooltipContent: (data: any) => `
      <div class="tooltip-header">
        <span class="label">Category:</span>
        <span class="value">${data.category}</span>
      </div>
      <div class="tooltip-content">
        <span class="label">Value:</span>
        <span class="value">${data.value}</span>
      </div>
    `,
  } as ChartOptions;

  getTabCode(sectionTitle: string): string {
    const examples: Record<string, string> = {
      'pie chart': `
import { Component } from '@angular/core';
import { ChartsComponent } from '@awe/@aava/play-core';
import { ChartOptions } from '@awe/@aava/play-core';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [ChartsComponent],
  template: '<awe-charts [options]="options"></awe-charts>'
})
export class PieChartComponent {
  options: ChartOptions = {
    type: 'pie',
    data: [
      { category: 'Category 1', value: 30 },
      { category: 'Category 2', value: 20 },
      { category: 'Category 3', value: 40 },
      { category: 'Category 4', value: 10 }
    ],
    tooltip: true,
    legend: true,
    colors: ['var(--chart-color-1)', 'var(--chart-color-3)', 'var(--chart-color-4)', 'var(--chart-color-8)']
  };
}
      `,
      'line chart with time scale and grid': `
  standalone: true,
  imports: [ChartsComponent],
  template: \`
    <section class="comp-container">
      <awe-charts [options]="lineChartOptions"></awe-charts>
    </section>
  \`
})
export class LineChartComponent {
  lineChartOptions: ChartOptions = {
    type: 'line',
    data: [
      { date: new Date('2023-01-01'), value: 10 },
      { date: new Date('2023-01-02'), value: 15 },
      { date: new Date('2023-01-03'), value: 12 },
      { date: new Date('2023-01-04'), value: 18 },
      { date: new Date('2023-01-05'), value: 20 },
      { date: new Date('2023-01-06'), value: 22 },
      { date: new Date('2023-01-07'), value: 25 }
    ],
    xKey: 'date',
    yKey: 'value',
    width: 800,
    height: 300,
    colors: ['var(--chart-color-2)'],
    xScaleType: 'time',
    yScaleType: 'linear',
    axes: {
      showXAxis: true,
      showYAxis: true,
      xLabel: 'Date',
      yLabel: 'Value'
    },
    gridLines: true,
    tooltip: true,
    tooltipContent: (data: any) => \`
      <div class="tooltip-header">
        <span class="label">Value:</span>
        <span class="value">\${data.value}</span>
      </div>
      <div class="tooltip-body">
        <span class="label">Date:</span>
        <span class="value">\${new Date(data.date).toLocaleDateString()}</span>
      </div>
    \`,
    onClick: (data: any) => {
      console.log('Clicked:', data);
    }
  };
}`,
      'bar chart with linear scale and custom styles': `
import { Component } from '@angular/core';
import { ChartsComponent } from '@awe/@aava/play-core';
import { ChartOptions } from '@awe/@aava/play-core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ChartsComponent],
  template: \`
    <section class="comp-container">
      <awe-charts [options]="barChartOptions"></awe-charts>
    </section>
  \`
})
export class BarChartComponent {
  barChartOptions: ChartOptions = {
    type: 'bar',
    data: [
      { category: 'A', value: 10 },
      { category: 'B', value: 15 },
      { category: 'C', value: 12 },
      { category: 'D', value: 18 },
      { category: 'E', value: 20 },
      { category: 'F', value: 22 },
      { category: 'G', value: 25 }
    ],
    xKey: 'category',
    yKey: 'value',
    width: 800,
    height: 300,
    colors: ['var(--chart-color-1)'],
    xScaleType: 'ordinal',
    yScaleType: 'linear',
    axes: {
      showXAxis: true,
      showYAxis: true,
      xLabel: 'Category',
      yLabel: 'Value'
    },
    customStyles: {
      'line': 'stroke-width: 4',
      'dot': 'fill-opacity: 0.8',
      'axis-label': 'font-weight: bold'
    },
    showDots: true,
    dotSize: 8,
    onMouseOver: (data: any) => {
      console.log('Mouse over:', data.category);
    },
    onMouseOut: (data: any) => {
      console.log('Mouse out:', data.category);
    }
  };
}`,
      'scatter plot with log scale and dashed line': `
import { Component } from '@angular/core';
import { ChartsComponent } from '@awe/@aava/play-core';
import { ChartOptions } from '@awe/@aava/play-core';

@Component({
  selector: 'app-scatter-plot',
  standalone: true,
  imports: [ChartsComponent],
  template: \`
    <section class="comp-container">
      <awe-charts [options]="scatterPlotOptions"></awe-charts>
    </section>
  \`
})
export class ScatterPlotComponent {
  scatterPlotOptions: ChartOptions = {
    type: 'scatter',
    data: [
      { x: 1, y: 5 },
      { x: 2, y: 15 },
      { x: 3, y: 45 },
      { x: 4, y: 125 },
      { x: 5, y: 280 },
      { x: 6, y: 700 },
      { x: 7, y: 1500 }
    ],
    xKey: 'x',
    yKey: 'y',
    width: 800,
    height: 300,
    colors: ['var(--chart-color-3)'],
    xScaleType: 'linear',
    yScaleType: 'log',
    axes: {
      showXAxis: true,
      showYAxis: true,
      xLabel: 'X Value',
      yLabel: 'Y Value'
    },
    dashed: true,
    lineWidth: 3,
    showDots: true,
    dotSize: 6,
    tooltipContent: (data: any) => \`
      <div class="tooltip-header">
        <span class="label">Y Value:</span>
        <span class="value">\${data.y}</span>
      </div>
      <div class="tooltip-body">
        <span class="label">X Value:</span>
        <span class="value">\${data.x}</span>
      </div>
    \`
  };
}`,
    };

    return examples[sectionTitle] || '';
  }

  // Copy Code to Clipboard (for the code example)
  copyCode(section: string): void {
    const code = this.getTabCode(section);
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  }
}
