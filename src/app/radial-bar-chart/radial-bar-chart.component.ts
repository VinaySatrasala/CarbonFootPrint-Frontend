import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexStroke,
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
  styleUrls: ['./radial-bar-chart.component.css'],
})
export class RadialBarChartComponent implements OnChanges {
  public chartOptions: ChartOptions[];
  msg: string = '';
  comparisonMode: 'country' | 'world' = 'world';
  avgPersonPerWorldCO2: number = 4700 / 12;

  @Input()
  avgPersonPerCountryCO2!: number;
  @Input()
  emissionPerCategory!: any;

  constructor() {
    this.chartOptions = [
      this.createChartOption(0, 'Electricity'),
      this.createChartOption(0, 'Water'),
      this.createChartOption(0, 'Dietary'),
      this.createChartOption(0, 'Waste'),
      this.createChartOption(0, 'LPG'),
      this.createChartOption(0, 'Travel'),
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.avgPersonPerCountryCO2 && this.emissionPerCategory) {
      let electricity = 0;
      this.chartOptions = [
        this.createChartOption(0, 'Electricity'),
        this.createChartOption(0, 'Water'),
        this.createChartOption(0, 'Dietary'),
        this.createChartOption(0, 'Waste'),
        this.createChartOption(0, 'LPG'),
        this.createChartOption(0, 'Travel'),
      ];
    }
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
              color: '#888',
            },
          },
        },
      },
      fill: {
        type: 'solid',
        colors: ['#00712D'],
      },
      stroke: {
        lineCap: 'round',
        width: 5,
      },
      labels: [label],
    };
  }

  updateChart(comparisonType: string, chartOption: ChartOptions): void {
    const comparisonData = this.getComparisonData(comparisonType);
    chartOption.series = [comparisonData];
    chartOption.fill.colors = comparisonData > 100 ? ['#00712D'] : ['#00E396'];
  }

  getComparisonData(comparisonType: string): number {
    if (comparisonType === 'country') {
      this.msg = 'Country Vs User';
      return 80; // Example data for average country CO2e
    } else if (comparisonType === 'world') {
      this.msg = 'World Vs User';
      return 70; // Example data for average world CO2e
    }
    return 0;
  }
}
