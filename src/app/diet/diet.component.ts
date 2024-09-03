import { FactorsService } from './../factors.service';
import { Component, ViewChild } from '@angular/core';

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


  meatIntakeKg: number | null = null;
  dairyIntakeKg: number | null = null;
  otherIntakeKg: number | null = null;

  @ViewChild('form')
  form:any

  constructor(private factorsService:FactorsService){}

  calculateDietaryImpact() {

    this.meatIntakeKg = 0
    this.dairyIntakeKg = 0
    this.otherIntakeKg = 0

    // Meat Consumption Calculation
    switch (this.meatConsumption) {
      case 'not-had':

        this.meatIntakeKg += 0;
        break;
      case 'light':

        this.meatIntakeKg += 0.15; // Example: 150g for light meal
        break;
      case 'medium':

        this.meatIntakeKg += 0.3; // Example: 300g for medium meal
        break;
      case 'heavy':

        this.meatIntakeKg += 0.5; // Example: 500g for heavy meal
        break;
    }

    // Dairy Consumption Calculation
    switch (this.dairyConsumption) {
      case 'not-had':
        this.dairyIntakeKg += 0;
        break;
      case 'light':
        this.dairyIntakeKg += 0.1; // Example: 100g for light meal
        break;
      case 'medium':
        this.dairyIntakeKg += 0.25; // Example: 250g for medium meal
        break;
      case 'heavy':
        this.dairyIntakeKg += 0.4; // Example: 400g for heavy meal
        break;
    }

    // Other Products Calculation
    if (this.cerealsSelected) {
      this.otherIntakeKg += 0.3; // Example: 300g for cereals
    }
    if (this.pulsesSelected) {
      this.otherIntakeKg += 0.2; // Example: 200g for pulses
    }
    if (this.vegetablesSelected) {
      this.otherIntakeKg += 0.25; // Example: 250g for vegetables
    }
    if (this.fruitsSelected) {
      this.otherIntakeKg += 0.2; // Example: 200g for fruits
    }


  }



  onSubmit() {
    // Logic to handle form submission
    this.calculateDietaryImpact()
    this.factorsService.putRecordIfAbsent().subscribe({
      next:(emissionID)=>{
         let body = {dietary_habits:{
            other_consumption:this.otherIntakeKg,
            meat_consumption:this.meatIntakeKg,
            dairy_consumption:this.dairyIntakeKg
        }}

        if(emissionID){

          this.factorsService.updateRecord('dietary_habits',body,emissionID).subscribe({
            next:(success)=>{
              if(success)
                this.form.nativeElement.reset()
            },
            error:(err)=>{console.log(err);
            }
          })
      }
    }

  })

  }
}


