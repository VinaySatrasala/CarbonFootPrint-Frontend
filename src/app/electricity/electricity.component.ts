import { Component } from '@angular/core';

@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrls: ['./electricity.component.css']
})
export class ElectricityComponent {
  units:number = 0;
  onSubmit() {
    // Logic to handle form submission
    alert('Electricity consumption submitted!'+this.units);
  }
}
