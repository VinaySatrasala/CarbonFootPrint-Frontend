import { Component } from '@angular/core';

@Component({
  selector: 'app-fuels',
  templateUrl: './fuels.component.html',
  styleUrls: ['./fuels.component.css']
})
export class FuelsComponent {
  lpgUsage: number = 0;
  firewoodUsage: number = 0;
  estimatedFuelUsage: number | null = null;

  calculateFuelUsage() {
    this.estimatedFuelUsage = this.lpgUsage + this.firewoodUsage;
    alert("Estimated Monthly Fuel Usage: " + this.estimatedFuelUsage + " kg");
  }
}
