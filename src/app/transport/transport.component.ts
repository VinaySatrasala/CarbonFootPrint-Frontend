import { Component } from '@angular/core';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {
  selectedTab: string = 'public'; // Default tab is public transport

  // Public Transport Variables
  busDistance: number = 0;
  trainDistance: number = 0;
  flightRoute: string = '';

  // Personal Transport Variables
  fuelType: string = '';
  distanceTravelled: number = 0;
  vehicleEfficiency: number = 0;

  // Method to handle public transport submission
  submitPublicTransport() {
    console.log('Public Transport Submitted');
    console.log('Bus Distance:', this.busDistance);
    console.log('Train Distance:', this.trainDistance);
    console.log('Flight Route:', this.flightRoute);
    // Additional logic for handling public transport data
  }

  // Method to handle personal transport submission
  submitPersonalTransport() {
    console.log('Personal Transport Submitted');
    console.log('Fuel Type:', this.fuelType);
    console.log('Distance Travelled:', this.distanceTravelled);
    console.log('Vehicle Efficiency:', this.vehicleEfficiency);
    // Additional logic for handling personal transport data
  }
}
