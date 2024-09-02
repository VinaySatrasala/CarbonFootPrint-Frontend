import { Component } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexStroke
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  labels: string[];
};

@Component({
  selector: 'app-radial-bar-chart',
  templateUrl: './radial-bar-chart.component.html',
  styleUrls: ['./radial-bar-chart.component.css']
})
export class RadialBarChartComponent {
  public chartOptions: ChartOptions[];

  constructor() {
    this.chartOptions = [
      this.createChartOption(75, 'Electricity'),
      this.createChartOption(60, 'Water'),
      this.createChartOption(85, 'Dietary'),
      this.createChartOption(50, 'Waste'),
      this.createChartOption(40, 'LPG'),
      this.createChartOption(90, 'Travel')
    ];
  }

  createChartOption(seriesValue: number, label: string): ChartOptions {
    return {
      series: [seriesValue],
      chart: {
        type: 'radialBar',
        height: 350,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            size: '70%',
          },
          track: {
            background: '#e7e7e7',
            strokeWidth: '100%',
          },
          dataLabels: {
            name: {
              offsetY: 80,
              show: true,
              color: '#888',
              fontSize: '18px',
            },
            value: {
              show: true,
              color:'#888'
            }
          }
        }
      },
      fill: {
        type: 'solid',
        colors: ['#FF4560']
      },
      stroke: {
        lineCap: 'round',
        width:5
      },
      labels: [label]
    };
  }

  updateChart(comparisonType: string, chartOption: ChartOptions): void {
    const comparisonData = this.getComparisonData(comparisonType);
    chartOption.series = [comparisonData];
    chartOption.fill.colors = comparisonData > 100 ? ['#FF4560'] : ['#00E396'];
  }

  getComparisonData(comparisonType: string): number {
    if (comparisonType === 'country') {
      return 80; // Example data for average country CO2e
    } else if (comparisonType === 'world') {
      return 70; // Example data for average world CO2e
    }
    return 0;
  }
}
