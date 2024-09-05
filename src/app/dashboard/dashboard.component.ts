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
  username: string = '';
  email: string = '';
  record: any = {};
  loading: boolean = true;
  errorWhenFetching: boolean = false;
  errorMessage: string = '';
  emissionPerCategory: any = {};
  countryRecords: any = [];
  emissionRecords!: any;
  avgPersonPerCountryCO2!: number;
  avgPersonPerWorldCO2: number = 4700 / 12;
  categories: any = {};
  water: any = {};
  electricity: any = {};
  fuel_sources: any = {};
  dietary_habits: any = {};
  public_transport: any = {};
  private_transport: any = {};
  waste: any = {};
  avgWorldWidth!: string;
  avgCountryWidth!: string;
  avgYourWidth!: string;
  totalEmission: number = 0;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023, 2024,
  ];
  selectedMonth!: any;
  selectedYear!: any;

  constructor(private fatcorsService: FactorsService) {
    this.username = sessionStorage.getItem('username')!;
    this.email = sessionStorage.getItem('email')!;
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    this.selectedMonth = this.months[month];
    this.selectedYear = year;
  }

  ngOnInit(): void {
    this.updateMonthData();

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
        this.errorWhenFetching = true;
      },
    });

    this.updateYearData();
  }

  updateYearData(): void {
    this.loading = true;
    this.errorWhenFetching = false;
    this.fatcorsService.fetchAllUserRecords().subscribe({
      next: (response) => {
        if (response) {
          this.loading = false;
          this.emissionRecords = response;
          this.emissionRecords = this.emissionRecords.filter((elt: any) =>
            elt.date.startsWith(this.selectedYear + '')
          );
        }
      },
      error: (err) => {
        this.errorWhenFetching = true;
        console.error(
          "couldn't find emission records for the user /history : " + err
        );
      },
    });
  }

  updateMonthData(): void {
    this.loading = true;
    this.errorWhenFetching = false;
    this.fatcorsService
      .fetchMonthData(this.selectedYear, this.selectedMonth)
      .subscribe({
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
    let total = 0;
    Object.keys(this.record).forEach((key, index) => {
      if (
        [
          'water',
          'electricity',
          'waste',
          'fuel_sources',
          'dietary_habits',
          'public_transport',
          'private_transport',
        ].includes(key)
      ) {
        this.categories[key] = this.record[key];
      }
      if (this.record[key].emission != undefined) {
        this.emissionPerCategory[key] = this.record[key].emission;
        total += this.record[key].emission;
      }
    });
    this.totalEmission = total;

    this.emissionPerCategory = Object.assign({}, this.emissionPerCategory);
    this.compareAvg();
    // console.log(this.emissionPerCategory);
  }

  extractAvgPersonPerCountryCO2(): void {
    if (sessionStorage.getItem('country')) {
      this.avgPersonPerCountryCO2 =
        (this.countryRecords.filter(
          (elt: any) => elt['Country'] == sessionStorage.getItem('country')
        )[0]['2021'] *
          1000) /
        12;
    }
  }

  compareAvg(): void {
    if (this.totalEmission > 0) {
      if (
        this.avgPersonPerCountryCO2 < this.avgPersonPerWorldCO2 &&
        this.totalEmission < this.avgPersonPerWorldCO2
      ) {
        this.avgWorldWidth = '100%';
        this.avgCountryWidth =
          (this.avgPersonPerCountryCO2 / this.avgPersonPerWorldCO2) * 100 + '%';
        this.avgYourWidth =
          (this.totalEmission / this.avgPersonPerWorldCO2) * 100 + '%';
      } else if (
        this.avgPersonPerCountryCO2 > this.avgPersonPerWorldCO2 &&
        this.avgPersonPerCountryCO2 > this.totalEmission
      ) {
        this.avgCountryWidth = '100%';
        this.avgWorldWidth =
          (this.avgPersonPerWorldCO2 / this.avgPersonPerCountryCO2) * 100 + '%';
        this.avgYourWidth =
          (this.totalEmission / this.avgPersonPerCountryCO2) * 100 + '%';
      } else {
        this.avgYourWidth = '100%';
        this.avgWorldWidth =
          (this.avgPersonPerWorldCO2 / this.totalEmission) * 100 + '%';
        this.avgCountryWidth =
          (this.avgPersonPerCountryCO2 / this.totalEmission) * 100 + '%';
      }
    }
  }

  updateData() {
    this.updateMonthData();
    this.updateYearData();
  }
}
