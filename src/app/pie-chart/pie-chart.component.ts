import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnChanges {
  public chartOptions: any;

  @Input()
  emissionPerCategory!: any;

  constructor() {
    this.chartOptions = {
      // Example data for the 6 emission details
      series: [0, 0, 0, 0, 0, 0],
      chart: {
        type: 'pie',
        height: 320,
        width: 300,
      },
      labels: [
        'Electricity',
        'Water',
        'Dietary',
        'Waste',
        'Domestic Fuels',
        'Travel',
      ],
      fill: {
        type: 'solid',
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: 'bottom',
      },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions.series = !this.emissionPerCategory
      ? [0, 0, 0, 0, 0, 0]
      : [
          this.emissionPerCategory['electricity'] || 0,
          this.emissionPerCategory['water'] || 0,
          this.emissionPerCategory['dietary_habits'] || 0,
          this.emissionPerCategory['waste'] || 0,
          this.emissionPerCategory['fuel_sources'] || 0,
          this.emissionPerCategory['public_transport'] +
            this.emissionPerCategory['private_transport'] || 0,
        ];
  }
}
