import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FactorsService } from './../factors.service';
import { Component, ViewChild } from '@angular/core';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.css']
})
export class ElectricityComponent {
  units!:number;
  @ViewChild('form')
  form:any;



  constructor(private factorsService : FactorsService,private HttpClient:HttpClient){}

  onSubmit() {
    // Logic to handle form submission
    this.factorsService.putRecordIfAbsent().subscribe({
      next:(emissionID)=>{

        let body = {electricity:{
            kwh_used : this.units
        }}

        if(emissionID){

          this.factorsService.updateRecord('electricity',body,emissionID).subscribe({
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
