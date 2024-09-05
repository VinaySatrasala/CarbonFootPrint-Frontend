import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTooltip,
} from 'ng-apexcharts';
import { FactorsService } from '../factors.service';

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
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnChanges {
  public chartOptions: ChartOptions;
  public selectedMonth: string | null = null;
  public selectedEmission: number | null = null;

  @Input()
  emissionRecords!: any;

  constructor(private factorsService: FactorsService) {
    this.chartOptions = {
      series: [
        {
          name: 'CO2 Emissions',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chart: {
        type: 'bar',
        height: 310,

      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        title: {
          text: 'CO2 Emissions (kg)',
        },
        labels: {
          formatter: (value) => {
            return value.toFixed(2);
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      tooltip: {
        enabled: true,
      },
    };
  }

  ngOnChanges(): void {
    if (this.emissionRecords) {
      let monthData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.emissionRecords.forEach((elt: any) => {
        let year = new Date().getFullYear() + '';
        if (elt['date'] && elt['date'].startsWith(year)) {
          let month = parseInt(elt['date'].split('-')[1]);
          let totalEmission = 0;
          Object.keys(elt).forEach((key, index) => {
            if (elt[key].emission != undefined)
              totalEmission += elt[key].emission;
          });
          monthData[month - 1] = totalEmission;
        }
      });
      this.chartOptions.series = [
        {
          name: 'CO2 Emissions',
          data: monthData,
        },
      ];
      // console.log(this.chartOptions);
    }
  }

  // updateChart(index: number): void {
  //   this.selectedMonth = this.chartOptions.xaxis.categories[index];
  //   this.selectedEmission = this.chartOptions.series[0].data[index] || null;
  //   alert(this.selectedMonth);
  // }
}
