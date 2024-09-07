import { FactorsService } from './../factors.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.css'],
})
export class WasteComponent {
  recyclableWaste!: number; // Variable to store recyclable waste input
  nonRecyclableWaste!: number; // Variable to store non-recyclable waste input

  @ViewChild('form')
  form: any;

  constructor(private factorsService: FactorsService) {}

  onSubmit() {
    // Logic to handle form submission

    this.factorsService.putRecordIfAbsent().subscribe({
      next: (emissionID) => {
        let body = {
          waste: {
            recyclable_waste: this.recyclableWaste,
            non_recyclable_waste: this.nonRecyclableWaste,
          },
        };

        if (emissionID) {
          this.factorsService
            .updateRecord('waste', body, emissionID)
            .subscribe({
              next: (success) => {
                this.factorsService.alertSubmitStatus('success');
                this.form.nativeElement.reset();
              },
              error: (err) => {
                console.log(err);
                this.factorsService.alertSubmitStatus('error');
              },
            });
        }
      },
    });
  }
}
