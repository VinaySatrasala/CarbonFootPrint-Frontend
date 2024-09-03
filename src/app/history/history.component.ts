import { Component } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: {
    name: string;
    data: number[];
  }[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  public chartOptions: ChartOptions;
  public selectedMonth: string | null = null;
  public selectedEmission: number | null = null;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'CO2 Emissions',
          data: [30, 40, 35, 50, 49, 60,30, 40, 35, 50, 49, 100]
        }
      ],
      chart: {
        type: 'bar',
        height:280
        // width:400
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Aug','Sept','Oct','Nov','Dec']
      },
      yaxis: {
        title: {
          text: 'CO2 Emissions (kg)'
        }
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      tooltip: {
        enabled: true
      }
    };
  }

  updateChart(index: number): void {
    this.selectedMonth = this.chartOptions.xaxis.categories[index];
    this.selectedEmission = this.chartOptions.series[0].data[index] || null;
  }
}
