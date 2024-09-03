import { Component, OnInit } from '@angular/core';
import { RadialBarChartComponent } from '../radial-bar-chart/radial-bar-chart.component';
import { AppModule } from '../app.module';
import { FactorsService } from '../factors.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  record: any = {};
  constructor(private fatcorsService: FactorsService) {}
  loading: boolean = true;
  errorWhenFetching: boolean = false;
  errorMessage: string = '';
  emissionPerCategory: any = {};

  ngOnInit(): void {
    this.fatcorsService.fetchCurrentMonthData().subscribe({
      next: (response) => {
        if (response) {
          this.record = response;
          this.loading = false;
          this.extractEmissionsPerCategory();
        } else {
          this.errorWhenFetching = true;
        }
      },
      error: (err) => {
        this.errorWhenFetching = true;
        this.errorMessage = err.error ? err.error : '';
      },
    });
  }

  extractEmissionsPerCategory(): void {
    Object.keys(this.record).forEach((key, index) => {
      if (this.record[key].emission != undefined)
        this.emissionPerCategory[key] = this.record[key].emission;
    });
    this.emissionPerCategory = Object.assign({}, this.emissionPerCategory);
    console.log(this.emissionPerCategory);
  }
}
