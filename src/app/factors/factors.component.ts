import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-factors',
  templateUrl: './factors.component.html',
  styleUrls: ['./factors.component.css'],
})
export class FactorsComponent {
  categories: Array<
    | 'Electricity'
    | 'Water'
    | 'Waste'
    | 'Dietary Habits'
    | 'Domestic Fuel'
    | 'Transport'
  > = [
    'Electricity',
    'Water',
    'Waste',
    'Dietary Habits',
    'Domestic Fuel',
    'Transport',
  ];
  selectedCategory:
    | 'Electricity'
    | 'Water'
    | 'Waste'
    | 'Dietary Habits'
    | 'Domestic Fuel'
    | 'Transport' = 'Electricity';

  constructor(private router: Router) {}

  selectTab(
    category:
      | 'Electricity'
      | 'Water'
      | 'Waste'
      | 'Dietary Habits'
      | 'Domestic Fuel'
      | 'Transport'
  ) {
    this.selectedCategory = category;
  }
}
