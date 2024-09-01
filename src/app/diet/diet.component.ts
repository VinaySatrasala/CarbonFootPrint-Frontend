import { Component } from '@angular/core';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent {
  meatConsumption: string = 'not-had';
  dairyConsumption: string = 'not-had';

  // Other Products - Subcategories
  cerealsSelected: boolean = false;
  pulsesSelected: boolean = false;
  vegetablesSelected: boolean = false;
  fruitsSelected: boolean = false;

  dietaryImpact: string | null = null;
  totalIntakeKg: number | null = null;

  calculateDietaryImpact() {
    let impact = '';
    let totalKg = 0;

    // Meat Consumption Calculation
    switch (this.meatConsumption) {
      case 'not-had':
        impact += 'No meat intake, ';
        totalKg += 0;
        break;
      case 'light':
        impact += 'Low meat intake, ';
        totalKg += 0.15; // Example: 150g for light meal
        break;
      case 'medium':
        impact += 'Moderate meat intake, ';
        totalKg += 0.3; // Example: 300g for medium meal
        break;
      case 'heavy':
        impact += 'High meat intake, ';
        totalKg += 0.5; // Example: 500g for heavy meal
        break;
    }

    // Dairy Consumption Calculation
    switch (this.dairyConsumption) {
      case 'not-had':
        impact += 'no dairy intake, ';
        totalKg += 0;
        break;
      case 'light':
        impact += 'low dairy intake, ';
        totalKg += 0.1; // Example: 100g for light meal
        break;
      case 'medium':
        impact += 'moderate dairy intake, ';
        totalKg += 0.25; // Example: 250g for medium meal
        break;
      case 'heavy':
        impact += 'high dairy intake, ';
        totalKg += 0.4; // Example: 400g for heavy meal
        break;
    }

    // Other Products Calculation
    if (this.cerealsSelected) {
      impact += 'cereals included, ';
      totalKg += 0.3; // Example: 300g for cereals
    }
    if (this.pulsesSelected) {
      impact += 'pulses included, ';
      totalKg += 0.2; // Example: 200g for pulses
    }
    if (this.vegetablesSelected) {
      impact += 'vegetables included, ';
      totalKg += 0.25; // Example: 250g for vegetables
    }
    if (this.fruitsSelected) {
      impact += 'fruits included, ';
      totalKg += 0.2; // Example: 200g for fruits
    }

    this.dietaryImpact = impact;
    this.totalIntakeKg = totalKg;
    alert(`Estimated Dietary Impact: ${this.dietaryImpact}\nTotal Intake: ${this.totalIntakeKg} kg`);
  }
}
