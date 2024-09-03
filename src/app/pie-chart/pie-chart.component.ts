import { Component } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
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
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [20, 15, 25, 10, 10, 20], // Example data for the 6 emission details
      chart: {
        type: 'pie',
        height: 300
      },
      labels: ['Electricity', 'Water', 'Dietary', 'Waste', 'LPG', 'Travel'],
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: true
      },
      legend: {
        position: 'bottom'
      }
    };
  }
}
