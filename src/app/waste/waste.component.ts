import { Component } from '@angular/core';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.css']
})
export class WasteComponent {
  recyclableWaste: number=0; // Variable to store recyclable waste input
  nonRecyclableWaste: number=0; // Variable to store non-recyclable waste input

  onSubmit() {
    // Handle form submission logic
    console.log('Recyclable Waste:', this.recyclableWaste, 'Kilos');
    console.log('Non-Recyclable Waste:', this.nonRecyclableWaste, 'Kilos');
    alert(`Recyclable: ${this.recyclableWaste} Kilos, Non-Recyclable: ${this.nonRecyclableWaste} Kilos`);
  }
}
