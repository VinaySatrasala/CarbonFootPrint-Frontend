import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-factors',
  templateUrl: './factors.component.html',
  styleUrls: ['./factors.component.css']
})
export class FactorsComponent {
  factors = [
    { label: 'Electricity', image: 'assets/electricity.webp', route: '/electricity' },
    { label: 'Waste', image: 'assets/waste.webp', route: '/waste' },
    { label: 'Water', image: 'assets/water.webp', route: '/water' },
    { label: 'Transport', image: 'assets/transport.webp', route: '/transport' },
    { label: 'Dietary Habits', image: 'assets/diet.webp', route: '/diet' },
    { label: 'Domestic Fuels', image: 'assets/demesticfuels.webp', route: '/fuels' },
  ];

  constructor(private router:Router){}
  clicked(route:string){
    this.router.navigate([route]);
  }

}
