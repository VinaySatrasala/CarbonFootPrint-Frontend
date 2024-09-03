import { FactorsService } from './../factors.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {

  @ViewChild('publicform')
  publicform:any;
  @ViewChild('privateform')
  privateform:any;

  selectedTab: string = 'public'; // Default tab is public transport

  // Public Transport Variables
  busDistance: number = 0;
  trainDistance: number = 0;
  flightRoute: string = '';

  // Personal Transport Variables
  fuelType: string = '';
  distanceTravelled: number = 0;
  vehicleEfficiency: number = 0;

  constructor(private factorsService : FactorsService){}

  // Method to handle public transport submission
  submitPublicTransport() {
    // Logic to handle form submission
    this.factorsService.putRecordIfAbsent().subscribe({
      next:(emissionID)=>{

        let body = {public_transport:{

        }}

        if(emissionID){

          this.factorsService.updateRecord('public_transport',body,emissionID).subscribe({
            next:(success)=>{
              if(success)
                this.publicform.nativeElement.reset()
            },
            error:(err)=>{console.log(err);
            }
          })
      }
    }

  })

}

  // Method to handle personal transport submission
  submitPersonalTransport() {
    // Logic to handle form submission
    this.factorsService.putRecordIfAbsent().subscribe({
      next:(emissionID)=>{

        let body = {private_transport:{
            fuel_type:this.fuelType,
            travelled:this.distanceTravelled,
            efficiency:this.vehicleEfficiency
        }}

        if(emissionID){

          this.factorsService.updateRecord('private_transport',body,emissionID).subscribe({
            next:(success)=>{
              if(success)
                this.privateform.nativeElement.reset()
            },
            error:(err)=>{console.log(err);
           }
          })
      }
    }

  })

}
}
