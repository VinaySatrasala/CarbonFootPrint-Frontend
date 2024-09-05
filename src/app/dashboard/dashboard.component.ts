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
  countryRecords: any = [];
  emissionRecords!: any;
  avgPersonPerCountryCO2!: number;
  categories :any = {}
  water:any = {}
  electricity :any = {}
  fuel_sources :any = {}
  dietary_habits : any = {}
  public_transport : any = {}
  private_transport : any = {}
  waste : any = {}

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

    this.fatcorsService.getCountryRecords().subscribe({
      next: (response) => {
        if (response) {
          this.countryRecords = response;
          this.extractAvgPersonPerCountryCO2();
        }
      },
      error: (err) => {
        console.error(
          "couldn't fetch avg emission per capita per country : " + err
        );
      },
    });

    this.fatcorsService.fetchAllUserRecords().subscribe({
      next: (response) => {
        if (response) {
          this.emissionRecords = response;
        }
      },
      error: (err) => {
        console.error(
          "couldn't emission records for the user /history : " + err
        );
      },
    });
  }

  extractEmissionsPerCategory(): void {
    Object.keys(this.record).forEach((key, index) => {
      if(['water','electricity','waste','fuel_sources','dietary_habits','public_transport','private_transport'].includes(key)){
          this.categories[key] = this.record[key]
      }
      if (this.record[key].emission != undefined)
        this.emissionPerCategory[key] = this.record[key].emission;
    });
    this.emissionPerCategory = Object.assign({}, this.emissionPerCategory);
    // console.log(this.emissionPerCategory);
  }

  extractAvgPersonPerCountryCO2(): void {
    if (sessionStorage.getItem('country'))
      this.avgPersonPerCountryCO2 =
        (this.countryRecords.filter(
          (elt: any) => elt['Country'] == sessionStorage.getItem('country')
        )[0]['2021'] *
          1000) /
        12;
  }
}
