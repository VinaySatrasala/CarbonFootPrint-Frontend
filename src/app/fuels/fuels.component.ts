import { FactorsService } from './../factors.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fuels',
  templateUrl: './fuels.component.html',
  styleUrls: ['./fuels.component.css'],
})
export class FuelsComponent {
  lpgUsage!: number;
  firewoodUsage!: number;
  estimatedFuelUsage: number | null = null;

  @ViewChild('form')
  form: any;

  calculateFuelUsage() {
    this.estimatedFuelUsage = this.lpgUsage + this.firewoodUsage;
  }

  constructor(private factorsService: FactorsService) {}

  onSubmit() {
    // Logic to handle form submission

    this.factorsService.putRecordIfAbsent().subscribe({
      next: (emissionID) => {
        let body = {
          fuel_sources: {
            lpg: this.lpgUsage,
            firewood: this.firewoodUsage,
          },
        };

        if (emissionID) {
          this.factorsService
            .updateRecord('fuel_sources', body, emissionID)
            .subscribe({
              next: (success) => {
                if (success) {
                  this.form.nativeElement.reset();
                  this.factorsService.alertSubmitStatus('success');
                }
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
