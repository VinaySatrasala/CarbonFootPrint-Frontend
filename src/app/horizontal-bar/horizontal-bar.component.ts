import { Component, OnInit } from '@angular/core';

export type ChartOptions = {
  series: any;
  chart: any;
  plotOptions: any;
  dataLabels: any;
  xaxis: any;
  colors: any;
  grid: any; // Include grid in type
};

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.css'] // Corrected to 'styleUrls'
})
export class HorizontalBarComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          data: [2.12, 2.33, 4.50] // The bar values (You, Avg India, Avg World)
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true, // Horizontal setting in plotOptions
          barHeight: '50%'
        }
      },
      dataLabels: {
      },
      colors: ['#f4b400', '#00c853', '#00c853'], // Different colors for the bars
      grid: {
        show: false // This will remove the grid lines from the chart
      }
    };
  }

  ngOnInit(): void {}
}
