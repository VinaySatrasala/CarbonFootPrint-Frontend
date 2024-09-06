import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-factors',
  templateUrl: './factors.component.html',
  styleUrls: ['./factors.component.css']
})
export class FactorsComponent {
  categories = ['Electricity','Water','Waste','Dietary Habits','Domestic Fuel','Transport']

  constructor(private router:Router){}


  selectTab(category:string){
    alert(category)
  }

}
