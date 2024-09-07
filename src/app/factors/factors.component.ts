import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FactorsService } from '../factors.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'app-factors',
  templateUrl: './factors.component.html',
  styleUrls: ['./factors.component.css'],
})
export class FactorsComponent implements OnDestroy {
  alertSubscription!: Subscription;
  submitSuccess: boolean = false;
  categories: Array<
    | 'Electricity'
    | 'Water'
    | 'Waste'
    | 'Dietary Habits'
    | 'Domestic Fuel'
    | 'Transport'
  > = [
    'Waste',
    'Water',
    'Electricity',
    'Dietary Habits',
    'Domestic Fuel',
    'Transport',
  ];
  selectedCategory:
    | 'Electricity'
    | 'Water'
    | 'Waste'
    | 'Dietary Habits'
    | 'Domestic Fuel'
    | 'Transport' = 'Waste';

  constructor(
    private router: Router,
    private factorsService: FactorsService,
    private snackBar: MatSnackBar
  ) {
    this.alertSubscription = this.factorsService.submitStatus$.subscribe(
      (data) => {
        if (data == 'success') {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: { message: 'Successfully saved' },
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
        } else if (data == 'error') {
          this.snackBar.open(
            "Something unexpected happened : couldn't save data",
            undefined,
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            }
          );
        }
      }
    );
  }

  selectTab(
    category:
      | 'Electricity'
      | 'Water'
      | 'Waste'
      | 'Dietary Habits'
      | 'Domestic Fuel'
      | 'Transport'
  ) {
    this.selectedCategory = category;
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }
}
