import { FactorsService } from './../factors.service';
import { Component, ViewChild } from '@angular/core';
import { airports } from 'src/assets/airports';
@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css'],
})
export class TransportComponent {
  @ViewChild('publicform')
  publicform: any;
  @ViewChild('privateform')
  privateform: any;

  airports = airports;
  airportFromValid: boolean = false;
  airportToValid: boolean = false;
  selectedTab: string = 'public'; // Default tab is public transport

  // Public Transport Variables
  busDistance: number = 0;
  trainDistance: number = 0;
  flightTo: string = '';
  flightFrom: string = '';
  flightToCode: string = '';
  flightFromCode: string = '';
  hadFlight: 'yes' | 'no' = 'no';

  // Personal Transport Variables
  fuelType: string = '';
  distanceTravelled: number = 0;
  vehicleEfficiency: number = 0;

  constructor(private factorsService: FactorsService) {}

  // Method to handle public transport submission
  submitPublicTransport() {
    // Logic to handle form submission
    alert(this.flightFromCode);
    alert(this.flightToCode);
    this.factorsService.putRecordIfAbsent().subscribe({
      next: (emissionID) => {
        let body = {
          public_transport: {
            bus: this.busDistance ? this.busDistance : 0,
            train: this.trainDistance ? this.trainDistance : 0,
            flight: {
              to: this.flightToCode,
              from: this.flightFromCode,
            },
          },
        };

        if (emissionID) {
          this.factorsService
            .updateRecord('public_transport', body, emissionID)
            .subscribe({
              next: (success) => {
                if (success) this.publicform.nativeElement.reset();
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      },
    });
  }

  // Method to handle personal transport submission
  submitPersonalTransport() {
    // Logic to handle form submission
    this.factorsService.putRecordIfAbsent().subscribe({
      next: (emissionID) => {
        let body = {
          private_transport: {
            fuel_type: this.fuelType,
            travelled: this.distanceTravelled,
            efficiency: this.vehicleEfficiency,
          },
        };

        if (emissionID) {
          this.factorsService
            .updateRecord('private_transport', body, emissionID)
            .subscribe({
              next: (success) => {
                if (success) this.privateform.nativeElement.reset();
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      },
    });
  }

  setFlightFrom(): void {
    let matches = this.airports.filter((elt) => this.flightFrom == elt.name);
    if (matches && matches[0]) {
      this.flightFromCode = matches[0].code;
      this.airportFromValid = true;
    } else this.airportFromValid = false;
  }

  setFlightTo(): void {
    let matches = this.airports.filter((elt) => this.flightTo == elt.name);
    if (matches && matches[0]) {
      this.flightToCode = matches[0].code;
      this.airportToValid = true;
    } else this.airportToValid = false;
  }
}
