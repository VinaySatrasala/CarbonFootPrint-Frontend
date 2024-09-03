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
      series: [50, 120, 324, 108, 120, 220], // Example data for the 6 emission details
      chart: {
        type: 'pie',
        height: 300,
        width:250
      },
      labels: ['Electricity', 'Water', 'Dietary', 'Waste', 'LPG', 'Travel'],
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: 'bottom'
      }
    };
  }
}
